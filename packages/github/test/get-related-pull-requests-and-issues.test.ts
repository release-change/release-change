import { setLogger } from "@release-change/logger";
import { afterEach, assert, beforeEach, expect, it, vi } from "vitest";

import { getAssociatedPullRequests } from "../src/get-associated-pull-requests.js";
import { getIssues } from "../src/get-issues.js";
import { getRelatedPullRequestsAndIssues, getRepositoryRelatedEntryPoint } from "../src/index.js";
import { mockedCommits, mockedDefaultContext } from "./fixtures/mocked-commits.js";
import { mockedFailureFetches } from "./fixtures/mocked-failure-fetches.js";
import { mockedFetch } from "./fixtures/mocked-fetch.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

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
