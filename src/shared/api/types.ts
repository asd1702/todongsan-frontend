// 공통 API 응답 타입
export interface ApiResponse<T> {
  success: boolean;
  errorCode: string | null;
  message: string | null;
  data: T;
  timestamp: string;
}

// 공통 API 에러 타입
export interface ApiError {
  status?: number;
  errorCode: string;
  message: string;
  timestamp?: string;
}

// 페이지네이션 응답 타입
export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

// 공통 요청 파라미터 타입
export interface PaginationParams {
  page?: number;
  size?: number;
}

export interface SortParams {
  sort?: string;
  direction?: 'ASC' | 'DESC';
}

// Idempotency Key 타입
export type IdempotencyKey = string;