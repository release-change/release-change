import { assert, expect, it, test } from "vitest";

import { Comparator } from "../../src/classes/comparator.js";
import { comparatorIntersections } from "../fixtures/comparator-intersections.js";
import { comparatorIntersectionsInLooseMode } from "../fixtures/comparator-intersections-in-loose-mode.js";

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
it.each(comparatorIntersections)(
  "should return `$2` when $0 intersects $1",
  (comparator1, comparator2, expected, options) => {
    expect(new Comparator(comparator1).intersects(new Comparator(comparator2), options)).toBe(
      expected
    );
  }
);
it.each(comparatorIntersections)(
  "should return `$2` when $1 intersects $0",
  (comparator1, comparator2, expected, options) => {
    expect(new Comparator(comparator2).intersects(new Comparator(comparator1), options)).toBe(
      expected
    );
  }
);
it.each(comparatorIntersectionsInLooseMode)(
  "should return `$2` when $0 intersects $1 in loose mode",
  (comparator1, comparator2, expected, options) => {
    expect(
      new Comparator(comparator1, { loose: true }).intersects(
        new Comparator(comparator2, { loose: true }),
        options
      )
    ).toBe(expected);
  }
);
it.each(comparatorIntersectionsInLooseMode)(
  "should return `$2` when $1 intersects $0 in loose mode",
  (comparator1, comparator2, expected, options) => {
    expect(
      new Comparator(comparator2, { loose: true }).intersects(
        new Comparator(comparator1, { loose: true }),
        options
      )
    ).toBe(expected);
  }
);
