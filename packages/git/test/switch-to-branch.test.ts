import { formatDetailedError, runCommandSync } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { switchToBranch } from "../src/index.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({
    runCommandSync: vi.fn(),
    formatDetailedError: vi.fn()
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if the branch name is an empty string", () => {
  const expectedError = new Error(
    "Failed to switch to another branch: The branch name cannot be empty.",
    {
      cause: {
        title: "Failed to switch to another branch",
        message: "The branch name cannot be empty.",
        details: {
          output: "branch: "
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() => switchToBranch("", mockedCwd)).toThrowError(expectedError);
});
it("should run the `git switch` command if the branch name is correctly provided", () => {
  const mockedCommand = vi
    .mocked(runCommandSync)
    .mockReturnValue({ status: 0, stdout: "", stderr: "" });
  const mockedBranch = "main";
  switchToBranch(mockedBranch, mockedCwd);
  expect(mockedCommand).toHaveBeenCalledWith("git", ["switch", mockedBranch], {
    cwd: mockedCwd
  });
});
