import { Link } from "react-router-dom";
import { ROUTE_PATH } from "@/shared/constants/routePath";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

export function MyPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">마이페이지</CardTitle>
          <CardDescription>
            신뢰도, 포인트 잔액, 내 활동 요약이 표시될 예정입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            로그인한 사용자 정보 및 신뢰 지표, 포인트 등이 여기에 표시됩니다.
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
