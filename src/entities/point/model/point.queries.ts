import { useQuery } from "@tanstack/react-query";
import { getPointBalance, getPointHistory } from "../api/pointApi";
import { pointKeys } from "./point.keys";
import type { PointHistoryListParams } from "./point.types";

export function usePointBalanceQuery() {
  return useQuery({
    queryKey: pointKeys.balance(),
    queryFn: getPointBalance,
  });
}

export function usePointHistoryQuery(params: PointHistoryListParams) {
  return useQuery({
    queryKey: pointKeys.history(params),
    queryFn: () => getPointHistory(params),
  });
}
