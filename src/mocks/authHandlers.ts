import { http, HttpResponse } from "msw";
import type { ApiResponse } from "@/shared/api/apiResponse";
import type { KakaoOAuthResponse } from "@/shared/types/auth";

export const authHandlers = [
  http.post("/api/v1/members/oauth/kakao", () => {
    return HttpResponse.json<ApiResponse<KakaoOAuthResponse>>({
      success: true,
      errorCode: null,
      message: null,
      data: {
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
        memberId: 1,
        nickname: "토동산테스터",
        isNewMember: false,
      },
      timestamp: new Date().toISOString(),
    });
  }),
];
