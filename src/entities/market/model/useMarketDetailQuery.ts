import { useQuery } from "@tanstack/react-query";

import { getMarketDetail } from "../api/marketApi";
import { marketKeys } from "./market.keys";

export function useMarketDetailQuery(marketId: number) {
  return useQuery({
    queryKey: marketKeys.detail(marketId),
    queryFn: () => getMarketDetail(marketId),
    enabled: Number.isFinite(marketId) && marketId > 0,
  });
}
