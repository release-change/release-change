import { getIssueAndPullRequestToken } from "@release-change/ci";
import { setLogger } from "@release-change/logger";
import {
  formatDetailedError,
  GITHUB_API_ACCEPT_HEADER,
  GITHUB_API_VERSION
} from "@release-change/shared";
import { assert, describe, expect, it, vi } from "vitest";

import { createPullRequest, getRepositoryRelatedEntryPoint } from "../src/index.js";
import {
  mockedContext,
  mockedContextInMonorepo,
  mockedContextWithNextRelease,
  mockedContextWithNextReleaseInMonorepo,
  mockedContextWithoutBranch
} from "./fixtures/mocked-context.js";
import { mockedFailureFetches } from "./fixtures/mocked-failure-fetches.js";
import { mockedFetch } from "./fixtures/mocked-fetch.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedPullRequests } from "./fixtures/mocked-pull-requests.js";
import { mockedIssuePRToken } from "./fixtures/mocked-token.js";
import { mockedUri, mockedUriForPullRequests } from "./fixtures/mocked-uri.js";

const mockedMergeOptions = {
  autoMergeAllowed: true,
  mergeCommitAllowed: true,
  rebaseMergeAllowed: true,
  squashMergeAllowed: true
};
const mockedHeadBranch = "release-change/some-branch";

global.fetch = mockedFetch;

vi.mock("@release-change/shared", () => ({
  formatDetailedError: vi.fn(),
  GITHUB_API_VERSION: "2026-03-10",
  GITHUB_API_ACCEPT_HEADER: "application/vnd.github+json"
}));
vi.mock("@release-change/logger", () => ({ checkErrorType: vi.fn(), setLogger: vi.fn() }));
vi.mock("@release-change/ci", () => ({
  getIssueAndPullRequestToken: vi.fn()
}));
vi.mock("../src/get-repository-related-entry-point.js", () => ({
  getRepositoryRelatedEntryPoint: vi.fn()
}));
vi.mocked(setLogger).mockReturnValue(mockedLogger);
vi.mocked(getIssueAndPullRequestToken).mockReturnValue(mockedIssuePRToken);
vi.mocked(getRepositoryRelatedEntryPoint).mockReturnValue(mockedUri);

it("should throw an error if both target branch and head branch are not defined", () => {
  const expectedError = new Error(
    "Failed to create the pull request: Both the target branch and the head branch must be defined.",
    {
      cause: {
        title: "Failed to create the pull request",
        message: "Both the target branch and the head branch must be defined.",
        details: {
          command: "POST /repos/:owner/:repo/pulls",
          output: "branch: undefined, headBranch: "
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() =>
    createPullRequest("", mockedMergeOptions, mockedContextWithoutBranch)
  ).rejects.toThrow("Both the target branch and the head branch must be defined.");
});
it("should throw an error if the target branch is not defined", () => {
  const expectedError = new Error(
    "Failed to create the pull request: The target branch is not defined.",
    {
      cause: {
        title: "Failed to create the pull request",
        message: "The target branch is not defined.",
        details: {
          command: "POST /repos/:owner/:repo/pulls",
          output: `branch: undefined, headBranch: ${mockedHeadBranch}`
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() =>
    createPullRequest(mockedHeadBranch, mockedMergeOptions, mockedContextWithoutBranch)
  ).rejects.toThrow("The target branch is not defined.");
});
it("should throw an error if the head branch is empty", () => {
  const expectedError = new Error(
    "Failed to create the pull request: The head branch must not be empty.",
    {
      cause: {
        title: "Failed to create the pull request",
        message: "The head branch must not be empty.",
        details: {
          command: "POST /repos/:owner/:repo/pulls",
          output: "branch: main, headBranch: "
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() => createPullRequest("", mockedMergeOptions, mockedContext)).rejects.toThrow(
    "The head branch must not be empty."
  );
});
describe.each(
  mockedPullRequests
)("when `nextRelease` is $nextRelease and `isAutoMerge` is $isAutoMerge", async ({
  isMonorepo,
  isAutoMerge,
  nextRelease,
  expectedTitle,
  expectedBody
}) => {
  const context = isMonorepo
    ? mockedContextWithNextReleaseInMonorepo
    : mockedContextWithNextRelease;
  it("should throw an error when the request fails", () => {
    vi.mocked(mockedFetch).mockRejectedValue(new Error("Failed to request the URI."));
    expect(createPullRequest(mockedHeadBranch, mockedMergeOptions, context)).rejects.toThrow(
      "Failed to request the URI."
    );
  });
  it.each(mockedFailureFetches)("$title", async ({ response, expectedError }) => {
    vi.mocked(mockedFetch).mockResolvedValue({
      ...response,
      json: () => Promise.resolve({ message: response.statusText })
    });
    vi.mocked(formatDetailedError).mockReturnValue(expectedError);
    await expect(createPullRequest(mockedHeadBranch, mockedMergeOptions, context)).rejects.toThrow(
      expectedError
    );
    expect(mockedLogger.logError).toHaveBeenCalledWith("Failed to create the pull request.");
    expect(process.exitCode).toBe(response.status);
  });
  it("should create a pull request", async () => {
    const mockedNumber = 123;
    const mockedNodeId = "fake_ID";
    const context = isMonorepo
      ? { ...mockedContextInMonorepo, nextRelease }
      : { ...mockedContext, nextRelease };
    vi.mocked(mockedFetch).mockResolvedValue({
      status: 201,
      statusText: "Created",
      json: () => Promise.resolve({ number: mockedNumber, node_id: mockedNodeId })
    });
    const returnedReference = await createPullRequest(
      mockedHeadBranch,
      { ...mockedMergeOptions, autoMergeAllowed: isAutoMerge },
      context
    );
    expect(mockedFetch).toHaveBeenCalledWith(mockedUriForPullRequests, {
      method: "POST",
      headers: {
        Accept: GITHUB_API_ACCEPT_HEADER,
        Authorization: `Bearer ${mockedIssuePRToken}`,
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": GITHUB_API_VERSION
      },
      body: JSON.stringify({
        title: expectedTitle,
        head: mockedHeadBranch,
        base: context.branch,
        body: expectedBody
      })
    });
    expect(mockedLogger.logSuccess).toHaveBeenCalledWith("Created the pull request successfully.");
    assert.deepEqual(returnedReference, {
      pullRequestNumber: mockedNumber,
      pullRequestId: mockedNodeId
    });
  });
});
