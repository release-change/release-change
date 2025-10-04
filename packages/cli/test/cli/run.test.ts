import type { CliOptions, ContextBase } from "@release-change/shared";

import { configureCiEnvironment, isUsableCiEnvironment } from "@release-change/ci";
import { getReleaseType } from "@release-change/commit-analyser";
import { getConfig } from "@release-change/config";
import { getPackages, isMonorepo } from "@release-change/get-packages";
import {
  checkBranch,
  checkPushPermissions,
  checkRepository,
  getBranchName,
  getCommitsSinceRef
} from "@release-change/git";
import { getRelatedPullRequestsAndIssues } from "@release-change/github";
import { setLogger } from "@release-change/logger";
import { publish, setLastRelease, setNextRelease } from "@release-change/release";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { run } from "../../src/cli/run.js";
import { mockedLogger } from "../fixtures/mocked-logger.js";

const mockedCliOptions: CliOptions = { debug: true }; // Add more fields if needed
const mockedContextBase: ContextBase = {
  cwd: "/fake/path",
  env: {},
  config: { debug: false }
};
const mockedPackages = [
  {
    packages: [{ name: "", pathname: "." }],
    expectedToBeMonorepo: false
  },
  {
    packages: [
      { name: "", pathname: "." },
      { name: "@monorepo/a", pathname: "packages/a" },
      { name: "@monorepo/b", pathname: "packages/b" }
    ],
    expectedToBeMonorepo: true
  }
];

beforeEach(() => {
  vi.mock("@release-change/logger", () => ({ setLogger: vi.fn(), checkErrorType: vi.fn() }));
  vi.mock("@release-change/ci", () => ({
    configureCiEnvironment: vi.fn(),
    isUsableCiEnvironment: vi.fn()
  }));
  vi.mock("@release-change/config", () => ({
    getConfig: vi.fn(),
    debugConfig: vi.fn()
  }));
  vi.mock("@release-change/git", () => ({
    checkRepository: vi.fn(),
    getBranchName: vi.fn(),
    checkBranch: vi.fn(),
    checkPushPermissions: vi.fn(),
    getCommitsSinceRef: vi.fn(),
    COMMITTER_NAME: "mocked-committer-name [bot]",
    COMMITTER_EMAIL: "0+mocked-committer-name-bot@users.noreply.github.com"
  }));
  vi.mock("@release-change/commit-analyser", () => ({ getReleaseType: vi.fn() }));
  vi.mock("@release-change/release", () => ({
    setLastRelease: vi.fn(),
    setNextRelease: vi.fn(),
    publish: vi.fn()
  }));
  vi.mock("@release-change/get-packages", () => ({
    getPackages: vi.fn(),
    isMonorepo: vi.fn()
  }));
  vi.mock("@release-change/github", () => ({
    getRelatedPullRequestsAndIssues: vi.fn(),
    closeIssue: vi.fn(),
    postFailComment: vi.fn(),
    postSuccessComment: vi.fn(),
    tagPullRequestAndIssue: vi.fn()
  }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
  vi.mocked(getConfig).mockResolvedValue({
    debug: mockedContextBase.config.debug,
    dryRun: false,
    branches: ["main"],
    isMonorepo: false,
    remoteName: "origin",
    repositoryUrl: "https://github.com/user-id/repo-name",
    releaseType: { main: { channel: "default" } }
  });
  vi.mocked(getBranchName).mockReturnValue("main");
  vi.mocked(checkBranch).mockImplementation(() => undefined);
  vi.mocked(checkPushPermissions).mockResolvedValue();
  vi.mocked(getCommitsSinceRef).mockResolvedValue([
    {
      isMergeCommit: true,
      sha: "4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5",
      message: "feat(release): set last release (#75)",
      body: [],
      footer: [],
      releaseType: "minor"
    }
  ]);
  vi.mocked(setLastRelease).mockImplementation(() => {});
  vi.mocked(setNextRelease).mockImplementation(() => {});
  vi.mocked(getReleaseType).mockReturnValue([
    { name: "@monorepo/a", releaseType: null },
    { name: "@monorepo/b", releaseType: null },
    { name: "", releaseType: null }
  ]);
  vi.mocked(getRelatedPullRequestsAndIssues).mockResolvedValue();
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should log the start of the CLI run", async () => {
  await run(mockedCliOptions, mockedContextBase);
  expect(mockedLogger.logInfo).toHaveBeenCalledWith(expect.stringContaining("Running"));
});
it("should configure CI environment", async () => {
  const mockedConfigureCiEnvironment = vi
    .mocked(configureCiEnvironment)
    .mockReturnValue({ isCi: true, isPullRequest: false });
  await run(mockedCliOptions, mockedContextBase);
  expect(mockedConfigureCiEnvironment).toHaveBeenCalledWith(mockedContextBase.env);
});
it.each(mockedPackages)(
  "should get packages and determine if it is a monorepo",
  async ({ packages, expectedToBeMonorepo }) => {
    const mockedGetPackages = vi.mocked(getPackages).mockResolvedValue(packages);
    const mockedIsMonorepo = vi.mocked(isMonorepo).mockReturnValue(expectedToBeMonorepo);
    await run(mockedCliOptions, mockedContextBase);
    expect(mockedGetPackages).toHaveBeenCalledWith(mockedContextBase);
    expect(mockedIsMonorepo).toHaveBeenCalledWith(packages);
  }
);
it("should call `checkRepository`", async () => {
  const mockedCheckRepository = vi.mocked(checkRepository).mockResolvedValue(0);
  await run(mockedCliOptions, mockedContextBase);
  expect(mockedCheckRepository).toHaveBeenCalledWith(mockedContextBase.cwd, mockedLogger);
});
it("should set last release if CI is usable", async () => {
  vi.mocked(isUsableCiEnvironment).mockReturnValue(true);
  const mockedSetLastRelease = vi.mocked(setLastRelease).mockImplementation(() => undefined);
  await run(mockedCliOptions, mockedContextBase);
  expect(mockedSetLastRelease).toHaveBeenCalledWith(expect.any(Object));
});
it("should not publish if dry-run mode is enabled", async () => {
  const mockContextBaseWithDryRun = {
    ...mockedContextBase,
    config: { ...mockedContextBase.config, dryRun: true },
    nextRelease: {}
  };
  vi.mocked(getConfig).mockResolvedValue({
    debug: mockedContextBase.config.debug,
    dryRun: true,
    branches: ["main"],
    isMonorepo: false,
    remoteName: "origin",
    repositoryUrl: "https://github.com/user-id/repo-name",
    releaseType: { main: { channel: "default" } }
  });
  vi.mocked(isUsableCiEnvironment).mockReturnValue(true);
  await run(mockedCliOptions, mockContextBaseWithDryRun);
  expect(mockedLogger.logWarn).toHaveBeenCalledWith(
    "The dry-run mode is enabled; therefore, the release will not be published."
  );
});
it("should publish if dry-run mode is disabled", async () => {
  vi.mocked(isUsableCiEnvironment).mockReturnValue(true);
  const mockedPublish = vi.mocked(publish).mockResolvedValue();
  const mockContextBaseWithNoDryRun = {
    ...mockedContextBase,
    nextRelease: {}
  };
  await run(mockedCliOptions, mockContextBaseWithNoDryRun);
  expect(mockedPublish).toHaveBeenCalled();
});
