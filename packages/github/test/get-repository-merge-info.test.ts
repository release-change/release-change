import { getIssueAndPullRequestToken } from "@release-change/ci";
import { setLogger } from "@release-change/logger";
import { parsePathname } from "@release-change/shared";
import { assert, beforeEach, expect, it, vi } from "vitest";

import { getRepositoryMergeInfo } from "../src/index.js";
import { mockedContext } from "./fixtures/mocked-context.js";
import { mockedFetch } from "./fixtures/mocked-fetch.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedRepoMergeInfo } from "./fixtures/mocked-repo-merge-info.js";
import { mockedIssuePRToken } from "./fixtures/mocked-token.js";

global.fetch = mockedFetch;

vi.mock("@release-change/shared", () => ({
  formatDetailedError: vi.fn(),
  parsePathname: vi.fn()
}));
vi.mock("@release-change/logger", () => ({ setLogger: vi.fn() }));
vi.mock("@release-change/ci", () => ({
  getIssueAndPullRequestToken: vi.fn()
}));
vi.mocked(setLogger).mockReturnValue(mockedLogger);
vi.mocked(getIssueAndPullRequestToken).mockReturnValue(mockedIssuePRToken);

beforeEach(() => {
  vi.mocked(parsePathname).mockReturnValue({ owner: "user-id", repository: "repo-name" });
});

it("should throw an error when the pathname cannot be parsed", async () => {
  vi.mocked(parsePathname).mockReturnValue(null);
  await expect(getRepositoryMergeInfo(mockedContext)).rejects.toThrow(
    "Failed to parse the repository URL"
  );
  expect(mockedLogger.logError).toHaveBeenCalledWith("Failed to parse the repository URL.");
});
it("should throw an error when the response is an empty object", async () => {
  vi.mocked(mockedFetch).mockResolvedValue({
    json: () => Promise.resolve({})
  });
  await expect(getRepositoryMergeInfo(mockedContext)).rejects.toThrow(
    "Failed to get the information about the repository merge options."
  );
  expect(mockedLogger.logError).toHaveBeenCalledWith(
    "Failed to get the information about the repository merge options."
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
  await expect(getRepositoryMergeInfo(mockedContext)).rejects.toThrow(
    "Failed to get the information about the repository merge options"
  );
  expect(mockedLogger.logError).toHaveBeenCalledWith(
    "Failed to get the information about the repository merge options."
  );
});
it.each(mockedRepoMergeInfo)("should return the expected info", async ({ response, expected }) => {
  vi.mocked(mockedFetch).mockResolvedValue({
    json: () => Promise.resolve(response)
  });
  expect(mockedFetch).toHaveBeenCalledWith("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${mockedIssuePRToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
query($owner: String!, $repository: String!) {
  repository(owner: $owner, name: $repository) {
    autoMergeAllowed
    mergeCommitAllowed
    rebaseMergeAllowed
    squashMergeAllowed
  }
}
`,
      variables: {
        owner: "user-id",
        repository: "repo-name"
      }
    })
  });
  assert.deepEqual(await getRepositoryMergeInfo(mockedContext), expected);
});
