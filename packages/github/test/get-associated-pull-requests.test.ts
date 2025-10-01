import type { AssociatedPullRequest } from "../src/github.types.js";

import { assert, expect, it, vi } from "vitest";

import { getAssociatedPullRequests } from "../src/get-associated-pull-requests.js";
import { mockedFailureFetchesForCommits } from "./fixtures/mocked-failure-fetches.js";
import { mockedFetch } from "./fixtures/mocked-fetch.js";
import { mockedUriForCommits } from "./fixtures/mocked-uri.js";

const mockedGitTags = ["v1.2.3", "@monorepo/a@v1.2.3"];
const mockedEnv = {
  RELEASE_TOKEN: "release-token"
};

global.fetch = mockedFetch;

it("should throw an error when the request fails", async () => {
  vi.mocked(mockedFetch).mockRejectedValue(new Error("Failed to request the URI."));
  await expect(
    getAssociatedPullRequests(mockedUriForCommits, mockedGitTags, mockedEnv)
  ).rejects.toThrow("Failed to request the URI.");
});
it.each(mockedFailureFetchesForCommits)("$title", async ({ response, expectedError }) => {
  vi.mocked(mockedFetch).mockResolvedValue(response);
  await expect(
    getAssociatedPullRequests(mockedUriForCommits, mockedGitTags, mockedEnv)
  ).rejects.toThrow(expectedError);
  expect(process.exitCode).toBe(response.status);
});
it("should return the associated pull requests", async () => {
  const mockedPullRequests = [
    { number: 42, title: "Some pull request", body: "Some comment about the pull request." },
    { number: 43, title: "Another pull request", body: null }
  ];
  const expected: AssociatedPullRequest[] = [
    {
      title: "Some pull request",
      body: "Some comment about the pull request.",
      reference: { number: 42, isPullRequest: true, gitTags: mockedGitTags }
    },
    {
      title: "Another pull request",
      body: null,
      reference: { number: 43, isPullRequest: true, gitTags: mockedGitTags }
    }
  ];
  vi.mocked(mockedFetch).mockResolvedValue({
    status: 200,
    json: () => Promise.resolve(mockedPullRequests)
  });
  const result = await getAssociatedPullRequests(mockedUriForCommits, mockedGitTags, mockedEnv);
  expect(mockedFetch).toHaveBeenCalledWith(mockedUriForCommits, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${mockedEnv.RELEASE_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28"
    }
  });
  assert.deepEqual(result, expected);
});
