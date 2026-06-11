import axios from 'axios';
import type { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { ApiResponse, ApiError } from './types';

// API Base URL 설정
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000';

// HTTP 클라이언트 인스턴스 생성
export const httpClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 인증 토큰 추가
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 개발 환경에서만 개발용 헤더 추가 (Gateway 없이 서비스 직접 호출 시)
    if (import.meta.env.DEV && import.meta.env.VITE_DEV_MEMBER_ID) {
      config.headers['X-Member-Id'] = import.meta.env.VITE_DEV_MEMBER_ID;
      config.headers['X-Member-Role'] = import.meta.env.VITE_DEV_MEMBER_ROLE || 'USER';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
httpClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<any>>) => {
    return response;
  },
  (error) => {
    // 네트워크 오류 처리
    if (!error.response) {
      const networkError: ApiError = {
        errorCode: 'NETWORK_ERROR',
        message: '네트워크 연결을 확인해주세요.',
        timestamp: new Date().toISOString(),
      };
      return Promise.reject(networkError);
    }

    // 서버 응답이 있는 경우
    const { status, data } = error.response;
    
    // 인증 만료 처리 (401 또는 인증 관련 에러코드)
    if (status === 401 || data?.errorCode === 'UNAUTHORIZED') {
      // 인증 상태 초기화
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      
      // 로그인 페이지로 리다이렉트 (브라우저 환경에서만)
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      
      const authError: ApiError = {
        status,
        errorCode: 'UNAUTHORIZED',
        message: '인증이 만료되었습니다. 다시 로그인해주세요.',
        timestamp: new Date().toISOString(),
      };
      return Promise.reject(authError);
    }

    // API 응답 형태의 에러 변환
    const apiError: ApiError = {
      status,
      errorCode: data?.errorCode || 'UNKNOWN_ERROR',
      message: data?.message || '요청 처리 중 오류가 발생했습니다.',
      timestamp: data?.timestamp || new Date().toISOString(),
    };

    return Promise.reject(apiError);
  }
);

export default httpClient;