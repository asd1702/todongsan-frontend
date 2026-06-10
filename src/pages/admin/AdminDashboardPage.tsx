import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";

export function AdminDashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title="관리자 대시보드"
        description="예측 마켓 및 선호 배틀 상품을 개설하고 정산, 중단 등의 작업을 수행합니다."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Market Management */}
        <Card className="rounded-2xl border-slate-200 bg-white">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-800">예측 마켓 관리</CardTitle>
            <CardDescription className="text-xs">현재 생성된 예측 시장 관리 및 신규 시장 생성</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-slate-50 p-4 space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-600">진행 중인 마켓</span>
                <span className="text-slate-900">12개</span>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-600">종료/대기 중인 마켓</span>
                <span className="text-slate-900">3개</span>
              </div>
            </div>
            <button className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 text-xs transition-colors cursor-pointer">
              신규 마켓 개설하기
            </button>
          </CardContent>
        </Card>

        {/* Battle Management */}
        <Card className="rounded-2xl border-slate-200 bg-white">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-800">선호 배틀 관리</CardTitle>
            <CardDescription className="text-xs">입지 대결 커뮤니티 투표 개설 및 조율</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-slate-50 p-4 space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-600">진행 중인 배틀</span>
                <span className="text-slate-900">8개</span>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-600">완료된 배틀</span>
                <span className="text-slate-900">24개</span>
              </div>
            </div>
            <button className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 text-xs transition-colors cursor-pointer">
              신규 배틀 개설하기
            </button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
