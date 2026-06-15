import { useQuery } from "@tanstack/react-query";

import { getMarketList } from "../api/marketApi";
import { marketKeys } from "./market.keys";
import type { MarketListParams } from "./market.types";

export function useMarketListQuery(params: MarketListParams) {
  return useQuery({
    queryKey: marketKeys.list(params),
    queryFn: () => getMarketList(params),
  });
}
