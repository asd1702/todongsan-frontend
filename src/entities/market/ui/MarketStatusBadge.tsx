import type { ComponentProps } from "react";

import { Badge } from "@/shared/ui/badge";

import type { MarketStatus } from "../model/market.types";

type MarketStatusBadgeProps = {
  status: MarketStatus;
};

const statusLabel: Record<MarketStatus, string> = {
  PENDING: "검수 대기",
  ACTIVE: "진행 중",
  CLOSED: "결과 확정",
  DATA_PENDING: "데이터 대기",
  SETTLEMENT_IN_PROGRESS: "정산 중",
  SETTLED: "정산 완료",
  VOIDED: "무효",
};

const statusVariant: Record<
  MarketStatus,
  ComponentProps<typeof Badge>["variant"]
> = {
  PENDING: "warning",
  ACTIVE: "success",
  CLOSED: "info",
  DATA_PENDING: "warning",
  SETTLEMENT_IN_PROGRESS: "violet",
  SETTLED: "neutral",
  VOIDED: "danger",
};

export function MarketStatusBadge({ status }: MarketStatusBadgeProps) {
  return <Badge variant={statusVariant[status]}>{statusLabel[status]}</Badge>;
}
