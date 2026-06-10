# FRONTEND_SCREEN_FLOW.md

## 1. 문서 목적

이 문서는 Todongsan Frontend의 화면 구성, 라우트 구조, 사용자/관리자 플로우, 화면별 API 연동 기준, 상태 처리 기준을 정의한다.

본 문서는 백엔드 API 명세 자체를 대체하지 않는다.  
각 화면에서 어떤 API를 사용할지, 어떤 상태를 UI에서 처리해야 할지, MVP 개발 우선순위를 어떻게 잡을지를 정리하는 프론트엔드 화면 설계 문서이다.

---

## 2. 기준 문서

본 문서는 다음 백엔드/프론트엔드 문서를 기준으로 작성한다.

- `README.md` — 동네대전 전체 서비스 개요
- `API_GATEWAY_SPEC.md` — Gateway 라우팅, 인증, 외부/내부 API 구분
- `MEMBER_POINT_API_SPEC.md` — 로그인, 회원, 포인트 API
- `BATTLE_API_SPEC.md` — Battle 사용자/관리자 API
- `MARKET_API_SPEC.md` — Market 사용자/관리자 API
- `INSIGHT_API_SPEC.md` — Insight/Reputation API
- `FRONTEND_GUIDE.md` — 프론트엔드 구조/상태 관리/검증 정책
- `FRONTEND_API_POLICY.md` — API 연동 정책

---

## 3. 전체 서비스 구조

동네대전은 지역 선택에 필요한 집단지성을 수집하는 플랫폼이다.

- `Battle`: 주관적 선호를 블라인드 투표로 수집
- `Market`: 객관적으로 판정 가능한 지역 지표를 포인트 예측 시장으로 운영
- `Point`: Battle 참여 보상, Market 예측 참여, Insight 소비에 사용되는 내부 재화
- `Insight/Reputation`: AI 요약, 신뢰도, 방문 인증, 데이터 분석

프론트엔드는 개별 백엔드 서비스를 직접 호출하지 않고 API Gateway를 통해 백엔드 도메인 서비스와 통신한다.

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

## 4. 라우트 설계 원칙

### 4.1 Depth 기준

라우트 depth는 최대 3단계를 권장한다.

```text
1 depth: 도메인 진입
2 depth: 상세 또는 하위 목록
3 depth: 상세 내부의 독립 액션
4 depth 이상: 지양
```

예시:

```text
/markets                         # 1 depth
/markets/:marketId               # 2 depth
/admin/markets/:marketId/result  # 3 depth
```

4 depth 이상이 필요해 보이는 경우에는 우선 다음 방식으로 대체한다.

- 탭
- 모달
- Drawer
- Query string
- 상세 페이지 내부 섹션

예시:

```text
권장:
/markets/:marketId?tab=history
/markets/:marketId?tab=my-prediction

비권장:
/markets/:marketId/predictions/me/detail/history
```

---

## 5. 화면 분리 기준

### 5.1 독립 페이지로 분리하는 기준

다음 조건 중 하나 이상에 해당하면 독립 페이지로 분리할 수 있다.

- URL로 직접 접근해야 한다.
- 새로고침 후에도 동일 화면 상태가 유지되어야 한다.
- 화면 자체가 하나의 주요 업무 흐름이다.
- 관리자 기능처럼 접근 권한이 명확히 분리된다.
- 목록/상세/생성처럼 브라우저 히스토리 관리가 필요하다.

### 5.2 탭/모달/섹션으로 처리하는 기준

다음 항목은 독립 페이지보다 기존 상세 화면 내부에서 처리하는 것을 우선한다.

- 예측 참여
- Quote 미리보기
- 내 예측 상태
- Battle 투표
- Battle 댓글
- Battle 결과 요약
- 방문 인증 신청/내역
- 관리자 마켓 세부 액션 일부

---

## 6. 전체 화면 후보와 실제 라우트 판단

초기 화면 후보는 약 24개로 정리되었으나, 실제 라우트 기준으로는 약 20~21개로 축소한다.

| 영역 | 초기 후보 | 실제 라우트 판단 |
|---|---:|---:|
| 인증 | 2 | 2 |
| 메인 | 1 | 1 |
| Battle 사용자 | 4 | 2 |
| Market 사용자 | 5 | 3 |
| MyPage | 5 | 4 |
| Reputation | 1 | 1 |
| Admin | 6 | 8~9 |
| 합계 | 약 24 | 약 21 |

Battle 결과, 예측 참여, 내 예측 상태, 방문 인증 내역은 독립 페이지가 아니라 상세 화면 내부 탭/모달/섹션으로 우선 처리한다.

---

## 7. 최종 라우트 목록

### 7.1 인증

| Route | 화면 | 인증 | 설명 |
|---|---|---|---|
| `/login` | 로그인 페이지 | 비인증 | 카카오 로그인 진입 |
| `/auth/kakao/callback` | 카카오 로그인 처리 | 비인증 | 카카오 토큰 처리 후 JWT 저장 및 리다이렉트 |

### 7.2 메인

| Route | 화면 | 인증 | 설명 |
|---|---|---|---|
| `/` | 메인 홈 | 선택 | 인기 Battle, 진행 중 Market, 서비스 소개, 내 포인트 요약 |

### 7.3 Battle 사용자

| Route | 화면 | 인증 | 설명 |
|---|---|---|---|
| `/battles` | Battle 목록 | 선택 | 진행 중/종료 Battle 목록 조회 |
| `/battles/:battleId` | Battle 상세 | 선택/필요 시 인증 | 투표, 댓글, 결과, 기본 분석 표시 |

Battle 상세 내부 처리:

- 투표 UI
- 댓글 목록/작성
- 투표 후 결과 공개
- 종료 후 결과 공개
- 기본 교차분석 요약

### 7.4 Market 사용자

| Route | 화면 | 인증 | 설명 |
|---|---|---|---|
| `/markets` | Market 목록 | 선택 | 진행 중/마감/정산 완료 Market 목록 |
| `/markets/:marketId` | Market 상세 | 선택/예측 참여 시 인증 | 가격 그래프, 선택지, Quote, 예측 참여, 내 예측 상태 |
| `/markets/:marketId/report` | Market AI 리포트 | 인증 | 80P 차감 또는 기존 리포트 조회 |

Market 상세 내부 처리:

- 선택지별 현재 가격
- 가격 변화 그래프
- 판정 기준/데이터 출처
- Quote 미리보기
- 예측 참여 모달 또는 Drawer
- 내 예측 상태 카드
- `POINT_PENDING`, `POINT_UNKNOWN` polling

### 7.5 MyPage

| Route | 화면 | 인증 | 설명 |
|---|---|---|---|
| `/my` | 마이페이지 | 인증 | 신뢰도 요약, 포인트 잔액, 최근 활동 |
| `/my/profile` | 내 정보 수정 | 인증 | 닉네임, 거주지 수정 |
| `/my/points` | 포인트 내역 | 인증 | 적립/차감/정산/환불 내역 |
| `/my/visit-certifications` | 방문 인증 | 인증 | GPS/댓글 기반 방문 인증 및 인증 내역 |

방문 인증 신청과 방문 인증 내역은 하나의 페이지에서 탭 또는 섹션으로 처리한다.

### 7.6 Reputation

| Route | 화면 | 인증 | 설명 |
|---|---|---|---|
| `/reputations/:memberId` | 타인 신뢰도 조회 | 선택/인증 권장 | 특정 회원의 신뢰도, 활동, 인증 정보 조회 |

내 신뢰도는 `/my`에서 요약 표시한다.

### 7.7 Admin

| Route | 화면 | 인증 | 권한 | 설명 |
|---|---|---|---|---|
| `/admin` | 관리자 대시보드 | 인증 | ADMIN | 관리 요약 |
| `/admin/battles` | Battle 관리 목록 | 인증 | ADMIN | 승인/거절/취소 대상 Battle 목록 |
| `/admin/battles/:battleId` | Battle 관리자 상세 | 인증 | ADMIN | Battle 상태, 상세, 승인/거절/취소 |
| `/admin/battles/:battleId/analysis` | Battle 교차분석 결과 | 인증 | ADMIN | 관리자 전용 분석 결과 |
| `/admin/battles/:battleId/report` | Battle AI 리포트 조회 | 인증 | ADMIN | 자동 생성된 Battle AI 리포트 조회 |
| `/admin/markets` | Market 관리 목록 | 인증 | ADMIN | Market 상태별 관리 목록 |
| `/admin/markets/new` | Market 생성 | 인증 | ADMIN | Market 생성 폼 |
| `/admin/markets/:marketId` | Market 관리자 상세 | 인증 | ADMIN | 활성화, 정산, 무효 처리, 상태 확인 |
| `/admin/markets/:marketId/result` | Market 결과 확정 | 인증 | ADMIN | 결과 입력 및 확정 |

정산/무효처리는 초기에는 `/admin/markets/:marketId` 내부 액션으로 처리한다.  
결과 확정은 폼이 복잡하므로 별도 라우트로 분리한다.

---

## 8. MVP 구현 우선순위

### 8.1 1차 MVP — Market 중심 발표 플로우

Market 예측 시장 플로우를 먼저 완성한다.

| 우선순위 | Route | 목적 |
|---:|---|---|
| 1 | `/login` | 로그인 진입 |
| 2 | `/auth/kakao/callback` | 로그인 처리 |
| 3 | `/` | 메인 홈 |
| 4 | `/markets` | Market 목록 |
| 5 | `/markets/:marketId` | Market 상세 + 예측 참여 |
| 6 | `/my` | 내 포인트/신뢰도 요약 |
| 7 | `/my/points` | 포인트 내역 |
| 8 | `/admin` | 관리자 진입 |
| 9 | `/admin/markets` | Market 관리 목록 |
| 10 | `/admin/markets/new` | Market 생성 |
| 11 | `/admin/markets/:marketId` | Market 활성화/정산/무효 처리 |
| 12 | `/admin/markets/:marketId/result` | 결과 확정 |

### 8.2 2차 MVP — Battle 포함

| 우선순위 | Route | 목적 |
|---:|---|---|
| 13 | `/battles` | Battle 목록 |
| 14 | `/battles/:battleId` | Battle 투표/댓글/결과 |
| 15 | `/admin/battles` | Battle 검수 목록 |
| 16 | `/admin/battles/:battleId` | Battle 승인/거절/취소 |

### 8.3 3차 MVP — Insight/Reputation 확장

| 우선순위 | Route | 목적 |
|---:|---|---|
| 17 | `/markets/:marketId/report` | Market AI 리포트 |
| 18 | `/admin/battles/:battleId/analysis` | Battle 교차분석 |
| 19 | `/admin/battles/:battleId/report` | Battle AI 리포트 조회 |
| 20 | `/my/profile` | 내 정보 수정 |
| 21 | `/my/visit-certifications` | 방문 인증 |
| 22 | `/reputations/:memberId` | 타인 신뢰도 조회 |

---

## 9. 사용자 핵심 시나리오

### 9.1 로그인 시나리오

```text
/login
→ 카카오 로그인 버튼 클릭
→ 카카오 인증
→ /auth/kakao/callback
→ POST /api/v1/members/oauth/kakao
→ accessToken / refreshToken 저장
→ / 또는 이전 페이지로 이동
```

처리 상태:

- 로그인 처리 중
- 로그인 실패
- 신규 회원 여부
- 토큰 저장 실패
- callback 파라미터 오류

### 9.2 Battle 투표 시나리오

```text
/battles
→ Battle 선택
→ /battles/:battleId
→ 선택지 선택
→ 투표 요청
→ 투표 완료
→ 결과 일부 공개
→ 댓글 작성
```

UI 처리:

- 미로그인 사용자는 투표 클릭 시 로그인 유도
- 진행 중 + 미투표 사용자는 결과 비공개
- 진행 중 + 투표 완료 사용자는 부분 결과 공개
- 종료 후 공개 정책에 따라 결과 표시
- 투표 참여 Point 지급 실패는 투표 실패로 처리하지 않음

### 9.3 Market 예측 참여 시나리오

```text
/markets
→ Market 선택
→ /markets/:marketId
→ 선택지 선택
→ pointAmount 입력
→ Quote 미리보기 요청
→ 예측 참여 요청
→ 내 예측 상태 확인
```

사용 API 후보:

- `GET /api/v1/markets`
- `GET /api/v1/markets/{marketId}`
- `GET /api/v1/markets/{marketId}/price-history`
- `POST /api/v1/markets/{marketId}/predictions/quote`
- `POST /api/v1/markets/{marketId}/predictions`
- `GET /api/v1/markets/{marketId}/predictions/me`

UI 처리:

- Quote는 확정 견적이 아니라 미리보기로 표시
- 실제 참여 시점의 체결 가격은 달라질 수 있음을 안내
- 예측 참여 중 버튼 비활성화
- `Idempotency-Key` 포함
- 성공 후 Market 상세, 가격 이력, 내 예측 상태 invalidate
- `POINT_PENDING`, `POINT_UNKNOWN`은 실패가 아니라 처리 중/확인 중으로 표시

### 9.4 POINT_PENDING / POINT_UNKNOWN Polling 시나리오

```text
예측 참여 요청
→ 응답 불명확 또는 상태가 POINT_PENDING / POINT_UNKNOWN
→ 3~5초 간격으로 내 예측 조회
→ CONFIRMED 또는 FAILED로 전이되면 polling 중단
```

Polling 중단 조건:

- `CONFIRMED`
- `FAILED`
- `SETTLED`
- `REFUNDED`
- 페이지 이탈
- 최대 대기 시간 초과

최대 대기 시간을 초과해도 실패로 단정하지 않는다.  
사용자에게 다음과 같이 안내한다.

```text
처리 상태를 확인할 수 없습니다. 잠시 후 다시 확인해주세요.
```

### 9.5 Market AI 리포트 시나리오

```text
/markets/:marketId
→ AI 리포트 보기 클릭
→ /markets/:marketId/report
→ 기존 리포트 조회
→ 없으면 80P 차감 후 생성 요청
→ PENDING / PROCESSING 상태 polling
→ DONE 상태 표시
→ FAILED 상태 안내 및 환불 여부 안내
```

UI 처리:

- AI는 예측 방향을 추천하지 않고 판단 보조 정보만 제공
- 생성 비용 80P를 명확히 표시
- 생성 중 상태를 명확히 표시
- 실패 시 환불 또는 재시도 가능 여부를 안내

### 9.6 MyPage 시나리오

```text
/my
→ 내 정보 조회
→ 포인트 잔액 확인
→ 신뢰도 요약 확인
→ 최근 활동 확인
→ /my/points 또는 /my/profile 이동
```

### 9.7 방문 인증 시나리오

```text
/my/visit-certifications
→ GPS 인증 선택
→ 브라우저 위치 권한 요청
→ 좌표 획득
→ 방문 인증 요청
→ 성공/실패 표시
```

GPS 불가 시:

```text
댓글 기반 인증 선택
→ Battle 댓글 선택 또는 commentId 입력
→ 방문 인증 요청
→ 성공/실패 표시
```

주의:

- 로컬 시연은 `localhost` 기준 GPS 가능
- 배포 환경에서는 HTTPS 필요
- HTTPS 미확보 시 댓글 기반 인증을 대체 수단으로 사용

---

## 10. 관리자 핵심 시나리오

### 10.1 관리자 Market 생성/활성화 시나리오

```text
/admin/markets
→ 새 Market 생성
→ /admin/markets/new
→ 기본 정보 입력
→ 일정 입력
→ 선택지 입력
→ 생성 완료
→ /admin/markets/:marketId
→ 활성화
```

검증:

- title 필수
- answerType 필수
- closeAt < judgeDate
- judgeDate <= settleDueAt
- 옵션 최소 2개
- NUMERIC_RANGE 범위 겹침 금지
- initialVirtualLiquidity > 0

### 10.2 관리자 Market 결과 확정/정산 시나리오

```text
/admin/markets/:marketId
→ 결과 확정 이동
→ /admin/markets/:marketId/result
→ resultOptionId 또는 resultValue 입력
→ 결과 확정
→ /admin/markets/:marketId
→ 정산 실행
→ 정산 결과 확인
```

UI 처리:

- Market 상태가 결과 확정 가능한 상태인지 확인
- 숫자형 결과 입력 시 해당 range option 미리 표시
- 정산 실행 전 확인 모달 표시
- 정산 중 버튼 비활성화
- 정산 성공 후 상태 invalidate
- 정산 실패/UNKNOWN은 관리자에게 재시도 가능 상태로 안내

### 10.3 관리자 Market 무효 처리 시나리오

```text
/admin/markets/:marketId
→ 무효 처리 버튼 클릭
→ 사유 입력
→ 확인 모달
→ 무효 처리 요청
→ 환불 상태 확인
```

UI 처리:

- 무효 처리 가능 상태에서만 버튼 노출
- 정산 진행 중/정산 완료 상태에서는 무효 처리 차단
- 환불 처리 중/불명확 상태는 관리자에게 상태 확인 필요로 표시

### 10.4 관리자 Battle 검수 시나리오

```text
/admin/battles
→ 검수 대기 Battle 선택
→ /admin/battles/:battleId
→ 내용 확인
→ 승인/거절/취소
→ 목록 invalidate
```

UI 처리:

- 승인 가능 상태에서만 승인 버튼 표시
- 거절/취소 시 사유 입력 가능
- 처리 완료 후 목록 갱신

### 10.5 관리자 Battle 분석/리포트 시나리오

```text
/admin/battles/:battleId/analysis
→ 교차분석 결과 조회

/admin/battles/:battleId/report
→ 자동 생성된 AI 리포트 조회
```

Battle AI 리포트는 사용자 facing 화면에서 직접 생성하지 않고, 관리자 조회 화면으로 우선 정의한다.

---

## 11. 화면별 상태 처리 기준

모든 주요 화면은 다음 상태를 고려한다.

| 상태 | 처리 |
|---|---|
| loading | Skeleton 또는 Spinner 표시 |
| empty | 빈 상태 메시지와 다음 행동 안내 |
| error | errorCode 기반 메시지 표시 |
| unauthorized | 로그인 페이지 이동 또는 로그인 유도 |
| forbidden | 권한 없음 안내 |
| success | 정상 데이터 표시 |
| refetching | 기존 데이터 유지 + 보조 로딩 표시 |

---

## 12. 화면별 에러 처리 기준

### 12.1 공통

- `UNAUTHORIZED`: 인증 상태 초기화 후 `/login` 이동
- `FORBIDDEN`: 권한 없음 페이지 또는 Toast 표시
- `VALIDATION_FAILED`: 입력 폼 오류 표시
- `INTERNAL_ERROR`: 일시적 오류 안내

### 12.2 Battle

- `BATTLE_NOT_FOUND`: 존재하지 않거나 접근 불가한 Battle 안내
- `BATTLE_CLOSED`: 종료된 Battle 안내
- `BATTLE_ALREADY_VOTED`: 이미 투표 완료 상태로 전환
- `BATTLE_INVALID_OPTION`: 선택지 오류 안내

### 12.3 Market

- `MARKET_NOT_FOUND`: 존재하지 않는 Market 안내
- `MARKET_INVALID_STATUS`: 현재 상태에서 처리 불가 안내
- `MARKET_ALREADY_PREDICTED`: 내 예측 상태 조회 후 참여 버튼 비활성화
- `POINT_INSUFFICIENT`: 포인트 부족 안내
- `EXTERNAL_SERVICE_TIMEOUT`: 실패로 단정하지 않고 내 예측 상태 polling
- `EXTERNAL_SERVICE_ERROR`: 처리 상태 확인 안내

### 12.4 Insight/Reputation

- `REPUTATION_NOT_FOUND`: 신뢰도 정보 없음 안내
- `VISIT_CERT_COOLDOWN`: 다음 인증 가능일 안내
- `VISIT_CERT_OUT_OF_RANGE`: 인증 가능 반경 밖 안내
- `INSIGHT_REPORT_ALREADY_PROCESSING`: 리포트 생성 중 안내 후 polling
- `INSIGHT_REPORT_GENERATION_FAILED`: 생성 실패 및 환불/재시도 안내

---

## 13. 화면별 API 매핑 초안

API 경로는 백엔드 API 명세 및 Swagger/OpenAPI와 동기화되어야 한다.  
아래 표는 프론트 화면 구현을 위한 1차 매핑 초안이다.

| 화면 | 주요 API 후보 |
|---|---|
| `/login` | 카카오 SDK, `POST /api/v1/members/oauth/kakao` |
| `/auth/kakao/callback` | `POST /api/v1/members/oauth/kakao` |
| `/` | 주요 Battle/Market 목록, 내 정보 요약 |
| `/battles` | `GET /api/v1/battles` |
| `/battles/:battleId` | `GET /api/v1/battles/{battleId}`, vote/comment/result 관련 API |
| `/markets` | `GET /api/v1/markets` |
| `/markets/:marketId` | `GET /api/v1/markets/{marketId}`, price-history, quote, prediction, my prediction |
| `/markets/:marketId/report` | Insight report 조회/생성 API |
| `/my` | `GET /api/v1/members/me`, `GET /api/v1/points/balance`, reputation me |
| `/my/profile` | `GET /api/v1/members/me`, `PATCH /api/v1/members/me` |
| `/my/points` | `GET /api/v1/points/history` |
| `/my/visit-certifications` | visit certification 관련 API |
| `/reputations/:memberId` | reputation 조회 API |
| `/admin/battles` | Battle 관리자 목록 API |
| `/admin/battles/:battleId` | Battle 관리자 상세/승인/거절/취소 API |
| `/admin/battles/:battleId/analysis` | Battle 교차분석 조회 API |
| `/admin/battles/:battleId/report` | Battle AI 리포트 관리자 조회 API |
| `/admin/markets` | Market 관리자 목록 API |
| `/admin/markets/new` | `POST /api/v1/admin/markets` |
| `/admin/markets/:marketId` | Market 관리자 상세, 활성화, 정산, 무효 처리 API |
| `/admin/markets/:marketId/result` | 결과 확정 API |

---

## 14. Query String 정책

목록 페이지의 필터/페이지네이션은 query string으로 관리한다.

예시:

```text
/battles?status=ACTIVE&page=0&size=20
/markets?status=ACTIVE&category=PRICE_INDEX&page=0&size=20
/my/points?type=EARN&page=0&size=20
```

상세 페이지 내부 탭도 query string으로 관리할 수 있다.

```text
/battles/:battleId?tab=result
/markets/:marketId?tab=history
/my/visit-certifications?tab=history
```

---

## 15. Modal / Drawer 사용 기준

다음 기능은 독립 페이지보다 Modal 또는 Drawer를 우선 사용한다.

| 기능 | 권장 UI |
|---|---|
| 예측 참여 | Drawer 또는 Modal |
| Quote 미리보기 | 예측 참여 모달 내부 섹션 |
| Battle 투표 확인 | Modal |
| 정산 실행 확인 | Modal |
| 무효 처리 사유 입력 | Modal |
| 로그아웃 확인 | Modal |

---

## 16. Navigation 구조

### 16.1 사용자 GNB

```text
Home
Battle
Market
Insight
My
```

### 16.2 비로그인 상태

```text
Home
Battle
Market
Login
```

### 16.3 관리자 상태

```text
Home
Battle
Market
My
Admin
```

Admin 메뉴는 프론트에서 role 기준으로 노출할 수 있지만, 최종 권한 검증은 백엔드에서 수행한다.

---

## 17. 개발 시작 순서

### 17.1 추천 세로 슬라이스 1 — Market

```text
1. `/markets` 목록
2. `/markets/:marketId` 상세
3. Quote 미리보기
4. 예측 참여
5. 내 예측 상태 polling
6. `/my/points` 포인트 내역 확인
```

### 17.2 추천 세로 슬라이스 2 — Admin Market

```text
1. `/admin/markets`
2. `/admin/markets/new`
3. `/admin/markets/:marketId`
4. `/admin/markets/:marketId/result`
5. 정산/무효 처리 액션
```

### 17.3 추천 세로 슬라이스 3 — Battle

```text
1. `/battles`
2. `/battles/:battleId`
3. 투표
4. 댓글
5. 결과 공개 정책
6. 관리자 Battle 검수
```

---

## 18. 금지사항

- `/internal/**` API를 프론트에서 호출하지 않는다.
- 4 depth 이상의 라우트를 기본 설계로 두지 않는다.
- 예측 참여를 별도 페이지로 먼저 분리하지 않는다.
- `POINT_UNKNOWN`을 실패로 단정하지 않는다.
- API 명세에 없는 endpoint를 임의로 만들지 않는다.
- 관리자 권한을 프론트에서만 검증하지 않는다.
- 포인트/가격 Decimal 값을 `Number`, `parseFloat`로 직접 처리하지 않는다.
- 화면별 API 호출을 컴포넌트에서 직접 `axios`로 수행하지 않는다.

---

## 19. 최종 요약

동네대전 프론트엔드는 다음 화면 구조를 기준으로 개발한다.

```text
인증: 2개
메인: 1개
Battle 사용자: 2개
Market 사용자: 3개
MyPage: 4개
Reputation: 1개
Admin: 9개

실제 라우트 기준: 약 21개
1차 MVP 기준: 약 12개
```

초기 구현은 Market 사용자 플로우와 Admin Market 플로우를 우선한다.

```text
Market 목록
→ Market 상세
→ Quote 미리보기
→ 예측 참여
→ 내 예측 상태 polling
→ 관리자 Market 생성
→ 활성화
→ 결과 확정
→ 정산/무효 처리
```

Battle, Insight, Reputation은 2차/3차 MVP로 확장한다.
