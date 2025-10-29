import { runCommandSync } from "@release-change/shared";
import { afterEach, assert, beforeEach, expect, it, vi } from "vitest";

import { getBranchName } from "../src/index.js";
import { mockedContext } from "./fixtures/mocked-context.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

const gitRevParseCommandArgs = ["rev-parse", "--abbrev-ref", "HEAD"];
const gitShowCommandArgs = ["show", "-s", "--pretty=%d", "HEAD"];

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({
    runCommandSync: vi.fn()
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if the Git command fails", () => {
  const mockedError = new Error(
    "Failed to run the `git` command: The command failed with status 1.",
    {
      cause: {
        title: "Failed to run the `git` command",
        message: "The command failed with status 1.",
        details: {
          output: "Error",
          command: "git --version"
        }
      }
    }
  );
  vi.mocked(runCommandSync).mockImplementation(() => {
    throw mockedError;
  });
  expect(getBranchName(mockedContext, mockedLogger)).toBe(undefined);
  assert.deepNestedInclude(mockedContext.errors, mockedError.cause);
});
it('should return the value of `HEAD` ref when this is not `"HEAD"`', () => {
  vi.mocked(runCommandSync).mockImplementation((_gitCommand, gitCommandArgs) =>
    JSON.stringify(gitCommandArgs) === JSON.stringify(gitRevParseCommandArgs)
      ? { status: 0, stdout: "main", stderr: "" }
      : { status: 1, stdout: "", stderr: "Error" }
  );
  expect(getBranchName(mockedContext, mockedLogger)).toBe("main");
  expect(runCommandSync).toHaveBeenCalledTimes(1);
  expect(runCommandSync).toHaveBeenCalledWith("git", gitRevParseCommandArgs, { cwd: mockedCwd });
  expect(runCommandSync).not.toHaveBeenCalledWith("git", gitShowCommandArgs, { cwd: mockedCwd });
});
it('should return the remote branch name if `HEAD` ref returns `"HEAD"', () => {
  vi.mocked(runCommandSync).mockImplementation((_gitCommand, gitCommandArgs) => {
    return JSON.stringify(gitCommandArgs) === JSON.stringify(gitRevParseCommandArgs)
      ? { status: 0, stdout: "HEAD", stderr: "" }
      : JSON.stringify(gitCommandArgs) === JSON.stringify(gitShowCommandArgs)
        ? { status: 0, stdout: "(HEAD -> main, origin/main)", stderr: "" }
        : { status: 1, stdout: "", stderr: "Error" };
  });
  expect(getBranchName(mockedContext, mockedLogger)).toBe("main");
  expect(runCommandSync).toHaveBeenCalledTimes(2);
  expect(runCommandSync).toHaveBeenCalledWith("git", gitRevParseCommandArgs, { cwd: mockedCwd });
  expect(runCommandSync).toHaveBeenCalledWith("git", gitShowCommandArgs, { cwd: mockedCwd });
});
