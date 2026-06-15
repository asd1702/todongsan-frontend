import type { MarketListParams } from "./market.types";

export const marketKeys = {
  all: ["markets"] as const,
  list: (params: MarketListParams) =>
    [...marketKeys.all, "list", params] as const,
};
