import { expect, it, test } from "vitest";

import { reverseCompare } from "../src/index.js";
import { comparisons } from "./fixtures/comparisons.js";
import { comparisonsInLooseMode } from "./fixtures/comparisons-in-loose-mode.js";
import { equalities } from "./fixtures/equalities.js";
import { equalitiesInLooseMode } from "./fixtures/equalities-in-loose-mode.js";

it.each([
  ...comparisonsInLooseMode,
  ...equalitiesInLooseMode
])("should throw an error if $a and $b are compared in strict mode", ({ a, b }) => {
  expect(() => reverseCompare(a, b)).toThrow();
});
test.each(comparisons)("$a should be less than $b", ({ a, b }) => {
  expect(reverseCompare(a, b)).toBe(-1);
  expect(reverseCompare(b, a)).toBe(1);
});
test.each(comparisonsInLooseMode)("$a should be less than $b in loose mode", ({ a, b }) => {
  expect(reverseCompare(a, b, { loose: true })).toBe(-1);
  expect(reverseCompare(b, a, { loose: true })).toBe(1);
});
test.each(equalities)("$a should be equal to $b", ({ a, b }) => {
  expect(reverseCompare(a, b)).toBe(0);
});
test.each(equalitiesInLooseMode)("$a should be equal to $b in loose mode", ({ a, b }) => {
  expect(reverseCompare(a, b, { loose: true })).toBe(0);
});
