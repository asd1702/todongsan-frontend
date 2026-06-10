import type { PropsWithChildren } from "react";
import { cn } from "@/shared/lib/utils";

type PageContainerProps = PropsWithChildren<{
  className?: string;
}>;

export function PageContainer({ children, className }: PageContainerProps) {
  return <div className={cn("space-y-6 sm:space-y-8", className)}>{children}</div>;
}
