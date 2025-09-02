import type { Context } from "@release-change/shared";

import { setLogger } from "@release-change/logger";
import { parsePathname, runCommand } from "@release-change/shared";
import { afterEach, assert, beforeEach, expect, it, vi } from "vitest";

import { getPullRequests } from "../src/get-pull-requests.js";
import { mockedCurlHeaders } from "./fixtures/mocked-curl-headers.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedToken } from "./fixtures/mocked-token.js";

const mockedRepositoryUrl = "https://github.com/user-id/repo-name.git";
const mockedConfig = {
  branches: ["main"],
  releaseType: {
    main: {
      channel: "latest"
    }
  },
  isMonorepo: false,
  dependencyUpdateMethod: null,
  debug: false,
  dryRun: false,
  repositoryUrl: mockedRepositoryUrl,
  remoteName: "origin"
};
const mockedContext: Context = {
  cwd: "/fake/path",
  env: {
    RELEASE_TOKEN: mockedToken
  },
  branch: "main",
  ci: {
    isCi: true,
    isPullRequest: false
  },
  config: mockedConfig,
  packages: [{ name: "", path: "." }]
};
const mockedPathnameGroups = {
  owner: "user-id",
  repository: "repo-name"
};

beforeEach(() => {
  vi.mock("@release-change/logger", () => ({
    checkErrorType: vi.fn(),
    setLogger: vi.fn()
  }));
  vi.mock("@release-change/shared", () => ({ runCommand: vi.fn(), parsePathname: vi.fn() }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error when the command returns a status other than 0", async () => {
  vi.mocked(parsePathname).mockReturnValue(mockedPathnameGroups);
  vi.mocked(runCommand).mockResolvedValue({
    status: 1,
    stdout: "",
    stderr: "API GitHub error"
  });
  await expect(getPullRequests("0123456", mockedContext)).rejects.toThrow("API GitHub error");
  expect(mockedLogger.logError).toHaveBeenCalledWith(
    "Failed to get related pull requests from commit SHA 0123456."
  );
  expect(process.exitCode).toBe(1);
});
it("should not throw an error when the command returns a non-empty stderr", async () => {
  vi.mocked(parsePathname).mockReturnValue(mockedPathnameGroups);
  vi.mocked(runCommand).mockResolvedValue({
    status: 0,
    stdout: JSON.stringify([]),
    stderr: "Error"
  });
  await getPullRequests("0123456", mockedContext);
  expect(mockedLogger.logError).not.toHaveBeenCalled();
});
it("should return the pull request numbers", async () => {
  const mockedPullRequests = [{ number: 42 }, { number: 43 }];
  vi.mocked(parsePathname).mockReturnValue({
    owner: "user-id",
    repository: "repo-name"
  });
  vi.mocked(runCommand).mockResolvedValue({
    status: 0,
    stdout: JSON.stringify(mockedPullRequests),
    stderr: ""
  });
  assert.deepEqual(await getPullRequests("0123456", mockedContext), [
    { number: 42, isPullRequest: true },
    { number: 43, isPullRequest: true }
  ]);
  expect(runCommand).toHaveBeenCalledWith("curl", mockedCurlHeaders);
});
it("should return an empty array when the SHA does not have any associated pull requests", async () => {
  vi.mocked(parsePathname).mockReturnValue({
    owner: "user-id",
    repository: "repo-name"
  });
  vi.mocked(runCommand).mockResolvedValue({
    status: 0,
    stdout: JSON.stringify([]),
    stderr: ""
  });
  assert.deepEqual(await getPullRequests("0123456", mockedContext), []);
});
