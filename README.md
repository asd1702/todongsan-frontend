# Todongsan Frontend

Todongsan Frontend는 부동산 기반 예측 시장 서비스 **토동산(Todongsan)** 의 사용자 및 관리자 화면을 제공하는 React 기반 SPA입니다.

사용자는 마켓 목록 조회, 마켓 상세 조회, 예측 참여, 내 예측 상태 확인을 수행할 수 있습니다.  
관리자는 마켓 생성, 마켓 활성화, 결과 확정을 수행할 수 있습니다.

---

## 1. 프로젝트 소개

Todongsan은 부동산 관련 주제에 대해 사용자가 예측에 참여하고, 결과에 따라 정산을 받는 예측 시장 서비스입니다.

프론트엔드는 백엔드 MSA와 API Gateway를 통해 통신하며, Market 도메인을 중심으로 사용자 플로우와 관리자 플로우를 제공합니다.

```text
Frontend
  ↓
API Gateway
  ↓
market-service
```

---

## 2. 주요 기능

### 2.1 사용자 기능

- 마켓 목록 조회
- 마켓 상세 조회
- 선택지별 현재 가격 확인
- 가격 이력 확인
- 예측 참여
- 내 예측 상태 조회
- `POINT_PENDING`, `POINT_UNKNOWN` 상태 확인

### 2.2 관리자 기능

- 관리자 마켓 목록 조회
- 관리자 마켓 생성
- 마켓 활성화
- 마켓 결과 확정

정산/환불 화면은 백엔드 API 구현 이후 추가합니다.

---

## 3. 기술 스택

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
| Unit Test | Vitest |
| Component Test | React Testing Library |
| API Mocking | MSW |
| E2E Test | Playwright |

---

## 4. 실행 환경

| 항목 | 기준 |
|---|---|
| Node.js | 20.x 이상 권장 |
| Package Manager | npm |
| Local Dev Server | http://localhost:5173 |
| API Gateway | http://localhost:8080 |

API Gateway 포트는 로컬 개발 기본값으로 `8080`을 사용합니다.  
배포 또는 팀 인프라 구성 이후 실제 Gateway 주소가 확정되면 `.env` 값으로 변경합니다.

---

## 5. 설치 및 실행

### 5.1 Repository Clone

```bash
git clone {frontend-repository-url}
cd {frontend-repository-name}
```

### 5.2 Package Install

```bash
npm install
```

### 5.3 Development Server 실행

```bash
npm run dev
```

개발 서버 기본 주소:

```text
http://localhost:5173
```

---

## 6. 환경 변수 설정

루트 경로에 `.env.local` 파일을 생성합니다.

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_DEV_MEMBER_ID=
VITE_DEV_MEMBER_ROLE=
```

### 6.1 환경 변수 설명

| 변수 | 설명 |
|---|---|
| `VITE_API_BASE_URL` | API Gateway base URL |
| `VITE_DEV_MEMBER_ID` | Gateway 없이 market-service 직접 호출 시 사용하는 로컬 개발용 memberId |
| `VITE_DEV_MEMBER_ROLE` | Gateway 없이 market-service 직접 호출 시 사용하는 로컬 개발용 role |

### 6.2 주의사항

- `.env.local`은 Git에 커밋하지 않습니다.
- 실제 accessToken을 커밋하지 않습니다.
- 운영/통합 환경에서는 프론트가 `X-Member-Id`, `X-Member-Role`을 직접 조작하지 않습니다.
- 운영/통합 환경에서는 API Gateway가 인증 정보를 downstream service로 전달합니다.
- 로컬 개발용 환경 변수 예시는 `.env.example`에만 작성합니다.

---

## 7. 주요 명령어

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

## 8. 폴더 구조

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

### 8.1 레이어 의존성 방향

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

## 9. API 연동 기준

프론트엔드는 API Gateway를 통해 백엔드 MSA와 통신합니다.

```text
Frontend → API Gateway → market-service
```

### 9.1 공통 응답 형식

백엔드 공통 응답은 다음 형태를 기준으로 처리합니다.

```ts
export type ApiResponse<T> = {
  success: boolean;
  errorCode: string | null;
  message: string;
  data: T;
  timestamp: string;
};
```

### 9.2 API 처리 원칙

- API baseURL은 `.env`로 관리합니다.
- API URL을 컴포넌트에 하드코딩하지 않습니다.
- 모든 API 요청은 공통 `httpClient`를 통해 수행합니다.
- 서버 상태는 TanStack Query로 관리합니다.
- 백엔드 `errorCode`를 기준으로 에러를 처리합니다.
- 인증 만료 시 공통 인터셉터에서 인증 상태 초기화 및 로그인 페이지 이동을 처리합니다.
- `POINT_PENDING`, `POINT_UNKNOWN` 상태는 실패로 처리하지 않고 polling으로 최종 상태를 확인합니다.
- Decimal 계열 값은 `string`으로 취급합니다.

자세한 API 연동 정책은 `docs/FRONTEND_API_POLICY.md`를 참고합니다.

---

## 10. 상태 관리 기준

상태의 성격에 따라 관리 도구를 분리합니다.

| 상태 | 도구 |
|---|---|
| 서버 상태 | TanStack Query |
| 클라이언트 전역 상태 | Zustand |
| 폼 상태 | React Hook Form |
| 폼 검증 | Zod |
| URL 상태 | query string |
| 단순 UI 상태 | useState |

서버에서 조회한 마켓 목록, 마켓 상세, 가격 이력, 내 예측 상태는 Zustand에 중복 저장하지 않습니다.  
자세한 상태 관리 기준은 `docs/FRONTEND_GUIDE.md`를 참고합니다.

---

## 11. Git 운영 규칙

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
feat(market): add market list page
fix(auth): redirect to login on expired token
docs: add frontend readme
```

자세한 Git 운영 규칙은 `docs/FRONTEND_GIT_POLICY.md`를 참고합니다.

---

## 12. 문서 목록

프론트엔드 레포는 다음 문서를 기준으로 관리합니다.

| 문서 | 설명 | 상태 |
|---|---|---|
| `README.md` | 프로젝트 소개, 실행 방법, 문서 진입점 | 작성 |
| `docs/FRONTEND_GUIDE.md` | 프론트엔드 개발 가이드 | 작성 |
| `docs/FRONTEND_GIT_POLICY.md` | Git 브랜치, 커밋, PR 정책 | 작성 |
| `docs/FRONTEND_API_POLICY.md` | API 연동, 에러 처리, polling, Decimal 정책 | 작성 예정 |
| `docs/FRONTEND_SCREEN_FLOW.md` | 화면 흐름, 라우트, API 사용 시나리오 | 작성 예정 |
| `docs/FRONTEND_TEST_POLICY.md` | 테스트 전략, 테스트 대상, 실행 기준 | 작성 예정 |
| `docs/FRONTEND_UI_POLICY.md` | UI 컴포넌트, 상태 표시, 로딩/에러/빈 화면 기준 | 작성 예정 |
| `.github/pull_request_template.md` | PR 작성 템플릿 | 작성 예정 |
| `.env.example` | 로컬 환경 변수 예시 | 작성 예정 |

---

## 13. 개발 전 체크리스트

프론트엔드 개발 시작 전 다음 항목을 확인합니다.

```text
[ ] Node.js 버전 확인
[ ] npm install 완료
[ ] .env.local 생성
[ ] VITE_API_BASE_URL 설정
[ ] API Gateway 실행 여부 확인
[ ] docs/FRONTEND_GUIDE.md 확인
[ ] docs/FRONTEND_GIT_POLICY.md 확인
[ ] develop 브랜치에서 작업 브랜치 생성
```

---

## 14. PR 전 체크리스트

Pull Request 생성 전 다음 항목을 확인합니다.

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

## 15. 최종 요약

Todongsan Frontend는 다음 기준으로 개발합니다.

```text
React + Vite + TypeScript
npm
Tailwind CSS + shadcn/ui
API Gateway 기반 REST API 연동
FSD-lite 구조
TanStack Query + Zustand + React Hook Form
관리자 페이지 MVP 포함
errorCode 기반 에러 처리
POINT_PENDING / POINT_UNKNOWN polling
Decimal string 처리
```

본 README는 프로젝트 구조, 실행 방식, 문서 구성이 변경될 경우 함께 갱신합니다.
