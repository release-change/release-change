import { getIssueAndPullRequestToken } from "@release-change/ci";
import { setLogger } from "@release-change/logger";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { enableAutoMerge, GITHUB_GRAPHQL_API_ENDPOINT } from "../src/index.js";
import { mockedAutoMergeEnablings } from "./fixtures/mocked-auto-merge-enablings.js";
import { mockedAutoMergeEnablingsInMonorepo } from "./fixtures/mocked-auto-merge-enablings-in-monorepo.js";
import { mockedContext, mockedContextInMonorepo } from "./fixtures/mocked-context.js";
import { mockedFetch } from "./fixtures/mocked-fetch.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedIssuePRToken } from "./fixtures/mocked-token.js";

const mockedPullRequestId = "fake_ID";
const mockedMergeOptions = {
  autoMergeAllowed: true,
  mergeCommitAllowed: true,
  rebaseMergeAllowed: true,
  squashMergeAllowed: true
};

global.fetch = mockedFetch;

vi.mock("@release-change/shared", () => ({
  formatDetailedError: vi.fn(),
  parsePathname: vi.fn()
}));
vi.mock("@release-change/logger", () => ({ setLogger: vi.fn() }));
vi.mock("@release-change/ci", () => ({
  getIssueAndPullRequestToken: vi.fn()
}));

beforeEach(() => {
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
  vi.mocked(getIssueAndPullRequestToken).mockReturnValue(mockedIssuePRToken);
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should log a warning when the response is an empty object", async () => {
  vi.mocked(mockedFetch).mockResolvedValue({
    json: () => Promise.resolve({})
  });
  await enableAutoMerge(mockedPullRequestId, mockedMergeOptions, mockedContext);
  expect(mockedLogger.logWarn).toHaveBeenCalledWith(
    "Failed to enable the auto-merge for the pull request."
  );
});
it("should throw an error when the response has errors", async () => {
  vi.mocked(mockedFetch).mockResolvedValue({
    json: () =>
      Promise.resolve({
        errors: [
          {
            message: "Error message 1"
          },
          {
            message: "Error message 2"
          }
        ]
      })
  });
  await enableAutoMerge(mockedPullRequestId, mockedMergeOptions, mockedContext);
  expect(mockedLogger.logWarn).toHaveBeenCalledWith(
    "Failed to enable the auto-merge for the pull request."
  );
});
it("should not fetch the GitHub GraphQL API if the auto-merge is not allowed", async () => {
  const mergeOptions = {
    autoMergeAllowed: false,
    mergeCommitAllowed: true,
    rebaseMergeAllowed: true,
    squashMergeAllowed: true
  };
  await enableAutoMerge(mockedPullRequestId, mergeOptions, mockedContext);
  expect(mockedFetch).not.toHaveBeenCalled();
});
it("should not fetch the GitHub GraphQL API if no merge method is found", async () => {
  const mergeOptions = {
    autoMergeAllowed: true,
    mergeCommitAllowed: false,
    rebaseMergeAllowed: false,
    squashMergeAllowed: false
  };
  await enableAutoMerge(mockedPullRequestId, mergeOptions, mockedContext);
  expect(mockedFetch).not.toHaveBeenCalled();
});
it.each(
  mockedAutoMergeEnablings
)("should enable the auto-merge with the appropriate method", async ({
  mergeOptions,
  expectedMergeMethod
}) => {
  vi.mocked(mockedFetch).mockResolvedValue({
    json: () =>
      Promise.resolve({
        data: {
          enablePullRequestAutoMerge: {
            pullRequest: {
              number: mockedPullRequestId,
              autoMergeRequest: {
                mergeMethod: expectedMergeMethod
              }
            }
          }
        }
      })
  });
  await enableAutoMerge(mockedPullRequestId, mergeOptions, mockedContext);
  expect(mockedFetch).toHaveBeenCalledWith(GITHUB_GRAPHQL_API_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${mockedIssuePRToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
mutation EnablePullRequestAutoMerge(
  $pullRequestId: ID!,
  $mergeMethod: PullRequestMergeMethod!
) {
  enablePullRequestAutoMerge(
    input: {
      pullRequestId: $pullRequestId,
      mergeMethod: $mergeMethod
    }
  ) {
    pullRequest {
      number
      autoMergeRequest {
        mergeMethod
      }
    }
  }
}
`,
      variables: {
        pullRequestId: mockedPullRequestId,
        mergeMethod: expectedMergeMethod
      }
    })
  });
  expect(mockedLogger.logInfo).toHaveBeenCalledWith(
    `Enabled the auto-merge for the pull request with the ${expectedMergeMethod} method.`
  );
});
it.each(
  mockedAutoMergeEnablingsInMonorepo
)("should enable the auto-merge with the appropriate method in monorepo", async ({
  mergeOptions,
  expectedMergeMethod
}) => {
  vi.mocked(mockedFetch).mockResolvedValue({
    json: () =>
      Promise.resolve({
        data: {
          enablePullRequestAutoMerge: {
            pullRequest: {
              number: mockedPullRequestId,
              autoMergeRequest: {
                mergeMethod: expectedMergeMethod
              }
            }
          }
        }
      })
  });
  await enableAutoMerge(mockedPullRequestId, mergeOptions, mockedContextInMonorepo);
  expect(mockedFetch).toHaveBeenCalledWith(GITHUB_GRAPHQL_API_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${mockedIssuePRToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
mutation EnablePullRequestAutoMerge(
  $pullRequestId: ID!,
  $mergeMethod: PullRequestMergeMethod!
) {
  enablePullRequestAutoMerge(
    input: {
      pullRequestId: $pullRequestId,
      mergeMethod: $mergeMethod
    }
  ) {
    pullRequest {
      number
      autoMergeRequest {
        mergeMethod
      }
    }
  }
}
`,
      variables: {
        pullRequestId: mockedPullRequestId,
        mergeMethod: expectedMergeMethod
      }
    })
  });
  expect(mockedLogger.logInfo).toHaveBeenCalledWith(
    `Enabled the auto-merge for the pull request with the ${expectedMergeMethod} method.`
  );
});
