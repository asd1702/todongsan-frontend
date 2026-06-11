import { toDecimal } from "./decimal";

/**
 * 포인트 값을 포맷팅합니다. 천 단위 구분 쉼표와 'P' 접미사를 붙입니다.
 * 예: "1250.5" -> "1,250.5P"
 */
export function formatPointAmount(value: string | null | undefined): string {
  if (value === null || value === undefined || value === "") return "-";

  const d = toDecimal(value);
  const parts = d.toString().split(".");
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const fractionalPart = parts[1] ? `.${parts[1]}` : "";

  return `${integerPart}${fractionalPart}P`;
}

/**
 * 마켓 가격 값을 포맷팅합니다. 천 단위 구분 쉼표를 붙입니다.
 * 예: "1000" -> "1,000"
 */
export function formatMarketPrice(value: string | null | undefined): string {
  if (value === null || value === undefined || value === "") return "-";

  const d = toDecimal(value);
  const parts = d.toString().split(".");
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const fractionalPart = parts[1] ? `.${parts[1]}` : "";

  return `${integerPart}${fractionalPart}`;
}

/**
 * 비율(소수점) 값을 백분율로 포맷팅합니다. 100을 곱한 뒤 '%' 접미사를 붙입니다.
 * 예: "0.3333" -> "33.33%"
 */
export function formatPercent(value: string | null | undefined): string {
  if (value === null || value === undefined || value === "") return "-";

  const d = toDecimal(value).times(100);
  const parts = d.toString().split(".");
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const fractionalPart = parts[1] ? `.${parts[1]}` : "";

  return `${integerPart}${fractionalPart}%`;
}

/**
 * 배수율 값을 포맷팅합니다. '배' 접미사를 붙입니다.
 * 예: "1.26666666" -> "1.26666666배"
 */
export function formatRate(value: string | null | undefined): string {
  if (value === null || value === undefined || value === "") return "-";

  const d = toDecimal(value);
  return `${d.toString()}배`;
}
