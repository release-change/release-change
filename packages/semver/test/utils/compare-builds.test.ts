import { expect, test } from "vitest";

import { compareBuilds } from "../../src/utils/compare-builds.js";
import { buildComparisons } from "../fixtures/build-comparisons.js";
import { buildEqualities } from "../fixtures/build-equalities.js";

test.each(buildComparisons)("$a should be greater than $b", ({ a, b }) => {
  expect(compareBuilds(a, b)).toBe(1);
  expect(compareBuilds(b, a)).toBe(-1);
});
test.each(buildEqualities)("$a should be equal to $b", ({ a, b }) => {
  expect(compareBuilds(a, b)).toBe(0);
});
