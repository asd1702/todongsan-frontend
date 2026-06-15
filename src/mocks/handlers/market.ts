import { http, HttpResponse } from 'msw';

export const marketHandlers = [
  // 마켓 목록 조회
  http.get('/api/v1/markets', ({ request }) => {
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
            marketId: 1,
            title: '2024년 강남구 아파트 평균 가격 상승률',
            status: 'ACTIVE',
            closeAt: '2024-12-31T23:59:59',
            totalPoolAmount: '15000.00',
            options: [
              {
                optionId: 1,
                content: '0% 이상 5% 미만',
                currentPrice: '0.65432100',
              },
              {
                optionId: 2,
                content: '5% 이상 10% 미만',
                currentPrice: '0.34567900',
              },
            ],
          },
        ],
        page,
        size,
        totalElements: 1,
        totalPages: 1,
        last: true,
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // 마켓 상세 조회
  http.get('/api/v1/markets/:marketId', ({ params }) => {
    const marketId = Number(params.marketId);

    return HttpResponse.json({
      success: true,
      errorCode: null,
      message: null,
      data: {
        marketId,
        title: '2024년 강남구 아파트 평균 가격 상승률',
        description: '2024년 12월 기준 강남구 아파트 평균 가격이 전년 대비 몇 % 상승할까요?',
        status: 'ACTIVE',
        closeAt: '2024-12-31T23:59:59',
        judgeDate: '2025-01-15T00:00:00',
        settleDueAt: '2025-01-20T23:59:59',
        totalRealPoolAmount: '15000.00',
        totalVirtualPoolAmount: '50000.00',
        totalEffectivePoolAmount: '65000.00',
        totalPredictionCount: 89,
        judgeCriteria: '국토교통부 실거래가 데이터 기준',
        judgeDataSource: '국토교통부 부동산거래신고 시스템',
        options: [
          {
            optionId: 1,
            content: '0% 이상 5% 미만',
            currentPrice: '0.65432100',
            initialPrice: '0.58000000',
            priceChangeRate: '12.50000000',
            realPoolAmount: '8000.00',
            virtualPoolAmount: '25000.00',
            effectivePoolAmount: '33000.00',
            totalContractQuantity: '45.67800000',
            predictionCount: 56,
          },
          {
            optionId: 2,
            content: '5% 이상 10% 미만',
            currentPrice: '0.34567900',
            initialPrice: '0.42000000',
            priceChangeRate: '-17.70000000',
            realPoolAmount: '7000.00',
            virtualPoolAmount: '25000.00',
            effectivePoolAmount: '32000.00',
            totalContractQuantity: '23.45600000',
            predictionCount: 33,
          },
        ],
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // 마켓 가격 이력 조회
  http.get('/api/v1/markets/:marketId/price-history', () => {
    return HttpResponse.json({
      success: true,
      errorCode: null,
      message: null,
      data: [
        {
          timestamp: '2024-12-10T10:00:00',
          optionPrices: [
            { optionId: 1, price: '0.58000000' },
            { optionId: 2, price: '0.42000000' },
          ],
        },
        {
          timestamp: '2024-12-10T12:00:00',
          optionPrices: [
            { optionId: 1, price: '0.62000000' },
            { optionId: 2, price: '0.38000000' },
          ],
        },
        {
          timestamp: '2024-12-10T14:00:00',
          optionPrices: [
            { optionId: 1, price: '0.65432100' },
            { optionId: 2, price: '0.34567900' },
          ],
        },
      ],
      timestamp: new Date().toISOString(),
    });
  }),

  // 예측 견적 요청
  http.post('/api/v1/markets/:marketId/predictions/quote', () => {
    return HttpResponse.json({
      success: true,
      errorCode: null,
      message: null,
      data: {
        optionId: 1,
        pointAmount: '100.00',
        estimatedPrice: '0.65432100',
        estimatedContractQuantity: '1.52876234',
        estimatedFee: '1.00',
        estimatedSettlementAmount: '152.88',
        quoteValidUntil: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5분 후
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // 예측 참여
  http.post('/api/v1/markets/:marketId/predictions', () => {
    return HttpResponse.json({
      success: true,
      errorCode: null,
      message: '예측 참여가 완료되었습니다.',
      data: {
        predictionId: 1,
        marketId: 1,
        optionId: 1,
        pointAmount: '100.00',
        priceSnapshot: '0.65432100',
        contractQuantity: '1.52876234',
        fee: '1.00',
        status: 'CONFIRMED',
        createdAt: new Date().toISOString(),
      },
      timestamp: new Date().toISOString(),
    });
  }),

  // 내 예측 상태 조회
  http.get('/api/v1/markets/:marketId/predictions/me', () => {
    return HttpResponse.json({
      success: true,
      errorCode: null,
      message: null,
      data: {
        predictionId: 1,
        marketId: 1,
        optionId: 1,
        pointAmount: '100.00',
        priceSnapshot: '0.65432100',
        contractQuantity: '1.52876234',
        fee: '1.00',
        status: 'CONFIRMED',
        estimatedSettlementAmount: '152.88',
        createdAt: '2024-12-10T15:30:00',
      },
      timestamp: new Date().toISOString(),
    });
  }),
];
