import { http, HttpResponse } from 'msw';

export const authHandlers = [
  // 카카오 로그인
  http.post('/api/v1/members/oauth/kakao', () => {
    return HttpResponse.json({
      success: true,
      errorCode: null,
      message: '로그인 성공',
      data: {
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token',
        memberId: 1,
        nickname: '테스트유저',
        role: 'USER',
        isNewMember: false,
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // 토큰 갱신
  http.post('/api/v1/members/token/refresh', () => {
    return HttpResponse.json({
      success: true,
      errorCode: null,
      message: '토큰 갱신 성공',
      data: {
        accessToken: 'new_mock_access_token',
        refreshToken: 'new_mock_refresh_token',
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // 로그아웃
  http.post('/api/v1/members/logout', () => {
    return HttpResponse.json({
      success: true,
      errorCode: null,
      message: '로그아웃 완료',
      data: null,
      timestamp: new Date().toISOString(),
    });
  }),
];