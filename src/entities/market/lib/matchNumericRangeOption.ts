import { Decimal } from "@/shared/lib/decimal";

import type { AdminMarketOption } from "../model/market.types";

export type NumericRangeMatchResult =
  | { status: "empty" }
  | { status: "invalid" }
  | { status: "none" }
  | { status: "ambiguous" }
  | { status: "matched"; option: AdminMarketOption };

function hasRangeBoundary(value: string | null | undefined): value is string {
  return value !== null && value !== undefined && value.trim() !== "";
}

function parseDecimal(value: string): Decimal | null {
  try {
    const decimal = new Decimal(value);
    return decimal.isNaN() || !decimal.isFinite() ? null : decimal;
  } catch {
    return null;
  }
}

/**
 * NUMERIC_RANGE 결과 확정 입력값 미리보기용 매칭. 최종 판정은 서버가 수행한다.
 */
export function matchNumericRangeOption(
  resultValue: string,
  options: AdminMarketOption[],
): NumericRangeMatchResult {
  if (resultValue.trim() === "") return { status: "empty" };

  const value = parseDecimal(resultValue);
  if (value === null) return { status: "invalid" };

  const matched = options.filter((option) => {
    const hasMin = hasRangeBoundary(option.rangeMin);
    const hasMax = hasRangeBoundary(option.rangeMax);

    if (!hasMin && !hasMax) {
      return false;
    }

    const min = hasMin ? parseDecimal(option.rangeMin) : null;
    const max = hasMax ? parseDecimal(option.rangeMax) : null;

    if ((hasMin && min === null) || (hasMax && max === null)) {
      return false;
    }

    const minOk =
      !hasMin || (option.minInclusive === false ? value.gt(min) : value.gte(min));
    const maxOk =
      !hasMax || (option.maxInclusive === false ? value.lt(max) : value.lte(max));
    return minOk && maxOk;
  });

  if (matched.length === 0) return { status: "none" };
  if (matched.length > 1) return { status: "ambiguous" };
  return { status: "matched", option: matched[0] };
}
