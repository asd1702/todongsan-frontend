import { http, HttpResponse } from 'msw';

export const memberHandlers = [
  // 내 정보 조회
  http.get('/api/v1/members/me', () => {
    return HttpResponse.json({
      success: true,
      errorCode: null,
      message: null,
      data: {
        memberId: 1,
        nickname: '테스트유저',
        email: 'test@example.com',
        role: 'USER',
        residenceSido: '서울특별시',
        residenceSigu: '강남구',
        pointBalance: '1500.00',
        createdAt: '2024-11-01T10:00:00',
        residenceChangedAt: '2024-11-01T10:00:00',
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // 내 정보 수정
  http.patch('/api/v1/members/me', () => {
    return HttpResponse.json({
      success: true,
      errorCode: null,
      message: '프로필이 수정되었습니다.',
      data: {
        memberId: 1,
        nickname: '수정된닉네임',
        email: 'test@example.com',
        role: 'USER',
        residenceSido: '서울특별시',
        residenceSigu: '서초구',
        pointBalance: '1500.00',
        createdAt: '2024-11-01T10:00:00',
        residenceChangedAt: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // 포인트 잔액 조회
  http.get('/api/v1/points/balance', () => {
    return HttpResponse.json({
      success: true,
      errorCode: null,
      message: null,
      data: {
        memberId: 1,
        pointBalance: '1500.00',
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // 포인트 히스토리 조회
  http.get('/api/v1/points/history', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 0;
    const size = Number(url.searchParams.get('size')) || 20;

    return HttpResponse.json({
      success: true,
      errorCode: null,
      message: null,
      data: {
        content: [
          {
            id: 1,
            type: 'EARN_VOTE',
            amount: '5.00',
            balanceSnapshot: '1500.00',
            reason: '배틀 투표 참여 보상',
            referenceId: 1,
            createdAt: '2024-12-10T15:30:00',
          },
          {
            id: 2,
            type: 'SPEND_MARKET',
            amount: '-100.00',
            balanceSnapshot: '1495.00',
            reason: '마켓 예측 참여',
            referenceId: 1,
            createdAt: '2024-12-10T14:20:00',
          },
          {
            id: 3,
            type: 'EARN_COMMENT',
            amount: '3.00',
            balanceSnapshot: '1595.00',
            reason: '댓글 작성 보상',
            referenceId: 2,
            createdAt: '2024-12-10T13:15:00',
          },
          {
            id: 4,
            type: 'SETTLE_MARKET',
            amount: '185.30',
            balanceSnapshot: '1592.00',
            reason: '마켓 정산 수익',
            referenceId: 1,
            createdAt: '2024-12-09T10:00:00',
          },
        ],
        page,
        size,
        totalElements: 4,
        totalPages: 1,
        last: true,
      },
      timestamp: new Date().toISOString(),
    });
  }),
];