import type { BaseEntity } from '@/shared/types/common';

// 회원 권한 역할
export type MemberRole = 'USER' | 'ADMIN';

// 회원 정보
export interface Member extends BaseEntity {
  memberId: number;
  nickname: string;
  email?: string;
  role: MemberRole;
  residenceSido?: string;
  residenceSigu?: string;
  pointBalance: string; // Decimal as string
  createdAt: string;
  residenceChangedAt?: string;
  lastLoginAt?: string;
  isDeleted?: boolean;
  deletedAt?: string;
}

// 회원 요약 정보 (다른 사용자 조회용)
export interface MemberSummary {
  memberId: number;
  nickname: string;
  role: MemberRole;
  residenceSido?: string;
  residenceSigu?: string;
  createdAt: string;
}

// 회원 프로필 수정 요청
export interface UpdateMemberProfileRequest {
  nickname?: string;
  residenceSido?: string;
  residenceSigu?: string;
}

// 회원 탈퇴 요청
export interface DeleteMemberRequest {
  reason?: string;
}

// 회원 목록 요청 파라미터 (관리자용)
export interface MemberListParams {
  page?: number;
  size?: number;
  role?: MemberRole;
  residenceSido?: string;
  residenceSigu?: string;
  sort?: string;
}

// 회원 활동 통계
export interface MemberActivityStats {
  memberId: number;
  battleVoteCount: number;
  battleCommentCount: number;
  marketPredictionCount: number;
  pointEarned: string;
  pointSpent: string;
  joinedDaysAgo: number;
}