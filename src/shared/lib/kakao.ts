import { ROUTE_PATH } from "@/shared/constants/routePath";

interface KakaoSDK {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  Auth: {
    authorize: (options: { redirectUri: string }) => void;
  };
}

declare global {
  interface Window {
    Kakao?: KakaoSDK;
  }
}

interface KakaoTokenResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in: number;
}

export function initKakao(): void {
  const appKey = import.meta.env.VITE_KAKAO_JS_KEY;
  if (!appKey) {
    throw new Error("VITE_KAKAO_JS_KEY가 설정되지 않았습니다.");
  }
  if (!window.Kakao) {
    throw new Error("Kakao SDK 스크립트를 불러오지 못했습니다.");
  }
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(appKey);
  }
}

export function getKakaoRedirectUri(): string {
  return `${window.location.origin}${ROUTE_PATH.KAKAO_CALLBACK}`;
}

// 인가 코드(code)를 받기 위해 카카오 로그인 화면으로 리다이렉트
export function kakaoAuthorize(): void {
  initKakao();
  window.Kakao!.Auth.authorize({ redirectUri: getKakaoRedirectUri() });
}

// 인가 코드(code)를 카카오 access_token으로 교환
export async function exchangeKakaoToken(code: string): Promise<string> {
  const clientId = import.meta.env.VITE_KAKAO_REST_API_KEY;
  if (!clientId) {
    throw new Error("VITE_KAKAO_REST_API_KEY가 설정되지 않았습니다.");
  }

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    redirect_uri: getKakaoRedirectUri(),
    code,
  });

  const response = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
    body: params,
  });

  if (!response.ok) {
    throw new Error("카카오 토큰 발급에 실패했습니다.");
  }

  const data: KakaoTokenResponse = await response.json();
  return data.access_token;
}
