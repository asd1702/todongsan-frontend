import type { ApiResponse } from "@/shared/api/apiResponse";
import { httpClient } from "@/shared/api/httpClient";

import type {
  MarketDetail,
  MarketListParams,
  MarketListResponse,
} from "../model/market.types";

export async function getMarketList(
  params: MarketListParams,
): Promise<MarketListResponse> {
  const response = await httpClient.get<ApiResponse<MarketListResponse>>(
    "/api/v1/markets",
    { params },
  );

  return response.data.data;
}

export async function getMarketDetail(
  marketId: number,
): Promise<MarketDetail> {
  const response = await httpClient.get<ApiResponse<MarketDetail>>(
    `/api/v1/markets/${marketId}`,
  );

  return response.data.data;
}
