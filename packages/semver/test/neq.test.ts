import { expect, it, test } from "vitest";

import { neq } from "../src/index.js";
import { comparisons } from "./fixtures/comparisons.js";
import { comparisonsInLooseMode } from "./fixtures/comparisons-in-loose-mode.js";
import { equalities } from "./fixtures/equalities.js";
import { equalitiesInLooseMode } from "./fixtures/equalities-in-loose-mode.js";

it.each([
  ...comparisonsInLooseMode,
  ...equalitiesInLooseMode
])("should throw an error if $a and $b are compared in strict mode", ({ a, b }) => {
  expect(() => neq(a, b)).toThrow();
});
test.each(comparisons)("$a should not be equal to $b", ({ a, b }) => {
  expect(neq(a, b)).toBe(true);
});
test.each(comparisonsInLooseMode)("$a should not be equal to $b in loose mode", ({ a, b }) => {
  expect(neq(a, b, { loose: true })).toBe(true);
});
test.each(equalities)("$a should be equal to $b", ({ a, b }) => {
  expect(neq(b, a)).toBe(false);
});
test.each(equalitiesInLooseMode)("$a should be equal to $b in loose mode", ({ a, b }) => {
  expect(neq(b, a, { loose: true })).toBe(false);
});
