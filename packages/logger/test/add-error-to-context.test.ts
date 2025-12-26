import { afterEach, assert, beforeEach, it, vi } from "vitest";

import { addErrorToContext } from "../src/add-error-to-context.js";
import { isDetailedError } from "../src/is-detailed-error.js";
import { invalidDetailedErrors, validDetailedErrors } from "./fixtures/detailed-errors.js";
import { mockedContext } from "./fixtures/mocked-context.js";

beforeEach(() => {
  vi.mock("../src/is-detailed-error.js", () => ({ isDetailedError: vi.fn() }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it.each(
  invalidDetailedErrors
)("should not add an error to the context if it is not an `Error` object", invalidDetailedError => {
  vi.mocked(isDetailedError).mockReturnValue(false);
  addErrorToContext(invalidDetailedError, mockedContext);
  assert.notDeepNestedInclude(mockedContext.errors, invalidDetailedError);
});
it("should not add an error to the context if it is an `Error` object without `cause` property", () => {
  vi.mocked(isDetailedError).mockReturnValue(false);
  addErrorToContext(new Error("Error"), mockedContext);
  assert.notDeepNestedInclude(mockedContext.errors, new Error("Error"));
});
it.each(
  invalidDetailedErrors
)("should not add an error to the context if it is an `Error` object with an invalid `cause` property", invalidDetailedError => {
  vi.mocked(isDetailedError).mockReturnValue(false);
  addErrorToContext(new Error("Error", { cause: invalidDetailedError }), mockedContext);
  assert.notDeepNestedInclude(mockedContext.errors, invalidDetailedError);
});
it.each(validDetailedErrors)("should add an error to the context", validDetailedError => {
  vi.mocked(isDetailedError).mockReturnValue(true);
  addErrorToContext(new Error("Error", { cause: validDetailedError }), mockedContext);
  assert.deepNestedInclude(mockedContext.errors, validDetailedError);
});
