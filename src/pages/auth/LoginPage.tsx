import { Link } from "react-router-dom";
import { ROUTE_PATH } from "@/shared/constants/routePath";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { buttonVariants } from "@/shared/ui/button";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";
import { cn } from "@/shared/lib/utils";

export function LoginPage() {
  return (
    <PageContainer>
      <PageHeader
        title="로그인"
        description="토동산 서비스를 더 풍부하게 이용하려면 카카오 계정으로 간편하게 시작해 보세요."
      />

      <div className="mx-auto w-full max-w-md py-8">
        <Card className="rounded-2xl border-slate-200 bg-white">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold">서비스 로그인</CardTitle>
            <CardDescription>
              아래 버튼을 클릭하여 가상 소셜 로그인을 진행할 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-4 text-center text-xs text-slate-500">
              현재 로그인 및 소셜 연동 모듈은 데모 테스트용으로 가상의 Callback 경로 이동만 지원합니다.
            </div>
            
            <Link
              to={ROUTE_PATH.KAKAO_CALLBACK}
              className={cn(
                buttonVariants(),
                "flex w-full items-center justify-center bg-[#FEE500] text-[#191919] hover:bg-[#FEE500]/90 text-sm font-bold py-2.5 rounded-xl transition-all cursor-pointer"
              )}
            >
              카카오 계정으로 로그인 (데모)
            </Link>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
