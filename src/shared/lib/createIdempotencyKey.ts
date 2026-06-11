/**
 * Idempotency Key 생성 유틸리티
 */

/**
 * 마켓 예측 참여용 Idempotency Key 생성
 * 형식: MARKET_PREDICTION_SPEND:market:{marketId}:member:{memberId}
 */
export function createPredictionIdempotencyKey(marketId: number, memberId: number): string {
  return `MARKET_PREDICTION_SPEND:market:${marketId}:member:${memberId}`;
}

/**
 * 배틀 투표용 Idempotency Key 생성
 * 형식: BATTLE_VOTE:battle:{battleId}:member:{memberId}
 */
export function createVoteIdempotencyKey(battleId: number, memberId: number): string {
  return `BATTLE_VOTE:battle:${battleId}:member:${memberId}`;
}

/**
 * 인사이트 리포트 생성용 Idempotency Key 생성
 * 형식: INSIGHT_REPORT_GENERATE:type:{type}:id:{referenceId}:member:{memberId}
 */
export function createInsightReportIdempotencyKey(
  type: 'MARKET' | 'BATTLE',
  referenceId: number,
  memberId: number
): string {
  return `INSIGHT_REPORT_GENERATE:type:${type}:id:${referenceId}:member:${memberId}`;
}

/**
 * UUID 기반 Idempotency Key 생성 (백엔드 정책 변경 시 대비)
 */
export function createUUIDIdempotencyKey(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}