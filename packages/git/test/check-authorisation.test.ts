import { setLogger } from "@release-change/logger";
import { runCommand } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { checkAuthorisation } from "../src/check-authorisation.js";
import { mockedConfig } from "./fixtures/mocked-config.js";
import { mockedContext, mockedContextWithEligibleBranch } from "./fixtures/mocked-context.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedRepositoryUrl } from "./fixtures/mocked-repository-url.js";

beforeEach(() => {
  vi.mock("@release-change/logger", () => ({
    checkErrorType: vi.fn(),
    setLogger: vi.fn()
  }));
  vi.mock("@release-change/shared", () => ({
    runCommand: vi.fn(),
    WORKSPACE_NAME: "release-change"
  }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should skip authorisation checking when the branch is not one of those from which the CLI is configured to publish", async () => {
  const expectedSkipLogMessage = "Skipping authorisation checking.";
  await checkAuthorisation(mockedRepositoryUrl, mockedContext);
  expect(mockedLogger.logInfo).toHaveBeenCalledWith(expectedSkipLogMessage);
});
it("should not catch any errors when the Git command does not fail", async () => {
  vi.mocked(runCommand).mockReturnValue(
    Promise.resolve({
      status: 0,
      stdout: "",
      stderr: ""
    })
  );
  await checkAuthorisation(mockedRepositoryUrl, mockedContextWithEligibleBranch);
  expect(mockedLogger.logError).not.toHaveBeenCalled();
});
it("should call `logDebug()` when the Git command does not fail and on debug mode", async () => {
  mockedConfig.debug = true;
  await checkAuthorisation(mockedRepositoryUrl, {
    ...mockedContextWithEligibleBranch,
    config: mockedConfig
  });
  expect(mockedLogger.logDebug).toHaveBeenCalled();
});
