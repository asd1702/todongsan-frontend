import type { BattleListParams, BattleCommentListParams } from './battle.types';

export const battleKeys = {
  all: ["battles"] as const,
  list: (params: BattleListParams) => ["battles", "list", params] as const,
  detail: (battleId: number) => ["battles", "detail", battleId] as const,
  result: (battleId: number) => ["battles", "result", battleId] as const,
  comments: (battleId: number, params: BattleCommentListParams) => 
    ["battles", "comments", battleId, params] as const,
  myVote: (battleId: number) => ["battles", "myVote", battleId] as const,
};

export const adminBattleKeys = {
  all: ["admin", "battles"] as const,
  list: (params: BattleListParams) => ["admin", "battles", "list", params] as const,
  detail: (battleId: number) => ["admin", "battles", "detail", battleId] as const,
  analysis: (battleId: number) => ["admin", "battles", "analysis", battleId] as const,
  report: (battleId: number) => ["admin", "battles", "report", battleId] as const,
};
