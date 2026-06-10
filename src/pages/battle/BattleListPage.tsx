import { Link } from "react-router-dom";
import { ROUTE_PATH } from "@/shared/constants/routePath";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

export function BattleListPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">배틀 목록</CardTitle>
          <CardDescription>
            지역 선호 투표 목록이 표시될 예정입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            여기에 실시간으로 진행되는 1대1 아파트 선호도 배틀 리스트가 나열됩니다.
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
