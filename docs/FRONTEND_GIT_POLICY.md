# FRONTEND_GIT_POLICY.md

## 1. 문서 목적

이 문서는 Todongsan Frontend Repository의 Git 운영 규칙을 정의한다.

프론트엔드 레포는 백엔드 레포와 분리되어 관리되므로, 브랜치 전략, 커밋 메시지, Pull Request, 코드 리뷰, 형상 관리, 환경 변수 관리 기준을 별도로 문서화한다.

본 문서의 목적은 다음과 같다.

- 브랜치 생성/병합 기준 통일
- 커밋 메시지 형식 통일
- Pull Request 단위 관리
- 프론트엔드 변경 이력 추적성 확보
- 배포 가능한 상태의 브랜치 보호
- 환경 변수, 빌드 산출물, 의존성 파일 관리 기준 명확화

---

## 2. 기본 원칙

Todongsan 프론트엔드 Git 운영은 다음 원칙을 따른다.

- `main` 브랜치는 항상 배포 가능한 상태를 유지한다.
- 실제 개발은 `develop` 브랜치를 기준으로 진행한다.
- 기능 개발은 반드시 작업 브랜치를 생성하여 진행한다.
- 작업 브랜치에서 직접 `main`으로 병합하지 않는다.
- 모든 병합은 Pull Request를 통해 수행한다.
- 하나의 PR은 하나의 목적만 가진다.
- 커밋은 가능한 한 작은 단위로 나누되, 의미 없는 커밋은 남발하지 않는다.
- 빌드 산출물, 환경 변수 파일, 로컬 설정 파일은 커밋하지 않는다.
- 프론트엔드 API 연동 변경 시 관련 문서와 타입을 함께 갱신한다.

---

## 3. 브랜치 전략

### 3.1 기본 브랜치

| 브랜치 | 역할 |
|---|---|
| `main` | 배포 가능한 안정 브랜치 |
| `develop` | 통합 개발 브랜치 |
| `feature/*` | 신규 기능 개발 |
| `fix/*` | 버그 수정 |
| `refactor/*` | 리팩토링 |
| `docs/*` | 문서 수정 |
| `test/*` | 테스트 추가/수정 |
| `chore/*` | 설정, 패키지, 빌드 작업 |
| `hotfix/*` | 긴급 수정 |

### 3.2 브랜치 흐름

기본 개발 흐름은 다음과 같다.

```text
main
 ↑
develop
 ↑
feature/*
```

일반 작업은 다음 흐름으로 진행한다.

```text
develop에서 작업 브랜치 생성
→ 작업 브랜치에서 구현
→ Pull Request 생성
→ 리뷰 및 테스트 확인
→ develop에 병합
→ 배포 시점에 develop에서 main으로 병합
```

### 3.3 브랜치 생성 기준

항상 최신 `develop`에서 작업 브랜치를 생성한다.

```bash
git checkout develop
git pull origin develop
git checkout -b feature/market-list
```

### 3.4 브랜치 네이밍 규칙

브랜치 이름은 아래 형식을 따른다.

```text
type/short-description
```

예시:

```text
feature/market-list
feature/market-detail
feature/create-prediction
feature/admin-market-form
fix/prediction-status-polling
fix/login-redirect
refactor/http-client
docs/frontend-guide
test/market-card
chore/eslint-config
```

### 3.5 브랜치 타입 기준

| 타입 | 사용 기준 |
|---|---|
| `feature` | 새로운 화면, 기능, API 연동 추가 |
| `fix` | 버그 수정 |
| `refactor` | 동작 변경 없는 구조 개선 |
| `docs` | 문서 추가/수정 |
| `test` | 테스트 코드 추가/수정 |
| `chore` | 설정, 패키지, 환경 구성 |
| `hotfix` | 배포 브랜치 긴급 수정 |

---

## 4. 커밋 메시지 규칙

### 4.1 기본 형식

커밋 메시지는 Conventional Commits 형식을 따른다.

```text
type(scope): subject
```

예시:

```text
feat(market): add market list page
fix(prediction): handle POINT_UNKNOWN polling
docs: add frontend git policy
refactor(api): split market api client
test(market): add market status badge test
chore: configure eslint and prettier
```

### 4.2 type 목록

| type | 의미 |
|---|---|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `docs` | 문서 추가/수정 |
| `style` | 코드 포맷팅, 세미콜론, 공백 등 동작 변경 없는 수정 |
| `refactor` | 동작 변경 없는 코드 구조 개선 |
| `test` | 테스트 추가/수정 |
| `chore` | 빌드, 설정, 패키지, 기타 작업 |
| `perf` | 성능 개선 |
| `ci` | CI/CD 설정 변경 |
| `revert` | 이전 커밋 되돌리기 |

### 4.3 scope 기준

scope는 변경 대상 도메인 또는 영역을 사용한다.

추천 scope:

```text
app
router
api
auth
market
prediction
admin
ui
form
query
docs
config
test
```

예시:

```text
feat(auth): add login page
feat(market): add market detail page
feat(prediction): add create prediction modal
feat(admin): add market creation form
fix(api): handle 401 response interceptor
fix(query): stop polling after final prediction status
refactor(ui): extract common badge component
docs(git): add branch and commit policy
```

### 4.4 subject 작성 기준

subject는 다음 기준을 따른다.

- 영어 소문자 동사로 시작하는 것을 권장한다.
- 마침표를 붙이지 않는다.
- 너무 긴 설명을 쓰지 않는다.
- 변경 내용을 명확히 드러낸다.

좋은 예시:

```text
feat(market): add market list page
fix(auth): redirect to login on expired token
docs: add frontend architecture guide
```

나쁜 예시:

```text
update
fix
수정함
작업
market
```

### 4.5 커밋 단위 기준

커밋은 의미 있는 작업 단위로 나눈다.

좋은 커밋 단위:

```text
feat(market): add market api client
feat(market): add market list query hook
feat(market): add market list page
test(market): add market card test
```

나쁜 커밋 단위:

```text
feat: add all frontend pages and api and tests and styles
```

---

## 5. Pull Request 규칙

### 5.1 PR 생성 기준

작업 완료 후 `develop` 브랜치로 Pull Request를 생성한다.

```text
base: develop
compare: feature/*
```

`main`으로 직접 PR을 생성하지 않는다.  
단, 배포 시점에는 `develop → main` PR을 별도로 생성한다.

### 5.2 PR 제목 규칙

PR 제목은 커밋 메시지와 유사하게 작성한다.

```text
[type] 작업 요약
```

예시:

```text
[feat] 마켓 목록 화면 구현
[feat] 예측 참여 모달 구현
[fix] 인증 만료 시 로그인 리다이렉트 처리
[docs] 프론트엔드 Git 정책 문서 추가
[refactor] API 클라이언트 구조 정리
```

### 5.3 PR 단위 기준

하나의 PR은 하나의 목적만 가진다.

좋은 PR 단위:

```text
- 마켓 목록 화면 구현
- 마켓 상세 화면 구현
- 예측 참여 모달 구현
- 관리자 마켓 생성 폼 구현
- 인증 만료 공통 처리
```

나쁜 PR 단위:

```text
- 마켓 목록 + 상세 + 예측 + 관리자 + 라우터 + 스타일 전체 구현
```

### 5.4 PR 본문 템플릿

PR 본문은 다음 형식을 따른다.

```md
## 작업 내용

- 
- 
- 

## 변경 파일

- 
- 

## 검증 방법

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run test`
- [ ] `npm run build`
- [ ] 화면 수동 확인

## 관련 API / 문서

- 
- 

## 영향 범위

- 
- 

## 체크리스트

- [ ] API URL을 하드코딩하지 않았다.
- [ ] 서버 데이터를 Zustand에 중복 저장하지 않았다.
- [ ] Decimal 값을 Number로 직접 변환하지 않았다.
- [ ] errorCode 기반 에러 처리를 고려했다.
- [ ] 로컬 전용 env 값을 커밋하지 않았다.
- [ ] 불필요한 console.log를 제거했다.
```

---

## 6. 코드 리뷰 기준

### 6.1 리뷰 관점

리뷰어는 다음 항목을 확인한다.

- 브랜치/커밋 메시지가 규칙을 따르는가
- PR 범위가 너무 크지 않은가
- API 연동 경로가 Gateway 기준인가
- 서버 상태를 TanStack Query로 관리하는가
- 서버 데이터를 Zustand에 중복 저장하지 않았는가
- Decimal 값을 `Number`, `parseFloat`, `parseInt`로 직접 변환하지 않았는가
- `POINT_UNKNOWN`, `POINT_PENDING` 상태를 실패로 처리하지 않았는가
- 인증 만료 공통 처리가 깨지지 않았는가
- 관리자 권한을 프론트에서만 판단하지 않는가
- 불필요한 리렌더 또는 무거운 import가 없는가
- 화면별 에러/로딩/빈 상태 처리가 있는가
- 테스트 또는 수동 검증 결과가 명시되어 있는가

### 6.2 리뷰 반영 방식

리뷰 반영 커밋은 아래 형식을 권장한다.

```text
fix(scope): address review comments
refactor(scope): apply review feedback
```

예시:

```text
fix(market): handle empty market list state
refactor(prediction): separate polling condition
```

---

## 7. 병합 정책

### 7.1 develop 병합

일반 기능 PR은 `develop`으로 병합한다.

```text
feature/* → develop
fix/* → develop
docs/* → develop
```

### 7.2 main 병합

`main`은 배포 가능한 상태만 병합한다.

```text
develop → main
```

`main` 병합 전 다음 명령이 성공해야 한다.

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

### 7.3 Merge 방식

팀 프로젝트에서는 기본적으로 `Squash merge`를 권장한다.

장점:

- PR 단위로 히스토리가 깔끔하게 남는다.
- 중간 작업 커밋이 많아도 develop 히스토리가 지저분해지지 않는다.
- 되돌리기 쉽다.

여러 커밋의 흐름 자체가 의미 있는 경우에만 merge commit을 사용할 수 있다.

---

## 8. Rebase / Pull 규칙

### 8.1 작업 전 최신화

작업 시작 전 항상 `develop`을 최신화한다.

```bash
git checkout develop
git pull origin develop
```

### 8.2 작업 브랜치 최신화

작업 중 `develop`이 많이 변경된 경우 작업 브랜치를 최신화한다.

```bash
git checkout feature/market-list
git fetch origin
git rebase origin/develop
```

충돌이 발생하면 해결 후 다음 명령을 실행한다.

```bash
git add .
git rebase --continue
```

rebase가 어렵거나 충돌이 복잡한 경우 merge 방식으로 최신화할 수 있다.

```bash
git merge origin/develop
```

### 8.3 Force Push 주의

rebase 후 push가 거부될 경우 다음 명령을 사용한다.

```bash
git push --force-with-lease
```

`--force`는 사용하지 않는다.  
`--force-with-lease`를 사용하여 다른 사람의 원격 변경을 덮어쓰는 위험을 줄인다.

---

## 9. 충돌 해결 기준

충돌이 발생하면 다음 기준으로 해결한다.

- 자신의 변경과 상대 변경을 모두 확인한다.
- 의미를 모르는 코드를 임의로 삭제하지 않는다.
- API 타입, 라우터, 공통 컴포넌트 충돌은 특히 주의한다.
- 충돌 해결 후 반드시 빌드와 타입 체크를 수행한다.
- 충돌 해결 커밋 메시지는 명확히 작성한다.

예시:

```text
fix: resolve conflict in router configuration
fix(api): resolve market api type conflict
```

---

## 10. 태그 / 릴리즈 정책

### 10.1 태그 형식

배포 또는 발표용 안정 버전은 tag를 생성할 수 있다.

```text
v0.1.0
v0.2.0
v1.0.0
```

### 10.2 버전 기준

| 버전 | 기준 |
|---|---|
| `v0.1.0` | 초기 프론트 기본 구조 |
| `v0.2.0` | 사용자 마켓 조회/예측 플로우 |
| `v0.3.0` | 관리자 생성/활성화/결과확정 플로우 |
| `v1.0.0` | 발표 가능한 MVP |

### 10.3 태그 생성 명령

```bash
git checkout main
git pull origin main
git tag v0.1.0
git push origin v0.1.0
```

---

## 11. 환경 변수 관리

### 11.1 env 파일 기준

커밋 가능:

```text
.env.example
```

커밋 금지:

```text
.env
.env.local
.env.development.local
.env.production.local
```

### 11.2 .env.example 예시

```text
VITE_API_BASE_URL=http://localhost:9000
VITE_DEV_MEMBER_ID=
VITE_DEV_MEMBER_ROLE=
```

### 11.3 주의사항

- 실제 accessToken을 커밋하지 않는다.
- 로컬 개발용 memberId/role을 커밋하지 않는다.
- API Gateway URL은 `.env`로 관리한다.
- 코드 내부에 API baseURL을 하드코딩하지 않는다.

---

## 12. Git Ignore 정책

`.gitignore`에는 최소 다음 항목을 포함한다.

```gitignore
# dependencies
node_modules/

# build
dist/
build/

# env
.env
.env.local
.env.development.local
.env.production.local

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# editor
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# test
coverage/
playwright-report/
test-results/
```

단, 팀 공통 VS Code 설정을 공유해야 하는 경우 `.vscode/` 전체가 아니라 필요한 파일만 명시적으로 추적한다.

예시:

```gitignore
.vscode/*
!.vscode/extensions.json
!.vscode/settings.json
```

---

## 13. 의존성 관리 정책

### 13.1 패키지 매니저

프로젝트에서 사용할 패키지 매니저를 하나로 고정한다.

권장:

```text
npm 또는 pnpm 중 하나 선택
```

팀에서 `npm`을 사용하기로 했다면 `package-lock.json`을 커밋한다.  
팀에서 `pnpm`을 사용하기로 했다면 `pnpm-lock.yaml`을 커밋한다.

### 13.2 Lockfile 기준

lockfile은 반드시 커밋한다.

커밋 대상:

```text
package-lock.json
pnpm-lock.yaml
yarn.lock
```

단, 선택한 패키지 매니저의 lockfile 하나만 유지한다.  
여러 lockfile을 동시에 커밋하지 않는다.

### 13.3 패키지 추가 기준

패키지를 추가할 때는 PR 본문에 사유를 작성한다.

예시:

```md
## 패키지 추가 사유

- `decimal.js`: Decimal 문자열 포맷팅 및 안전한 소수 연산을 위해 추가
- `msw`: API mocking 기반 컴포넌트 테스트를 위해 추가
```

---

## 14. 형상 관리 대상

### 14.1 커밋해야 하는 것

- `src/` 코드
- `docs/` 문서
- `public/` 정적 리소스
- `package.json`
- lockfile
- `.env.example`
- 설정 파일
  - `vite.config.ts`
  - `tsconfig.json`
  - `eslint.config.js`
  - `prettier.config.js`
  - `tailwind.config.ts`
  - `components.json`

### 14.2 커밋하지 않는 것

- `node_modules/`
- `dist/`
- `build/`
- `.env`
- `.env.local`
- 로그 파일
- 로컬 IDE 설정
- 테스트 결과물
- coverage 결과물

---

## 15. 문서 관리 정책

프론트엔드 레포는 다음 문서를 기준으로 관리한다.

추천 문서 구조:

```text
docs/
├─ FRONTEND_GUIDE.md
├─ FRONTEND_GIT_POLICY.md
├─ FRONTEND_API_POLICY.md
└─ FRONTEND_TEST_POLICY.md
```

MVP 단계에서는 최소 다음 문서를 유지한다.

```text
docs/
├─ FRONTEND_GUIDE.md
└─ FRONTEND_GIT_POLICY.md
```

### 15.1 문서 갱신 기준

다음 변경이 발생하면 문서도 함께 갱신한다.

- 폴더 구조 변경
- 상태 관리 정책 변경
- API Gateway 연동 방식 변경
- 인증/권한 정책 변경
- 에러 처리 정책 변경
- 브랜치 전략 변경
- 테스트 명령 변경
- 배포 방식 변경

---

## 16. 작업 전 체크리스트

작업 시작 전:

```text
[ ] develop 브랜치를 최신화했다.
[ ] 작업 브랜치를 새로 생성했다.
[ ] 작업 범위를 명확히 정했다.
[ ] 관련 API 문서를 확인했다.
[ ] 필요한 env 값을 확인했다.
```

작업 완료 후:

```text
[ ] npm run lint
[ ] npm run typecheck
[ ] npm run test
[ ] npm run build
[ ] 불필요한 console.log 제거
[ ] .env 또는 로컬 설정 파일 미포함 확인
[ ] PR 본문에 검증 결과 작성
```

---

## 17. 권장 명령어

### 17.1 새 기능 개발 시작

```bash
git checkout develop
git pull origin develop
git checkout -b feature/market-list
```

### 17.2 변경 파일 확인

```bash
git status
git diff
```

### 17.3 커밋

```bash
git add .
git commit -m "feat(market): add market list page"
```

### 17.4 원격 브랜치 push

```bash
git push origin feature/market-list
```

### 17.5 develop 최신 반영

```bash
git fetch origin
git rebase origin/develop
```

### 17.6 rebase 후 push

```bash
git push --force-with-lease
```

---

## 18. 금지사항

다음 작업을 금지한다.

- `main`에 직접 push
- `develop`에 직접 push
- 작업 브랜치 없이 개발
- 의미 없는 커밋 메시지 사용
- `.env` 커밋
- `node_modules/` 커밋
- `dist/` 커밋
- 여러 lockfile 동시 커밋
- API baseURL 하드코딩
- 로컬 테스트용 memberId/role 커밋
- 다른 사람의 변경을 확인하지 않고 강제 push
- 의미를 모르는 충돌 코드 삭제
- 거대한 PR 생성
- 백엔드 API와 맞지 않는 임의 타입 생성

---

## 19. 최종 요약

Todongsan 프론트엔드 레포는 다음 Git 운영 기준을 따른다.

```text
main: 배포 가능한 안정 브랜치
develop: 통합 개발 브랜치
feature/*: 기능 개발 브랜치
fix/*: 버그 수정 브랜치
docs/*: 문서 작업 브랜치
```

커밋 메시지는 다음 형식을 따른다.

```text
type(scope): subject
```

모든 기능 개발은 작업 브랜치에서 진행하고, Pull Request를 통해 `develop`으로 병합한다.  
`main`은 배포 가능한 상태만 유지하며, 배포 시점에 `develop → main` PR을 통해 병합한다.

본 문서는 프론트엔드 개발 방식, 배포 방식, 협업 방식이 변경될 경우 함께 업데이트한다.
