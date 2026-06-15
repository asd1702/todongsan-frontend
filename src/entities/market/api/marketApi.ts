import type { ApiResponse } from "@/shared/api/apiResponse";
import { httpClient } from "@/shared/api/httpClient";

import type {
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
