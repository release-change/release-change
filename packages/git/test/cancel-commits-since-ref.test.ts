import { setLogger } from "@release-change/logger";
import { formatDetailedError, runCommandSync } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { cancelCommitsSinceRef } from "../src/index.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

const mockedCommitRef = "0123456789abcdefg";

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({
    formatDetailedError: vi.fn(),
    runCommandSync: vi.fn()
  }));
  vi.mock("@release-change/logger", () => ({ setLogger: vi.fn() }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should run the `git reset --hard` command", () => {
  const mockedCommand = vi
    .mocked(runCommandSync)
    .mockReturnValue({ status: 0, stdout: "", stderr: "" });
  cancelCommitsSinceRef(mockedCommitRef, mockedCwd);
  expect(mockedCommand).toHaveBeenCalledWith("git", ["reset", "--hard", mockedCommitRef], {
    cwd: mockedCwd
  });
  expect(mockedLogger.logInfo).toHaveBeenCalledWith(`Commits since ${mockedCommitRef} cancelled.`);
});
it("should throw an error if the commit ref is empty", () => {
  const expectedError = new Error(
    "Failed to cancel commits: The commit reference must not be empty.",
    {
      cause: {
        title: "Failed to cancel commits",
        message: "The commit reference must not be empty.",
        details: {
          output: "commitRef: "
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() => cancelCommitsSinceRef("", mockedCwd)).toThrowError(expectedError);
});
it("should throw an error if the `git reset --hard` command is run and fails", () => {
  const expectedError = new Error(
    "Failed to run the `git` command: The command failed with status 128.",
    {
      cause: {
        title: "Failed to run the `git` command",
        message: "The command failed with status 128.",
        details: {
          output: "Some error message.",
          command: `git reset --hard ${mockedCommitRef}`
        }
      }
    }
  );
  vi.mocked(runCommandSync).mockReturnValue({
    status: 128,
    stdout: "",
    stderr: "Some error message."
  });
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() => cancelCommitsSinceRef(mockedCommitRef, mockedCwd)).toThrowError(expectedError);
  expect(mockedLogger.logError).toHaveBeenCalledWith(
    `Failed to cancel the commits since ${mockedCommitRef}.`
  );
});
