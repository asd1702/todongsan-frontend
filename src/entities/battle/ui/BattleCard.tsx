import { Link } from "react-router-dom";
import { MessageSquare, Users } from "lucide-react";

import { formatDateTime } from "@/shared/lib/formatDate";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

import type { BattleSummary } from "../model/battle.types";
import { BattleStatusBadge } from "./BattleStatusBadge";

type BattleCardProps = {
  battle: BattleSummary;
};

export function BattleCard({ battle }: BattleCardProps) {
  return (
    <Link
      to={`/battles/${battle.battleId}`}
      className="group block h-full focus-visible:outline-none"
    >
      <Card
        size="sm"
        className="h-full gap-2.5 ring-foreground/10 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:ring-foreground/20 group-focus-visible:ring-2 group-focus-visible:ring-emerald-500"
      >
        <CardHeader className="gap-2">
          <div className="flex items-center justify-end gap-3">
            <BattleStatusBadge status={battle.status} />
          </div>
          <CardTitle className="line-clamp-2 text-[15px] font-semibold leading-snug text-foreground transition-colors group-hover:text-emerald-700">
            {battle.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-3">
          <div className="grid gap-2">
            {battle.status === "CLOSED" && battle.voteCount > 0
              ? (() => {
                  const total = battle.optionACount + battle.optionBCount;
                  const pctA = Math.round((battle.optionACount / total) * 100);
                  const pctB = 100 - pctA;
                  const aWins = battle.optionACount >= battle.optionBCount;
                  return (
                    <>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-3">
                          <span className="line-clamp-1 text-sm font-medium">{battle.optionA}</span>
                          <span className={`shrink-0 text-sm font-bold tabular-nums ${aWins ? "text-green-600" : "text-orange-500"}`}>{pctA}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div className={`h-full rounded-full ${aWins ? "bg-green-500" : "bg-orange-400"}`} style={{ width: `${pctA}%` }} />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-3">
                          <span className="line-clamp-1 text-sm font-medium">{battle.optionB}</span>
                          <span className={`shrink-0 text-sm font-bold tabular-nums ${!aWins ? "text-green-600" : "text-orange-500"}`}>{pctB}%</span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div className={`h-full rounded-full ${!aWins ? "bg-green-500" : "bg-orange-400"}`} style={{ width: `${pctB}%` }} />
                        </div>
                      </div>
                    </>
                  );
                })()
              : (
                <>
                  <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/20 px-3 py-2">
                    <span className="line-clamp-1 text-sm font-medium">{battle.optionA}</span>
                    <span className="shrink-0 text-xs font-bold text-emerald-700">A</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/20 px-3 py-2">
                    <span className="line-clamp-1 text-sm font-medium">{battle.optionB}</span>
                    <span className="shrink-0 text-xs font-bold text-sky-700">B</span>
                  </div>
                </>
              )}
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <Users className="size-3.5" />
                {battle.voteCount.toLocaleString()}명 참여
              </span>
              {battle.commentCount !== undefined && (
                <span className="inline-flex items-center gap-1">
                  <MessageSquare className="size-3.5" />
                  {battle.commentCount.toLocaleString()}
                </span>
              )}
            </div>
            <span>마감 {formatDateTime(battle.endAt)}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
