# FRONTEND_GUIDE.md

## 1. 문서 목적

이 문서는 Todongsan 프로젝트의 프론트엔드 개발 기준을 정의한다.

프론트엔드는 React 기반 SPA로 구성하며, API Gateway를 통해 백엔드 MSA와 통신한다.  
본 문서는 프론트엔드의 기술 스택, 폴더 구조, 상태 관리, API 연동, 인증/권한, 관리자 페이지, 사용자 입력 검증, 에러 처리, 테스트 기준을 통일하는 것을 목적으로 한다.

프론트엔드 개발자는 본 문서를 기준으로 화면, API 연동, 상태 관리, UI 컴포넌트, 테스트를 구현한다.

---

## 2. 기본 방향

Todongsan 프론트엔드는 다음 방향을 따른다.

- React + Vite + TypeScript 기반 SPA로 개발한다.
- API 요청은 원칙적으로 API Gateway를 통해 수행한다.
- Market 도메인을 중심으로 사용자 화면과 관리자 화면을 구성한다.
- 서버 상태와 클라이언트 상태를 분리하여 관리한다.
- 백엔드의 공통 응답 포맷과 `errorCode` 정책을 따른다.
- BigDecimal 계열 값은 프론트에서 `string`으로 취급한다.
- 프론트 검증은 사용자 경험 개선을 위한 1차 검증이며, 최종 정책 검증은 백엔드가 담당한다.

---

## 3. 기술 스택

### 3.1 기본 스택

| 영역 | 기술 |
|---|---|
| Framework/Library | React |
| Build Tool | Vite |
| Language | TypeScript |
| Routing | React Router |
| Server State | TanStack Query |
| Client Global State | Zustand |
| Form | React Hook Form |
| Validation | Zod |
| Styling | Tailwind CSS |
| UI Component | shadcn/ui |
| HTTP Client | Axios wrapper |
| Decimal Utility | decimal.js 또는 bignumber.js |
| Unit Test | Vitest |
| Component Test | React Testing Library |
| API Mocking | MSW |
| E2E Test | Playwright |

### 3.2 도입 기준

- 서버 데이터 조회와 mutation은 TanStack Query를 사용한다.
- 전역 클라이언트 상태는 Zustand를 사용한다.
- 복잡한 폼은 React Hook Form + Zod를 사용한다.
- 단순 UI 상태는 `useState`를 사용한다.
- 복잡한 화면 내부 상태는 필요 시 `useReducer`를 사용한다.
- Redux Toolkit은 MVP 단계에서 도입하지 않는다.

---

## 4. 프로젝트 구조

Todongsan 프론트엔드는 FSD-lite 구조를 사용한다.

초기 레이어는 다음과 같다.

```text
src/
├─ app/
├─ pages/
├─ features/
├─ entities/
├─ shared/
└─ main.tsx
```

### 4.1 레이어 역할

| 레이어 | 역할 |
|---|---|
| `app` | 앱 초기화, 라우터, provider, queryClient |
| `pages` | URL에 대응되는 페이지 컴포넌트 |
| `features` | 사용자의 행동 단위 기능 |
| `entities` | 핵심 도메인 모델, 도메인 API, 도메인 UI |
| `shared` | 도메인에 의존하지 않는 공통 코드 |

초기에는 `widgets` 레이어를 사용하지 않는다.  
단, 여러 feature/entity를 조합한 큰 UI 블록이 반복되면 추후 `widgets` 레이어를 도입할 수 있다.

---

## 5. 폴더 구조

```text
src/
├─ app/
│  ├─ router.tsx
│  ├─ providers.tsx
│  ├─ queryClient.ts
│  └─ App.tsx
│
├─ pages/
│  ├─ home/
│  │  └─ HomePage.tsx
│  │
│  ├─ auth/
│  │  ├─ LoginPage.tsx
│  │  └─ KakaoCallbackPage.tsx
│  │
│  ├─ battle/
│  │  ├─ BattleListPage.tsx
│  │  └─ BattleDetailPage.tsx
│  │
│  ├─ market/
│  │  ├─ MarketListPage.tsx
│  │  ├─ MarketDetailPage.tsx
│  │  └─ MarketReportPage.tsx
│  │
│  ├─ my/
│  │  ├─ MyPage.tsx
│  │  ├─ ProfileEditPage.tsx
│  │  ├─ PointHistoryPage.tsx
│  │  └─ VisitCertificationPage.tsx
│  │
│  ├─ reputation/
│  │  └─ ReputationDetailPage.tsx
│  │
│  ├─ admin/
│  │  ├─ AdminDashboardPage.tsx
│  │  │
│  │  ├─ market/
│  │  │  ├─ AdminMarketListPage.tsx
│  │  │  ├─ AdminMarketCreatePage.tsx
│  │  │  ├─ AdminMarketDetailPage.tsx
│  │  │  └─ AdminMarketResultPage.tsx
│  │  │
│  │  └─ battle/
│  │     ├─ AdminBattleListPage.tsx
│  │     ├─ AdminBattleDetailPage.tsx
│  │     ├─ AdminBattleAnalysisPage.tsx
│  │     └─ AdminBattleReportPage.tsx
│  │
│  └─ NotFoundPage.tsx
│
├─ entities/
│  ├─ auth/
│  │  ├─ api/
│  │  │  └─ authApi.ts
│  │  ├─ model/
│  │  │  ├─ auth.types.ts
│  │  │  ├─ auth.store.ts
│  │  │  └─ auth.constants.ts
│  │  └─ ui/
│  │
│  ├─ member/
│  │  ├─ api/
│  │  │  └─ memberApi.ts
│  │  ├─ model/
│  │  │  ├─ member.types.ts
│  │  │  ├─ member.keys.ts
│  │  │  └─ member.constants.ts
│  │  └─ ui/
│  │     └─ MemberProfileCard.tsx
│  │
│  ├─ battle/
│  │  ├─ api/
│  │  │  └─ battleApi.ts
│  │  ├─ model/
│  │  │  ├─ battle.types.ts
│  │  │  ├─ battle.keys.ts
│  │  │  └─ battle.constants.ts
│  │  └─ ui/
│  │     ├─ BattleCard.tsx
│  │     ├─ BattleStatusBadge.tsx
│  │     ├─ BattleVoteResult.tsx
│  │     └─ BattleCommentList.tsx
│  │
│  ├─ market/
│  │  ├─ api/
│  │  │  └─ marketApi.ts
│  │  ├─ model/
│  │  │  ├─ market.types.ts
│  │  │  ├─ market.keys.ts
│  │  │  └─ market.constants.ts
│  │  └─ ui/
│  │     ├─ MarketCard.tsx
│  │     ├─ MarketStatusBadge.tsx
│  │     ├─ MarketOptionList.tsx
│  │     ├─ MarketPriceChart.tsx
│  │     └─ MarketSettlementRuleCard.tsx
│  │
│  ├─ prediction/
│  │  ├─ api/
│  │  │  └─ predictionApi.ts
│  │  ├─ model/
│  │  │  ├─ prediction.types.ts
│  │  │  ├─ prediction.keys.ts
│  │  │  └─ prediction.constants.ts
│  │  └─ ui/
│  │     ├─ PredictionStatusBadge.tsx
│  │     └─ MyPredictionCard.tsx
│  │
│  ├─ point/
│  │  ├─ api/
│  │  │  └─ pointApi.ts
│  │  ├─ model/
│  │  │  ├─ point.types.ts
│  │  │  ├─ point.keys.ts
│  │  │  └─ point.constants.ts
│  │  └─ ui/
│  │     ├─ PointAmount.tsx
│  │     └─ PointHistoryTable.tsx
│  │
│  ├─ insight/
│  │  ├─ api/
│  │  │  └─ insightApi.ts
│  │  ├─ model/
│  │  │  ├─ insight.types.ts
│  │  │  ├─ insight.keys.ts
│  │  │  └─ insight.constants.ts
│  │  └─ ui/
│  │     └─ InsightReportCard.tsx
│  │
│  └─ reputation/
│     ├─ api/
│     │  └─ reputationApi.ts
│     ├─ model/
│     │  ├─ reputation.types.ts
│     │  ├─ reputation.keys.ts
│     │  └─ reputation.constants.ts
│     └─ ui/
│        ├─ ReputationScoreBadge.tsx
│        └─ ReputationSummaryCard.tsx
│
├─ features/
│  ├─ login-kakao/
│  ├─ update-profile/
│  ├─ create-battle-vote/
│  ├─ create-battle-comment/
│  ├─ create-prediction/
│  │  ├─ model/
│  │  │  ├─ useCreatePrediction.ts
│  │  │  └─ createPrediction.schema.ts
│  │  ├─ lib/
│  │  │  └─ createPredictionIdempotencyKey.ts
│  │  └─ ui/
│  │     ├─ PredictionDrawer.tsx
│  │     └─ QuotePreview.tsx
│  │
│  ├─ request-market-report/
│  ├─ create-market/
│  ├─ activate-market/
│  ├─ confirm-market-result/
│  ├─ settle-market/
│  ├─ void-market/
│  └─ review-battle/
│
├─ shared/
│  ├─ api/
│  │  ├─ httpClient.ts
│  │  ├─ apiResponse.ts
│  │  └─ apiError.ts
│  │
│  ├─ ui/
│  │  ├─ button.tsx
│  │  ├─ input.tsx
│  │  ├─ textarea.tsx
│  │  ├─ select.tsx
│  │  ├─ dialog.tsx
│  │  ├─ drawer.tsx
│  │  ├─ badge.tsx
│  │  ├─ card.tsx
│  │  ├─ tabs.tsx
│  │  ├─ table.tsx
│  │  ├─ skeleton.tsx
│  │  ├─ toast.tsx
│  │  ├─ empty-state.tsx
│  │  ├─ error-state.tsx
│  │  ├─ page-header.tsx
│  │  └─ section-title.tsx
│  │
│  ├─ lib/
│  │  ├─ cn.ts
│  │  ├─ formatDate.ts
│  │  ├─ formatDecimal.ts
│  │  └─ decimal.ts
│  │
│  ├─ constants/
│  │  └─ routePath.ts
│  │
│  └─ types/
│     └─ common.ts
│
└─ main.tsx
```

---

## 6. Import 규칙

### 6.1 기본 방향

의존성 방향은 아래 순서를 따른다.

```text
app
↓
pages
↓
features
↓
entities
↓
shared
```

### 6.2 허용 규칙

- `app`은 `pages`, `shared`를 import할 수 있다.
- `pages`는 `features`, `entities`, `shared`를 import할 수 있다.
- `features`는 `entities`, `shared`를 import할 수 있다.
- `entities`는 `shared`를 import할 수 있다.
- `shared`는 어떤 도메인에도 의존하지 않는다.

### 6.3 금지 규칙

- `shared`에서 `entities`, `features`, `pages`를 import하지 않는다.
- `entities`에서 `features`, `pages`를 import하지 않는다.
- `features`에서 `pages`를 import하지 않는다.
- feature 간 직접 import는 최소화한다.
- entity 간 직접 import는 최소화한다.
- 공통 컴포넌트가 특정 도메인 타입에 의존하지 않도록 한다.

### 6.4 예시

좋은 예시:

```tsx
// pages/market/MarketDetailPage.tsx

import { MarketStatusBadge } from "@/entities/market/ui/MarketStatusBadge";
import { PredictionModal } from "@/features/create-prediction/ui/PredictionModal";
```

나쁜 예시:

```tsx
// entities/market/ui/MarketCard.tsx

import { PredictionModal } from "@/features/create-prediction/ui/PredictionModal";
```

`MarketCard`는 마켓 정보를 보여주는 도메인 UI이므로, 예측 참여 기능에 직접 의존하지 않는다.

---

## 7. 라우팅 정책

### 7.1 사용자 라우트

```text
/
 /markets
 /markets/:marketId
 /markets/:marketId/predictions/me
 /login
 /my
```

### 7.2 관리자 라우트

```text
/admin
/admin/markets
/admin/markets/new
/admin/markets/:marketId
/admin/markets/:marketId/result
```

### 7.3 라우팅 기준

- 일반 사용자 라우트와 관리자 라우트를 분리한다.
- 관리자 라우트는 `/admin` prefix를 사용한다.
- `marketId`는 path parameter로 관리한다.
- 목록 필터, 페이지네이션, 정렬 조건은 query string으로 관리한다.

예시:

```text
/markets?status=ACTIVE&category=REAL_ESTATE&page=0&size=20
```

---

## 8. API 연동 정책

### 8.1 기본 원칙

프론트엔드는 원칙적으로 API Gateway만 바라본다.

```text
Frontend
  ↓
API Gateway
  ↓
market-service
```

운영/통합 환경에서 프론트엔드가 `market-service`를 직접 호출하지 않는다.

### 8.2 환경 변수

```text
VITE_API_BASE_URL=http://localhost:8080
VITE_DEV_MEMBER_ID=1
VITE_DEV_MEMBER_ROLE=ADMIN
```

`VITE_DEV_MEMBER_ID`, `VITE_DEV_MEMBER_ROLE`은 Gateway 없이 market-service 단독 테스트를 할 때만 사용한다.  
운영 코드에서 사용자가 `X-Member-Id`, `X-Member-Role`을 직접 조작하는 구조를 만들지 않는다.

### 8.3 공통 응답 타입

백엔드 공통 응답은 아래 타입으로 관리한다.

```ts
export type ApiResponse<T> = {
  success: boolean;
  errorCode: string | null;
  message: string;
  data: T;
  timestamp: string;
};
```

### 8.4 HTTP Client 기준

- API baseURL은 `.env`로 관리한다.
- 모든 API 요청은 `shared/api/httpClient.ts`를 통해 수행한다.
- API URL을 컴포넌트에 하드코딩하지 않는다.
- 요청 인터셉터에서 인증 토큰과 개발용 헤더 주입을 처리한다.
- 응답 인터셉터에서 공통 에러 처리를 수행한다.
- 개별 도메인 API 함수는 각 entity 또는 feature의 `api/`에 작성한다.

#### 8.4.1 인증 만료 처리 기준

응답 인터셉터에서 `401 UNAUTHORIZED` 또는 인증 관련 `errorCode`가 감지되면 공통 인증 만료 처리 로직을 수행한다.

MVP 단계에서는 다음 순서로 처리한다.

1. Zustand의 인증 상태를 초기화한다.
2. 저장된 `accessToken`을 제거한다.
3. 사용자에게 로그인 만료 안내 메시지를 표시한다.
4. `/login` 페이지로 리다이렉트한다.

단, 추후 refresh token 기반 재발급 정책이 도입될 경우 즉시 로그아웃 처리하기 전에 토큰 재발급을 먼저 시도하고, 재발급 실패 시에만 인증 상태 초기화 및 로그인 페이지 이동을 수행한다.

---

## 9. 인증/권한 정책

### 9.1 운영/통합 환경

운영/통합 환경에서는 다음 구조를 따른다.

```text
Frontend
  → Authorization: Bearer {accessToken}
  → API Gateway
  → JWT 검증
  → X-Member-Id, X-Member-Role downstream 전달
```

### 9.2 로컬 단독 개발

Gateway 없이 market-service를 직접 호출하는 경우에 한해 개발용 헤더 주입을 허용한다.

```text
X-Member-Id: 1
X-Member-Role: ADMIN
```

단, 이 방식은 로컬 단독 테스트 전용이다.

### 9.3 권한 기준

- 프론트의 role은 UI 표시용으로만 사용한다.
- 관리자 버튼 숨김, 관리자 메뉴 표시 여부는 프론트에서 처리할 수 있다.
- 최종 ADMIN 권한 검증은 백엔드에서 수행한다.
- 프론트에서 권한을 최종 판단하지 않는다.

---

## 10. 상태 관리 정책

프론트엔드는 상태의 성격에 따라 관리 도구를 분리한다.

| 상태 | 예시 | 도구 |
|---|---|---|
| 서버 상태 | 마켓 목록, 마켓 상세, 가격 이력, 내 예측 | TanStack Query |
| Mutation 상태 | 예측 참여 요청 중, 결과 확정 요청 중 | TanStack Query mutation |
| 전역 인증 상태 | accessToken, role | Zustand |
| 전역 UI 상태 | sidebar, toast, modal | Zustand 또는 local state |
| 폼 상태 | 관리자 마켓 생성, 결과 확정 입력 | React Hook Form |
| 폼 검증 | 날짜 순서, 옵션 개수, 숫자 범위 | Zod |
| URL 상태 | page, size, status, category | query string |
| 단순 UI 상태 | 모달 열림, 탭 선택, 버튼 disabled | useState |
| 복잡한 화면 내부 상태 | wizard step, 복잡한 옵션 편집 | useReducer 또는 React Hook Form |

### 10.1 TanStack Query 사용 기준

다음 데이터는 TanStack Query로 관리한다.

- 마켓 목록
- 마켓 상세
- 가격 이력
- 내 예측 조회
- 관리자 마켓 목록
- 관리자 마켓 상세
- 관리자 결과 확정 후 재조회

서버에서 조회한 데이터를 Zustand에 중복 저장하지 않는다.

### 10.2 Zustand 사용 기준

Zustand는 클라이언트 내부 전역 상태에만 사용한다.

예시:

- accessToken
- role
- sidebar open/close
- toast
- 공통 modal 상태

금지:

- 마켓 목록을 Zustand에 저장
- 마켓 상세를 Zustand에 저장
- 가격 이력을 Zustand에 저장
- 내 예측 상태를 Zustand에 저장

### 10.3 Query Key 기준

```ts
export const marketKeys = {
  all: ["markets"] as const,
  list: (params: MarketListParams) => ["markets", "list", params] as const,
  detail: (marketId: number) => ["markets", "detail", marketId] as const,
  priceHistory: (marketId: number, optionId?: number) =>
    ["markets", "price-history", marketId, optionId] as const,
};

export const predictionKeys = {
  all: ["predictions"] as const,
  my: (marketId: number) => ["predictions", "me", marketId] as const,
};

export const adminMarketKeys = {
  all: ["admin", "markets"] as const,
  list: (params: AdminMarketListParams) =>
    ["admin", "markets", "list", params] as const,
  detail: (marketId: number) =>
    ["admin", "markets", "detail", marketId] as const,
};
```

### 10.4 Cache Invalidation 기준

예측 참여 성공 후:

```ts
queryClient.invalidateQueries({ queryKey: marketKeys.detail(marketId) });
queryClient.invalidateQueries({ queryKey: marketKeys.priceHistory(marketId) });
queryClient.invalidateQueries({ queryKey: predictionKeys.my(marketId) });
```

관리자 결과 확정 성공 후:

```ts
queryClient.invalidateQueries({ queryKey: marketKeys.detail(marketId) });
queryClient.invalidateQueries({ queryKey: adminMarketKeys.detail(marketId) });
queryClient.invalidateQueries({ queryKey: adminMarketKeys.all });
```

---

## 11. Decimal / 금액 / 가격 처리 정책

백엔드에서 BigDecimal 계열 값은 문자열로 내려온다.  
프론트에서도 해당 값은 `string`으로 취급한다.

대상 예시:

```text
pointAmount
priceSnapshot
contractQuantity
currentPrice
feeRate
resultValue
```

### 11.1 금지사항

- 금액, 가격, 계약 수량을 JavaScript `number`로 무분별하게 계산하지 않는다.
- 화면 표시용 포맷팅과 실제 계산용 변환을 혼동하지 않는다.
- 백엔드에서 내려준 Decimal 문자열을 임의로 반올림하여 비즈니스 로직에 사용하지 않는다.

### 11.2 표시 기준

MVP 단계에서는 백엔드에서 내려준 값을 그대로 표시한다.  
필요한 경우 화면 표시용 포맷 함수에서만 소수점 자리수를 조정한다.

화면 표시용 포맷팅 또는 불가피한 클라이언트 연산이 필요한 경우, 내장 `Number` 객체나 `parseFloat`, `parseInt`를 직접 사용하지 않는다.

Decimal 처리는 `decimal.js` 또는 `bignumber.js` 같은 안전한 Decimal 연산 라이브러리를 사용하며, 해당 라이브러리 사용은 `shared/lib/formatDecimal.ts` 또는 Decimal 전용 utility 내부로 캡슐화한다.

컴포넌트, feature, page 레이어에서 Decimal 문자열을 직접 number로 변환하지 않는다.

금지 예시:

```ts
Number(currentPrice);
parseFloat(contractQuantity);
parseInt(pointAmount);
```

권장 예시:

```ts
formatDecimal(currentPrice);
formatPointAmount(pointAmount);
formatPercent(priceSnapshot);
```

---

## 12. 에러 처리 정책

### 12.1 기본 원칙

- HTTP status만 보고 처리하지 않는다.
- 백엔드 응답의 `errorCode`를 우선 기준으로 처리한다.
- 사용자에게 보여줄 메시지는 백엔드 `message`를 기본 사용한다.
- 프론트에서 별도 메시지가 필요한 경우 `errorCode`별 매핑을 사용할 수 있다.
- 개발자 디버깅용 상세 정보는 console 또는 개발 환경 UI에서만 확인한다.

### 12.2 주요 에러 코드 처리 예시

| errorCode | 프론트 처리 |
|---|---|
| `POINT_INSUFFICIENT` | 포인트 부족 안내 |
| `MARKET_INVALID_STATUS` | 현재 상태에서 처리 불가 안내 |
| `MARKET_PREDICTION_NOT_FOUND` | 참여한 예측 없음 안내 |
| `MARKET_WINNING_OPTION_NOT_FOUND` | 결과에 해당하는 선택지 없음 안내 |
| `MARKET_INVALID_SETTLEMENT_DATA` | 결과 데이터 정책 오류 안내 |

### 12.3 Prediction 상태 표시

`POINT_UNKNOWN`은 실패가 아니다.  
포인트 처리 결과가 불명확한 상태로 보고 사용자에게 확인 필요 상태로 안내한다.

| 상태 | 표시 문구 |
|---|---|
| `CONFIRMED` | 참여 완료 |
| `FAILED` | 예측 실패 |
| `POINT_UNKNOWN` | 처리 확인 필요 |
| `POINT_PENDING` | 처리 중 |

#### 12.3.1 POINT_UNKNOWN / POINT_PENDING Polling 정책

`POINT_UNKNOWN`, `POINT_PENDING`은 최종 실패 상태로 처리하지 않는다.

해당 상태에서는 실패 화면을 띄우지 않고, 사용자에게 "처리 상태 확인 중" 또는 "포인트 처리 결과 확인 필요" 메시지를 표시한다.

또한 3~5초 간격으로 내 예측 조회 API를 polling하여 최종 상태(`CONFIRMED` 또는 `FAILED`)로 전이되는지 확인하는 로직을 구현한다.

Polling은 다음 조건에서 중단한다.

- 상태가 `CONFIRMED`로 변경된 경우
- 상태가 `FAILED`로 변경된 경우
- 사용자가 페이지를 벗어난 경우
- 정해진 최대 재시도 횟수 또는 최대 대기 시간을 초과한 경우

최대 대기 시간을 초과한 경우에는 실패로 단정하지 않고, "처리 상태를 확인할 수 없습니다. 잠시 후 다시 확인해주세요."와 같은 안내 메시지를 표시한다.

TanStack Query를 사용하는 경우 `refetchInterval`을 활용하여 상태 기반 polling을 구현할 수 있다.

```ts
useQuery({
  queryKey: predictionKeys.my(marketId),
  queryFn: () => getMyPrediction(marketId),
  refetchInterval: (query) => {
    const status = query.state.data?.status;

    if (status === "POINT_PENDING" || status === "POINT_UNKNOWN") {
      return 5000;
    }

    return false;
  },
});
```

---

## 13. Idempotency-Key 정책

### 13.1 기본 원칙

멱등성이 필요한 mutation 요청에는 `Idempotency-Key`를 포함한다.

대상 예시:

- 예측 참여
- 추후 정산/환불 관련 mutation
- 기타 중복 요청 방지가 필요한 요청

### 13.2 예측 참여 처리 기준

예측 참여 버튼 클릭 시 다음 순서를 따른다.

```text
예측 참여 클릭
→ Idempotency-Key 생성
→ mutation 요청 중 버튼 비활성화
→ 성공 시 마켓 상세, 가격 이력, 내 예측 조회 invalidate
→ 실패 시 errorCode 기반 메시지 표시
```

### 13.3 중복 클릭 방지

- mutation 진행 중 버튼을 disabled 처리한다.
- 동일 요청이 연속으로 전송되지 않도록 방지한다.
- timeout 또는 네트워크 오류 발생 시 재시도 UX를 제공할 수 있다.

---

## 14. 사용자 화면 정책

### 14.1 사용자 MVP 화면

```text
/markets
/markets/:marketId
/markets/:marketId/predictions/me
```

### 14.2 마켓 목록 화면

표시 항목:

- 제목
- 카테고리
- 상태
- 마감 시간
- 선택지별 현재 가격
- 참여자 수

필터 기준:

- status
- category
- page
- size

필터와 페이지네이션은 query string으로 관리한다.

### 14.3 마켓 상세 화면

표시 항목:

- 마켓 제목
- 판단 기준
- 데이터 출처
- closeAt
- judgeDate
- settleDueAt
- 옵션별 현재 가격
- 옵션별 참여 수
- 가격 이력 차트
- 내 예측 상태
- 예측 참여 버튼

### 14.4 내 예측 화면

표시 항목:

- 선택한 옵션
- 예측 금액
- 가격 스냅샷
- 계약 수량
- 예측 상태
- 생성 일시

---

## 15. 관리자 페이지 정책

MVP 프론트엔드에는 관리자 페이지를 포함한다.

### 15.1 관리자 MVP 화면

```text
/admin/markets
/admin/markets/new
/admin/markets/:marketId
/admin/markets/:marketId/result
```

### 15.2 관리자 마켓 목록

기능:

- 관리자 마켓 목록 조회
- 상태별 필터
- 마켓 생성 버튼
- 관리자 상세 화면 이동

### 15.3 관리자 마켓 생성

지원 answerType:

- `YES_NO`
- `MULTIPLE_CHOICE`
- `NUMERIC_RANGE`

입력 항목:

- title
- category
- answerType
- metricUnit
- judgeDataSource
- judgeCriteria
- closeAt
- judgeDate
- settleDueAt
- feeRate
- options

### 15.4 관리자 마켓 상세

기능:

- 관리자용 마켓 상세 조회
- 현재 상태 확인
- 옵션 확인
- 활성화 버튼 표시

활성화 버튼 노출 기준:

```text
market.status === "PENDING"
```

### 15.5 관리자 결과 확정

기능:

- 선택형 결과 확정
- 숫자 범위형 결과 확정

선택형:

```text
resultOptionId 선택
```

숫자 범위형:

```text
resultValue 입력
해당 resultValue가 어느 option range에 속하는지 미리 표시
```

### 15.6 정산/환불 화면

정산/환불 화면은 백엔드 API 구현 이후 추가한다.  
API가 구현되기 전에 화면만 먼저 만들지 않는다.

---

## 16. 프론트 검증 정책

### 16.1 기본 원칙

프론트 검증은 사용자 경험 개선을 위한 1차 검증이다.  
최종 정책 검증은 백엔드에서 수행한다.

따라서 프론트에서 검증하더라도 백엔드 `errorCode` 응답 처리는 반드시 구현한다.

---

## 17. 사용자 예측 참여 검증

예측 참여 모달에서 다음 항목을 검증한다.

- 로그인 여부
- 마켓 상태가 `ACTIVE`인지
- `closeAt`이 지나지 않았는지
- 선택지를 선택했는지
- `pointAmount`를 입력했는지
- `pointAmount`가 0보다 큰지
- 소수점 자리 정책에 맞는지
- 이미 참여한 예측이 있는지
- 요청 중 중복 클릭 여부

이미 참여 여부는 내 예측 조회 API 결과를 기준으로 UI에서 막는다.

예시:

```text
내 예측 존재
→ 예측 참여 버튼 비활성화
→ "이미 이 마켓에 참여했습니다." 표시
```

단, 백엔드에서도 중복 참여 에러가 발생할 수 있으므로 해당 errorCode 처리를 반드시 구현한다.

---

## 18. 관리자 마켓 생성 검증

관리자 마켓 생성 폼에서 다음 항목을 검증한다.

공통 검증:

- title 필수
- category 필수
- answerType 필수
- closeAt 필수
- judgeDate 필수
- settleDueAt 필수
- closeAt < judgeDate
- judgeDate <= settleDueAt
- 옵션 최소 2개
- optionCode 중복 금지
- optionLabel 필수
- initialVirtualLiquidity > 0
- feeRate 0 이상 100 이하

`NUMERIC_RANGE` 추가 검증:

- rangeMin, rangeMax 양쪽 모두 null 금지
- rangeMin < rangeMax
- 열린 시작 구간은 최대 1개
- 열린 종료 구간은 최대 1개
- 범위 겹침 금지
- 범위 사이 공백 금지
- 같은 경계값이 두 옵션에 동시에 포함되지 않도록 검증

---

## 19. 관리자 활성화 검증

활성화 버튼 노출 기준:

```text
market.status === "PENDING"
```

프론트에서 추가 확인할 항목:

- closeAt이 현재 시간보다 미래인지
- 옵션이 2개 이상인지
- 모든 옵션의 initialVirtualLiquidity가 0보다 큰지

최종 활성화 가능 여부는 백엔드 응답 기준이다.

---

## 20. 관리자 결과 확정 검증

결과 확정 버튼 노출 기준:

```text
market.status === "ACTIVE"
closeAt <= 현재 시간
```

선택형 결과 확정 검증:

- resultOptionId 필수
- 선택지가 현재 마켓의 option인지 확인

숫자 범위형 결과 확정 검증:

- resultValue 필수
- 숫자 형식 검증
- 프론트에서 해당 resultValue가 어느 range에 속하는지 미리 표시

예시:

```text
입력값: 0.35
해당 옵션: 0.3% 이상 0.4% 미만
```

---

## 21. UI 컴포넌트 정책

### 21.1 공통 UI 기준

공통 UI는 `shared/ui`에 둔다.

대상 예시:

- Button
- Input
- Dialog
- Badge
- Skeleton
- Loading
- EmptyState
- ErrorState

공통 UI는 특정 도메인에 의존하지 않는다.

### 21.2 상태 Badge 기준

Market 상태:

| 상태 | 표시 문구 |
|---|---|
| `PENDING` | 대기 |
| `ACTIVE` | 진행 중 |
| `CLOSED` | 마감 |
| `SETTLEMENT_IN_PROGRESS` | 정산 중 |
| `SETTLED` | 정산 완료 |
| `VOIDED` | 무효 |

Prediction 상태:

| 상태 | 표시 문구 |
|---|---|
| `POINT_PENDING` | 처리 중 |
| `CONFIRMED` | 참여 완료 |
| `FAILED` | 실패 |
| `POINT_UNKNOWN` | 확인 필요 |

---

## 22. 성능 기준

### 22.1 기본 원칙

파일 구조 자체가 성능을 직접 결정하지 않는다.  
성능은 주로 다음 요소에서 결정된다.

- 라우트 단위 lazy loading
- 번들 분리
- import 방향
- 서버 상태 관리 방식
- 불필요한 재렌더 방지
- 무거운 라이브러리의 지연 로딩

### 22.2 Lazy Loading 기준

관리자 페이지는 일반 사용자의 초기 진입에 필요하지 않으므로 lazy loading 대상으로 둔다.

대상 예시:

```text
AdminMarketListPage
AdminMarketCreatePage
AdminMarketDetailPage
AdminMarketResultPage
```

가격 이력 차트에 무거운 차트 라이브러리를 사용하는 경우 차트 컴포넌트도 lazy loading 후보로 둔다.

### 22.3 Barrel Export 기준

- `shared/ui` 정도는 index export를 허용한다.
- entity/feature 전체를 `export *`로 묶는 것은 최소화한다.
- API, hook, component는 가능하면 명시 import한다.
- 순환 참조가 발생하지 않도록 주의한다.

---

## 23. 테스트 정책

### 23.1 테스트 도구

| 테스트 | 도구 |
|---|---|
| Unit Test | Vitest |
| Component Test | React Testing Library |
| API Mocking | MSW |
| E2E Test | Playwright |

### 23.2 MVP 필수 테스트 후보

Unit Test:

- formatDate
- formatDecimal
- createIdempotencyKey
- validation schema

Component Test:

- MarketCard
- MarketStatusBadge
- PredictionStatusBadge
- MyPredictionCard
- AdminMarketForm

E2E Test:

- 마켓 목록 조회
- 마켓 상세 조회
- 예측 참여
- 내 예측 조회
- 관리자 마켓 생성
- 관리자 마켓 활성화
- 관리자 결과 확정

### 23.3 테스트 우선순위

MVP 필수:

- 마켓 목록
- 마켓 상세
- 예측 참여
- 내 예측 조회

추후 확장:

- 관리자 전체 플로우
- 정산/환불 플로우

---

## 24. Git / Commit 규칙

커밋 메시지는 다음 형식을 권장한다.

```text
feat: 마켓 목록 화면 추가
feat: 예측 참여 모달 추가
fix: 마켓 상세 가격 표시 오류 수정
refactor: market api hook 분리
docs: 프론트엔드 가이드 추가
test: 예측 상태 배지 테스트 추가
chore: eslint 설정 추가
```

---

## 25. 금지사항

다음 사항을 금지한다.

- `any` 남발 금지
- API URL 하드코딩 금지
- 서버 데이터를 Zustand에 중복 저장 금지
- 백엔드 enum 문자열 임의 변경 금지
- `errorCode`를 화면마다 제각각 처리 금지
- 금액/가격/계약 수량을 JavaScript `number`로 무분별하게 계산 금지
- 운영 코드에서 `X-Member-Id`, `X-Member-Role` 직접 주입 금지
- `shared` 레이어에서 도메인 코드 import 금지
- API가 없는 정산/환불 화면 선구현 금지
- 관리자 권한을 프론트에서만 검증하는 구조 금지

---

## 26. MVP 구현 순서

현재 기준 MVP 구현 순서는 다음을 권장한다.

```text
1. 프로젝트 생성 및 기본 세팅
2. 라우터 구성
3. 공통 httpClient 구성
4. ApiResponse / ApiError 타입 구성
5. Market 목록 조회
6. Market 상세 조회
7. 내 예측 조회
8. 예측 참여
9. 관리자 마켓 목록
10. 관리자 마켓 생성
11. 관리자 마켓 활성화
12. 관리자 결과 확정
13. 기본 E2E 시나리오 검증
```

발표용 최종 플로우는 추후 별도 확정한다.

---

## 27. 최종 정리

Todongsan 프론트엔드는 다음 기준으로 개발한다.

```text
React + Vite + TypeScript
Tailwind CSS + shadcn/ui
API Gateway 기반 REST API 연동
FSD-lite 구조
TanStack Query + Zustand + React Hook Form
관리자 페이지 MVP 포함
프론트 1차 검증 + 백엔드 최종 검증
errorCode 기반 에러 처리
POINT_UNKNOWN / POINT_PENDING polling 처리
인증 만료 시 공통 로그아웃 및 로그인 페이지 이동
Decimal string 처리 및 안전한 Decimal 포맷팅
```

본 문서는 프론트엔드 개발 진행 중 백엔드 API, 인증 정책, 관리자 기능 범위가 변경될 경우 함께 업데이트한다.
