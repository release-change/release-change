import type { DetailedError } from "@release-change/shared";

import { addErrorToContext, setLogger } from "@release-change/logger";
import { afterEach, assert, beforeEach, expect, it, vi } from "vitest";

import { checkAuthorisation } from "../src/check-authorisation.js";
import { checkPushPermissions } from "../src/index.js";
import { isBranchUpToDate } from "../src/is-branch-up-to-date.js";
import { mockedContext, mockedContextWithEligibleBranch } from "./fixtures/mocked-context.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedRepositoryUrl } from "./fixtures/mocked-repository-url.js";

beforeEach(() => {
  vi.mock("@release-change/logger", () => ({
    addErrorToContext: vi.fn(),
    checkErrorType: vi.fn(),
    setLogger: vi.fn()
  }));
  vi.mock("../src/check-authorisation.js", () => ({
    checkAuthorisation: vi.fn()
  }));
  vi.mock("../src/is-branch-up-to-date.js", () => ({ isBranchUpToDate: vi.fn() }));
  vi.mocked(addErrorToContext).mockImplementation((error, context) => {
    if (error instanceof Error) {
      const { cause } = error;
      if (
        cause &&
        typeof cause === "object" &&
        "title" in cause &&
        "message" in cause &&
        "details" in cause
      ) {
        context.errors.push(cause as DetailedError);
      }
    }
  });
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should log a warning message when the local branch is not up to date", async () => {
  vi.mocked(isBranchUpToDate).mockReturnValue(Promise.resolve(false));
  await checkPushPermissions(mockedRepositoryUrl, mockedContextWithEligibleBranch);
  expect(mockedLogger.logWarn).toHaveBeenCalled();
});
it("should not log a warning message when the branch context is not one of those from which the CLI is configured to publish", async () => {
  vi.mocked(isBranchUpToDate).mockReturnValue(Promise.resolve(false));
  await checkPushPermissions(mockedRepositoryUrl, mockedContext);
  expect(mockedLogger.logWarn).not.toHaveBeenCalled();
});
it("should log a success message when push is allowed and the local branch up to date", async () => {
  vi.mocked(isBranchUpToDate).mockReturnValue(Promise.resolve(true));
  await checkPushPermissions(mockedRepositoryUrl, mockedContextWithEligibleBranch);
  expect(mockedLogger.logSuccess).toHaveBeenCalled();
});
it("should not log a success message when the branch context is not one of those from which the CLI is configured to publish", async () => {
  await checkPushPermissions(mockedRepositoryUrl, mockedContext);
  expect(mockedLogger.logSuccess).not.toHaveBeenCalled();
});
it("should log an error message when an error is thrown", async () => {
  const mockedError = new Error("Error: Error message.", {
    cause: {
      title: "Error: Error message.",
      message: "Error message.",
      details: { output: "Error", command: "git push" }
    }
  });
  vi.spyOn(process, "exit").mockImplementation(code => {
    throw new Error(`process.exit called with code ${code}`);
  });
  vi.mocked(checkAuthorisation).mockRejectedValue(mockedError);
  await expect(
    checkPushPermissions(mockedRepositoryUrl, mockedContextWithEligibleBranch)
  ).rejects.toThrowError("process.exit called with code 1");
  expect(mockedLogger.logError).toHaveBeenCalledWith("Not allowed to push to the Git repository.");
  expect(process.exit).toHaveBeenCalledWith(1);
  assert.deepNestedInclude(mockedContext.errors, mockedError.cause);
});
