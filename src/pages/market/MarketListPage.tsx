import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";

const categories = ["전체", "대구", "서울", "부산", "가격지수", "거래량", "전세"];

const mockMarkets = [
  {
    id: "m-1",
    title: "이번 주 대구 수성구 아파트 매매가 상승률은 0.3% 이상일까요?",
    category: "대구",
    type: "가격지수",
    yesChance: 58,
    noChance: 42,
    volume: "12,450P",
    endTime: "2026-06-15",
    status: "진행 중",
  },
  {
    id: "m-2",
    title: "서울 강남구 전세가 지수는 다음 주 상승할까요?",
    category: "서울",
    type: "전세",
    yesChance: 71,
    noChance: 29,
    volume: "28,900P",
    endTime: "2026-06-18",
    status: "진행 중",
  },
  {
    id: "m-3",
    title: "부산 해운대구 거래량은 전월 대비 증가할까요?",
    category: "부산",
    type: "거래량",
    yesChance: 45,
    noChance: 55,
    volume: "8,200P",
    endTime: "2026-06-20",
    status: "진행 중",
  },
  {
    id: "m-4",
    title: "대구 중구 월세 가격 지수가 전월 대비 0.1% 이하로 하락할까요?",
    category: "대구",
    type: "가격지수",
    yesChance: 33,
    noChance: 67,
    volume: "4,110P",
    endTime: "2026-06-22",
    status: "진행 중",
  },
  {
    id: "m-5",
    title: "서울 마포구 아파트 매매량이 다음 달 500건을 돌파할까요?",
    category: "서울",
    type: "거래량",
    yesChance: 62,
    noChance: 38,
    volume: "15,800P",
    endTime: "2026-06-25",
    status: "진행 중",
  },
  {
    id: "m-6",
    title: "부산 금정구 아파트 전세 가격지수가 반등할까요?",
    category: "부산",
    type: "전세",
    yesChance: 49,
    noChance: 51,
    volume: "7,300P",
    endTime: "2026-06-30",
    status: "진행 중",
  },
];

export function MarketListPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const filteredMarkets = mockMarkets.filter((market) => {
    if (selectedCategory === "전체") return true;
    return market.category === selectedCategory || market.type === selectedCategory;
  });

  return (
    <PageContainer>
      <PageHeader
        title="예측 마켓"
        description="다양한 부동산 관련 지표 및 거래 가격 예측에 포인트를 베팅하세요."
      />

      {/* Category pill row */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200/60 pb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer",
              selectedCategory === category
                ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Markets Grid */}
      {filteredMarkets.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMarkets.map((market) => (
            <Card
              key={market.id}
              className="rounded-2xl border border-slate-200 bg-white hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <CardHeader className="space-y-1.5 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider">
                    {market.category} · {market.type}
                  </span>
                  <span className="text-[10px] font-medium text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                    {market.status}
                  </span>
                </div>
                <CardTitle className="text-sm font-semibold leading-snug text-slate-900 line-clamp-3 min-h-[42px]">
                  {market.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                {/* Betting odds buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex flex-col items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50/40 p-2 hover:bg-emerald-50 transition-colors">
                    <span className="text-[10px] font-medium text-slate-500">그렇다 (Yes)</span>
                    <span className="text-sm font-bold text-emerald-700">{market.yesChance}%</span>
                  </button>
                  <button className="flex flex-col items-center justify-center rounded-xl border border-slate-100 bg-slate-50/50 p-2 hover:bg-slate-50 transition-colors">
                    <span className="text-[10px] font-medium text-slate-500">아니다 (No)</span>
                    <span className="text-sm font-bold text-slate-700">{market.noChance}%</span>
                  </button>
                </div>
                {/* Footer stats */}
                <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
                  <span>거래량: <strong className="text-slate-700 font-semibold">{market.volume}</strong></span>
                  <span>마감: {market.endTime}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-white">
          <p className="text-sm text-slate-500">이 카테고리에는 등록된 마켓이 없습니다.</p>
        </div>
      )}
    </PageContainer>
  );
}
