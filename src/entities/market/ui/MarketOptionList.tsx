import { formatPercent, formatPointAmount } from "@/shared/lib/formatDecimal";

import type { MarketOption } from "../model/market.types";

type MarketOptionListProps = {
  options: MarketOption[];
};

export function MarketOptionList({ options }: MarketOptionListProps) {
  return (
    <div className="grid gap-3">
      {options.map((option) => (
        <div
          key={option.optionId}
          className="rounded-lg border border-border bg-muted/20 p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-foreground">
                {option.content}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                옵션 ID #{option.optionId}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-emerald-700">
                {formatPercent(option.currentPrice)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">현재 가격</p>
            </div>
          </div>

          {(option.realPoolAmount || option.virtualPoolAmount) && (
            <div className="mt-4 grid gap-2 border-t border-border pt-3 text-xs text-muted-foreground sm:grid-cols-2">
              {option.realPoolAmount && (
                <span>
                  실제 풀{" "}
                  <strong className="font-semibold text-foreground">
                    {formatPointAmount(option.realPoolAmount)}
                  </strong>
                </span>
              )}
              {option.virtualPoolAmount && (
                <span>
                  가상 유동성{" "}
                  <strong className="font-semibold text-foreground">
                    {formatPointAmount(option.virtualPoolAmount)}
                  </strong>
                </span>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
