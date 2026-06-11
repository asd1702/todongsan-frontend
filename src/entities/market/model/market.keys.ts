import type { MarketListParams, QuoteRequest, MarketPriceHistoryParams } from './market.types';

export const marketKeys = {
  all: ["markets"] as const,
  list: (params: MarketListParams) => ["markets", "list", params] as const,
  detail: (marketId: number) => ["markets", "detail", marketId] as const,
  quote: (marketId: number, params: QuoteRequest) => 
    ["markets", "quote", marketId, params] as const,
  priceHistory: (marketId: number, params?: MarketPriceHistoryParams) =>
    ["markets", "price-history", marketId, params] as const,
};

export const predictionKeys = {
  all: ["predictions"] as const,
  my: (marketId: number) => ["predictions", "me", marketId] as const,
  myList: (params: any) => ["predictions", "myList", params] as const,
};

export const adminMarketKeys = {
  all: ["admin", "markets"] as const,
  list: (params: MarketListParams) => ["admin", "markets", "list", params] as const,
  detail: (marketId: number) => ["admin", "markets", "detail", marketId] as const,
};
