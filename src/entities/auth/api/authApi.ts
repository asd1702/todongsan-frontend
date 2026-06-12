import { httpClient } from "@/shared/api/httpClient";
import type { ApiResponse } from "@/shared/api/apiResponse";
import type { KakaoOAuthRequest, KakaoOAuthResponse } from "@/shared/types/auth";

export async function loginWithKakao(accessToken: string): Promise<KakaoOAuthResponse> {
  const response = await httpClient.post<ApiResponse<KakaoOAuthResponse>>(
    "/api/v1/members/oauth/kakao",
    { accessToken } satisfies KakaoOAuthRequest,
  );

  if (!response.data.data) {
    throw new Error("카카오 로그인 응답 데이터가 없습니다.");
  }

  return response.data.data;
}

export async function logout(): Promise<void> {
  await httpClient.post("/api/v1/members/logout");
}
