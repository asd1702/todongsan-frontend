import { MarketCard } from "@/entities/market/ui/MarketCard";
import { useMarketListQuery } from "@/entities/market/model/useMarketListQuery";
import { isApiError } from "@/shared/api/apiError";
import { Button } from "@/shared/ui/button";
import { EmptyState } from "@/shared/ui/empty-state";
import { ErrorState } from "@/shared/ui/error-state";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";
import { Skeleton } from "@/shared/ui/skeleton";

const marketListParams = {
  page: 0,
  size: 20,
};

export function MarketListPage() {
  const { data, error, isError, isLoading, refetch } =
    useMarketListQuery(marketListParams);

  return (
    <PageContainer>
      <PageHeader
        title="예측 마켓"
        description="다양한 부동산 관련 지표 및 거래 가격 예측에 포인트를 베팅하세요."
      />

      {isLoading && <MarketListSkeleton />}

      {isError && (
        <ErrorState
          message={
            isApiError(error)
              ? error.message
              : error instanceof Error
              ? error.message
              : "마켓 목록을 불러오는 중 문제가 발생했습니다."
          }
          action={<Button onClick={() => refetch()}>다시 시도</Button>}
        />
      )}

      {data && data.content.length === 0 && (
        <EmptyState
          title="등록된 마켓이 없습니다"
          description="새로운 예측 마켓이 열리면 이곳에 표시됩니다."
        />
      )}

      {data && data.content.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.content.map((market) => (
            <MarketCard key={market.marketId} market={market} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}

function MarketListSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-border bg-card p-4"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          <Skeleton className="mt-5 h-5 w-11/12" />
          <Skeleton className="mt-2 h-5 w-8/12" />
          <div className="mt-5 space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="mt-5 flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      ))}
    </div>
  );
}
