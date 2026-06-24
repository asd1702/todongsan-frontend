import { useQueries } from "@tanstack/react-query";

import { getAdminPendingBattles } from "../api/adminBattleApi";
import { getBattleList } from "../api/battleApi";
import { adminBattleKeys } from "./battle.keys";
import type { AdminBattleStatusCounts } from "./battle.types";

export function useAdminBattleStatusCountsQuery() {
  const results = useQueries({
    queries: [
      {
        queryKey: [...adminBattleKeys.statusCounts(), "pending"],
        queryFn: () => getAdminPendingBattles({ page: 0, size: 1 }),
      },
      {
        queryKey: [...adminBattleKeys.statusCounts(), "active"],
        queryFn: () => getBattleList({ status: "ACTIVE", page: 0, size: 1 }),
      },
      {
        queryKey: [...adminBattleKeys.statusCounts(), "closed"],
        queryFn: () => getBattleList({ status: "CLOSED", page: 0, size: 1 }),
      },
    ],
  });

  const [pendingResult, activeResult, closedResult] = results;

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);

  const data: AdminBattleStatusCounts | undefined =
    !isLoading && !isError
      ? {
          pending: pendingResult.data?.totalElements ?? 0,
          active: activeResult.data?.totalElements ?? 0,
          closed: closedResult.data?.totalElements ?? 0,
        }
      : undefined;

  function refetch() {
    results.forEach((r) => void r.refetch());
  }

  return { data, isLoading, isError, refetch };
}
