import { Link } from "react-router-dom";
import { ROUTE_PATH } from "@/shared/constants/routePath";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

export function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tight">토동산 (Todongsan)</CardTitle>
          <CardDescription>
            지역 선호 투표(배틀) 및 포인트 예측 시장(마켓) 서비스
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            아래 링크들을 통해 페이지 이동 및 라우팅을 테스트할 수 있습니다.
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to={ROUTE_PATH.LOGIN}
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              로그인 페이지
            </Link>
            <Link
              to={ROUTE_PATH.MARKETS}
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              마켓 목록
            </Link>
            <Link
              to={ROUTE_PATH.BATTLES}
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              배틀 목록
            </Link>
            <Link
              to={ROUTE_PATH.MY}
              className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            >
              마이페이지
            </Link>
            <Link
              to={ROUTE_PATH.ADMIN}
              className={cn(buttonVariants({ variant: "outline" }), "col-span-2 w-full")}
            >
              관리자 대시보드
            </Link>
            <Link
              to="/not-found-test"
              className={cn(buttonVariants({ variant: "destructive" }), "col-span-2 w-full")}
            >
              존재하지 않는 페이지 테스트 (404)
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
