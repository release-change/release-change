import { expect, it, test } from "vitest";

import { lt } from "../src/index.js";
import { comparisons } from "./fixtures/comparisons.js";
import { comparisonsInLooseMode } from "./fixtures/comparisons-in-loose-mode.js";

it.each(comparisonsInLooseMode)("should throw an error if $a and $b are compared in strict mode", ({
  a,
  b
}) => {
  expect(() => lt(a, b)).toThrow();
});
test.each(comparisons)("$a should be less than $b", ({ a, b }) => {
  expect(lt(b, a)).toBe(true);
});
test.each(comparisonsInLooseMode)("$a should be less than $b in loose mode", ({ a, b }) => {
  expect(lt(b, a, { loose: true })).toBe(true);
});
test.each(comparisons)("$a should not be less than $b", ({ a, b }) => {
  expect(lt(a, b)).toBe(false);
});
test.each(comparisonsInLooseMode)("$a should not be less than $b in loose mode", ({ a, b }) => {
  expect(lt(a, b, { loose: true })).toBe(false);
});
