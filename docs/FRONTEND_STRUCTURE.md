# 프론트엔드 구조 설계 문서

이 문서는 동네대전 프론트엔드의 전체 아키텍처, 디렉토리 구조, API 클라이언트 설계, 라우팅 구조, 상태 관리 전략을 정의합니다.

---

## 1. 디렉토리 트리 (권장 구조)

정책 파일에서 확인한 컨벤션을 바탕으로 `src/` 전체 디렉토리 트리를 제안합니다.

```
src/
├── app/
│   ├── App.tsx
│   ├── providers/
│   │   ├── index.tsx           # QueryClientProvider, ToastProvider 통합
│   │   ├── QueryProvider.tsx
│   │   ├── AuthProvider.tsx
│   │   └── ToastProvider.tsx
│   ├── router/
│   │   ├── index.tsx           # React Router 라우트 정의
│   │   ├── ProtectedRoute.tsx  # 인증 필요 라우트 래퍼
│   │   └── AdminRoute.tsx      # 관리자 전용 라우트 래퍼
│   └── store/
│       └── authStore.ts        # Zustand 인증 상태 관리
│
├── pages/
│   ├── home/
│   │   └── HomePage.tsx
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   └── KakaoCallbackPage.tsx
│   ├── battle/
│   │   ├── BattleListPage.tsx
│   │   └── BattleDetailPage.tsx
│   ├── market/
│   │   ├── MarketListPage.tsx
│   │   ├── MarketDetailPage.tsx
│   │   └── MarketReportPage.tsx
│   ├── my/
│   │   ├── MyPage.tsx
│   │   ├── ProfileEditPage.tsx
│   │   ├── PointHistoryPage.tsx
│   │   └── VisitCertificationPage.tsx
│   ├── reputation/
│   │   └── ReputationDetailPage.tsx
│   ├── admin/
│   │   ├── AdminDashboardPage.tsx
│   │   ├── battle/
│   │   │   ├── AdminBattleListPage.tsx
│   │   │   ├── AdminBattleDetailPage.tsx
│   │   │   ├── AdminBattleAnalysisPage.tsx
│   │   │   └── AdminBattleReportPage.tsx
│   │   └── market/
│   │       ├── AdminMarketListPage.tsx
│   │       ├── AdminMarketCreatePage.tsx
│   │       ├── AdminMarketDetailPage.tsx
│   │       └── AdminMarketResultPage.tsx
│   └── NotFoundPage.tsx
│
├── entities/
│   ├── auth/
│   │   ├── api/
│   │   │   └── authApi.ts
│   │   ├── model/
│   │   │   ├── auth.types.ts
│   │   │   ├── auth.store.ts
│   │   │   └── auth.constants.ts
│   │   └── ui/
│   │       └── LoginButton.tsx
│   ├── member/
│   │   ├── api/
│   │   │   └── memberApi.ts
│   │   ├── model/
│   │   │   ├── member.types.ts
│   │   │   ├── member.keys.ts
│   │   │   └── member.constants.ts
│   │   └── ui/
│   │       └── MemberProfileCard.tsx
│   ├── battle/
│   │   ├── api/
│   │   │   └── battleApi.ts
│   │   ├── model/
│   │   │   ├── battle.types.ts
│   │   │   ├── battle.keys.ts
│   │   │   └── battle.constants.ts
│   │   └── ui/
│   │       ├── BattleCard.tsx
│   │       ├── BattleStatusBadge.tsx
│   │       ├── BattleVoteResult.tsx
│   │       └── BattleCommentList.tsx
│   ├── market/
│   │   ├── api/
│   │   │   └── marketApi.ts
│   │   ├── model/
│   │   │   ├── market.types.ts
│   │   │   ├── market.keys.ts
│   │   │   └── market.constants.ts
│   │   └── ui/
│   │       ├── MarketCard.tsx
│   │       ├── MarketStatusBadge.tsx
│   │       ├── MarketOptionList.tsx
│   │       ├── MarketPriceChart.tsx
│   │       └── MarketSettlementRuleCard.tsx
│   ├── prediction/
│   │   ├── api/
│   │   │   └── predictionApi.ts
│   │   ├── model/
│   │   │   ├── prediction.types.ts
│   │   │   ├── prediction.keys.ts
│   │   │   └── prediction.constants.ts
│   │   └── ui/
│   │       ├── PredictionStatusBadge.tsx
│   │       └── MyPredictionCard.tsx
│   ├── point/
│   │   ├── api/
│   │   │   └── pointApi.ts
│   │   ├── model/
│   │   │   ├── point.types.ts
│   │   │   ├── point.keys.ts
│   │   │   └── point.constants.ts
│   │   └── ui/
│   │       ├── PointAmount.tsx
│   │       └── PointHistoryTable.tsx
│   ├── insight/
│   │   ├── api/
│   │   │   └── insightApi.ts
│   │   ├── model/
│   │   │   ├── insight.types.ts
│   │   │   ├── insight.keys.ts
│   │   │   └── insight.constants.ts
│   │   └── ui/
│   │       └── InsightReportCard.tsx
│   └── reputation/
│       ├── api/
│       │   └── reputationApi.ts
│       ├── model/
│       │   ├── reputation.types.ts
│       │   ├── reputation.keys.ts
│       │   └── reputation.constants.ts
│       └── ui/
│           ├── ReputationScoreBadge.tsx
│           └── ReputationSummaryCard.tsx
│
├── features/
│   ├── login-kakao/
│   │   ├── api/
│   │   │   └── loginApi.ts
│   │   ├── model/
│   │   │   └── useKakaoLogin.ts
│   │   └── ui/
│   │       └── KakaoLoginButton.tsx
│   ├── update-profile/
│   │   ├── api/
│   │   │   └── updateProfileApi.ts
│   │   ├── model/
│   │   │   ├── useUpdateProfile.ts
│   │   │   └── updateProfile.schema.ts
│   │   └── ui/
│   │       └── ProfileEditForm.tsx
│   ├── create-battle-vote/
│   │   ├── api/
│   │   │   └── voteApi.ts
│   │   ├── model/
│   │   │   ├── useCreateVote.ts
│   │   │   └── vote.schema.ts
│   │   └── ui/
│   │       └── BattleVoteForm.tsx
│   ├── create-battle-comment/
│   │   ├── api/
│   │   │   └── commentApi.ts
│   │   ├── model/
│   │   │   ├── useCreateComment.ts
│   │   │   └── comment.schema.ts
│   │   └── ui/
│   │       └── BattleCommentForm.tsx
│   ├── create-prediction/
│   │   ├── api/
│   │   │   └── predictionApi.ts
│   │   ├── model/
│   │   │   ├── useCreatePrediction.ts
│   │   │   └── createPrediction.schema.ts
│   │   ├── lib/
│   │   │   └── createPredictionIdempotencyKey.ts
│   │   └── ui/
│   │       ├── PredictionDrawer.tsx
│   │       └── QuotePreview.tsx
│   ├── request-market-report/
│   │   ├── api/
│   │   │   └── marketReportApi.ts
│   │   ├── model/
│   │   │   └── useRequestMarketReport.ts
│   │   └── ui/
│   │       └── MarketReportRequestDialog.tsx
│   ├── create-market/
│   │   ├── api/
│   │   │   └── adminMarketApi.ts
│   │   ├── model/
│   │   │   ├── useCreateMarket.ts
│   │   │   └── createMarket.schema.ts
│   │   └── ui/
│   │       └── AdminMarketForm.tsx
│   ├── activate-market/
│   │   ├── api/
│   │   │   └── activateMarketApi.ts
│   │   ├── model/
│   │   │   └── useActivateMarket.ts
│   │   └── ui/
│   │       └── ActivateMarketButton.tsx
│   ├── confirm-market-result/
│   │   ├── api/
│   │   │   └── confirmResultApi.ts
│   │   ├── model/
│   │   │   ├── useConfirmResult.ts
│   │   │   └── confirmResult.schema.ts
│   │   └── ui/
│   │       └── ResultConfirmForm.tsx
│   ├── settle-market/
│   │   ├── api/
│   │   │   └── settleMarketApi.ts
│   │   ├── model/
│   │   │   └── useSettleMarket.ts
│   │   └── ui/
│   │       └── SettleMarketButton.tsx
│   ├── void-market/
│   │   ├── api/
│   │   │   └── voidMarketApi.ts
│   │   ├── model/
│   │   │   └── useVoidMarket.ts
│   │   └── ui/
│   │       └── VoidMarketDialog.tsx
│   └── review-battle/
│       ├── api/
│       │   └── reviewBattleApi.ts
│       ├── model/
│       │   └── useReviewBattle.ts
│       └── ui/
│           └── BattleReviewForm.tsx
│
├── shared/
│   ├── api/
│   │   ├── client.ts               # axios instance, interceptors
│   │   ├── types.ts                # ApiResponse<T>, ApiError 공통 타입
│   │   └── utils.ts                # API 유틸리티 함수
│   ├── ui/
│   │   ├── button.tsx              # shadcn 기반 Button
│   │   ├── input.tsx               # shadcn 기반 Input
│   │   ├── textarea.tsx            # shadcn 기반 Textarea
│   │   ├── select.tsx              # shadcn 기반 Select
│   │   ├── dialog.tsx              # shadcn 기반 Dialog
│   │   ├── drawer.tsx              # shadcn 기반 Drawer
│   │   ├── badge.tsx               # shadcn 기반 Badge
│   │   ├── card.tsx                # shadcn 기반 Card
│   │   ├── tabs.tsx                # shadcn 기반 Tabs
│   │   ├── table.tsx               # shadcn 기반 Table
│   │   ├── skeleton.tsx            # shadcn 기반 Skeleton
│   │   ├── toast.tsx               # shadcn 기반 Toast
│   │   ├── empty-state.tsx         # 빈 상태 컴포넌트
│   │   ├── error-state.tsx         # 에러 상태 컴포넌트
│   │   ├── page-header.tsx         # 페이지 헤더 컴포넌트
│   │   ├── section-title.tsx       # 섹션 제목 컴포넌트
│   │   ├── app-shell.tsx           # 전체 레이아웃 컴포넌트
│   │   └── page-container.tsx      # 페이지 컨테이너 컴포넌트
│   ├── hooks/
│   │   ├── useAuth.ts              # 인증 상태 훅
│   │   ├── useDebounce.ts          # 디바운스 훅
│   │   ├── useLocalStorage.ts      # 로컬 스토리지 훅
│   │   └── usePolling.ts           # 폴링 훅
│   ├── lib/
│   │   ├── cn.ts                   # className 유틸리티
│   │   ├── formatDate.ts           # 날짜 포맷 유틸리티
│   │   ├── formatDecimal.ts        # Decimal 포맷 유틸리티
│   │   ├── decimal.ts              # Decimal 계산 유틸리티
│   │   ├── createIdempotencyKey.ts # Idempotency Key 생성
│   │   └── validators.ts           # 공통 검증 함수
│   ├── constants/
│   │   ├── routePath.ts            # 라우트 경로 상수
│   │   ├── auth.ts                 # 인증 관련 상수
│   │   └── api.ts                  # API 관련 상수
│   └── types/
│       ├── common.ts               # 공통 타입 정의
│       ├── api.ts                  # API 공통 타입
│       └── auth.ts                 # 인증 관련 타입
│
├── mocks/
│   ├── browser.ts                  # MSW browser setup
│   ├── handlers/
│   │   ├── index.ts                # 모든 handler 통합 export
│   │   ├── auth.ts                 # 인증 관련 mock handler
│   │   ├── battle.ts               # Battle 도메인 mock handler
│   │   ├── market.ts               # Market 도메인 mock handler
│   │   ├── insight.ts              # Insight/Reputation 도메인 mock handler
│   │   └── member.ts               # Member/Point 도메인 mock handler
│   └── data/
│       ├── battles.ts              # Mock 배틀 데이터
│       ├── markets.ts              # Mock 마켓 데이터
│       ├── members.ts              # Mock 멤버 데이터
│       └── points.ts               # Mock 포인트 데이터
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── main.tsx
└── index.css
```

---

## 2. 레이어 의존성 규칙

| 레이어 | 의존 가능 레이어 | 의존 금지 레이어 |
|---|---|---|
| `app` | `pages`, `features`, `entities`, `shared` | - |
| `pages` | `features`, `entities`, `shared` | `app` |
| `features` | `entities`, `shared` | `app`, `pages`, 다른 `features` |
| `entities` | `shared` | `app`, `pages`, `features` |
| `shared` | - | `app`, `pages`, `features`, `entities` |

### 의존성 규칙 상세

1. **상위 레이어는 하위 레이어만 import 가능**
   - `pages`에서 `features`, `entities`, `shared` 사용 가능
   - `features`에서 `entities`, `shared` 사용 가능
   - `entities`에서 `shared`만 사용 가능

2. **레이어 간 직접 의존 최소화**
   - Feature 간 직접 import 금지
   - Entity 간 직접 import 최소화
   - 공통 기능은 `shared`에 배치

3. **역방향 의존 금지**
   - `shared`에서 도메인별 코드 import 금지
   - `entities`에서 `features` import 금지
   - `features`에서 `pages` import 금지

---

## 3. API 클라이언트 설계

### 3.1 Axios Instance 설정

**위치**: `src/shared/api/client.ts`

```typescript
// API Gateway 기준 설정
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000';

// Request Interceptor 기능:
// 1. baseURL 자동 적용
// 2. Authorization Bearer 토큰 자동 추가
// 3. 개발 환경에서만 X-Member-Id, X-Member-Role 헤더 추가
// 4. Idempotency-Key 유지

// Response Interceptor 기능:
// 1. 공통 ApiResponse<T> unwrapping
// 2. 401 인증 만료 자동 처리 (authStore 초기화 + 로그인 페이지 이동)
// 3. 에러 코드 기반 에러 객체 변환
// 4. 네트워크 오류 공통 처리
```

### 3.2 인증 헤더 주입 방식

**운영/통합 환경**:
```
Frontend → Authorization: Bearer {accessToken} → API Gateway → JWT 검증 → X-Member-Id, X-Member-Role 자동 주입
```

**로컬 개발 환경** (Gateway 없이 서비스 직접 호출 시):
```typescript
// 환경변수 기반 개발용 헤더 주입
if (import.meta.env.DEV && import.meta.env.VITE_DEV_MEMBER_ID) {
  headers['X-Member-Id'] = import.meta.env.VITE_DEV_MEMBER_ID;
  headers['X-Member-Role'] = import.meta.env.VITE_DEV_MEMBER_ROLE || 'USER';
}
```

### 3.3 MSW Mock Handler 파일 분리 방식

**도메인별 Handler 분리**:

- `src/mocks/handlers/auth.ts` - 로그인/로그아웃/토큰 갱신
- `src/mocks/handlers/battle.ts` - 배틀 목록/상세/투표/댓글
- `src/mocks/handlers/market.ts` - 마켓 목록/상세/예측/가격이력
- `src/mocks/handlers/member.ts` - 멤버 정보/포인트 잔액/히스토리
- `src/mocks/handlers/insight.ts` - AI 리포트/신뢰도/방문인증

### 3.4 에러 응답 공통 처리 방식

**`{ success, data, error }` 포맷 기준**:

```typescript
// 성공 응답 처리
interface ApiResponse<T> {
  success: boolean;
  errorCode: string | null;
  message: string | null;
  data: T;
  timestamp: string;
}

// 에러 응답 처리
interface ApiError {
  status?: number;
  errorCode: string;
  message: string;
  timestamp?: string;
}

// Response Interceptor에서 errorCode 기준 처리
// - UNAUTHORIZED → 인증 상태 초기화 + 로그인 페이지 이동
// - FORBIDDEN → 권한 없음 안내
// - POINT_INSUFFICIENT → 포인트 부족 안내
// - MARKET_ALREADY_PREDICTED → 이미 참여함 안내
```

---

## 4. 라우팅 구조

SCREEN_FLOW 정책 기반으로 라우트 목록을 정의합니다.

| 라우트 | 페이지 컴포넌트 | 인증 필요 | 권한 | 설명 |
|---|---|---|---|---|
| `/` | HomePage | 선택 | - | 메인 홈 |
| `/login` | LoginPage | ❌ | - | 카카오 로그인 |
| `/auth/kakao/callback` | KakaoCallbackPage | ❌ | - | 카카오 콜백 처리 |
| `/battles` | BattleListPage | 선택 | - | 배틀 목록 |
| `/battles/:battleId` | BattleDetailPage | 선택 | - | 배틀 상세 |
| `/markets` | MarketListPage | 선택 | - | 마켓 목록 |
| `/markets/:marketId` | MarketDetailPage | 선택 | - | 마켓 상세 |
| `/markets/:marketId/report` | MarketReportPage | ✅ | - | 마켓 AI 리포트 |
| `/my` | MyPage | ✅ | - | 마이페이지 |
| `/my/profile` | ProfileEditPage | ✅ | - | 내 정보 수정 |
| `/my/points` | PointHistoryPage | ✅ | - | 포인트 내역 |
| `/my/visit-certifications` | VisitCertificationPage | ✅ | - | 방문 인증 |
| `/reputations/:memberId` | ReputationDetailPage | 선택 | - | 타인 신뢰도 조회 |
| `/admin` | AdminDashboardPage | ✅ | ADMIN | 관리자 대시보드 |
| `/admin/battles` | AdminBattleListPage | ✅ | ADMIN | 배틀 관리 목록 |
| `/admin/battles/:battleId` | AdminBattleDetailPage | ✅ | ADMIN | 배틀 관리 상세 |
| `/admin/battles/:battleId/analysis` | AdminBattleAnalysisPage | ✅ | ADMIN | 배틀 교차분석 |
| `/admin/battles/:battleId/report` | AdminBattleReportPage | ✅ | ADMIN | 배틀 AI 리포트 |
| `/admin/markets` | AdminMarketListPage | ✅ | ADMIN | 마켓 관리 목록 |
| `/admin/markets/new` | AdminMarketCreatePage | ✅ | ADMIN | 마켓 생성 |
| `/admin/markets/:marketId` | AdminMarketDetailPage | ✅ | ADMIN | 마켓 관리 상세 |
| `/admin/markets/:marketId/result` | AdminMarketResultPage | ✅ | ADMIN | 마켓 결과 확정 |

### 라우터 보호 정책

```typescript
// ProtectedRoute: 인증이 필요한 라우트
// AdminRoute: ADMIN 권한이 필요한 라우트
// 권한 체크는 프론트에서 UI 표시용, 최종 검증은 백엔드에서 수행
```

---

## 5. 상태 관리 전략

### 5.1 전역 상태 vs 서버 상태 vs 로컬 상태 분리

| 상태 타입 | 관리 도구 | 사용 예시 |
|---|---|---|
| **서버 상태** | TanStack Query | 마켓 목록, 배틀 상세, 내 예측 상태, 포인트 히스토리 |
| **전역 클라이언트 상태** | Zustand | accessToken, refreshToken, role, nickname |
| **전역 UI 상태** | Zustand | sidebar 열림/닫힘, toast 상태, 공통 modal |
| **폼 상태** | React Hook Form | 마켓 생성 폼, 예측 참여 폼, 프로필 수정 폼 |
| **폼 검증** | Zod | 입력값 검증, 날짜 순서 검증, 옵션 개수 검증 |
| **URL 상태** | Query String | 필터, 페이지네이션, 정렬, 탭 선택 |
| **단순 UI 상태** | useState | 모달 열림/닫힘, 탭 선택, 버튼 disabled |
| **복잡한 화면 상태** | useReducer | 다단계 폼, 복잡한 옵션 편집 |

### 5.2 서버 상태 중복 저장 금지

**금지 사항**:
- 마켓 목록을 Zustand에 저장 
- 배틀 상세를 Zustand에 저장
- 포인트 히스토리를 Zustand에 저장
- 내 예측 상태를 Zustand에 저장

### 5.3 TanStack Query 사용 기준

**Query Key 관리**:
```typescript
// entities/market/model/market.keys.ts
export const marketKeys = {
  all: ["markets"] as const,
  list: (params: MarketListParams) => ["markets", "list", params] as const,
  detail: (marketId: number) => ["markets", "detail", marketId] as const,
  quote: (marketId: number, params: QuoteParams) => 
    ["markets", "quote", marketId, params] as const,
  priceHistory: (marketId: number, optionId?: number) =>
    ["markets", "price-history", marketId, optionId] as const,
};

export const predictionKeys = {
  all: ["predictions"] as const,
  my: (marketId: number) => ["predictions", "me", marketId] as const,
};
```

**Cache Invalidation 정책**:
```typescript
// 예측 참여 성공 후
queryClient.invalidateQueries({ queryKey: marketKeys.detail(marketId) });
queryClient.invalidateQueries({ queryKey: marketKeys.priceHistory(marketId) });
queryClient.invalidateQueries({ queryKey: predictionKeys.my(marketId) });
queryClient.invalidateQueries({ queryKey: pointKeys.balance() });

// 관리자 마켓 상태 변경 후
queryClient.invalidateQueries({ queryKey: marketKeys.detail(marketId) });
queryClient.invalidateQueries({ queryKey: adminMarketKeys.all });
```

### 5.4 Polling 정책

**POINT_PENDING / POINT_UNKNOWN 상태 처리**:
```typescript
// 해당 상태는 실패가 아니라 처리 중/확인 중 상태
// 3~5초 간격으로 polling하여 최종 상태 확인
useQuery({
  queryKey: predictionKeys.my(marketId),
  queryFn: () => getMyPrediction(marketId),
  refetchInterval: (query) => {
    const status = query.state.data?.status;
    if (status === "POINT_PENDING" || status === "POINT_UNKNOWN") {
      return 5000; // 5초 간격 polling
    }
    return false; // polling 중단
  },
});
```

### 5.5 권장 라이브러리

**설치 권장**:
- `@tanstack/react-query` - 서버 상태 관리
- `zustand` - 전역 클라이언트 상태 관리  
- `react-hook-form` - 폼 관리
- `zod` - 스키마 검증
- `decimal.js` - 안전한 Decimal 계산

**설치하지 않는 것**:
- Redux Toolkit (MVP에서 과도함)
- Recoil (Zustand로 충분)
- SWR (TanStack Query 사용)

---

## 6. MVP 구현 우선순위

### 6.1 1차 MVP (Market 중심)

1. **기본 인프라** (1-2일)
   - 프로젝트 구조 생성
   - API Client 구성
   - 라우터 구성
   - 공통 컴포넌트 세팅

2. **인증 플로우** (1일)
   - 로그인 페이지
   - 카카오 콜백 처리
   - 인증 상태 관리

3. **Market 사용자 플로우** (3-4일)
   - 마켓 목록 페이지
   - 마켓 상세 페이지 
   - 예측 참여 기능
   - 내 예측 상태 확인
   - POINT_PENDING/UNKNOWN polling

4. **관리자 Market 플로우** (2-3일)
   - 관리자 마켓 목록
   - 마켓 생성
   - 마켓 활성화
   - 결과 확정
   - 정산/무효 처리

### 6.2 2차 MVP (Battle 확장)

5. **Battle 사용자 플로우** (2-3일)
   - 배틀 목록 페이지
   - 배틀 상세 페이지
   - 투표 기능
   - 댓글 기능

6. **관리자 Battle 플로우** (1-2일)
   - 배틀 검수 목록
   - 배틀 승인/거절/취소

### 6.3 3차 MVP (Insight/Reputation)

7. **AI 리포트** (1-2일)
   - 마켓 AI 리포트
   - 배틀 교차분석
   - 리포트 생성 상태 polling

8. **신뢰도/방문인증** (2일)
   - 신뢰도 조회
   - 방문 인증
   - 내 정보 수정

---

## 7. 특수 요구사항 처리

### 7.1 Decimal 값 처리

**정책**: 백엔드 Decimal 값은 프론트에서 string으로 유지
```typescript
// 금지
Number(pointAmount)
parseFloat(currentPrice)

// 권장  
import { formatPointAmount } from '@/shared/lib/formatDecimal';
formatPointAmount("299.85") // "299.85P"
```

### 7.2 Idempotency Key 관리

**예측 참여 시 중복 요청 방지**:
```typescript
// features/create-prediction/lib/createPredictionIdempotencyKey.ts
export function createPredictionIdempotencyKey(marketId: number, memberId: number): string {
  return `MARKET_PREDICTION_SPEND:market:${marketId}:member:${memberId}`;
}
```

### 7.3 에러 처리 계층화

- **Toast**: 짧은 액션 실패 (예측 참여 실패, 포인트 부족)
- **Inline**: 폼 검증 오류 (필드별 에러 메시지)
- **Page Error**: 페이지 데이터 로딩 실패 (마켓 상세 조회 실패)
- **Modal**: 확인이 필요한 에러 (인증 만료 안내)

---

이 문서는 동네대전 프론트엔드의 전체 아키텍처를 정의하며, MVP 개발 진행 중 백엔드 API 변경이나 요구사항 변경 시 함께 업데이트됩니다.