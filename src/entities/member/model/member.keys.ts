import type { MemberListParams } from './member.types';

export const memberKeys = {
  all: ["members"] as const,
  me: () => ["members", "me"] as const,
  detail: (memberId: number) => ["members", "detail", memberId] as const,
  list: (params: MemberListParams) => ["members", "list", params] as const,
};
