// auth.types는 shared/types/auth.ts를 재사용
// 도메인별 추가 타입이 필요한 경우만 여기에 정의

export * from '@/shared/types/auth';

// 카카오 로그인 관련
export interface KakaoAuthParams {
  code: string;
  state?: string;
}

// 로그인 히스토리
export interface LoginHistory {
  loginId: number;
  memberId: number;
  loginAt: string;
  ipAddress?: string;
  userAgent?: string;
  loginMethod: 'KAKAO' | 'ADMIN';
}

// 세션 정보
export interface SessionInfo {
  sessionId: string;
  memberId: number;
  issuedAt: string;
  expiresAt: string;
  lastAccessAt: string;
  ipAddress?: string;
}