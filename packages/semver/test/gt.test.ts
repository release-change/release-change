import { expect, it, test } from "vitest";

import { gt } from "../src/index.js";
import { comparisons } from "./fixtures/comparisons.js";
import { comparisonsInLooseMode } from "./fixtures/comparisons-in-loose-mode.js";

it.each(comparisonsInLooseMode)("should throw an error if $a and $b are compared in strict mode", ({
  a,
  b
}) => {
  expect(() => gt(a, b)).toThrow();
});
test.each(comparisons)("$a should be greater than $b", ({ a, b }) => {
  expect(gt(a, b)).toBe(true);
});
test.each(comparisonsInLooseMode)("$a should be greater than $b in loose mode", ({ a, b }) => {
  expect(gt(a, b, { loose: true })).toBe(true);
});
test.each(comparisons)("$a should not be greater than $b", ({ a, b }) => {
  expect(gt(b, a)).toBe(false);
});
test.each(comparisonsInLooseMode)("$a should not be greater than $b in loose mode", ({ a, b }) => {
  expect(gt(b, a, { loose: true })).toBe(false);
});
