import type { MyPredictionListParams } from './prediction.types';

export const predictionKeys = {
  all: ["predictions"] as const,
  my: (marketId: number) => ["predictions", "me", marketId] as const,
  myList: (params: MyPredictionListParams) => ["predictions", "myList", params] as const,
  stats: () => ["predictions", "stats"] as const,
};