import type { Config, Context } from "@release-change/shared";

import { DEFAULT_CONFIG } from "@release-change/config";
import { setLogger } from "@release-change/logger";
import { afterEach, assert, beforeEach, expect, it, vi } from "vitest";

import { getAssociatedPullRequests } from "../src/get-associated-pull-requests.js";
import { getIssues } from "../src/get-issues.js";
import { getRepositoryRelatedEntryPoint } from "../src/get-repository-related-entry-point.js";
import { getRelatedPullRequestsAndIssues } from "../src/index.js";
import { mockedFailureFetches } from "./fixtures/mocked-failure-fetches.js";
import { mockedFetch } from "./fixtures/mocked-fetch.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedToken } from "./fixtures/mocked-token.js";

const expectedDefaultConfig = DEFAULT_CONFIG as unknown as Config;
const mockedDefaultContext: Context = {
  cwd: "/fake/path",
  env: {
    RELEASE_TOKEN: mockedToken
  },
  branch: "main",
  ci: {
    isCi: true,
    isPullRequest: false
  },
  packages: [{ name: "", pathname: "." }],
  config: expectedDefaultConfig
};
const commitMessage = "docs: some description";
const commitMessageWithPullRequest = "feat: some description (#123)";
const commitBody = ["Some text.", "Another text."];
const commitKeyValueFooter = "Footer-key: value";
const commitReferencesFooter = "Refs: #456, #789";
const commitSha = "0123456789abcdef";
const mockedCommitSample = {
  isMergeCommit: false,
  sha: commitSha,
  message: commitMessage,
  body: [],
  footer: []
};
const mockedCommitSampleWithKeyValueFooter = {
  isMergeCommit: false,
  sha: commitSha,
  message: commitMessage,
  body: [],
  footer: [commitKeyValueFooter]
};
const mockedCommitSampleWithReferencesFooter = {
  isMergeCommit: false,
  sha: commitSha,
  message: commitMessage,
  body: [],
  footer: [commitReferencesFooter]
};
const mockedCommitSampleWithBothFooters = {
  isMergeCommit: false,
  sha: commitSha,
  message: commitMessage,
  body: [],
  footer: [commitKeyValueFooter, commitReferencesFooter]
};
const mockedCommitSampleWithBody = {
  isMergeCommit: false,
  sha: commitSha,
  message: commitMessage,
  body: commitBody,
  footer: []
};
const mockedCommitSampleWithBodyWithKeyValueFooter = {
  isMergeCommit: false,
  sha: commitSha,
  message: commitMessage,
  body: commitBody,
  footer: [commitKeyValueFooter]
};
const mockedCommitSampleWithBodyWithReferencesFooter = {
  isMergeCommit: false,
  sha: commitSha,
  message: commitMessage,
  body: commitBody,
  footer: [commitReferencesFooter]
};
const mockedCommitSampleWithBodyWithBothFooters = {
  isMergeCommit: false,
  sha: commitSha,
  message: commitMessage,
  body: commitBody,
  footer: [commitKeyValueFooter, commitReferencesFooter]
};
const mockedMergeCommitSample = {
  isMergeCommit: true,
  sha: commitSha,
  message: commitMessageWithPullRequest,
  body: [],
  footer: []
};
const mockedMergeCommitSampleWithKeyValueFooter = {
  isMergeCommit: true,
  sha: commitSha,
  message: commitMessageWithPullRequest,
  body: [],
  footer: [commitKeyValueFooter]
};
const mockedMergeCommitSampleWithReferencesFooter = {
  isMergeCommit: true,
  sha: commitSha,
  message: commitMessageWithPullRequest,
  body: [],
  footer: [commitReferencesFooter]
};
const mockedMergeCommitSampleWithBothFooters = {
  isMergeCommit: true,
  sha: commitSha,
  message: commitMessageWithPullRequest,
  body: [],
  footer: [commitKeyValueFooter, commitReferencesFooter]
};
const mockedMergeCommitSampleWithBody = {
  isMergeCommit: true,
  sha: commitSha,
  message: commitMessageWithPullRequest,
  body: commitBody,
  footer: []
};
const mockedMergeCommitSampleWithBodyWithKeyValueFooter = {
  isMergeCommit: true,
  sha: commitSha,
  message: commitMessageWithPullRequest,
  body: commitBody,
  footer: [commitKeyValueFooter]
};
const mockedMergeCommitSampleWithBodyWithReferencesFooter = {
  isMergeCommit: true,
  sha: commitSha,
  message: commitMessageWithPullRequest,
  body: commitBody,
  footer: [commitReferencesFooter]
};
const mockedMergeCommitSampleWithBodyWithBothFooters = {
  isMergeCommit: true,
  sha: commitSha,
  message: commitMessageWithPullRequest,
  body: commitBody,
  footer: [commitKeyValueFooter, commitReferencesFooter]
};
const mockedCommits = [
  mockedCommitSample,
  mockedCommitSampleWithBody,
  mockedCommitSampleWithKeyValueFooter,
  mockedCommitSampleWithBodyWithKeyValueFooter,
  mockedCommitSampleWithReferencesFooter,
  mockedCommitSampleWithBodyWithReferencesFooter,
  mockedCommitSampleWithBothFooters,
  mockedCommitSampleWithBodyWithBothFooters,
  mockedMergeCommitSample,
  mockedMergeCommitSampleWithBody,
  mockedMergeCommitSampleWithKeyValueFooter,
  mockedMergeCommitSampleWithBodyWithKeyValueFooter,
  mockedMergeCommitSampleWithReferencesFooter,
  mockedMergeCommitSampleWithBodyWithReferencesFooter,
  mockedMergeCommitSampleWithBothFooters,
  mockedMergeCommitSampleWithBodyWithBothFooters
];

const mockedEntryPoint = "https://api.github.com/repos/user-id/repo-name";
const mockedAssociatedPullRequests = [
  {
    title: "Some pull request",
    body: "Some pull request comment.",
    reference: { number: 123, isPullRequest: true }
  },
  {
    title: "Another pull request",
    body: "Another pull request comment.",
    reference: {
      number: 456,
      isPullRequest: true
    }
  },
  {
    title: "Yet another pull request",
    body: null,
    reference: {
      number: 789,
      isPullRequest: true
    }
  }
];

beforeEach(() => {
  global.fetch = mockedFetch;
  vi.mock("@release-change/logger", () => ({ checkErrorType: vi.fn(), setLogger: vi.fn() }));
  vi.mock("@release-change/ci", () => ({ getReleaseToken: vi.fn() }));
  vi.mock("../src/get-repository-related-entry-point.js", () => ({
    getRepositoryRelatedEntryPoint: vi.fn()
  }));
  vi.mock("../src/get-associated-pull-requests.js", () => ({
    getAssociatedPullRequests: vi.fn()
  }));
  vi.mock("../src/get-issues.js", () => ({ getIssues: vi.fn() }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
  vi.mocked(getRepositoryRelatedEntryPoint).mockReturnValue(mockedEntryPoint);
});
afterEach(() => {
  vi.clearAllMocks();
});

it.each(mockedFailureFetches)("$title", async ({ response }) => {
  vi.spyOn(process, "exit").mockImplementation(code => {
    throw new Error(`process.exit(${code})`);
  });
  vi.mocked(mockedFetch).mockResolvedValue(response);
  process.exitCode = response.status;
  await expect(
    getRelatedPullRequestsAndIssues(mockedCommits, mockedDefaultContext)
  ).rejects.toThrow();
  expect(mockedLogger.logError).toHaveBeenCalledWith(
    "Failed to get related pull requests and issues."
  );
  expect(process.exit).toHaveBeenCalledWith(response.status);
});
it("should complete context with references to no pull requests and issues if no commits are provided", async () => {
  await getRelatedPullRequestsAndIssues([], mockedDefaultContext);
  assert.deepEqual(mockedDefaultContext.references, []);
});
it("should complete context with references to no pull requests and issues if none of them are found", async () => {
  vi.mocked(getAssociatedPullRequests).mockResolvedValue([]);
  vi.mocked(getIssues).mockReturnValue([]);
  await getRelatedPullRequestsAndIssues(mockedCommits, mockedDefaultContext);
  assert.deepEqual(mockedDefaultContext.references, []);
});
it("should complete context with references to no pull requests if none of them are found", async () => {
  vi.mocked(getAssociatedPullRequests).mockResolvedValue([]);
  vi.mocked(getIssues).mockReturnValue([
    { number: 456, isPullRequest: false },
    { number: 789, isPullRequest: false }
  ]);
  await getRelatedPullRequestsAndIssues(mockedCommits, mockedDefaultContext);
  assert.deepEqual(mockedDefaultContext.references, [
    { number: 456, isPullRequest: false },
    { number: 789, isPullRequest: false }
  ]);
});
it("should complete context with references to no issues if none of them are found", async () => {
  vi.mocked(getAssociatedPullRequests).mockResolvedValue(mockedAssociatedPullRequests);
  vi.mocked(getIssues).mockReturnValue([]);
  await getRelatedPullRequestsAndIssues(mockedCommits, mockedDefaultContext);
  assert.deepEqual(mockedDefaultContext.references, [
    { number: 123, isPullRequest: true },
    { number: 456, isPullRequest: true },
    { number: 789, isPullRequest: true }
  ]);
});
it("should complete context with references to both pull requests and issues if both of them are found", async () => {
  vi.mocked(getAssociatedPullRequests).mockResolvedValue(mockedAssociatedPullRequests);
  vi.mocked(getIssues).mockReturnValue([
    { number: 1011, isPullRequest: false },
    { number: 1213, isPullRequest: false },
    { number: 1415, isPullRequest: false }
  ]);
  await getRelatedPullRequestsAndIssues(mockedCommits, mockedDefaultContext);
  assert.deepEqual(mockedDefaultContext.references, [
    { number: 123, isPullRequest: true },
    { number: 456, isPullRequest: true },
    { number: 789, isPullRequest: true },
    { number: 1011, isPullRequest: false },
    { number: 1213, isPullRequest: false },
    { number: 1415, isPullRequest: false }
  ]);
});
