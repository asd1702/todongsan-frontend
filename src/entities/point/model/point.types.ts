import type { BaseEntity } from '@/shared/types/common';

// 포인트 거래 타입
export type PointTransactionType = 
  | 'EARN_VOTE'           // 배틀 투표 보상
  | 'EARN_COMMENT'        // 댓글 작성 보상
  | 'EARN_VISIT_CERT'     // 방문 인증 보상
  | 'SPEND_MARKET'        // 마켓 예측 참여
  | 'SPEND_INSIGHT'       // AI 리포트 생성
  | 'SETTLE_MARKET'       // 마켓 정산 수익
  | 'REFUND_MARKET'       // 마켓 환불
  | 'REFUND_INSIGHT'      // AI 리포트 생성 실패 환불
  | 'ADMIN_ADJUST';       // 관리자 조정

// 포인트 잔액 정보
export interface PointBalance {
  memberId: number;
  pointBalance: string; // Decimal as string
}

// 포인트 거래 이력
export interface PointHistory extends BaseEntity {
  id: number;
  memberId: number;
  type: PointTransactionType;
  amount: string; // Decimal as string (+ 또는 -)
  balanceSnapshot: string; // 거래 후 잔액
  reason?: string;
  referenceId?: number; // 관련 엔티티 ID (battleId, marketId 등)
  referenceType?: string; // 관련 엔티티 타입
  createdAt: string;
}

// 포인트 거래 요약
export interface PointTransactionSummary {
  totalEarned: string;
  totalSpent: string;
  netAmount: string; // 순 증감
  transactionCount: number;
}

// 포인트 히스토리 조회 필터 (백엔드 type 쿼리 파라미터 기준)
export type PointHistoryFilterType = 'EARN' | 'SPEND' | 'SETTLE' | 'REFUND';

// 포인트 히스토리 목록 요청 파라미터
export interface PointHistoryListParams {
  page?: number;
  size?: number;
  type?: PointHistoryFilterType;
  dateFrom?: string;
  dateTo?: string;
  sort?: string;
}

// 포인트 히스토리 목록 응답 (페이지네이션)
export interface PointHistoryPage {
  content: PointHistory[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  last: boolean;
}

// 포인트 사용/적립 통계 (기간별)
export interface PointStats {
  period: string; // 'daily' | 'weekly' | 'monthly'
  date: string;
  earned: string;
  spent: string;
  balance: string;
}

// 포인트 적립 요청 (내부 API용)
export interface PointEarnRequest {
  memberId: number;
  amount: string;
  type: PointTransactionType;
  reason?: string;
  referenceId?: number;
  referenceType?: string;
  idempotencyKey?: string;
}

// 포인트 차감 요청 (내부 API용)  
export interface PointSpendRequest {
  memberId: number;
  amount: string;
  type: PointTransactionType;
  reason?: string;
  referenceId?: number;
  referenceType?: string;
  idempotencyKey?: string;
}