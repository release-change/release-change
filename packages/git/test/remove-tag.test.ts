import { setLogger } from "@release-change/logger";
import { formatDetailedError, runCommandSync } from "@release-change/shared";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { removeTag } from "../src/index.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

const mockedGitTags = ["v1.0.0", "@monorepo/a@v1.0.0"];

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

it("should throw an error if the Git tag is empty", () => {
  const expectedError = new Error("Failed to remove a Git tag: The Git tag must not be empty.", {
    cause: {
      title: "Failed to remove a Git tag",
      message: "The Git tag must not be empty.",
      details: {
        output: "gitTag: "
      }
    }
  });
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() => removeTag("", mockedCwd)).toThrowError(expectedError);
});
describe.each(mockedGitTags)("for Git tag %s", mockedGitTag => {
  it("should run the `git tag` command", () => {
    const mockedCommand = vi
      .mocked(runCommandSync)
      .mockReturnValue({ status: 0, stdout: "", stderr: "" });
    removeTag(mockedGitTag, mockedCwd);
    expect(mockedCommand).toHaveBeenCalledWith("git", ["tag", "-d", mockedGitTag], {
      cwd: mockedCwd
    });
    expect(mockedLogger.logInfo).toHaveBeenCalledWith(`Removed Git tag ${mockedGitTag}.`);
  });
  it("should throw an error if the `git tag` command is run and fails", () => {
    const expectedError = new Error(
      "Failed to run the `git tag` command: The command failed with status 128.",
      {
        cause: {
          title: "Failed to run the `git tag` command",
          message: "The command failed with status 128.",
          details: {
            output: "Some error message.",
            command: `git tag -d ${mockedGitTag}`
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
    expect(() => removeTag(mockedGitTag, mockedCwd)).toThrowError(expectedError);
    expect(mockedLogger.logError).toHaveBeenCalledWith(`Failed to remove Git tag ${mockedGitTag}.`);
  });
});
