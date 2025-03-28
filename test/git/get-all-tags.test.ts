import type { Context } from "../../src/cli/cli.types.js";
import type { Logger } from "../../src/logger/logger.types.js";

import { assert, afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getAllTags } from "../../src/git/get-all-tags.js";
import { runCommandSync } from "../../src/git/run-command-sync.js";
import * as setLoggerModule from "../../src/logger/set-logger.js";

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
    ci: {
      isCi: true,
      isPullRequest: false
    },
    config: mockedConfig
  } as Context;
  const mockedLogger: Logger = {
    setDebugScope: vi.fn(),
    logDebug: vi.fn(),
    logInfo: vi.fn(),
    logError: vi.fn(),
    logWarn: vi.fn(),
    logSuccess: vi.fn()
  };

  beforeEach(() => {
    vi.spyOn(setLoggerModule, "setLogger").mockReturnValue(mockedLogger);
    vi.mock("../../src/git/run-command-sync.js", () => ({ runCommandSync: vi.fn() }));
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
    vi.mocked(runCommandSync).mockReturnValue(mockedCommandResult);
    expect(() => getAllTags(mockedContext)).toThrowError();
    expect(mockedLogger.logError).toHaveBeenCalled();
  });
  it("should return all tags if tags are found", () => {
    const mockedTags = [
      "v2.0.0",
      "v2.0.0-rc.2",
      "v2.0.0-rc.1",
      "v2.0.0-beta.3",
      "v2.0.0-beta.2",
      "v2.0.0-beta.1",
      "v2.0.0-alpha.4",
      "v2.0.0-alpha.3",
      "v2.0.0-alpha.2",
      "v2.0.0-alpha.1",
      "v1.1.0",
      "v1.0.1",
      "v1.0.0",
      "v0.2.0",
      "v0.1.0"
    ];
    const mockedCommandResult = {
      status: 0,
      stdout: mockedTags.join("\n"),
      stderr: ""
    };
    vi.mocked(runCommandSync).mockReturnValue(mockedCommandResult);
    assert.deepEqual(getAllTags(mockedContext), mockedTags);
  });
  it("should return an empty array if no tags are found", () => {
    const mockedCommandResult = {
      status: 0,
      stdout: "",
      stderr: ""
    };
    vi.mocked(runCommandSync).mockReturnValue(mockedCommandResult);
    assert.deepEqual(getAllTags(mockedContext), []);
  });
});
