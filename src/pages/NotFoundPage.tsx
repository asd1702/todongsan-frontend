import { Link } from "react-router-dom";
import { ROUTE_PATH } from "@/shared/constants/routePath";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { buttonVariants } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-extrabold text-muted-foreground">404</CardTitle>
          <CardTitle className="text-2xl font-bold">페이지를 찾을 수 없습니다</CardTitle>
          <CardDescription>
            요청하신 페이지가 존재하지 않거나 잘못된 경로입니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link
            to={ROUTE_PATH.HOME}
            className={cn(buttonVariants(), "w-full text-center")}
          >
            홈으로 돌아가기
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
