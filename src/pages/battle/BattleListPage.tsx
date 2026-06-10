import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";

const mockBattles = [
  {
    id: "b-1",
    title: "실거주로 더 선호하는 단지는?",
    optionA: "마포 래미안 푸르지오",
    optionB: "송파 헬리오시티",
    votes: 342,
    comments: 48,
    status: "투표 진행 중",
  },
  {
    id: "b-2",
    title: "역세권 vs 학군, 더 중요한 조건은?",
    optionA: "초역세권 (도보 3분)",
    optionB: "명문 학군지 (도보 15분)",
    votes: 512,
    comments: 89,
    status: "투표 진행 중",
  },
  {
    id: "b-3",
    title: "신축 아파트 vs 구축 대단지, 당신의 선택은?",
    optionA: "신축 준식형 (24평)",
    optionB: "구축 대단지 리모델링 (34평)",
    votes: 289,
    comments: 31,
    status: "투표 진행 중",
  },
  {
    id: "b-4",
    title: "대구 최고 학군 입지 대결",
    optionA: "수성구 범어동",
    optionB: "수성구 만촌동",
    votes: 187,
    comments: 25,
    status: "투표 진행 중",
  },
  {
    id: "b-5",
    title: "동일 예산 기준 서울 외곽 신축 vs 경기도 상급지 준신축",
    optionA: "서울 도봉구 신축",
    optionB: "성남 분당구 준신축",
    votes: 405,
    comments: 72,
    status: "투표 진행 중",
  },
  {
    id: "b-6",
    title: "부산 바다 조망권 대결, 어느 쪽이 더 선호될까요?",
    optionA: "해운대 엘시티 조망",
    optionB: "광안리 광안대교 조망",
    votes: 618,
    comments: 104,
    status: "투표 진행 중",
  },
];

export function BattleListPage() {
  return (
    <PageContainer>
      <PageHeader
        title="선호 배틀"
        description="지역, 아파트 단지, 주거 인프라 입지 대결에 투표하고 의견을 나누어 보세요."
      />

      {/* Battle Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockBattles.map((battle) => (
          <Card
            key={battle.id}
            className="rounded-2xl border border-slate-200 bg-white hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {battle.status}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {battle.votes}명 참여
                </span>
              </div>
              <CardTitle className="text-sm font-semibold text-slate-900 leading-snug pt-1">
                {battle.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Options */}
              <div className="space-y-2">
                <button className="relative flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-50 cursor-pointer transition-colors bg-white">
                  <span className="text-slate-800 text-left truncate max-w-[85%]">{battle.optionA}</span>
                  <span className="text-emerald-600">A</span>
                </button>
                <button className="relative flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold hover:bg-slate-50 cursor-pointer transition-colors bg-white">
                  <span className="text-slate-800 text-left truncate max-w-[85%]">{battle.optionB}</span>
                  <span className="text-emerald-600">B</span>
                </button>
              </div>
              {/* Card footer metrics */}
              <div className="flex items-center gap-3 text-[11px] text-slate-400 border-t border-slate-100 pt-3">
                <span>투표 수: {battle.votes}</span>
                <span>댓글 수: {battle.comments}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
}
