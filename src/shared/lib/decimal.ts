import { Decimal } from "decimal.js";

export { Decimal };

/**
 * 안전하게 Decimal 객체를 생성합니다.
 * 값이 유효하지 않은 경우 0인 Decimal 객체를 반환합니다.
 */
export function toDecimal(value: string | number | null | undefined): Decimal {
  if (value === null || value === undefined || value === "") {
    return new Decimal(0);
  }
  try {
    return new Decimal(value);
  } catch {
    return new Decimal(0);
  }
}
