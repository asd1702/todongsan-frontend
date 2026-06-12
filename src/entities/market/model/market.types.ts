import type { BaseEntity } from '@/shared/types/common';

// 마켓 상태
export type MarketStatus = 
  | 'PENDING' 
  | 'ACTIVE' 
  | 'CLOSED' 
  | 'DATA_PENDING'
  | 'SETTLEMENT_IN_PROGRESS' 
  | 'SETTLED' 
  | 'VOIDED';

// 마켓 응답 타입
export type AnswerType = 'YES_NO' | 'MULTIPLE_CHOICE' | 'NUMERIC_RANGE';

// 마켓 카테고리
export type MarketCategory = 
  | 'REAL_ESTATE'
  | 'POLITICS'
  | 'ECONOMY'
  | 'DEMOGRAPHICS'
  | 'INFRASTRUCTURE'
  | 'ENVIRONMENT';

// 마켓 옵션
export interface MarketOption {
  optionId: number;
  optionCode: string;
  content: string;
  currentPrice: string; // Decimal as string, 8 decimal places
  initialPrice?: string;
  priceChangeRate?: string;
  realPoolAmount: string; // Decimal as string, 2 decimal places
  virtualPoolAmount: string;
  effectivePoolAmount: string;
  totalContractQuantity: string; // Decimal as string, 8 decimal places
  predictionCount: number;
  rangeMin?: string; // NUMERIC_RANGE용
  rangeMax?: string; // NUMERIC_RANGE용
  initialVirtualLiquidity: string;
}

// 마켓 기본 정보
export interface Market extends BaseEntity {
  marketId: number;
  title: string;
  description?: string;
  category: MarketCategory;
  answerType: AnswerType;
  status: MarketStatus;
  metricUnit?: string;
  closeAt: string;
  judgeDate: string;
  settleDueAt: string;
  judgeCriteria?: string;
  judgeDataSource?: string;
  totalRealPoolAmount: string;
  totalVirtualPoolAmount: string;
  totalEffectivePoolAmount: string;
  totalPredictionCount: number;
  feeRate: string; // Decimal as string
  options: MarketOption[];
  resultOptionId?: number; // 결과 확정된 옵션 ID
  resultValue?: string; // NUMERIC_RANGE 결과 값
  resultConfirmedAt?: string;
  createdAt: string;
}

// 마켓 요약 (목록용)
export interface MarketSummary {
  marketId: number;
  title: string;
  category: MarketCategory;
  status: MarketStatus;
  closeAt: string;
  totalRealPoolAmount: string;
  totalPredictionCount: number;
  options: MarketOption[];
}

// 마켓 상세
export type MarketDetail = Market;

// 마켓 가격 이력
export interface MarketPriceHistory {
  timestamp: string;
  optionPrices: Array<{
    optionId: number;
    price: string;
  }>;
}

// 예측 견적
export interface PredictionQuote {
  optionId: number;
  pointAmount: string;
  estimatedPrice: string;
  estimatedContractQuantity: string;
  estimatedFee: string;
  estimatedSettlementAmount: string;
  quoteValidUntil: string;
}

// 예측 상태
export type PredictionStatus = 
  | 'POINT_PENDING'
  | 'POINT_UNKNOWN' 
  | 'CONFIRMED'
  | 'FAILED'
  | 'SETTLED'
  | 'REFUND_PENDING'
  | 'REFUND_UNKNOWN'
  | 'REFUNDED';

// 내 예측
export interface MyPrediction {
  predictionId: number;
  marketId: number;
  optionId: number;
  optionContent: string;
  pointAmount: string;
  priceSnapshot: string;
  contractQuantity: string;
  fee: string;
  status: PredictionStatus;
  estimatedSettlementAmount?: string;
  actualSettlementAmount?: string;
  createdAt: string;
  settledAt?: string;
}

// 마켓 생성 요청 (관리자)
export interface CreateMarketRequest {
  title: string;
  description?: string;
  category: MarketCategory;
  answerType: AnswerType;
  metricUnit?: string;
  closeAt: string;
  judgeDate: string;
  settleDueAt: string;
  judgeCriteria: string;
  judgeDataSource: string;
  feeRate: string;
  options: Array<{
    optionCode: string;
    content: string;
    rangeMin?: string;
    rangeMax?: string;
    initialVirtualLiquidity: string;
  }>;
}

// 예측 참여 요청
export interface CreatePredictionRequest {
  optionId: number;
  pointAmount: string;
}

// 예측 견적 요청
export interface QuoteRequest {
  optionId: number;
  pointAmount: string;
}

// 마켓 결과 확정 요청 (관리자)
export interface ConfirmResultRequest {
  resultOptionId?: number; // 선택형
  resultValue?: string; // 숫자 범위형
}

// 마켓 목록 요청 파라미터
export interface MarketListParams {
  page?: number;
  size?: number;
  status?: MarketStatus;
  category?: MarketCategory;
  sort?: string;
}

// 마켓 가격 이력 요청 파라미터
export interface MarketPriceHistoryParams {
  optionId?: number;
  from?: string;
  to?: string;
}