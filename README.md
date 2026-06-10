# Todongsan Frontend

> 지역 선택에 필요한 집단지성을 수집하는 플랫폼 **동네대전(Todongsan)** 의 프론트엔드 레포지토리입니다.  
> Battle 블라인드 투표, Market 포인트 예측 시장, Insight/AI 분석, Reputation 기능을 사용자와 관리자 화면으로 제공합니다.

---

## 1. 프로젝트 소개

Todongsan은 지역에 대한 사람들의 선호, 경험, 예측 데이터를 수집하고 시각화하여 사용자가 더 합리적인 지역 선택을 할 수 있도록 돕는 서비스입니다.

사용자는 다음과 같은 고민을 서비스 안에서 데이터 기반으로 확인할 수 있습니다.

```text
어디로 이사 가지?
주말에 어디 여행 가지?
데이트 어디서 하지?
어디서 창업하지?
어느 동네가 앞으로 더 뜰까?
```

Todongsan은 이 문제를 다음 도메인으로 해결합니다.

| 도메인 | 역할 |
|---|---|
| Member-Point | OAuth/JWT 로그인, 회원 정보, Point 지갑/히스토리 |
| Battle | 지역 선호 기반 블라인드 투표, 댓글, 투표 결과 |
| Market | 객관적 지표 기반 포인트 예측 시장, 예측 참여, 정산/무효 처리 |
| Insight-Reputation | 사용자 신뢰도, 방문 인증, AI 요약, 데이터 분석 |
| API Gateway | 외부 요청 라우팅, JWT 검증, 인증 정보 전달 |

프론트엔드는 위 백엔드 도메인 서비스를 API Gateway를 통해 호출합니다.

```text
Browser / Frontend
  ↓
API Gateway
  ↓
Backend Domain Services
  ├─ member-point-service
  ├─ battle-service
  ├─ market-service
  └─ insight-reputation-service
```

---

## 2. 주요 사용자 흐름

```text
1. 사용자는 카카오 OAuth로 로그인한다.
2. 사용자는 Battle에서 지역 선택 투표에 참여한다.
3. 투표 참여 보상으로 서비스 내부 Point를 획득한다.
4. 투표 종료 후 전체 결과와 통계/AI 요약을 확인한다.
5. 사용자는 보유 Point로 Market 예측에 참여한다.
6. Market은 공공데이터 또는 외부 지표로 결과를 확정한다.
7. 정답 선택지 참여자는 정산 대상 Point Pool을 참여 비율대로 나눠 가진다.
8. 누적된 활동, 예측, 댓글, 인증 데이터는 Insight/Reputation에서 분석된다.
```

---

## 3. 주요 기능

### 3.1 인증 / 회원 / 포인트

- 카카오 OAuth 로그인
- JWT 기반 인증 상태 유지
- 내 정보 조회
- 포인트 잔액 조회
- 포인트 히스토리 조회
- 인증 만료 시 로그인 페이지 이동

### 3.2 Battle

- Battle 목록 조회
- Battle 상세 조회
- 블라인드 투표 참여
- 투표 후 결과 확인
- Battle 댓글 작성/조회
- 종료 후 결과 통계 확인
- AI Battle 결과 요약 확인

### 3.3 Market

- Market 목록 조회
- Market 상세 조회
- 선택지별 현재 가격 확인
- 예측 참여 전 Quote 확인
- Market 예측 참여
- 내 예측 상태 조회
- `POINT_PENDING`, `POINT_UNKNOWN` 상태 polling
- 가격 이력 확인
- 결과 확정/정산 상태 확인

### 3.4 Insight / Reputation

- 내 신뢰도 조회
- 타 사용자 신뢰도 조회
- 거주지역 선언/변경
- 방문 인증
- AI 분석 리포트 조회

### 3.5 관리자

- 관리자 Battle 검수/상태 전환
- 관리자 Market 생성
- 관리자 Market 활성화
- 관리자 Market 결과 확정
- 관리자 Insight/리포트 상태 확인

정산/환불 직접 실행 화면은 백엔드 API와 관리자 정책 확정 후 추가합니다.

---

## 4. 기술 스택

| 영역 | 기술 |
|---|---|
| Framework/Library | React |
| Build Tool | Vite |
| Language | TypeScript |
| Package Manager | npm |
| Routing | React Router |
| Server State | TanStack Query |
| Client Global State | Zustand |
| Form | React Hook Form |
| Validation | Zod |
| Styling | Tailwind CSS |
| UI Component | shadcn/ui |
| HTTP Client | Axios |
| Decimal Utility | decimal.js 또는 bignumber.js |
| Unit Test | Vitest |
| Component Test | React Testing Library |
| API Mocking | MSW |
| E2E Test | Playwright |

---

## 5. 실행 환경

| 항목 | 기준 |
|---|---|
| Node.js | 20.x 이상 권장 |
| Package Manager | npm |
| Local Dev Server | http://localhost:5173 |
| API Gateway | http://localhost:9000 |

API Gateway의 로컬 기본 포트는 `9000`입니다.  
개별 백엔드 서비스 포트는 프론트가 직접 호출하지 않는 것을 원칙으로 합니다.

---

## 6. 설치 및 실행

### 6.1 Repository Clone

```bash
git clone {frontend-repository-url}
cd {frontend-repository-name}
```

### 6.2 Package Install

```bash
npm install
```

### 6.3 Development Server 실행

```bash
npm run dev
```

개발 서버 기본 주소:

```text
http://localhost:5173
```

---

## 7. 환경 변수 설정

루트 경로에 `.env.local` 파일을 생성합니다.

```env
VITE_API_BASE_URL=http://localhost:9000
VITE_DEV_MEMBER_ID=
VITE_DEV_MEMBER_ROLE=
```

### 7.1 환경 변수 설명

| 변수 | 설명 |
|---|---|
| `VITE_API_BASE_URL` | API Gateway base URL |
| `VITE_DEV_MEMBER_ID` | Gateway 없이 특정 서비스 단독 테스트 시 사용하는 로컬 개발용 memberId |
| `VITE_DEV_MEMBER_ROLE` | Gateway 없이 특정 서비스 단독 테스트 시 사용하는 로컬 개발용 role |

### 7.2 주의사항

- `.env.local`은 Git에 커밋하지 않습니다.
- 실제 accessToken, refreshToken을 커밋하지 않습니다.
- 운영/통합 환경에서는 프론트가 `X-Member-Id`, `X-Member-Role`을 직접 조작하지 않습니다.
- 운영/통합 환경에서는 API Gateway가 JWT를 검증하고 downstream service로 인증 정보를 전달합니다.
- 로컬 개발용 환경 변수 예시는 `.env.example`에만 작성합니다.

---

## 8. 주요 명령어

| 명령어 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint` | ESLint 검사 |
| `npm run typecheck` | TypeScript 타입 검사 |
| `npm run test` | 테스트 실행 |

프로젝트 초기 설정 전에는 일부 명령어가 아직 없을 수 있습니다.  
스크립트가 추가되면 본 문서를 함께 갱신합니다.

---

## 9. 폴더 구조

Todongsan Frontend는 FSD-lite 구조를 사용합니다.

```text
src/
├─ app/        # router, provider, queryClient 등 앱 초기화 코드
├─ pages/      # URL에 대응되는 페이지 컴포넌트
├─ features/   # 사용자의 행동 단위 기능
├─ entities/   # 핵심 도메인 모델, API, UI
├─ shared/     # 공통 API, UI, lib, types
└─ main.tsx
```

### 9.1 레이어 의존성 방향

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

하위 레이어가 상위 레이어를 import하지 않습니다.  
자세한 폴더 구조와 import 규칙은 `docs/FRONTEND_GUIDE.md`를 참고합니다.

---

## 10. API 연동 기준

프론트엔드는 API Gateway를 통해 백엔드 도메인 서비스와 통신합니다.

```text
Frontend → API Gateway → Backend Domain Services
```

### 10.1 API 계약 기준

프론트엔드는 다음 문서를 API 계약의 기준으로 삼습니다.

- 각 도메인 API 명세서
- API Gateway 명세서
- Swagger/OpenAPI 문서

프론트는 API endpoint, request field, response field, errorCode를 임의로 생성하거나 변경하지 않습니다.

### 10.2 공통 응답 형식

백엔드 공통 응답은 다음 형태를 기준으로 처리합니다.

```ts
export type ApiResponse<T> = {
  success: boolean;
  errorCode: string | null;
  message: string | null;
  data: T;
  timestamp: string;
};
```

### 10.3 API 처리 원칙

- API baseURL은 `.env`로 관리합니다.
- API URL을 컴포넌트에 하드코딩하지 않습니다.
- 모든 API 요청은 공통 `httpClient`를 통해 수행합니다.
- 서버 상태는 TanStack Query로 관리합니다.
- 백엔드 `errorCode`를 기준으로 에러를 처리합니다.
- 인증 만료 시 공통 인터셉터에서 인증 상태 초기화 및 로그인 페이지 이동을 처리합니다.
- `POINT_PENDING`, `POINT_UNKNOWN` 상태는 실패로 처리하지 않고 polling으로 최종 상태를 확인합니다.
- Decimal 계열 값은 `string`으로 취급합니다.
- `/internal/**` API는 프론트에서 호출하지 않습니다.

자세한 API 연동 정책은 `docs/FRONTEND_API_POLICY.md`를 참고합니다.

---

## 11. 상태 관리 기준

상태의 성격에 따라 관리 도구를 분리합니다.

| 상태 | 도구 |
|---|---|
| 서버 상태 | TanStack Query |
| 클라이언트 전역 상태 | Zustand |
| 폼 상태 | React Hook Form |
| 폼 검증 | Zod |
| URL 상태 | query string |
| 단순 UI 상태 | useState |

서버에서 조회한 목록/상세/히스토리/내 상태 데이터는 Zustand에 중복 저장하지 않습니다.  
자세한 상태 관리 기준은 `docs/FRONTEND_GUIDE.md`를 참고합니다.

---

## 12. Git 운영 규칙

프론트엔드 레포는 다음 브랜치 전략을 사용합니다.

```text
main      # 배포 가능한 안정 브랜치
develop   # 통합 개발 브랜치
feature/* # 기능 개발 브랜치
fix/*     # 버그 수정 브랜치
docs/*    # 문서 작업 브랜치
```

커밋 메시지는 Conventional Commits 형식을 따릅니다.

```text
type(scope): subject
```

예시:

```text
feat(battle): add battle list page
feat(market): add market detail page
fix(auth): redirect to login on expired token
docs: add frontend readme
```

자세한 Git 운영 규칙은 `docs/FRONTEND_GIT_POLICY.md`를 참고합니다.

---

## 13. 문서 목록

프론트엔드 레포는 다음 문서를 기준으로 관리합니다.

| 문서 | 설명 | 상태 |
|---|---|---|
| `README.md` | 프로젝트 소개, 실행 방법, 문서 진입점 | 작성 |
| [`docs/FRONTEND_GUIDE.md`](./docs/FRONTEND_GUIDE.md) | 프론트엔드 개발 가이드 | 작성 |
| [`docs/FRONTEND_GIT_POLICY.md`](./docs/FRONTEND_GIT_POLICY.md) | Git 브랜치, 커밋, PR 정책 | 작성 |
| [`docs/FRONTEND_API_POLICY.md`](./docs/FRONTEND_API_POLICY.md) | API 연동, 에러 처리, polling, Decimal 정책 | 작성 |
| [`docs/FRONTEND_SCREEN_FLOW.md`](./docs/FRONTEND_SCREEN_FLOW.md) | 화면 흐름, 라우트, API 사용 시나리오 | 작성 예정 |
| [`docs/FRONTEND_TEST_POLICY.md`](./docs/FRONTEND_TEST_POLICY.md) | 테스트 전략, 테스트 대상, 실행 기준 | 작성 예정 |
| [`docs/FRONTEND_UI_POLICY.md`](./docs/FRONTEND_UI_POLICY.md) | UI 컴포넌트, 상태 표시, 로딩/에러/빈 화면 기준 | 작성 예정 |
| `.github/pull_request_template.md` | PR 작성 템플릿 | 작성 예정 |
| `.env.example` | 로컬 환경 변수 예시 | 작성 예정 |

---

## 14. 개발 전 체크리스트

```text
[ ] Node.js 버전 확인
[ ] npm install 완료
[ ] .env.local 생성
[ ] VITE_API_BASE_URL=http://localhost:9000 설정
[ ] API Gateway 실행 여부 확인
[ ] docs/FRONTEND_GUIDE.md 확인
[ ] docs/FRONTEND_GIT_POLICY.md 확인
[ ] docs/FRONTEND_API_POLICY.md 확인
[ ] develop 브랜치에서 작업 브랜치 생성
```

---

## 15. PR 전 체크리스트

```text
[ ] npm run lint
[ ] npm run typecheck
[ ] npm run test
[ ] npm run build
[ ] 불필요한 console.log 제거
[ ] .env 또는 로컬 설정 파일 미포함 확인
[ ] API URL 하드코딩 여부 확인
[ ] Decimal 값을 Number로 직접 변환하지 않았는지 확인
[ ] 서버 데이터를 Zustand에 중복 저장하지 않았는지 확인
[ ] errorCode 기반 에러 처리를 고려했는지 확인
```

프로젝트 초기 설정 전에는 일부 명령어가 아직 없을 수 있습니다.  
스크립트가 추가되면 본 체크리스트와 PR 템플릿을 함께 갱신합니다.

---

## 16. 최종 요약

Todongsan Frontend는 다음 기준으로 개발합니다.

```text
React + Vite + TypeScript
npm
Tailwind CSS + shadcn/ui
API Gateway 기반 REST API 연동
Backend Domain Services 전체 대상
FSD-lite 구조
TanStack Query + Zustand + React Hook Form
errorCode 기반 에러 처리
POINT_PENDING / POINT_UNKNOWN polling
Decimal string 처리
```

본 README는 프로젝트 구조, 실행 방식, API 연동 방식, 문서 구성이 변경될 경우 함께 갱신합니다.
