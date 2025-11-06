import { expect, it, test } from "vitest";

import { gte } from "../src/index.js";
import { comparisons } from "./fixtures/comparisons.js";
import { comparisonsInLooseMode } from "./fixtures/comparisons-in-loose-mode.js";
import { equalities } from "./fixtures/equalities.js";
import { equalitiesInLooseMode } from "./fixtures/equalities-in-loose-mode.js";

it.each([...comparisonsInLooseMode, ...equalitiesInLooseMode])(
  "should throw an error if $a and $b are compared in strict mode",
  ({ a, b }) => {
    expect(() => gte(a, b)).toThrow();
  }
);
test.each([...comparisons, ...equalities])(
  "$a should be greater than or equal to $b",
  ({ a, b }) => {
    expect(gte(a, b)).toBe(true);
  }
);
test.each([...comparisonsInLooseMode, ...equalitiesInLooseMode])(
  "$a should be greater than or equal to $b in loose mode",
  ({ a, b }) => {
    expect(gte(a, b, { loose: true })).toBe(true);
  }
);
test.each(comparisons)("$a should not be greater than or equal to $b", ({ a, b }) => {
  expect(gte(b, a)).toBe(false);
});
test.each(comparisonsInLooseMode)(
  "$a should not be greater than or equal to $b in loose mode",
  ({ a, b }) => {
    expect(gte(b, a, { loose: true })).toBe(false);
  }
);
