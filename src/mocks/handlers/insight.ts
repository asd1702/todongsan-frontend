import { http, HttpResponse } from 'msw';

export const insightHandlers = [
  // 내 신뢰도 조회
  http.get('/api/v1/reputations/me', () => {
    return HttpResponse.json({
      success: true,
      errorCode: null,
      message: null,
      data: {
        memberId: 1,
        activityScore: 85,
        predictionCount: 12,
        predictionCorrect: 8,
        predictionAccuracy: 66.67,
        residenceSido: '서울특별시',
        residenceSigu: '강남구',
        activityConfirmed: true,
        activityConfirmedAt: '2024-12-05T10:00:00',
        visitCertifications: [
          {
            sido: '서울특별시',
            sigu: '강남구',
            method: 'GPS',
            certifiedAt: '2024-12-05T10:00:00',
            lastCertifiedAt: '2024-12-10T14:30:00',
            nextAvailableDate: '2024-12-17T14:30:00',
          },
        ],
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // 다른 사용자 신뢰도 조회
  http.get('/api/v1/reputations/:memberId', ({ params }) => {
    const memberId = Number(params.memberId);

    return HttpResponse.json({
      success: true,
      errorCode: null,
      message: null,
      data: {
        memberId,
        activityScore: 72,
        predictionCount: 8,
        predictionAccuracy: 75.0,
        residenceSido: '서울특별시',
        residenceSigu: '서초구',
        activityConfirmed: true,
        activityConfirmedAt: '2024-11-20T15:00:00',
        visitCertificationCount: 2,
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // 방문 인증 등록
  http.post('/api/v1/reputations/visit-certifications', () => {
    return HttpResponse.json({
      success: true,
      errorCode: null,
      message: '방문 인증이 등록되었습니다.',
      data: {
        certificationId: 1,
        memberId: 1,
        sido: '서울특별시',
        sigu: '강남구',
        method: 'GPS',
        certifiedAt: new Date().toISOString(),
        nextAvailableDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7일 후
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // 내 방문 인증 내역 조회
  http.get('/api/v1/reputations/visit-certifications/mine', () => {
    return HttpResponse.json({
      success: true,
      errorCode: null,
      message: null,
      data: [
        {
          certificationId: 1,
          sido: '서울특별시',
          sigu: '강남구',
          method: 'GPS',
          certifiedAt: '2024-12-05T10:00:00',
          lastCertifiedAt: '2024-12-10T14:30:00',
          nextAvailableDate: '2024-12-17T14:30:00',
        },
        {
          certificationId: 2,
          sido: '서울특별시',
          sigu: '서초구',
          method: 'COMMENT',
          certifiedAt: '2024-11-20T15:00:00',
          lastCertifiedAt: '2024-11-20T15:00:00',
          nextAvailableDate: '2024-11-27T15:00:00',
        },
      ],
      timestamp: new Date().toISOString(),
    });
  }),

  // 마켓 AI 리포트 생성 요청
  http.post('/api/v1/insights/markets/:marketId/report', () => {
    return HttpResponse.json({
      success: true,
      errorCode: null,
      message: 'AI 리포트 생성이 요청되었습니다.',
      data: {
        reportId: 1,
        marketId: 1,
        status: 'PROCESSING',
        pointDeducted: '80.00',
        requestedAt: new Date().toISOString(),
        estimatedCompleteAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5분 후
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // 마켓 AI 리포트 조회
  http.get('/api/v1/insights/markets/:marketId/report', () => {
    return HttpResponse.json({
      success: true,
      errorCode: null,
      message: null,
      data: {
        reportId: 1,
        marketId: 1,
        status: 'COMPLETED',
        title: '강남구 아파트 가격 상승률 분석 리포트',
        summary: '최근 5년간 강남구 아파트 시장 동향과 2024년 전망에 대한 종합 분석입니다.',
        content: '## 시장 동향 분석\n\n강남구 아파트 시장은...\n\n## 가격 예측 요소\n\n1. 금리 정책\n2. 공급량 변화\n3. 경기 전망\n\n## 결론\n\n종합적으로 볼 때...',
        generatedAt: '2024-12-10T15:35:00',
        pointDeducted: '80.00',
        requestedAt: '2024-12-10T15:30:00',
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // 마켓 AI 리포트 상태 조회
  http.get('/api/v1/insights/markets/:marketId/report/status', () => {
    return HttpResponse.json({
      success: true,
      errorCode: null,
      message: null,
      data: {
        reportId: 1,
        status: 'COMPLETED',
        progress: 100,
        estimatedCompleteAt: '2024-12-10T15:35:00',
        generatedAt: '2024-12-10T15:35:00',
      },
      timestamp: new Date().toISOString(),
    });
  }),
];