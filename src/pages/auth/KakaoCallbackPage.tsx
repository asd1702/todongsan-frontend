import { Link } from "react-router-dom";
import { ROUTE_PATH } from "@/shared/constants/routePath";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

export function KakaoCallbackPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">카카오 로그인 처리</CardTitle>
          <CardDescription>
            카카오 OAuth callback 처리용 라우트입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center space-y-2 py-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">로그인 인증 요청을 처리 중입니다...</p>
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
