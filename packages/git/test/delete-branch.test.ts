import { setLogger } from "@release-change/logger";
import { formatDetailedError, runCommandSync } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { deleteBranch } from "../src/index.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedReleaseBranch } from "./fixtures/mocked-release-branch.js";

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

it("should throw an error if the branch name is empty", () => {
  const expectedError = new Error("Failed to delete a branch: The branch name must not be empty.", {
    cause: {
      title: "Failed to delete a branch",
      message: "The branch name must not be empty.",
      details: {
        output: "branch: "
      }
    }
  });
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() => deleteBranch("", mockedCwd)).toThrowError(expectedError);
});
it("should log an error message if the `git branch` command is run and fails", () => {
  vi.mocked(runCommandSync).mockReturnValue({
    status: 128,
    stdout: "",
    stderr: "Some error message."
  });
  deleteBranch(mockedReleaseBranch, mockedCwd);
  expect(mockedLogger.logError).toHaveBeenCalledWith(
    `Failed to delete branch ${mockedReleaseBranch}.`
  );
});
it("should run the `git branch` command", () => {
  const mockedCommand = vi
    .mocked(runCommandSync)
    .mockReturnValue({ status: 0, stdout: "", stderr: "" });
  deleteBranch(mockedReleaseBranch, mockedCwd);
  expect(mockedCommand).toHaveBeenCalledWith("git", ["branch", "-D", mockedReleaseBranch], {
    cwd: mockedCwd
  });
  expect(mockedLogger.logInfo).toHaveBeenCalledWith(`Deleted branch ${mockedReleaseBranch}.`);
});
