import type { PointHistoryListParams } from './point.types';

export const pointKeys = {
  all: ["points"] as const,
  balance: () => ["points", "balance"] as const,
  history: (params: PointHistoryListParams) => ["points", "history", params] as const,
  stats: (period: string) => ["points", "stats", period] as const,
};
