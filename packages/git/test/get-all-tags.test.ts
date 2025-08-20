import type { Logger } from "@release-change/logger";
import type { Context } from "@release-change/shared";

import { setLogger } from "@release-change/logger";
import { runCommandSync } from "@release-change/shared";
import { afterEach, assert, beforeEach, expect, it, vi } from "vitest";

import { getAllTags } from "../src/index.js";

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
  vi.mock("@release-change/logger", () => ({
    checkErrorType: vi.fn(),
    setLogger: vi.fn()
  }));
  vi.mock("@release-change/shared", () => ({
    runCommandSync: vi.fn(),
    WORKSPACE_NAME: "release-change"
  }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});

afterEach(() => {
  vi.clearAllMocks();
});

it("should log an error message when an error is caught", () => {
  vi.mocked(runCommandSync).mockImplementation(() => {
    throw new Error("Error");
  });
  try {
    getAllTags(mockedContext);
  } catch {
    expect(mockedLogger.logError).toHaveBeenCalled();
  }
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
