// 사용자 역할
export type UserRole = 'USER' | 'ADMIN';

// 인증 상태
export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  memberId: number | null;
  nickname: string | null;
  role: UserRole | null;
}

// 로그인 요청
export interface LoginRequest {
  code: string;
  redirectUri?: string;
}

// 로그인 응답
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  memberId: number;
  nickname: string;
  role: UserRole;
  isNewMember: boolean;
}

// 토큰 갱신 요청
export interface RefreshTokenRequest {
  refreshToken: string;
}

// 토큰 갱신 응답
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}