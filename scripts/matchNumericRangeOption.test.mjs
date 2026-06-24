import assert from "node:assert/strict";
import { after, before, describe, it } from "node:test";

import { createServer } from "vite";

let server;
let matchNumericRangeOption;

before(async () => {
  server = await createServer({
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true },
  });

  ({ matchNumericRangeOption } = await server.ssrLoadModule(
    "/src/entities/market/lib/matchNumericRangeOption.ts",
  ));
});

after(async () => {
  await server?.close();
});

function option(overrides) {
  return {
    optionId: overrides.optionId ?? 1,
    content: overrides.content ?? "option",
    currentPrice: "1",
    ...overrides,
  };
}

describe("matchNumericRangeOption", () => {
  it("matches an open lower range", () => {
    const result = matchNumericRangeOption("-0.3", [
      option({
        content: "-0.2% 미만",
        rangeMin: null,
        rangeMax: "-0.2",
        maxInclusive: false,
      }),
    ]);

    assert.equal(result.status, "matched");
    assert.equal(result.option.content, "-0.2% 미만");
  });

  it("matches an open upper range", () => {
    const result = matchNumericRangeOption("0.3", [
      option({
        content: "0.2% 이상",
        rangeMin: "0.2",
        rangeMax: null,
      }),
    ]);

    assert.equal(result.status, "matched");
    assert.equal(result.option.content, "0.2% 이상");
  });

  it("matches a bounded range with existing inclusivity policy", () => {
    const result = matchNumericRangeOption("-0.15", [
      option({
        content: "-0.2% 이상 ~ -0.1% 미만",
        rangeMin: "-0.2",
        rangeMax: "-0.1",
        maxInclusive: false,
      }),
    ]);

    assert.equal(result.status, "matched");
    assert.equal(result.option.content, "-0.2% 이상 ~ -0.1% 미만");
  });

  it("excludes options without both boundaries", () => {
    const result = matchNumericRangeOption("1", [
      option({ rangeMin: null, rangeMax: null }),
    ]);

    assert.equal(result.status, "none");
  });

  it("returns empty for blank result values", () => {
    assert.deepEqual(matchNumericRangeOption("  ", []), { status: "empty" });
  });

  it("returns invalid for non-numeric result values without throwing", () => {
    assert.deepEqual(matchNumericRangeOption("abc", []), { status: "invalid" });
  });

  it("excludes options with invalid Decimal boundaries without throwing", () => {
    const result = matchNumericRangeOption("0", [
      option({ rangeMin: "bad", rangeMax: "1" }),
    ]);

    assert.equal(result.status, "none");
  });

  it("returns ambiguous when multiple ranges match", () => {
    const result = matchNumericRangeOption("0.75", [
      option({ optionId: 1, rangeMin: "0", rangeMax: "1" }),
      option({ optionId: 2, rangeMin: "0.5", rangeMax: "2" }),
    ]);

    assert.equal(result.status, "ambiguous");
  });
});
