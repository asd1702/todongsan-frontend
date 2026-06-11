// 공통 도메인 상태
export type BaseStatus = 'PENDING' | 'ACTIVE' | 'CLOSED' | 'CANCELLED';

// 지역 정보
export interface Region {
  sido: string;
  sigu?: string;
}

// 정렬 옵션
export interface SortOption {
  field: string;
  direction: 'ASC' | 'DESC';
  label: string;
}

// 필터 옵션
export interface FilterOption {
  value: string | number;
  label: string;
  count?: number;
}

// 시간 관련
export interface TimeRange {
  startAt: string;
  endAt: string;
}

// 공통 엔티티 기본 필드
export interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt?: string;
}