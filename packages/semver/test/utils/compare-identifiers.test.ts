import { expect, test } from "vitest";

import { compareIdentifiers } from "../../src/index.js";

const numberComparisons = [
  [1, 2],
  [9, 80]
];

test("0 should be equal to 0", () => {
  expect(compareIdentifiers(0, 0)).toBe(0);
});
test("a should be equal to a", () => {
  expect(compareIdentifiers("a", "a")).toBe(0);
});
test.each(numberComparisons)("%i should be less than %i", (a, b) => {
  expect(compareIdentifiers(a, b)).toBe(-1);
  expect(compareIdentifiers(b, a)).toBe(1);
});
test("alpha should be before beta", () => {
  expect(compareIdentifiers("alpha", "beta")).toBe(-1);
  expect(compareIdentifiers("beta", "alpha")).toBe(1);
});
test("a should be before capital A", () => {
  expect(compareIdentifiers("a", "A")).toBe(-1);
  expect(compareIdentifiers("A", "a")).toBe(1);
});
test("1 should be before a", () => {
  expect(compareIdentifiers(1, "a")).toBe(-1);
  expect(compareIdentifiers("a", 1)).toBe(1);
});
