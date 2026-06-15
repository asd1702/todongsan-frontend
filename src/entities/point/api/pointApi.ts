import { httpClient } from "@/shared/api/httpClient";
import type { ApiResponse } from "@/shared/api/apiResponse";
import type { PointBalance, PointHistoryListParams, PointHistoryPage } from "../model/point.types";

export async function getPointBalance(): Promise<PointBalance> {
  const response = await httpClient.get<ApiResponse<PointBalance>>("/api/v1/points/balance");
  return response.data.data;
}

export async function getPointHistory(params: PointHistoryListParams): Promise<PointHistoryPage> {
  const response = await httpClient.get<ApiResponse<PointHistoryPage>>("/api/v1/points/history", {
    params,
  });
  return response.data.data;
}
