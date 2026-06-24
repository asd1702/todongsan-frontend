import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

import { formatDateTime, formatRelativeDays } from "@/shared/lib/formatDate";
import {
  decimalToPercentValue,
  formatPercent,
  formatPointAmount,
} from "@/shared/lib/formatDecimal";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

import { MARKET_LABELS } from "../lib/marketLabels";
import { getOptionColorMap } from "../lib/optionColor";
import type { MarketSummary } from "../model/market.types";
import { MarketStatusBadge } from "./MarketStatusBadge";

type MarketCardProps = {
  market: MarketSummary;
};

export function MarketCard({ market }: MarketCardProps) {
  const colorMap = getOptionColorMap(
    market.options.map((option) => option.optionId),
  );

  return (
    <Link
      to={`/markets/${market.marketId}`}
      className="group block h-full focus-visible:outline-none"
    >
      <Card
        size="sm"
        className="h-full gap-2.5 ring-foreground/10 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:ring-foreground/20 group-focus-visible:ring-2 group-focus-visible:ring-emerald-500"
      >
        <CardHeader className="gap-2">
          <div className="flex items-center justify-between gap-3">
            <MarketStatusBadge displayStatus={market.displayStatus} />
            <span className="text-xs text-muted-foreground">
              {MARKET_LABELS.liquidity}{" "}
              <strong className="font-semibold tabular-nums text-foreground">
                {formatPointAmount(
                  market.totalRealPoolAmount ?? market.totalPoolAmount,
                )}
              </strong>
            </span>
          </div>
          <CardTitle className="line-clamp-2 text-[15px] font-semibold leading-snug text-foreground transition-colors group-hover:text-emerald-700">
            {market.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-3">
          <div className="grid gap-2.5">
            {market.options.map((option) => {
              const color = colorMap[option.optionId];

              return (
                <div key={option.optionId} className="space-y-1.5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="line-clamp-1 text-sm font-medium text-foreground">
                      {option.content}
                    </span>
                    <span
                      className="shrink-0 text-sm font-bold tabular-nums"
                      style={{ color: color.darker }}
                    >
                      {formatPercent(option.currentPrice)}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${decimalToPercentValue(option.currentPrice)}%`,
                        backgroundColor: color.base,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
            <Tooltip>
              <TooltipTrigger
                render={
                  <span className="inline-flex cursor-help items-center gap-1.5 tabular-nums" />
                }
              >
                <Clock className="size-3.5" />
                {formatDateTime(market.closeAt)}
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-semibold">{formatRelativeDays(market.closeAt)}</p>
                <p className="mt-0.5 text-muted-foreground">
                  예측이 마감되는 예정 시각입니다. 정산 관련 사항은 마켓 규칙을
                  참고하세요.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
