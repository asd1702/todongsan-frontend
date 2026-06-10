# FRONTEND_UI_POLICY.md

> 동네대전 Frontend UI 개발 정책 문서  
> 기준 조합: **Tailwind CSS + shadcn/ui + CVA + 상태 Badge 정책**

---

## 1. 문서 목적

이 문서는 동네대전 프론트엔드에서 UI를 일관되게 구현하기 위한 기준을 정의한다.

동네대전은 단순한 화면 몇 개짜리 서비스가 아니라 다음 도메인을 함께 다룬다.

```text
Auth / Member
Battle
Market
Point
Insight
Reputation
Admin
```

따라서 화면마다 버튼, 카드, 배지, 로딩, 에러, 빈 화면, 모달, 토스트 표현이 달라지면 사용자 경험이 빠르게 흔들릴 수 있다.

이 문서의 목적은 다음과 같다.

```text
1. 공통 UI 컴포넌트 사용 기준을 정한다.
2. 도메인 상태값을 사용자 친화적인 UI로 변환하는 기준을 정한다.
3. 화면별 Loading / Empty / Error / Success 상태 표현을 통일한다.
4. Tailwind className 남발을 줄이고 variant 기반 스타일을 사용한다.
5. MVP 범위에서 과하지 않지만 깔끔한 UI를 만들 수 있도록 한다.
```

---

## 2. UI 기술 선택

동네대전 프론트엔드는 다음 조합을 기본 UI 정책으로 사용한다.

```text
Tailwind CSS
shadcn/ui
Radix UI 기반 접근성 컴포넌트
CVA(class-variance-authority)
lucide-react icon
```

### 2-1. 선택 이유

| 도구 | 역할 | 선택 이유 |
|---|---|---|
| Tailwind CSS | 스타일링 | 빠른 UI 구현, 일관된 spacing/color 관리 |
| shadcn/ui | 공통 컴포넌트 | 코드 소유권 확보, 커스터마이징 쉬움 |
| Radix UI | 접근성 기반 | Dialog, Select, Tabs 등 접근성 기본 제공 |
| CVA | variant 관리 | Button, Badge 등의 스타일 정책을 타입 기반으로 통제 |
| lucide-react | 아이콘 | shadcn/ui와 궁합이 좋고 가벼움 |

---

## 3. UI 기본 원칙

### 3-1. 무거운 디자인 시스템은 도입하지 않는다

MVP 단계에서는 별도의 대규모 디자인 시스템을 만들지 않는다.

```text
도입하지 않는 것:
- 자체 디자인 토큰 패키지
- 별도 UI npm 패키지
- 복잡한 테마 시스템
- 전용 디자인 시스템 레포
- 과도한 Storybook 문서화
```

대신 다음 수준으로 충분히 통제한다.

```text
Tailwind theme
shadcn/ui component
CVA variant
Status Badge mapping
Common Loading / Empty / Error component
```

### 3-2. UI 일관성이 디자인 퀄리티를 만든다

디자인 퀄리티를 해치는 주요 원인은 컴포넌트 라이브러리 부족이 아니라 일관성 부족이다.

금지해야 할 예:

```text
- 화면마다 버튼 크기가 다름
- 상태 배지 색상과 문구가 화면마다 다름
- 어떤 화면은 alert, 어떤 화면은 toast 사용
- 어떤 화면은 loading spinner, 어떤 화면은 아무 표시 없음
- 같은 상태를 ACTIVE, 진행중, 진행 중으로 섞어서 표시
- className에 임의 색상과 spacing을 반복 작성
```

따라서 모든 페이지는 이 문서의 기준을 따른다.

---

## 4. 디자인 톤

동네대전은 다음 성격을 가진 서비스다.

```text
지역 선택
집단지성
Battle 투표
Market 예측
Point 경제
AI 분석
Reputation 신뢰도
```

### 4-1. 권장 디자인 톤

```text
전체:
- 깔끔한 SaaS / 핀테크 느낌
- 데이터 기반이지만 너무 차갑지 않은 톤
- 지역 커뮤니티 서비스의 친근함 유지

Market:
- 데이터 중심
- 가격/그래프/판정 기준 강조
- 신뢰감 있는 blue / violet 계열 적합

Battle:
- 커뮤니티 중심
- 질문/선택지/댓글 강조
- orange / pink / green 계열 포인트 사용 가능

Admin:
- 대시보드 중심
- Table, Form, Badge, Dialog 중심
- 장식보다 명확성 우선
```

### 4-2. 색상 사용 원칙

색상은 Tailwind token 또는 shadcn theme token을 우선 사용한다.

```text
Primary    → 주요 액션
Secondary  → 보조 액션
Success    → 성공 / 진행 가능 / 완료
Warning    → 주의 / 대기 / 확인 필요
Danger     → 실패 / 취소 / 삭제 / 무효
Info       → 정보 / 확정 / 안내
Neutral    → 일반 / 종료 / 비활성
Violet     → 정산 / AI / 분석 / 특수 상태
```

컴포넌트 내부에서 `bg-blue-500`, `text-red-600` 같은 클래스를 반복적으로 직접 쓰지 않는다.  
필요하면 CVA variant 또는 도메인 컴포넌트에서 매핑한다.

---

## 5. 컴포넌트 계층 정책

동네대전 프론트는 다음 계층으로 UI 컴포넌트를 분리한다.

```text
shared/ui
entities/*/ui
features/*/ui
pages/*
```

의존 방향은 다음을 따른다.

```text
pages
↓
features
↓
entities
↓
shared
```

역방향 import는 금지한다.

---

## 6. shared/ui 정책

`shared/ui`는 도메인을 모르는 공통 UI 컴포넌트만 둔다.

### 6-1. 예시

```text
shared/ui/button.tsx
shared/ui/input.tsx
shared/ui/textarea.tsx
shared/ui/badge.tsx
shared/ui/card.tsx
shared/ui/dialog.tsx
shared/ui/drawer.tsx
shared/ui/tabs.tsx
shared/ui/table.tsx
shared/ui/skeleton.tsx
shared/ui/empty-state.tsx
shared/ui/error-state.tsx
shared/ui/page-header.tsx
shared/ui/section-title.tsx
shared/ui/toast.tsx
```

### 6-2. 규칙

`shared/ui`는 Market, Battle, Point 같은 도메인을 알면 안 된다.

좋은 예:

```tsx
<Button variant="default" size="md">저장</Button>
<Badge variant="success">완료</Badge>
```

나쁜 예:

```tsx
<Button marketStatus="ACTIVE" />
<Badge predictionStatus="POINT_UNKNOWN" />
```

도메인 상태는 `entities/*/ui`에서 처리한다.

---

## 7. entities/*/ui 정책

`entities/*/ui`는 도메인 데이터를 표시하는 UI 컴포넌트를 둔다.

### 7-1. Market 예시

```text
entities/market/ui/MarketCard.tsx
entities/market/ui/MarketStatusBadge.tsx
entities/market/ui/PredictionStatusBadge.tsx
entities/market/ui/MarketOptionList.tsx
entities/market/ui/MarketPriceChart.tsx
entities/market/ui/MarketSettlementRuleCard.tsx
```

### 7-2. Battle 예시

```text
entities/battle/ui/BattleCard.tsx
entities/battle/ui/BattleStatusBadge.tsx
entities/battle/ui/BattleVoteResult.tsx
entities/battle/ui/BattleCommentList.tsx
```

### 7-3. Point 예시

```text
entities/point/ui/PointAmount.tsx
entities/point/ui/PointHistoryTypeBadge.tsx
entities/point/ui/PointHistoryTable.tsx
```

### 7-4. Reputation 예시

```text
entities/reputation/ui/ReputationScoreBadge.tsx
entities/reputation/ui/ReputationSummaryCard.tsx
entities/reputation/ui/VisitCertificationBadge.tsx
```

### 7-5. 규칙

도메인 UI는 `shared/ui`를 감싸서 만든다.

```text
MarketStatusBadge
→ shared/ui/Badge

MarketCard
→ shared/ui/Card
→ MarketStatusBadge
→ PointAmount
```

---

## 8. features/*/ui 정책

`features/*/ui`는 사용자의 액션을 처리하는 UI 컴포넌트를 둔다.

### 8-1. 예시

```text
features/login/ui/LoginButton.tsx
features/create-battle-vote/ui/BattleVoteForm.tsx
features/create-prediction/ui/PredictionDrawer.tsx
features/create-prediction/ui/QuotePreview.tsx
features/request-market-report/ui/MarketReportRequestDialog.tsx
features/update-profile/ui/ProfileEditForm.tsx
features/create-market/ui/AdminMarketForm.tsx
features/confirm-market-result/ui/ResultConfirmForm.tsx
features/void-market/ui/VoidMarketDialog.tsx
```

### 8-2. 규칙

```text
보여주기 중심 → entities
사용자 액션 중심 → features
페이지 조립 → pages
```

예측 참여는 `features/create-prediction`에 둔다.

---

## 9. pages 정책

`pages`는 조립만 담당한다.

페이지에서 직접 복잡한 UI 로직, API 호출, 상태 매핑을 구현하지 않는다.

좋은 예:

```tsx
export function MarketDetailPage() {
  return (
    <>
      <MarketHeader />
      <MarketPriceChart />
      <MarketOptionList />
      <PredictionDrawer />
      <MarketSettlementRuleCard />
    </>
  );
}
```

나쁜 예:

```tsx
export function MarketDetailPage() {
  // axios 직접 호출
  // status 직접 switch
  // className 직접 조합
  // 예측 참여 form 직접 구현
}
```

---

## 10. CVA Variant 정책

반복되는 스타일 분기는 CVA로 관리한다.

### 10-1. Button variant

권장 Button variant:

```text
default
secondary
outline
ghost
destructive
link
```

권장 Button size:

```text
sm
md
lg
icon
```

예시:

```tsx
<Button variant="default" size="md">예측 참여</Button>
<Button variant="outline" size="md">취소</Button>
<Button variant="destructive" size="md">무효 처리</Button>
```

### 10-2. Badge variant

권장 Badge variant:

```text
default
success
warning
danger
info
violet
neutral
```

예시:

```tsx
<Badge variant="success">진행 중</Badge>
<Badge variant="warning">확인 중</Badge>
<Badge variant="danger">실패</Badge>
```

### 10-3. 직접 className 분기 금지

나쁜 예:

```tsx
<span className={status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
  {status}
</span>
```

좋은 예:

```tsx
<MarketStatusBadge status={status} />
```

---

## 11. 상태 Badge 공통 정책

서버 enum 값을 화면에 그대로 노출하지 않는다.

```text
나쁜 예:
POINT_UNKNOWN
SETTLEMENT_IN_PROGRESS
DATA_PENDING

좋은 예:
처리 상태 확인 중
정산 중
데이터 대기
```

모든 상태값은 도메인별 Badge 컴포넌트에서 label과 variant로 매핑한다.

---

## 12. MarketStatus 표시 정책

| 서버 상태 | 화면 표시 | Badge variant | 설명 |
|---|---|---|---|
| PENDING | 검수 대기 | warning | 아직 활성화 전 |
| ACTIVE | 진행 중 | success | 예측 참여 가능 |
| CLOSED | 결과 확정 | info | 결과 입력 완료, 정산 전 가능 |
| DATA_PENDING | 데이터 대기 | warning | 외부 데이터 대기 |
| SETTLEMENT_IN_PROGRESS | 정산 중 | violet | 정산 처리 중 |
| SETTLED | 정산 완료 | neutral | 정산 완료 |
| VOIDED | 무효 | danger | 무효 처리됨 |

예시:

```tsx
const marketStatusMap = {
  PENDING: { label: '검수 대기', variant: 'warning' },
  ACTIVE: { label: '진행 중', variant: 'success' },
  CLOSED: { label: '결과 확정', variant: 'info' },
  DATA_PENDING: { label: '데이터 대기', variant: 'warning' },
  SETTLEMENT_IN_PROGRESS: { label: '정산 중', variant: 'violet' },
  SETTLED: { label: '정산 완료', variant: 'neutral' },
  VOIDED: { label: '무효', variant: 'danger' },
} as const;
```

---

## 13. PredictionStatus 표시 정책

| 서버 상태 | 화면 표시 | Badge variant | 사용자 안내 |
|---|---|---|---|
| POINT_PENDING | 처리 중 | warning | 포인트 차감 결과를 확인 중입니다. |
| POINT_UNKNOWN | 확인 중 | warning | 처리 상태를 확인 중입니다. 잠시 후 다시 확인해주세요. |
| CONFIRMED | 참여 완료 | success | 예측 참여가 완료되었습니다. |
| FAILED | 실패 | danger | 예측 참여에 실패했습니다. |
| SETTLED | 정산 완료 | neutral | 정산이 완료되었습니다. |
| REFUND_PENDING | 환불 중 | warning | 환불 처리 중입니다. |
| REFUND_UNKNOWN | 환불 확인 중 | warning | 환불 상태를 확인 중입니다. |
| REFUNDED | 환불 완료 | success | 환불이 완료되었습니다. |

### 13-1. POINT_UNKNOWN / POINT_PENDING 처리

`POINT_UNKNOWN`, `POINT_PENDING`은 실패가 아니다.

UI에서는 다음과 같이 표시한다.

```text
- 실패 toast를 띄우지 않는다.
- 내 예측 상태 카드에서 "처리 상태 확인 중"으로 표시한다.
- 3~5초 간격 polling을 수행한다.
- 최종 상태가 CONFIRMED 또는 FAILED가 되면 polling을 중단한다.
- 일정 시간 초과 시 "잠시 후 다시 확인해주세요" 안내를 표시한다.
```

---

## 14. BattleStatus 표시 정책

| 서버 상태 | 화면 표시 | Badge variant | 설명 |
|---|---|---|---|
| PENDING | 검수 대기 | warning | 관리자 승인 전 |
| ACTIVE | 투표 진행 중 | success | 투표 가능 |
| CLOSED | 투표 종료 | neutral | 결과 확인 가능 |
| CANCELLED | 취소 | danger | 취소됨 |

서버 상태명이 실제 API와 다를 수 있으므로, 구현 시 Battle API_SPEC 기준으로 최종 확정한다.

---

## 15. InsightReportStatus 표시 정책

| 서버 상태 | 화면 표시 | Badge variant | 설명 |
|---|---|---|---|
| PENDING | 생성 대기 | warning | 리포트 생성 요청됨 |
| PROCESSING | 생성 중 | warning | AI 리포트 생성 중 |
| COMPLETED | 생성 완료 | success | 조회 가능 |
| FAILED | 생성 실패 | danger | 생성 실패 |
| UNKNOWN | 확인 필요 | warning | 상태 확인 필요 |

서버 상태명이 실제 API와 다를 수 있으므로, 구현 시 Insight API_SPEC 기준으로 최종 확정한다.

---

## 16. VisitCertificationStatus 표시 정책

| 서버 상태 | 화면 표시 | Badge variant | 설명 |
|---|---|---|---|
| PENDING | 검토 중 | warning | 방문 인증 검토 중 |
| APPROVED | 인증 완료 | success | 방문 인증 완료 |
| REJECTED | 반려 | danger | 인증 반려 |
| EXPIRED | 만료 | neutral | 인증 기간 만료 |

서버 상태명이 실제 API와 다를 수 있으므로, 구현 시 Insight/Reputation API_SPEC 기준으로 최종 확정한다.

---

## 17. Point 표시 정책

Point는 서비스 내부 재화이며 현금성 자산이 아니다.

### 17-1. 표시 원칙

```text
- Point 값은 P 단위를 붙여 표시한다.
- 서버 Decimal 값은 string으로 받는다.
- Number, parseFloat로 직접 변환하지 않는다.
- 계산이 필요한 경우 decimal.js 유틸을 사용한다.
```

예시:

```text
100P
1,250P
33.33P
```

### 17-2. 컴포넌트

```text
entities/point/ui/PointAmount.tsx
```

사용 예:

```tsx
<PointAmount value="299.85" />
```

---

## 18. Decimal 표시 정책

Market 가격, 정산 비율, 포인트 금액 등 Decimal 값은 서버에서 문자열로 내려온다.

### 18-1. 금지

```tsx
Number(value)
parseFloat(value)
parseInt(value)
```

### 18-2. 권장

```text
shared/lib/decimal.ts
shared/lib/formatDecimal.ts
entities/point/ui/PointAmount.tsx
```

예시:

```tsx
formatPoint("299.85") // 299.85P
formatRate("1.26666666") // 1.26666666배
```

---

## 19. Date / Time 표시 정책

날짜와 시간은 사용자가 이해하기 쉬운 형식으로 표시한다.

### 19-1. 기본 표시

```text
날짜: 2026.06.10
날짜+시간: 2026.06.10 14:30
마감까지 남은 시간: 3시간 20분 남음
이미 마감: 마감됨
```

### 19-2. 권장 컴포넌트

```text
shared/ui/relative-time.tsx
shared/lib/formatDate.ts
```

### 19-3. 주의

서버 timestamp를 그대로 노출하지 않는다.

나쁜 예:

```text
2026-06-10T14:30:00
```

좋은 예:

```text
2026.06.10 14:30
```

---

## 20. Loading UI 정책

모든 데이터 조회 화면은 loading 상태를 가져야 한다.

### 20-1. 목록 화면

목록 화면은 Skeleton을 우선 사용한다.

```text
Market 목록 → MarketCardSkeleton
Battle 목록 → BattleCardSkeleton
Point 내역 → TableSkeleton
Admin 목록 → TableSkeleton
```

### 20-2. 상세 화면

상세 화면은 주요 카드 단위 skeleton을 사용한다.

```text
Market 상세:
- 제목 영역 skeleton
- 그래프 영역 skeleton
- 선택지 카드 skeleton
- 판정 기준 카드 skeleton
```

### 20-3. 버튼 loading

Mutation 요청 중에는 버튼을 disabled 처리하고 loading 문구를 표시한다.

```text
예측 참여 → 참여 처리 중...
마켓 생성 → 생성 중...
결과 확정 → 확정 중...
무효 처리 → 처리 중...
```

중복 요청 방지를 위해 mutation 중 버튼은 반드시 비활성화한다.

---

## 21. Empty State 정책

데이터가 없는 경우 빈 화면을 명확히 표시한다.

### 21-1. 공통 컴포넌트

```text
shared/ui/empty-state.tsx
```

### 21-2. 예시 문구

| 화면 | 문구 |
|---|---|
| 마켓 목록 | 진행 중인 마켓이 없습니다. |
| 배틀 목록 | 진행 중인 배틀이 없습니다. |
| 댓글 목록 | 아직 댓글이 없습니다. 첫 의견을 남겨보세요. |
| 포인트 내역 | 아직 포인트 내역이 없습니다. |
| 방문 인증 내역 | 방문 인증 내역이 없습니다. |
| 내 예측 | 아직 참여한 예측이 없습니다. |

### 21-3. Empty State 액션

가능하면 다음 행동을 제공한다.

```text
마켓 없음 → 홈으로 이동
포인트 내역 없음 → 배틀 참여하러 가기
댓글 없음 → 댓글 작성 input focus
```

---

## 22. Error State 정책

에러는 상황에 따라 다르게 표시한다.

### 22-1. Page Error

페이지 데이터 자체를 불러오지 못한 경우 사용한다.

```text
마켓 상세 조회 실패
배틀 상세 조회 실패
마이페이지 조회 실패
관리자 목록 조회 실패
```

표시 요소:

```text
- 에러 메시지
- 다시 시도 버튼
- 필요 시 홈으로 이동 버튼
```

### 22-2. Inline Error

폼 검증 오류는 필드 아래에 표시한다.

```text
포인트는 10P 이상 입력해주세요.
닉네임은 2자 이상 입력해주세요.
마감일은 시작일보다 이후여야 합니다.
```

### 22-3. Toast Error

짧은 액션 실패에 사용한다.

```text
예측 참여에 실패했습니다.
포인트가 부족합니다.
인증이 만료되었습니다.
잠시 후 다시 시도해주세요.
```

---

## 23. Toast 정책

Toast는 짧은 피드백에만 사용한다.

### 23-1. Toast 사용 대상

```text
- 예측 참여 완료
- 투표 완료
- 댓글 작성 완료
- 마켓 생성 완료
- 결과 확정 완료
- 정보 수정 완료
- 인증 만료
- 요청 실패
```

### 23-2. Toast 금지 대상

```text
- 페이지 진입
- 로딩 시작
- polling 반복 상태
- 필드 단위 validation error
- 긴 설명이 필요한 에러
```

### 23-3. Toast 문구 원칙

```text
짧게 쓴다.
기술 용어를 피한다.
서버 enum을 그대로 노출하지 않는다.
```

나쁜 예:

```text
POINT_UNKNOWN occurred
```

좋은 예:

```text
처리 상태를 확인 중입니다.
```

---

## 24. Modal / Dialog / Drawer 정책

### 24-1. Dialog 사용

Dialog는 확인이 필요한 액션에 사용한다.

```text
마켓 무효 처리
정산 실행
삭제
취소
로그아웃
관리자 승인/거절
```

### 24-2. Drawer 사용

Drawer는 현재 화면 맥락을 유지하면서 입력/미리보기가 필요한 경우 사용한다.

```text
예측 참여
Quote 미리보기
필터 상세 설정
```

### 24-3. 독립 페이지 사용

복잡한 폼이거나 주소로 직접 접근할 가치가 있는 화면은 독립 페이지로 둔다.

```text
/admin/markets/new
/admin/markets/:marketId/result
/my/profile
```

### 24-4. 규칙

```text
- Dialog/Drawer는 shadcn/ui 기반으로 사용한다.
- 직접 focus trap을 구현하지 않는다.
- ESC 닫기, overlay 클릭, 닫기 버튼을 고려한다.
- 파괴적 액션은 destructive 버튼을 사용한다.
```

---

## 25. Form UI 정책

폼은 React Hook Form + Zod 기준으로 구현한다.

### 25-1. Form Error

필드 단위 오류는 해당 필드 아래에 표시한다.

```text
닉네임을 입력해주세요.
참여 포인트는 10P 이상이어야 합니다.
선택지를 선택해주세요.
```

### 25-2. Form Submit

제출 중에는 버튼을 비활성화한다.

```text
저장 중...
생성 중...
처리 중...
```

### 25-3. 서버 에러

서버 에러는 errorCode를 기준으로 처리한다.

```text
POINT_INSUFFICIENT → 포인트가 부족합니다.
ALREADY_PREDICTED → 이미 참여한 마켓입니다.
UNAUTHORIZED → 로그인이 필요합니다.
FORBIDDEN → 접근 권한이 없습니다.
```

---

## 26. Chart UI 정책

Market 가격 그래프는 별도 시각화 컴포넌트로 분리한다.

```text
entities/market/ui/MarketPriceChart.tsx
```

### 26-1. 표시 원칙

```text
- 가격 변화 추세를 단순하게 보여준다.
- 지나치게 복잡한 트레이딩 차트처럼 만들지 않는다.
- 축/라벨은 사용자가 이해할 수 있게 표시한다.
- 데이터가 없을 경우 Empty State를 표시한다.
```

### 26-2. 금지

```text
- 호가창 UI
- 매수/매도 order book
- 복잡한 캔들 차트
- 코인 거래소식 UI
```

동네대전 Market은 order book 기반 거래소가 아니라 포인트 기반 예측 참여 서비스다.

---

## 27. Market UI 정책

Market 화면은 Polymarket 느낌을 일부 참고하되, 동네대전의 포인트 예측 시장에 맞춘다.

### 27-1. MarketCard 포함 요소

```text
- 제목
- 상태 Badge
- 카테고리
- 마감까지 남은 시간
- 선택지별 현재 가격 또는 예상 정산 비율
- 총 참여 포인트
- 참여자 수
- 예측 참여 버튼
```

### 27-2. MarketDetail 포함 요소

```text
- 질문
- 상태 Badge
- 가격 그래프
- 선택지 카드
- Quote 미리보기
- 예측 참여 Drawer
- 내 예측 상태 카드
- 판정 기준
- 데이터 출처
- 마감일
- 정산 예정일
- AI 리포트 진입 버튼
```

### 27-3. 예측 참여

예측 참여는 독립 페이지가 아니라 Drawer 또는 Modal로 구현한다.

```text
/markets/:marketId
  └─ PredictionDrawer
      ├─ 선택지
      ├─ 참여 포인트 입력
      ├─ Quote 미리보기
      ├─ 예상 정산 정보
      └─ 참여 버튼
```

---

## 28. Battle UI 정책

Battle은 Market보다 커뮤니티 투표 UX에 가깝게 설계한다.

### 28-1. BattleCard 포함 요소

```text
- 질문
- 선택지 요약
- 상태 Badge
- 참여자 수
- 마감까지 남은 시간
- 댓글 수
```

### 28-2. BattleDetail 포함 요소

```text
- 질문
- 선택지 A/B 또는 다중 선택지
- 투표 UI
- 투표 후 결과
- 댓글
- 종료 후 결과 요약
```

### 28-3. 결과 표시

투표 전 결과 공개 정책은 백엔드 정책에 따른다.  
프론트는 서버 응답에 포함된 공개 가능 데이터만 표시한다.

---

## 29. Admin UI 정책

관리자 화면은 명확성과 안정성을 우선한다.

### 29-1. 주요 컴포넌트

```text
Table
Form
Badge
Dialog
Textarea
Select
Tabs
Card
```

### 29-2. 관리자 액션

파괴적이거나 되돌리기 어려운 작업은 반드시 Confirm Dialog를 사용한다.

```text
- Battle 거절
- Battle 취소
- Market 무효 처리
- Market 정산 실행
- 결과 확정
```

### 29-3. 관리자 화면 원칙

```text
- 장식보다 상태와 액션을 명확히 표시한다.
- 상태 Badge를 적극 사용한다.
- 위험 액션은 destructive variant를 사용한다.
- 처리 결과는 toast로 피드백한다.
- 실패 시 서버 errorCode/message를 기준으로 안내한다.
```

---

## 30. 접근성 기본 정책

접근성은 MVP에서도 최소 기준을 지킨다.

### 30-1. 기본 규칙

```text
- 클릭 가능한 div를 만들지 않는다.
- Button은 button 태그를 사용한다.
- 링크 이동은 a 또는 Link를 사용한다.
- Dialog, Select, Dropdown, Tabs는 shadcn/ui 또는 Radix 기반을 사용한다.
- input에는 label 또는 aria-label을 제공한다.
- 아이콘만 있는 버튼에는 aria-label을 제공한다.
- 키보드로 주요 액션이 가능해야 한다.
```

### 30-2. 금지

```tsx
<div onClick={handleClick}>클릭</div>
```

권장:

```tsx
<Button onClick={handleClick}>클릭</Button>
```

---

## 31. Storybook 도입 기준

Storybook은 MVP 초기 필수 도구는 아니다.

다만 다음 컴포넌트가 늘어나면 도입을 검토한다.

```text
Button
Badge
MarketCard
BattleCard
MarketStatusBadge
PredictionStatusBadge
EmptyState
ErrorState
PointAmount
AdminTable
```

### 31-1. 도입 기준

```text
- 공통 컴포넌트가 10개 이상
- 상태 Badge가 여러 도메인에서 반복
- 팀원이 UI를 독립적으로 확인해야 함
- 화면 개발 전 컴포넌트 단위 검증이 필요함
```

MVP 초반에는 문서 기준으로 개발하고, 필요 시 Storybook을 점진 도입한다.

---

## 32. 파일 구조 예시

```text
src/
├─ shared/
│  ├─ ui/
│  │  ├─ button.tsx
│  │  ├─ badge.tsx
│  │  ├─ card.tsx
│  │  ├─ dialog.tsx
│  │  ├─ drawer.tsx
│  │  ├─ skeleton.tsx
│  │  ├─ empty-state.tsx
│  │  └─ error-state.tsx
│  ├─ lib/
│  │  ├─ cn.ts
│  │  ├─ formatDate.ts
│  │  ├─ formatDecimal.ts
│  │  └─ decimal.ts
│  └─ constants/
│
├─ entities/
│  ├─ market/
│  │  └─ ui/
│  │     ├─ MarketCard.tsx
│  │     ├─ MarketStatusBadge.tsx
│  │     ├─ PredictionStatusBadge.tsx
│  │     └─ MarketPriceChart.tsx
│  ├─ battle/
│  │  └─ ui/
│  │     ├─ BattleCard.tsx
│  │     └─ BattleStatusBadge.tsx
│  ├─ point/
│  │  └─ ui/
│  │     └─ PointAmount.tsx
│  └─ reputation/
│     └─ ui/
│        └─ ReputationScoreBadge.tsx
│
├─ features/
│  ├─ create-prediction/
│  │  └─ ui/
│  │     ├─ PredictionDrawer.tsx
│  │     └─ QuotePreview.tsx
│  ├─ create-battle-vote/
│  │  └─ ui/
│  │     └─ BattleVoteForm.tsx
│  └─ create-market/
│     └─ ui/
│        └─ AdminMarketForm.tsx
│
└─ pages/
```

---

## 33. 금지사항

다음은 금지한다.

```text
1. 서버 enum을 화면에 그대로 노출
2. 페이지 컴포넌트에서 axios/httpClient 직접 호출
3. 페이지마다 임의 className으로 Badge 구현
4. Point/Decimal 값을 Number로 직접 변환
5. 클릭 가능한 div 사용
6. shadcn/ui 컴포넌트를 shared/ui가 아닌 곳에 중복 생성
7. 비슷한 Empty/Error UI를 화면마다 새로 구현
8. destructive 액션을 확인 없이 즉시 실행
9. polling 상태를 실패로 오해해 에러 toast 표시
10. Market UI를 코인 거래소/order book처럼 구현
```

---

## 34. 개발 체크리스트

새 화면을 만들 때 다음을 확인한다.

```text
[ ] 이 화면은 독립 페이지가 맞는가?
[ ] 탭/모달/섹션으로 처리할 수 있는가?
[ ] Loading 상태가 있는가?
[ ] Empty 상태가 있는가?
[ ] Error 상태가 있는가?
[ ] Success 상태가 있는가?
[ ] 서버 enum을 직접 노출하지 않는가?
[ ] 상태 Badge 컴포넌트를 사용하는가?
[ ] mutation 중 버튼 disabled 처리를 했는가?
[ ] toast / inline / dialog / page error를 구분했는가?
[ ] Decimal/Point 값을 안전하게 표시하는가?
[ ] 접근성 기본 규칙을 지켰는가?
```

---

## 35. 요약

동네대전 프론트엔드는 무거운 디자인 시스템을 도입하지 않는다.

대신 다음 조합으로 MVP에 적합한 UI 품질을 확보한다.

```text
Tailwind CSS
+ shadcn/ui
+ CVA variant
+ 도메인 상태 Badge 정책
+ 공통 Loading / Empty / Error UI
```

이 방식은 다음 장점이 있다.

```text
- 빠르게 개발 가능
- 충분히 세련된 화면 구현 가능
- 도메인 상태 표현 통일 가능
- 팀원 간 UI 스타일 충돌 감소
- MVP 이후 확장 가능
```

최종 원칙은 다음과 같다.

```text
예쁜 UI는 거대한 디자인 시스템보다
일관된 컴포넌트 사용, 상태 표현, 간격, 피드백 정책에서 나온다.
```
