import type { Context } from "../../src/cli/cli.types.js";

import { spawnSync } from "node:child_process";

import { assert, afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getAllTags } from "../../src/git/get-all-tags.js";

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
  const gitCommand = "git";
  const gitTagCommandArgs = [
    "tag",
    "-l",
    "--sort=v:refname",
    "--merged",
    `${mockedConfig.remoteName}/${mockedContext.branch}`
  ];
  const mockedSpawnSyncOptions = {
    cwd: mockedContext.cwd,
    encoding: "utf8"
  };
  const mockSpawnSync = spawnSync as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.mock("node:child_process", () => ({ spawnSync: vi.fn() }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should log an error message when an error is thrown", () => {
    mockSpawnSync.mockImplementation((_command, _args, _options) => {
      return {
        status: 1,
        stdout: "",
        stderr: "Error"
      };
    });
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
    mockSpawnSync.mockImplementation((command, args, options) => {
      if (
        command === gitCommand &&
        JSON.stringify(args) === JSON.stringify(gitTagCommandArgs) &&
        options.cwd === mockedSpawnSyncOptions.cwd &&
        options.encoding === "utf8"
      ) {
        return {
          status: 0,
          stdout: mockedTags.join("\n"),
          stderr: ""
        };
      }
      return {
        status: 1,
        stdout: "",
        stderr: "Error"
      };
    });
    assert.deepEqual(getAllTags(mockedContext), mockedTags);
  });
  it("should return an empty array if no tags are found", () => {
    mockSpawnSync.mockImplementation((command, args, options) => {
      if (
        command === gitCommand &&
        JSON.stringify(args) === JSON.stringify(gitTagCommandArgs) &&
        options.cwd === mockedSpawnSyncOptions.cwd &&
        options.encoding === "utf8"
      ) {
        return {
          status: 0,
          stdout: "",
          stderr: ""
        };
      }
      return {
        status: 1,
        stdout: "",
        stderr: "Error"
      };
    });
    assert.deepEqual(getAllTags(mockedContext), []);
  });
});
