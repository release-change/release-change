import { assert, expect, it } from "vitest";

import { Range } from "../../src/classes/range.js";
import { invalidRanges } from "../fixtures/invalid-ranges.js";
import { rangeIntersections } from "../fixtures/range-intersections.js";
import { validRanges } from "../fixtures/valid-ranges.js";
import { validRangesInLooseMode } from "../fixtures/valid-ranges-in-loose-mode.js";

it.each(invalidRanges)("should throw an error if the range $raw is invalid", ({
  raw,
  error,
  options
}) => {
  expect(() => new Range(raw, options)).toThrowError(error);
});
it.each(
  validRangesInLooseMode
)("should throw an error if the range $raw is parsed in strict mode", ({
  raw,
  includePrerelease
}) => {
  expect(() => new Range(raw, { includePrerelease })).toThrow();
});
it.each(
  validRangesInLooseMode
)("should create a `Range` object from the range $raw in loose mode", ({
  raw,
  expected,
  includePrerelease
}) => {
  const { range } = expected;
  const result = new Range(raw, { loose: true, includePrerelease });
  assert.strictEqual(result.raw, raw);
  assert.strictEqual(result.range, range);
  assert.strictEqual(result.includePrerelease, Boolean(includePrerelease));
});
it.each(validRanges)("should create a `Range` object from the valid range $raw", ({
  raw,
  expected,
  includePrerelease
}) => {
  const { range } = expected;
  const result = new Range(raw, { includePrerelease });
  assert.strictEqual(result.raw, raw);
  assert.strictEqual(result.range, range);
  assert.strictEqual(result.includePrerelease, Boolean(includePrerelease));
});
it.each(
  rangeIntersections
)("should return `$2` when $0 intersects $1", (range1, range2, expected) => {
  expect(new Range(range1).intersects(new Range(range2))).toBe(expected);
});
it.each(
  rangeIntersections
)("should return `$2` when $1 intersects $0", (range1, range2, expected) => {
  expect(new Range(range2).intersects(new Range(range1))).toBe(expected);
});
