import { expect, it } from "vitest";

import { isDetailedError } from "../src/is-detailed-error.js";
import { invalidDetailedErrors, validDetailedErrors } from "./fixtures/detailed-errors.js";

it.each(
  invalidDetailedErrors
)("should return `false` if this is not a detailed error", invalidDetailedError => {
  expect(isDetailedError(invalidDetailedError)).toBe(false);
});
it.each(
  validDetailedErrors
)("should return `true` if this is a detailed error", validDetailedError => {
  expect(isDetailedError(validDetailedError)).toBe(true);
});
