import { getIssueAndPullRequestToken } from "@release-change/ci";
import { setLogger } from "@release-change/logger";
import { formatDetailedError } from "@release-change/shared";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createPullRequest, getRepositoryRelatedEntryPoint } from "../src/index.js";
import { isAutoMergeAllowed } from "../src/is-auto-merge-allowed.js";
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

const mockedHeadBranch = "release-change/some-branch";

global.fetch = mockedFetch;

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({ formatDetailedError: vi.fn() }));
  vi.mock("@release-change/logger", () => ({ checkErrorType: vi.fn(), setLogger: vi.fn() }));
  vi.mock("@release-change/ci", () => ({
    getIssueAndPullRequestToken: vi.fn()
  }));
  vi.mock("../src/get-repository-related-entry-point.js", () => ({
    getRepositoryRelatedEntryPoint: vi.fn()
  }));
  vi.mock("../src/is-auto-merge-allowed", () => ({ isAutoMergeAllowed: vi.fn() }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
  vi.mocked(getIssueAndPullRequestToken).mockReturnValue(mockedIssuePRToken);
  vi.mocked(getRepositoryRelatedEntryPoint).mockReturnValue(mockedUri);
  vi.mocked(isAutoMergeAllowed).mockResolvedValue(false);
});
afterEach(() => {
  vi.clearAllMocks();
});

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
  expect(() => createPullRequest("", mockedContextWithoutBranch)).rejects.toThrowError(
    "Both the target branch and the head branch must be defined."
  );
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
    createPullRequest(mockedHeadBranch, mockedContextWithoutBranch)
  ).rejects.toThrowError("The target branch is not defined.");
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
  expect(() => createPullRequest("", mockedContext)).rejects.toThrowError(
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
    expect(createPullRequest(mockedHeadBranch, context)).rejects.toThrowError(
      "Failed to request the URI."
    );
  });
  it.each(mockedFailureFetches)("$title", async ({ response, expectedError }) => {
    vi.mocked(mockedFetch).mockResolvedValue({
      ...response,
      json: () => Promise.resolve({ message: response.statusText })
    });
    vi.mocked(formatDetailedError).mockReturnValue(expectedError);
    await expect(createPullRequest(mockedHeadBranch, context)).rejects.toThrowError(expectedError);
    expect(mockedLogger.logError).toHaveBeenCalledWith("Failed to create the pull request.");
    expect(process.exitCode).toBe(response.status);
  });
  it("should create a pull request", async () => {
    const context = isMonorepo
      ? { ...mockedContextInMonorepo, nextRelease }
      : { ...mockedContext, nextRelease };
    vi.mocked(mockedFetch).mockResolvedValue({
      status: 201,
      statusText: "Created",
      json: () => Promise.resolve({ message: "Created" })
    });
    vi.mocked(isAutoMergeAllowed).mockResolvedValue(isAutoMerge);
    await createPullRequest(mockedHeadBranch, context);
    expect(mockedFetch).toHaveBeenCalledWith(mockedUriForPullRequests, {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${mockedIssuePRToken}`,
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28"
      },
      body: JSON.stringify({
        title: expectedTitle,
        head: mockedHeadBranch,
        base: context.branch,
        body: expectedBody
      })
    });
    expect(mockedLogger.logSuccess).toHaveBeenCalledWith("Created the pull request successfully.");
  });
});
