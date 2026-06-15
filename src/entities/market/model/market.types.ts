export type MarketStatus =
  | "PENDING"
  | "ACTIVE"
  | "CLOSED"
  | "DATA_PENDING"
  | "SETTLEMENT_IN_PROGRESS"
  | "SETTLED"
  | "VOIDED";

export type MarketListParams = {
  page?: number;
  size?: number;
  status?: MarketStatus;
  keyword?: string;
};

export type MarketListResponse = {
  content: MarketSummary[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};

export type MarketSummary = {
  marketId: number;
  title: string;
  status: MarketStatus;
  closeAt: string;
  totalPoolAmount: string;
  options: MarketOption[];
};

export type MarketOption = {
  optionId: number;
  content: string;
  currentPrice: string;
  realPoolAmount?: string;
  virtualPoolAmount?: string;
};
