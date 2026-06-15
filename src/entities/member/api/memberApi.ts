import { httpClient } from "@/shared/api/httpClient";
import type { ApiResponse } from "@/shared/api/apiResponse";
import type { Member, UpdateMemberProfileRequest } from "../model/member.types";

export async function getMyProfile(): Promise<Member> {
  const response = await httpClient.get<ApiResponse<Member>>("/api/v1/members/me");
  return response.data.data;
}

export async function updateMyProfile(payload: UpdateMemberProfileRequest): Promise<Member> {
  const response = await httpClient.patch<ApiResponse<Member>>("/api/v1/members/me", payload);
  return response.data.data;
}
