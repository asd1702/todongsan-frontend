import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";

export function MyPage() {
  return (
    <PageContainer>
      <PageHeader
        title="마이페이지"
        description="회원님의 활동 요약, 포인트 지표, 신뢰 점수 등을 확인하세요."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {/* User Card */}
        <Card className="rounded-2xl border-slate-200 bg-white md:col-span-1">
          <CardHeader className="flex flex-col items-center pb-6 text-center border-b border-slate-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 text-2xl font-bold">
              회
            </div>
            <CardTitle className="text-lg font-bold mt-4">가상 회원님</CardTitle>
            <CardDescription className="text-xs">kakao-user-12345</CardDescription>
          </CardHeader>
          <CardContent className="py-4 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">회원 등급</span>
              <span className="font-bold text-slate-800">일반 회원</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">가입 날짜</span>
              <span className="font-bold text-slate-800">2026-06-10</span>
            </div>
          </CardContent>
        </Card>

        {/* Stats and Activity */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="rounded-2xl border-slate-200 bg-white">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-400">보유 포인트</CardDescription>
                <CardTitle className="text-3xl font-extrabold text-emerald-700">10,000P</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-500">예측 적중 및 선호 투표 참여로 획득 가능합니다.</p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200 bg-white">
              <CardHeader className="pb-2">
                <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-400">나의 신뢰 지수</CardDescription>
                <CardTitle className="text-3xl font-extrabold text-slate-800">99.2%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-500">예측 정확도 및 커뮤니티 투표 참여 신뢰도입니다.</p>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-2xl border-slate-200 bg-white">
            <CardHeader>
              <CardTitle className="text-base font-bold">최근 참여 내역</CardTitle>
              <CardDescription className="text-xs">현재 참여하신 예측 마켓 또는 배틀이 없습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6 text-slate-400 text-xs">
                참여 내역이 비어 있습니다. 홈 또는 마켓 목록에서 흥미로운 이슈를 확인해 보세요!
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
