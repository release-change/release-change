import { assert, expect, it } from "vitest";

import { validateRange } from "../src/index.js";
import { invalidRanges } from "./fixtures/invalid-ranges.js";
import { validRanges } from "./fixtures/valid-ranges.js";
import { validRangesInLooseMode } from "./fixtures/valid-ranges-in-loose-mode.js";

it.each(invalidRanges)("should return `null` if $raw is to be validated", ({ raw, options }) => {
  expect(validateRange(raw, options)).toBe(null);
});
it.each(validRangesInLooseMode)(
  "should return `null` if $raw is to be validated in strict mode",
  ({ raw }) => {
    expect(validateRange(raw)).toBe(null);
  }
);
it.each(validRangesInLooseMode)(
  "should return $expected.range if $raw is to be validated in loose mode",
  ({ raw, expected }) => {
    const { range } = expected;
    assert.strictEqual(validateRange(raw, { loose: true }), range);
  }
);
it.each(validRanges)(
  "should return $expected.range if $raw is to be validated",
  ({ raw, expected, options }) => {
    const { range } = expected;
    assert.strictEqual(validateRange(raw, options), range);
  }
);
