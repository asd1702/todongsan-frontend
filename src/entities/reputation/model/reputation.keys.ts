import type { 
  ReputationRankingParams, 
  VisitCertListParams 
} from './reputation.types';

export const reputationKeys = {
  all: ["reputations"] as const,
  me: () => ["reputations", "me"] as const,
  detail: (memberId: number) => ["reputations", "detail", memberId] as const,
  ranking: (params: ReputationRankingParams) => ["reputations", "ranking", params] as const,
};

export const visitCertKeys = {
  all: ["visitCertifications"] as const,
  mine: (params: VisitCertListParams) => ["visitCertifications", "mine", params] as const,
  list: (params: VisitCertListParams) => ["visitCertifications", "list", params] as const,
};
