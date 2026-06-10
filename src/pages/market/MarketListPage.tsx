import { Link } from "react-router-dom";
import { ROUTE_PATH } from "@/shared/constants/routePath";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

export function MarketListPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">마켓 목록</CardTitle>
          <CardDescription>
            진행 중인 포인트 예측 시장 목록이 표시될 예정입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            여기에 다양한 지역 부동산 예측 시장 상품들이 나열됩니다.
          </div>
          <Link
            to={ROUTE_PATH.HOME}
            className={cn(buttonVariants({ variant: "outline" }), "w-full text-center")}
          >
            홈으로 이동
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
