// API 관련 공통 타입
export interface RequestConfig {
  timeout?: number;
  retries?: number;
  idempotencyKey?: string;
}

// HTTP 메서드
export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

// API 엔드포인트 정보
export interface ApiEndpoint {
  method: HttpMethod;
  path: string;
  description: string;
}

// 에러 코드 카테고리
export type ErrorCodeCategory = 
  | 'VALIDATION'
  | 'AUTHENTICATION' 
  | 'AUTHORIZATION'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'EXTERNAL_SERVICE'
  | 'INTERNAL';