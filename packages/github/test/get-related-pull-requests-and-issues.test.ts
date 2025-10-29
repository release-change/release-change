import type { DetailedError } from "@release-change/shared";

import { addErrorToContext, setLogger } from "@release-change/logger";
import { afterEach, assert, beforeEach, expect, it, vi } from "vitest";

import { getAssociatedPullRequests } from "../src/get-associated-pull-requests.js";
import { getIssues } from "../src/get-issues.js";
import { getRelatedPullRequestsAndIssues, getRepositoryRelatedEntryPoint } from "../src/index.js";
import { mockedCommits } from "./fixtures/mocked-commits.js";
import { mockedContextWithNextRelease } from "./fixtures/mocked-context.js";
import { mockedFailureFetchesForCommits } from "./fixtures/mocked-failure-fetches.js";
import { mockedFetch } from "./fixtures/mocked-fetch.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

const mockedEntryPoint = "https://api.github.com/repos/user-id/repo-name";
const mockedAssociatedPullRequests = [
  {
    title: "Some pull request",
    body: "Some pull request comment.",
    reference: { number: 123, isPullRequest: true, gitTags: ["v1.2.3"] }
  },
  {
    title: "Another pull request",
    body: "Another pull request comment.",
    reference: {
      number: 456,
      isPullRequest: true,
      gitTags: ["v1.2.3"]
    }
  },
  {
    title: "Yet another pull request",
    body: null,
    reference: {
      number: 789,
      isPullRequest: true,
      gitTags: ["v1.2.3"]
    }
  }
];

beforeEach(() => {
  global.fetch = mockedFetch;
  vi.mock("@release-change/logger", () => ({
    addErrorToContext: vi.fn(),
    checkErrorType: vi.fn(),
    setLogger: vi.fn()
  }));
  vi.mock("@release-change/ci", () => ({ getReleaseToken: vi.fn() }));
  vi.mock("../src/get-repository-related-entry-point.js", () => ({
    getRepositoryRelatedEntryPoint: vi.fn()
  }));
  vi.mock("../src/get-associated-pull-requests.js", () => ({
    getAssociatedPullRequests: vi.fn()
  }));
  vi.mock("../src/get-issues.js", () => ({ getIssues: vi.fn() }));
  vi.mocked(addErrorToContext).mockImplementation((error, context) => {
    if (error instanceof Error) {
      const { cause } = error;
      if (
        cause &&
        typeof cause === "object" &&
        "title" in cause &&
        "message" in cause &&
        "details" in cause
      ) {
        context.errors.push(cause as DetailedError);
      }
    }
  });
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
  vi.mocked(getRepositoryRelatedEntryPoint).mockReturnValue(mockedEntryPoint);
});
afterEach(() => {
  vi.clearAllMocks();
});

it.each(mockedFailureFetchesForCommits)("$title", async ({ response, expectedError }) => {
  const error = expectedError;
  vi.spyOn(process, "exit").mockImplementation(() => {
    throw error;
  });
  process.exitCode = response.status;
  vi.mocked(getAssociatedPullRequests).mockRejectedValue(error);
  await expect(
    getRelatedPullRequestsAndIssues(mockedCommits, mockedContextWithNextRelease)
  ).rejects.toThrowError(expectedError);
  expect(mockedLogger.logError).toHaveBeenCalledWith(
    "Failed to get related pull requests and issues."
  );
  expect(process.exitCode).toBe(response.status);
  assert.deepNestedInclude(mockedContextWithNextRelease.errors, error.cause);
});
it("should complete context with references to no pull requests and issues if no commits are provided", async () => {
  await getRelatedPullRequestsAndIssues([], mockedContextWithNextRelease);
  assert.deepEqual(mockedContextWithNextRelease.references, []);
  expect(mockedLogger.logInfo).toHaveBeenCalledWith("No pull requests nor issues found.");
});
it("should complete context with references to no pull requests and issues if none of them are found", async () => {
  vi.mocked(getAssociatedPullRequests).mockResolvedValue([]);
  vi.mocked(getIssues).mockReturnValue([]);
  await getRelatedPullRequestsAndIssues(mockedCommits, mockedContextWithNextRelease);
  assert.deepEqual(mockedContextWithNextRelease.references, []);
  expect(mockedLogger.logInfo).toHaveBeenCalledWith("No pull requests nor issues found.");
});
it("should complete context with references to no pull requests if none of them are found", async () => {
  vi.mocked(getAssociatedPullRequests).mockResolvedValue([]);
  vi.mocked(getIssues).mockReturnValue([
    { number: 456, isPullRequest: false, gitTags: ["v1.2.3"] },
    { number: 789, isPullRequest: false, gitTags: ["v1.2.3"] }
  ]);
  await getRelatedPullRequestsAndIssues(mockedCommits, mockedContextWithNextRelease);
  assert.deepEqual(mockedContextWithNextRelease.references, [
    { number: 456, isPullRequest: false, gitTags: ["v1.2.3"] },
    { number: 789, isPullRequest: false, gitTags: ["v1.2.3"] }
  ]);
  expect(mockedLogger.logInfo).toHaveBeenCalledWith("No pull requests and 2 issues found.");
});
it("should complete context with references to no issues if none of them are found", async () => {
  vi.mocked(getAssociatedPullRequests).mockResolvedValue(mockedAssociatedPullRequests);
  vi.mocked(getIssues).mockReturnValue([]);
  await getRelatedPullRequestsAndIssues(mockedCommits, mockedContextWithNextRelease);
  assert.deepEqual(mockedContextWithNextRelease.references, [
    { number: 123, isPullRequest: true, gitTags: ["v1.2.3"] },
    { number: 456, isPullRequest: true, gitTags: ["v1.2.3"] },
    { number: 789, isPullRequest: true, gitTags: ["v1.2.3"] }
  ]);
  expect(mockedLogger.logInfo).toHaveBeenCalledWith("3 pull requests and no issues found.");
});
it("should complete context with references to both pull requests and issues if both of them are found", async () => {
  vi.mocked(getAssociatedPullRequests).mockResolvedValue(mockedAssociatedPullRequests);
  vi.mocked(getIssues).mockReturnValue([
    { number: 1011, isPullRequest: false, gitTags: ["v1.2.3"] },
    { number: 1213, isPullRequest: false, gitTags: ["v1.2.3"] },
    { number: 1415, isPullRequest: false, gitTags: ["v1.2.3"] }
  ]);
  await getRelatedPullRequestsAndIssues(mockedCommits, mockedContextWithNextRelease);
  assert.deepEqual(mockedContextWithNextRelease.references, [
    { number: 123, isPullRequest: true, gitTags: ["v1.2.3"] },
    { number: 456, isPullRequest: true, gitTags: ["v1.2.3"] },
    { number: 789, isPullRequest: true, gitTags: ["v1.2.3"] },
    { number: 1011, isPullRequest: false, gitTags: ["v1.2.3"] },
    { number: 1213, isPullRequest: false, gitTags: ["v1.2.3"] },
    { number: 1415, isPullRequest: false, gitTags: ["v1.2.3"] }
  ]);
  expect(mockedLogger.logInfo).toHaveBeenCalledWith("3 pull requests and 3 issues found.");
});
