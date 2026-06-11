# 프론트엔드 구조 설계 프롬프트

> Claude CLI / Claude Code 서브에이전트에 그대로 붙여넣어 사용하세요.
> 실행 전 `/todongsan-frontend/docs/` 아래 5개 정책 파일을 읽도록 지시합니다.

---

## PROMPT

You are a senior frontend architect working on the **동네대전(todongsan)** project.

Before doing anything else, read **all five policy documents** in `/todongsan-frontend/docs/`:
- `FRONTEND_GUIDE.md`
- `FRONTEND_API_POLICY.md`
- `FRONTEND_GIT_POLICY.md`
- `FRONTEND_SCREEN_FLOW.md`
- `FRONTEND_UI_POLICY.md`

Also read the backend API spec for reference:
- `/todongsan/docs/` (scan subdirectories: battle, gateway, insight-reputation, market, member-point)
- `/todongsan/API_SPEC.md` if it exists

---

## CONTEXT

### Project overview
동네대전은 지역 기반 집단지성 플랫폼이다. 세 도메인으로 구성된다:
- **Battle** – 블라인드 투표 (지역 이슈 찬반/선택 배틀)
- **Market** – 포인트 예측 시장
- **Insight** – AI 분석 리포트 + 평판(Reputation) 시스템

MSA 백엔드(api-gateway → battle-service / market-service / member-point-service / insight-reputation)와 REST API로 통신한다.
게이트웨이 base URL: `http://localhost:8080` (로컬 기준)

### Frontend stack (already set up)
- **Vite + React + TypeScript**
- **shadcn/ui** (components.json 존재)
- **MSW** (public/mockServiceWorker.js, src/mocks/ 존재) – API mocking
- **FSD-like structure**: `src/app`, `src/pages`, `src/entities`, `src/shared`, `src/assets`

### Current src structure
```
src/
├── app/          # 앱 진입점, 라우터, 전역 프로바이더
├── assets/       # 정적 자산
├── entities/     # 도메인 엔티티 타입 및 상태
├── mocks/        # MSW handlers
├── pages/        # 페이지 컴포넌트
├── shared/       # 공통 컴포넌트, hooks, utils, api client
├── index.css
└── main.tsx
```

---

## TASK

정책 파일을 읽은 뒤, 아래 작업을 **순서대로** 수행하라.

### 1. 구조 설계 문서 작성

`/todongsan-frontend/docs/FRONTEND_STRUCTURE.md` 파일을 **새로 생성**하라.
파일에는 다음 내용이 포함되어야 한다:

#### 1-1. 디렉토리 트리 (권장 구조)
정책 파일에서 확인한 컨벤션을 바탕으로 `src/` 전체 디렉토리 트리를 제안하라.
각 도메인(battle / market / insight / member)별 하위 구조까지 명시하라.
예시 형식:
```
src/
├── app/
│   ├── router/
│   ├── providers/
│   └── App.tsx
├── pages/
│   ├── battle/
│   ├── market/
│   ├── insight/
│   └── ...
├── entities/
│   ├── battle/
│   ├── market/
│   └── ...
├── shared/
│   ├── api/        # axios instance, interceptors
│   ├── ui/         # shadcn 래퍼, 공통 컴포넌트
│   ├── hooks/
│   ├── utils/
│   └── types/
└── mocks/
    ├── handlers/
    └── browser.ts
```

#### 1-2. 레이어 의존성 규칙
어떤 레이어가 어떤 레이어에 의존할 수 있는지 표로 정리하라.

#### 1-3. API 클라이언트 설계
- axios instance 설정 위치
- 인증 헤더(X-Member-Id) 주입 방식
- MSW mock handler 파일 분리 방식 (도메인별)
- 에러 응답 공통 처리 방식 (`{ success, data, error }` 포맷 기준)

#### 1-4. 라우팅 구조
SCREEN_FLOW 정책 기반으로 라우트 목록을 표로 정리하라 (path / 페이지 컴포넌트 / 인증 필요 여부).

#### 1-5. 상태 관리 전략
전역 상태 vs 서버 상태 vs 로컬 상태 분리 방침을 명시하라.
(라이브러리 미설치 시 권장 라이브러리도 함께 제안)

---

### 2. 스캐폴딩 실행

문서 작성 후, 실제 파일/디렉토리를 생성하라.

#### 2-1. 디렉토리 생성
1-1에서 설계한 구조대로 `src/` 하위 디렉토리를 생성하라.
(기존 디렉토리는 건드리지 말 것)

#### 2-2. 공통 파일 생성
아래 파일들을 생성하라. 내용은 정책 파일 기반으로 실제 동작 가능한 코드로 작성하라.

| 파일 | 내용 |
|---|---|
| `src/shared/api/client.ts` | axios instance, X-Member-Id 인터셉터, 에러 핸들러 |
| `src/shared/api/types.ts` | 공통 응답 타입 `ApiResponse<T>`, `ApiError` |
| `src/shared/types/index.ts` | 공통 타입 re-export |
| `src/mocks/browser.ts` | MSW browser setup |
| `src/mocks/handlers/index.ts` | 도메인별 handler 통합 export |
| `src/mocks/handlers/battle.ts` | Battle 도메인 stub handler (뼈대만) |
| `src/mocks/handlers/market.ts` | Market 도메인 stub handler (뼈대만) |
| `src/mocks/handlers/insight.ts` | Insight/Reputation 도메인 stub handler (뼈대만) |
| `src/mocks/handlers/member.ts` | Member/Point 도메인 stub handler (뼈대만) |
| `src/app/router/index.tsx` | React Router 라우트 정의 (1-4 기반) |
| `src/app/providers/index.tsx` | QueryClientProvider 등 전역 프로바이더 |

#### 2-3. 엔티티 타입 뼈대 생성
각 도메인의 핵심 엔티티 타입 파일을 생성하라:
- `src/entities/battle/types.ts` – Battle, Vote, Comment
- `src/entities/market/types.ts` – Market, Prediction
- `src/entities/insight/types.ts` – InsightReport, Reputation, VisitCertification
- `src/entities/member/types.ts` – Member, Point

백엔드 API 응답 스키마를 참고하여 실제 필드를 반영하라.

#### 2-4. 페이지 뼈대 생성
각 라우트에 대응하는 페이지 컴포넌트를 생성하라. 내용은 `<div>페이지명</div>` 수준의 placeholder로 충분하다.

---

### 3. 검증

스캐폴딩 완료 후 아래를 확인하라:

1. `cd /todongsan-frontend && npm run build` 가 에러 없이 통과하는지 확인하라.
   - 타입 에러가 있으면 수정하라.
2. 생성된 파일 목록을 트리 형태로 출력하라.
3. 추가로 설치가 필요한 패키지가 있으면 목록을 알려주되, **npm install은 직접 실행하지 말고 목록만 제시**하라.

---

## CONSTRAINTS

- 기존 파일(vite.config.ts, package.json, tsconfig*.json, components.json, index.html, main.tsx 등)은 **수정하지 말 것**. 단, 빌드 에러 해결에 꼭 필요한 import 수정은 허용.
- shadcn/ui 컴포넌트는 이미 설치된 것만 사용하라. 새 컴포넌트 추가(npx shadcn add)는 하지 말 것.
- MSW handler에서 실제 네트워크 요청은 보내지 말 것.
- 모든 파일은 TypeScript(.ts/.tsx)로 작성하라.
- 정책 파일과 충돌하는 구조/컨벤션은 채택하지 말 것. 정책 파일이 최우선이다.
