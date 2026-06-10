import { Link } from "react-router-dom";
import { ROUTE_PATH } from "@/shared/constants/routePath";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">로그인</CardTitle>
          <CardDescription>
            카카오 로그인 진입 페이지입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4 text-center text-sm">
            소셜 로그인을 위한 데모 화면입니다. 실제 OAuth 호출은 아직 구현되지 않았습니다.
          </div>
          <div className="flex flex-col gap-2">
            <Link
              to={ROUTE_PATH.KAKAO_CALLBACK}
              className={cn(
                buttonVariants(),
                "w-full bg-[#FEE500] text-[#191919] hover:bg-[#FEE500]/90 text-center"
              )}
            >
              카카오로 로그인하기 (가상 콜백 이동)
            </Link>
            <Link
              to={ROUTE_PATH.HOME}
              className={cn(buttonVariants({ variant: "ghost" }), "w-full text-center")}
            >
              홈으로 이동
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
