import { expect, test } from "vitest";

import { compareLoose } from "../src/index.js";
import { comparisons } from "./fixtures/comparisons.js";
import { comparisonsInLooseMode } from "./fixtures/comparisons-in-loose-mode.js";
import { equalities } from "./fixtures/equalities.js";
import { equalitiesInLooseMode } from "./fixtures/equalities-in-loose-mode.js";

test.each([
  ...comparisons,
  ...comparisonsInLooseMode
])("$a should be greater than $b in loose mode", ({ a, b }) => {
  expect(compareLoose(a, b)).toBe(1);
  expect(compareLoose(b, a)).toBe(-1);
});
test.each([...equalities, ...equalitiesInLooseMode])("$a should be equal to $b in loose mode", ({
  a,
  b
}) => {
  expect(compareLoose(a, b)).toBe(0);
});
