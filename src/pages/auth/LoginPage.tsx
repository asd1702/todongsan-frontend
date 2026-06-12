import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { PageContainer } from "@/shared/ui/page-container";
import { PageHeader } from "@/shared/ui/page-header";
import { kakaoAuthorize } from "@/shared/lib/kakao";

export function LoginPage() {
  const handleLogin = () => {
    try {
      kakaoAuthorize();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "카카오 로그인에 실패했습니다.");
    }
  };

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
              아래 버튼을 클릭하여 카카오 계정으로 로그인할 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="flex w-full items-center justify-center bg-[#FEE500] text-[#191919] hover:bg-[#FEE500]/90 text-sm font-bold py-2.5 rounded-xl transition-all cursor-pointer"
              onClick={handleLogin}
            >
              카카오 계정으로 로그인
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
