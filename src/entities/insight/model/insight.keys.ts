import type { 
  InsightReportType, 
  InsightReportListParams 
} from './insight.types';

export const insightKeys = {
  all: ["insights"] as const,
  reportList: (params: InsightReportListParams) => ["insights", "reports", params] as const,
  marketReport: (marketId: number) => ["insights", "marketReport", marketId] as const,
  marketReportStatus: (marketId: number) => ["insights", "marketReportStatus", marketId] as const,
  battleReport: (battleId: number) => ["insights", "battleReport", battleId] as const,
  report: (type: InsightReportType, referenceId: number) => 
    ["insights", "report", type, referenceId] as const,
};
