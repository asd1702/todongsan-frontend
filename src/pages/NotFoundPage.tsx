import { Link } from "react-router-dom";
import { ROUTE_PATH } from "@/shared/constants/routePath";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { buttonVariants } from "@/shared/ui/button";
import { PageContainer } from "@/shared/ui/page-container";
import { cn } from "@/shared/lib/utils";

export function NotFoundPage() {
  return (
    <PageContainer>
      <div className="mx-auto w-full max-w-md py-12">
        <Card className="rounded-2xl border-slate-200 bg-white text-center">
          <CardHeader className="pt-8">
            <span className="text-5xl font-extrabold text-slate-300 select-none">404</span>
            <CardTitle className="text-xl font-bold mt-2">페이지를 찾을 수 없습니다</CardTitle>
            <CardDescription className="text-xs">
              요청하신 주소가 올바르지 않거나 변경되었을 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-8">
            <Link
              to={ROUTE_PATH.HOME}
              className={cn(buttonVariants(), "flex w-full items-center justify-center text-xs font-bold py-2.5 rounded-xl cursor-pointer")}
            >
              홈으로 돌아가기
            </Link>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
