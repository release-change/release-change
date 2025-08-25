import { expect, test } from "vitest";

import { compareVersionCores } from "../../src/utils/compare-version-cores.js";
import { versionCoreComparisons } from "../fixtures/version-core-comparisons.js";
import { versionCoreEqualities } from "../fixtures/version-core-equalities.js";

test.each(versionCoreComparisons)("%o should be greater than %o", (a, b) => {
  expect(compareVersionCores(a, b)).toBe(1);
  expect(compareVersionCores(b, a)).toBe(-1);
});
test.each(versionCoreEqualities)("%o should be equal to %o", (a, b) => {
  expect(compareVersionCores(a, b)).toBe(0);
});
