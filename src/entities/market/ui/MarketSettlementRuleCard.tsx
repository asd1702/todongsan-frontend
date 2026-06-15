import { formatDateTime } from "@/shared/lib/formatDate";
import { formatPointAmount } from "@/shared/lib/formatDecimal";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

import type { MarketDetail } from "../model/market.types";

type MarketSettlementRuleCardProps = {
  market: MarketDetail;
};

export function MarketSettlementRuleCard({
  market,
}: MarketSettlementRuleCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>마켓 정보</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 text-sm">
        <InfoRow label="마감 시간" value={formatDateTime(market.closeAt)} />
        {market.resultAnnounceAt && (
          <InfoRow
            label="결과 발표"
            value={formatDateTime(market.resultAnnounceAt)}
          />
        )}
        <InfoRow
          label="전체 풀"
          value={formatPointAmount(market.totalPoolAmount)}
        />
      </CardContent>
    </Card>
  );
}

type InfoRowProps = {
  label: string;
  value: string;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
