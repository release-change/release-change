import { assert, expect, it, test } from "vitest";

import { compare } from "../src/index.js";
import { comparisons } from "./fixtures/comparisons.js";
import { comparisonsInLooseMode } from "./fixtures/comparisons-in-loose-mode.js";
import { equalities } from "./fixtures/equalities.js";
import { equalitiesInLooseMode } from "./fixtures/equalities-in-loose-mode.js";

it.each([...comparisonsInLooseMode, ...equalitiesInLooseMode])(
  "should throw an error if $a and $b are compared in strict mode",
  ({ a, b }) => {
    assert.throws(() => compare(a, b));
  }
);
test.each(comparisons)("$a should be greater than $b", ({ a, b }) => {
  expect(compare(a, b)).toBe(1);
  expect(compare(b, a)).toBe(-1);
});
test.each(comparisonsInLooseMode)("$a should be greater than $b in loose mode", ({ a, b }) => {
  expect(compare(a, b, { loose: true })).toBe(1);
  expect(compare(b, a, { loose: true })).toBe(-1);
});
test.each(equalities)("$a should be equal to $b", ({ a, b }) => {
  expect(compare(a, b)).toBe(0);
});
test.each(equalitiesInLooseMode)("$a should be equal to $b in loose mode", ({ a, b }) => {
  expect(compare(a, b, { loose: true })).toBe(0);
});
