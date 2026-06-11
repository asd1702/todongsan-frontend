import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

export type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
};

export function EmptyState({
  title,
  description,
  action,
  icon = <Inbox className="size-10 text-muted-foreground/60" />,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-8 text-center bg-card/30 backdrop-blur-xs">
      <div className="mb-4 flex items-center justify-center rounded-full bg-muted/40 p-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
