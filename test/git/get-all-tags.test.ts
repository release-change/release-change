import type { Context } from "../../src/cli/cli.types.js";

import { assert, afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getAllTags } from "../../src/git/get-all-tags.js";
import { runCommand } from "../../src/git/run-command.js";

describe("get all tags", () => {
  const mockedRepositoryUrl = "https://github.com/user-id/repo-name";
  const mockedConfig = {
    branches: ["main"],
    releaseType: {
      main: {
        channel: "latest"
      }
    },
    debug: false,
    dryRun: false,
    repositoryUrl: mockedRepositoryUrl,
    remoteName: "origin"
  };
  const mockedContext = {
    cwd: "/fake/path",
    env: {},
    branch: "main",
    config: mockedConfig,
    logger: {
      logDebug: vi.fn(),
      logInfo: vi.fn(),
      logError: vi.fn(),
      logWarn: vi.fn(),
      logSuccess: vi.fn()
    }
  } as Context;
  const mockedContextWithInelegibleBranch = { ...mockedContext, branch: "unmatched-branch" };

  beforeEach(() => {
    vi.mock("../../src/git/run-command.js", () => ({ runCommand: vi.fn() }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should log an error message when an error is thrown", () => {
    const mockedCommandResult = {
      status: 1,
      stdout: "",
      stderr: "Error"
    };
    vi.mocked(runCommand).mockReturnValue(mockedCommandResult);
    expect(() => getAllTags(mockedContext)).toThrowError();
    expect(mockedContext.logger?.logError).toHaveBeenCalled();
  });
  it("should return `false` if the package cannot publish from the branch", () => {
    expect(getAllTags(mockedContextWithInelegibleBranch)).toBe(false);
  });
  it("should return all tags if tags are found", () => {
    const mockedTags = [
      "2.0.0",
      "2.0.0-rc.2",
      "2.0.0-rc.1",
      "2.0.0-beta.3",
      "2.0.0-beta.2",
      "2.0.0-beta.1",
      "2.0.0-alpha.4",
      "2.0.0-alpha.3",
      "2.0.0-alpha.2",
      "2.0.0-alpha.1",
      "1.1.0",
      "1.0.1",
      "1.0.0",
      "0.2.0",
      "0.1.0"
    ];
    const mockedCommandResult = {
      status: 0,
      stdout: mockedTags.join("\n"),
      stderr: ""
    };
    vi.mocked(runCommand).mockReturnValue(mockedCommandResult);
    assert.deepEqual(getAllTags(mockedContext), mockedTags);
  });
  it("should return an empty array if no tags are found", () => {
    const mockedCommandResult = {
      status: 0,
      stdout: "",
      stderr: ""
    };
    vi.mocked(runCommand).mockReturnValue(mockedCommandResult);
    assert.deepEqual(getAllTags(mockedContext), []);
  });
});
