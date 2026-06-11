import type { BaseEntity } from '@/shared/types/common';

// 배틀 상태
export type BattleStatus = 'PENDING' | 'ACTIVE' | 'CLOSED' | 'CANCELLED';

// 배틀 기본 정보
export interface Battle extends BaseEntity {
  battleId: number;
  title: string;
  description?: string;
  optionA: string;
  optionB: string;
  status: BattleStatus;
  startAt: string;
  endAt: string;
  createdAt: string;
  voteCount?: number;
  optionACount?: number;
  optionBCount?: number;
}

// 배틀 요약 (목록용)
export interface BattleSummary {
  battleId: number;
  title: string;
  optionA: string;
  optionB: string;
  status: BattleStatus;
  endAt: string;
  voteCount: number;
  createdAt: string;
}

// 배틀 상세
export interface BattleDetail extends Battle {
  judgeCriteria?: string;
  resultSummary?: string;
}

// 배틀 투표
export interface BattleVote {
  voteId: number;
  battleId: number;
  memberId: number;
  optionSelected: 'A' | 'B';
  pointEarned: string;
  createdAt: string;
}

// 배틀 댓글
export interface BattleComment {
  commentId: number;
  battleId: number;
  memberId: number;
  nickname: string;
  content: string;
  createdAt: string;
}

// 배틀 결과
export interface BattleResult {
  battleId: number;
  totalVotes: number;
  optionACount: number;
  optionBCount: number;
  optionAPercentage: number;
  optionBPercentage: number;
  winningOption: 'A' | 'B' | 'TIE';
}

// 배틀 생성 요청
export interface CreateBattleRequest {
  title: string;
  description?: string;
  optionA: string;
  optionB: string;
  endAt: string;
}

// 배틀 투표 요청
export interface CreateVoteRequest {
  optionSelected: 'A' | 'B';
}

// 배틀 댓글 작성 요청
export interface CreateCommentRequest {
  content: string;
}

// 배틀 목록 요청 파라미터
export interface BattleListParams {
  page?: number;
  size?: number;
  status?: BattleStatus;
  sort?: string;
}

// 배틀 댓글 목록 요청 파라미터
export interface BattleCommentListParams {
  page?: number;
  size?: number;
}