import { expect, it } from "vitest";

import { compareBuild } from "../src/index.js";
import { comparisonsWithBuild } from "./fixtures/comparisons-with-build.js";
import { comparisonsWithBuildInLooseMode } from "./fixtures/comparisons-with-build-in-loose-mode.js";
import { equalitiesWithBuild } from "./fixtures/equalities-with-build.js";
import { equalitiesWithBuildInLooseMode } from "./fixtures/equalities-with-build-in-loose-mode.js";

it.each([...comparisonsWithBuildInLooseMode, ...equalitiesWithBuildInLooseMode])(
  "should throw an error if $a and $b are compared in strict mode",
  ({ a, b }) => {
    expect(() => compareBuild(a, b)).toThrow();
  }
);
it.each(comparisonsWithBuild)("$a should be greater than $b", ({ a, b }) => {
  expect(compareBuild(a, b)).toBe(1);
  expect(compareBuild(b, a)).toBe(-1);
});
it.each(comparisonsWithBuildInLooseMode)(
  "$a should be greater than $b in loose mode",
  ({ a, b }) => {
    expect(compareBuild(a, b, { loose: true })).toBe(1);
    expect(compareBuild(b, a, { loose: true })).toBe(-1);
  }
);
it.each(equalitiesWithBuild)("$a should be equal to $b", ({ a, b }) => {
  expect(compareBuild(a, b)).toBe(0);
});
it.each(equalitiesWithBuildInLooseMode)("$a should be equal to $b in loose mode", ({ a, b }) => {
  expect(compareBuild(a, b, { loose: true })).toBe(0);
});
