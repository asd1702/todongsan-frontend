import type { ReactNode } from "react";
import { AlertCircle } from "lucide-react";

export type ErrorStateProps = {
  title?: string;
  message?: string;
  action?: ReactNode;
  icon?: ReactNode;
};

export function ErrorState({
  title = "오류가 발생했습니다",
  message = "데이터를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",
  action,
  icon = <AlertCircle className="size-10 text-destructive" />,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-destructive/20 p-8 text-center bg-destructive/5 backdrop-blur-xs">
      <div className="mb-4 flex items-center justify-center rounded-full bg-destructive/10 p-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {message && (
        <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
          {message}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
