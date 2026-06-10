import { Link } from "react-router-dom";
import { ROUTE_PATH } from "@/shared/constants/routePath";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

export function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-destructive">관리자 대시보드</CardTitle>
          <CardDescription>
            관리자 기능 진입점입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            부동산 예측 시장 및 아파트 선호 배틀을 직접 개설하고 관리하는 화면입니다.
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
