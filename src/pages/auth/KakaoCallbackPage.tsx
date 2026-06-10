import { Link } from "react-router-dom";
import { ROUTE_PATH } from "@/shared/constants/routePath";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { buttonVariants } from "@/shared/ui/button";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";
import { cn } from "@/shared/lib/utils";

export function KakaoCallbackPage() {
  return (
    <PageContainer>
      <PageHeader
        title="소셜 로그인 진행"
        description="카카오 인증 센터로부터 응답 코드를 확인 및 인가 처리 중입니다."
      />

      <div className="mx-auto w-full max-w-md py-8">
        <Card className="rounded-2xl border-slate-200 bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold">카카오 로그인 처리</CardTitle>
            <CardDescription>
              카카오 OAuth callback 인증 대기
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-3 py-6">
              <div className="h-9 w-9 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
              <p className="text-xs text-slate-500 font-medium">로그인 세션 인증 요청을 백엔드 서버와 통신 중입니다...</p>
            </div>
            
            <Link
              to={ROUTE_PATH.HOME}
              className={cn(buttonVariants({ variant: "outline" }), "flex w-full items-center justify-center text-xs font-bold py-2.5 rounded-xl border-slate-200 hover:bg-slate-50 transition-all cursor-pointer")}
            >
              대기 중단하고 홈으로 이동
            </Link>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
