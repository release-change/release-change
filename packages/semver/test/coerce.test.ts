import { assert, expect, it } from "vitest";

import { coerce } from "../src/index.js";
import { coercedValues } from "./fixtures/coerced-values.js";
import { nonCoercedValues } from "./fixtures/non-coerced-values.js";

it.each(nonCoercedValues)("should return `null` if %s cannot be coerced", value => {
  expect(coerce(value)).toBe(null);
});
it.each(coercedValues)("$value should be coerced", ({ value, expected, options }) => {
  assert.deepEqual(coerce(value, options), expected);
});
