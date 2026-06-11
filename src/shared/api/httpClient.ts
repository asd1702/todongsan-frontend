import axios from "axios";
import { ROUTE_PATH } from "@/shared/constants/routePath";
import { ACCESS_TOKEN_KEY } from "@/shared/constants/auth";
import { toApiError } from "./apiError";

// Guard variable to prevent multiple simultaneous redirects
let isRedirecting = false;

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:9000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
httpClient.interceptors.request.use(
  (config) => {
    // 1. Inject Authorization: Bearer {accessToken}
    // TODO: 추후 Zustand 등 authStore가 구현되면 스토어에서 토큰을 가져오도록 개선하십시오.
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 2. Inject development headers if dev member ID / role are set
    const devMemberId = import.meta.env.VITE_DEV_MEMBER_ID;
    const devMemberRole = import.meta.env.VITE_DEV_MEMBER_ROLE;
    if (devMemberId && config.headers) {
      config.headers["X-Member-Id"] = devMemberId;
    }
    if (devMemberRole && config.headers) {
      config.headers["X-Member-Role"] = devMemberRole;
    }

    // 3. Preserve external Idempotency-Key
    // (Ensure it's not overridden if already set in request config)
    if (config.headers && config.headers["Idempotency-Key"]) {
      // Keep it as is
    }

    return config;
  },
  (error) => {
    return Promise.reject(toApiError(error));
  }
);

// Response Interceptor
httpClient.interceptors.response.use(
  (response) => {
    // Do not unwrap response.data.data globally as per user request.
    // Return AxiosResponse<ApiResponse<T>> directly.
    return response;
  },
  (error) => {
    const apiError = toApiError(error);

    // 401 Unauthorized handling
    if (apiError.status === 401 || apiError.errorCode === "UNAUTHORIZED") {
      // 1. Remove accessToken
      // TODO: 추후 authStore 도입 시 authStore.clear() 형태로 인증 정보를 일괄 초기화해야 합니다.
      localStorage.removeItem(ACCESS_TOKEN_KEY);

      // 2. Prevent infinite redirect loop and duplicate redirect calls
      const currentPath = window.location.pathname;
      const isLoginOrCallbackPath =
        currentPath === ROUTE_PATH.LOGIN ||
        currentPath === ROUTE_PATH.KAKAO_CALLBACK;

      if (!isLoginOrCallbackPath && !isRedirecting) {
        isRedirecting = true;
        window.location.assign(ROUTE_PATH.LOGIN);
      }
    }

    return Promise.reject(apiError);
  }
);
