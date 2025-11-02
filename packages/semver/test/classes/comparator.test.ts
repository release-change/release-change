import { assert, expect, it, test } from "vitest";

import { Comparator } from "../../src/classes/comparator.js";

const invalidComparators = ["invalid", "^invalid", "~invalid"];

it.each(invalidComparators)("should throw an error if %s is invalid", invalidComparator => {
  expect(() => new Comparator(invalidComparator)).toThrowError(
    `Invalid comparator \`${invalidComparator}\`.`
  );
});
it("should throw an error if '>01.02.03' is invalid in strict mode", () => {
  expect(() => new Comparator(">01.02.03")).toThrowError("Invalid comparator `>01.02.03`.");
});
test("'>=1.2.3' should include '1.2.4'", () => {
  expect(new Comparator(">=1.2.3").test("1.2.4")).toBe(true);
});
test("'>=1.2.3' should not include an invalid version string", () => {
  expect(new Comparator(">=1.2.3").test("not a version string")).toBe(false);
});
test("any versions should match anything", () => {
  expect(new Comparator("").test("1.2.3")).toBe(true);
});
test("'=' should be ignored", () => {
  assert.deepEqual(new Comparator("=1.2.3"), new Comparator("1.2.3"));
});
