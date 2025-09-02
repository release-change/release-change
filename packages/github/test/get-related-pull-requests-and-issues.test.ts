import type { Config, Context } from "@release-change/shared";

import { DEFAULT_CONFIG } from "@release-change/config";
import { setLogger } from "@release-change/logger";
import { afterEach, assert, beforeEach, expect, it, vi } from "vitest";

import { getIssues } from "../src/get-issues.js";
import { getPullRequestBody } from "../src/get-pull-request-body.js";
import { getPullRequests } from "../src/get-pull-requests.js";
import { getRelatedPullRequestsAndIssues } from "../src/index.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

const expectedDefaultConfig = DEFAULT_CONFIG as unknown as Config;
const mockedDefaultContext: Context = {
  cwd: "/fake/path",
  env: {},
  branch: "main",
  ci: {
    isCi: true,
    isPullRequest: false
  },
  packages: [{ name: "", path: "." }],
  config: expectedDefaultConfig
};
const commitDescription = "docs: some description";
const commitDescriptionWithPullRequest = "feat: some description (#123)";
const commitBody = ["Some text.", "Another text."];
const commitKeyValueFooter = "Footer-key: value";
const commitReferencesFooter = "Refs: #456, #789";
const commitSha = "0123456789abcdef";
const mockedCommitSample = { sha: commitSha, description: commitDescription, body: [], footer: [] };
const mockedCommitSampleWithKeyValueFooter = {
  sha: commitSha,
  description: commitDescription,
  body: [],
  footer: [commitKeyValueFooter]
};
const mockedCommitSampleWithReferencesFooter = {
  sha: commitSha,
  description: commitDescription,
  body: [],
  footer: [commitReferencesFooter]
};
const mockedCommitSampleWithBothFooters = {
  sha: commitSha,
  description: commitDescription,
  body: [],
  footer: [commitKeyValueFooter, commitReferencesFooter]
};
const mockedCommitSampleWithBody = {
  sha: commitSha,
  description: commitDescription,
  body: commitBody,
  footer: []
};
const mockedCommitSampleWithBodyWithKeyValueFooter = {
  sha: commitSha,
  description: commitDescription,
  body: commitBody,
  footer: [commitKeyValueFooter]
};
const mockedCommitSampleWithBodyWithReferencesFooter = {
  sha: commitSha,
  description: commitDescription,
  body: commitBody,
  footer: [commitReferencesFooter]
};
const mockedCommitSampleWithBodyWithBothFooters = {
  sha: commitSha,
  description: commitDescription,
  body: commitBody,
  footer: [commitKeyValueFooter, commitReferencesFooter]
};
const mockedMergeCommitSample = {
  sha: commitSha,
  description: commitDescriptionWithPullRequest,
  body: [],
  footer: []
};
const mockedMergeCommitSampleWithKeyValueFooter = {
  sha: commitSha,
  description: commitDescriptionWithPullRequest,
  body: [],
  footer: [commitKeyValueFooter]
};
const mockedMergeCommitSampleWithReferencesFooter = {
  sha: commitSha,
  description: commitDescriptionWithPullRequest,
  body: [],
  footer: [commitReferencesFooter]
};
const mockedMergeCommitSampleWithBothFooters = {
  sha: commitSha,
  description: commitDescriptionWithPullRequest,
  body: [],
  footer: [commitKeyValueFooter, commitReferencesFooter]
};
const mockedMergeCommitSampleWithBody = {
  sha: commitSha,
  description: commitDescriptionWithPullRequest,
  body: commitBody,
  footer: []
};
const mockedMergeCommitSampleWithBodyWithKeyValueFooter = {
  sha: commitSha,
  description: commitDescriptionWithPullRequest,
  body: commitBody,
  footer: [commitKeyValueFooter]
};
const mockedMergeCommitSampleWithBodyWithReferencesFooter = {
  sha: commitSha,
  description: commitDescriptionWithPullRequest,
  body: commitBody,
  footer: [commitReferencesFooter]
};
const mockedMergeCommitSampleWithBodyWithBothFooters = {
  sha: commitSha,
  description: commitDescriptionWithPullRequest,
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

beforeEach(() => {
  vi.mock("@release-change/logger", () => ({ setLogger: vi.fn() }));
  vi.mock("../src/get-issues.js", () => ({ getIssues: vi.fn() }));
  vi.mock("../src/get-pull-request-body.js", () => ({ getPullRequestBody: vi.fn() }));
  vi.mock("../src/get-pull-requests.js", () => ({ getPullRequests: vi.fn() }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error in case of failure", async () => {
  vi.mocked(getIssues).mockReturnValue([]);
  vi.mocked(getPullRequests).mockRejectedValue(new Error("Error"));
  await expect(
    getRelatedPullRequestsAndIssues(mockedCommits, mockedDefaultContext)
  ).rejects.toThrow();
  expect(mockedLogger.logError).toHaveBeenCalledWith(
    "Failed to get related pull requests and issues."
  );
});
it("should add context with references to no pull requests and issues if no commits are provided", async () => {
  await getRelatedPullRequestsAndIssues([], mockedDefaultContext);
  assert.deepEqual(mockedDefaultContext.references, []);
});
it("should add context with references to no pull requests and issues if none of them are found", async () => {
  vi.mocked(getIssues).mockReturnValue([]);
  vi.mocked(getPullRequests).mockResolvedValue([]);
  await getRelatedPullRequestsAndIssues(mockedCommits, mockedDefaultContext);
  assert.deepEqual(mockedDefaultContext.references, []);
});
it("should add context with references to no pull requests if none of them are found", async () => {
  vi.mocked(getIssues).mockReturnValue([
    { number: 456, isPullRequest: false },
    { number: 789, isPullRequest: false }
  ]);
  vi.mocked(getPullRequests).mockResolvedValue([]);
  await getRelatedPullRequestsAndIssues(mockedCommits, mockedDefaultContext);
  assert.deepEqual(mockedDefaultContext.references, [
    { number: 456, isPullRequest: false },
    { number: 789, isPullRequest: false }
  ]);
});
it("should add context with references to no issues if none of them are found", async () => {
  vi.mocked(getPullRequestBody).mockResolvedValue([""]);
  vi.mocked(getIssues).mockReturnValue([]);
  vi.mocked(getPullRequests).mockResolvedValue([
    { number: 123, isPullRequest: true },
    { number: 456, isPullRequest: true },
    { number: 789, isPullRequest: true }
  ]);
  await getRelatedPullRequestsAndIssues(mockedCommits, mockedDefaultContext);
  assert.deepEqual(mockedDefaultContext.references, [
    { number: 123, isPullRequest: true },
    { number: 456, isPullRequest: true },
    { number: 789, isPullRequest: true }
  ]);
});
it("should add context with references to both pull requests and issues if both of them are found", async () => {
  vi.mocked(getPullRequestBody).mockResolvedValue([""]);
  vi.mocked(getIssues).mockReturnValue([
    { number: 456, isPullRequest: false },
    { number: 789, isPullRequest: false }
  ]);
  vi.mocked(getPullRequests).mockResolvedValue([
    { number: 123, isPullRequest: true },
    { number: 456, isPullRequest: true },
    { number: 789, isPullRequest: true }
  ]);
  await getRelatedPullRequestsAndIssues(mockedCommits, mockedDefaultContext);
  assert.deepEqual(mockedDefaultContext.references, [
    { number: 123, isPullRequest: true },
    { number: 456, isPullRequest: true },
    { number: 789, isPullRequest: true },
    { number: 456, isPullRequest: false },
    { number: 789, isPullRequest: false }
  ]);
});
