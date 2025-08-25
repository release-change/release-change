import { expect, test } from "vitest";

import { comparePrereleases } from "../../src/utils/compare-prereleases.js";
import { prereleaseComparisons } from "../fixtures/prerelease-comparisons.js";
import { prereleaseEqualities } from "../fixtures/prerelease-equalities.js";

test.each(prereleaseComparisons)("$a should be greater than $b", ({ a, b }) => {
  expect(comparePrereleases(a, b)).toBe(1);
  expect(comparePrereleases(b, a)).toBe(-1);
});
test.each(prereleaseEqualities)("$a should be equal to $b", ({ a, b }) => {
  expect(comparePrereleases(a, b)).toBe(0);
});
