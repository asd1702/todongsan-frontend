import { http, HttpResponse } from 'msw';

export const battleHandlers = [
  // 배틀 목록 조회
  http.get('/api/v1/battles', ({ request }) => {
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
            battleId: 1,
            title: '우리 동네 최고 맛집은?',
            description: '역삼동 vs 강남역 맛집 대결',
            optionA: '역삼동 맛집',
            optionB: '강남역 맛집',
            status: 'ACTIVE',
            startAt: '2024-12-10T10:00:00',
            endAt: '2024-12-17T22:00:00',
            createdAt: '2024-12-10T09:00:00',
            voteCount: 156,
          },
          {
            battleId: 2,
            title: '겨울 데이트 코스 추천',
            description: '실내 vs 야외 겨울 데이트',
            optionA: '카페/영화관',
            optionB: '공원/야외',
            status: 'CLOSED',
            startAt: '2024-12-05T10:00:00',
            endAt: '2024-12-10T22:00:00',
            createdAt: '2024-12-05T09:00:00',
            voteCount: 234,
            optionACount: 156,
            optionBCount: 78,
          },
        ],
        page,
        size,
        totalElements: 2,
        totalPages: 1,
        last: true,
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // 배틀 상세 조회
  http.get('/api/v1/battles/:battleId', ({ params }) => {
    const battleId = Number(params.battleId);

    return HttpResponse.json({
      success: true,
      errorCode: null,
      message: null,
      data: {
        battleId,
        title: '우리 동네 최고 맛집은?',
        description: '역삼동 vs 강남역 맛집 대결',
        optionA: '역삼동 맛집',
        optionB: '강남역 맛집',
        status: 'ACTIVE',
        startAt: '2024-12-10T10:00:00',
        endAt: '2024-12-17T22:00:00',
        createdAt: '2024-12-10T09:00:00',
        voteCount: 156,
        optionACount: 89,
        optionBCount: 67,
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // 배틀 투표
  http.post('/api/v1/battles/:battleId/votes', () => {
    return HttpResponse.json({
      success: true,
      errorCode: null,
      message: '투표가 완료되었습니다.',
      data: {
        voteId: 1,
        battleId: 1,
        optionSelected: 'A',
        pointEarned: '5.00',
        createdAt: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // 배틀 댓글 목록 조회
  http.get('/api/v1/battles/:battleId/comments', () => {
    return HttpResponse.json({
      success: true,
      errorCode: null,
      message: null,
      data: {
        content: [
          {
            commentId: 1,
            content: '역삼동이 확실히 맛집이 많긴 해요!',
            memberId: 2,
            nickname: '맛집탐험가',
            createdAt: '2024-12-10T15:30:00',
          },
          {
            commentId: 2,
            content: '강남역도 숨은 맛집들이 많답니다.',
            memberId: 3,
            nickname: '강남러버',
            createdAt: '2024-12-10T16:45:00',
          },
        ],
        page: 0,
        size: 20,
        totalElements: 2,
        totalPages: 1,
        last: true,
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // 배틀 댓글 작성
  http.post('/api/v1/battles/:battleId/comments', () => {
    return HttpResponse.json({
      success: true,
      errorCode: null,
      message: '댓글이 작성되었습니다.',
      data: {
        commentId: 3,
        content: '좋은 정보 감사해요!',
        memberId: 1,
        nickname: '테스트유저',
        createdAt: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    });
  }),
];