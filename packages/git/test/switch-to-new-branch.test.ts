import { formatDetailedError, runCommandSync } from "@release-change/shared";
import { expect, it, vi } from "vitest";

import { switchToNewBranch } from "../src/index.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";

vi.mock("@release-change/shared", () => ({
  runCommandSync: vi.fn(),
  formatDetailedError: vi.fn()
}));

it("should throw an error if the new branch name is an empty string", () => {
  const expectedError = new Error(
    "Failed to switch to a new branch: The new branch name cannot be empty.",
    {
      cause: {
        title: "Failed to switch to a new branch",
        message: "The new branch name cannot be empty.",
        details: {
          output: "newBranch: "
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() => switchToNewBranch("", mockedCwd)).toThrow(expectedError);
});
it("should run the `git switch` command if the new branch name is correctly provided", () => {
  const mockedCommand = vi
    .mocked(runCommandSync)
    .mockReturnValue({ status: 0, stdout: "", stderr: "" });
  const mockedNewBranch = "release-change/main/1.0.0";
  switchToNewBranch(mockedNewBranch, mockedCwd);
  expect(mockedCommand).toHaveBeenCalledWith("git", ["switch", "-c", mockedNewBranch], {
    cwd: mockedCwd
  });
});
