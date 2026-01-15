import { getIssueAndPullRequestToken } from "@release-change/ci";
import { formatDetailedError } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { isAutoMergeAllowed } from "../src/is-auto-merge-allowed.js";
import { mockedContext } from "./fixtures/mocked-context.js";
import { mockedFailureFetches } from "./fixtures/mocked-failure-fetches.js";
import { mockedFetch } from "./fixtures/mocked-fetch.js";
import { mockedRepo } from "./fixtures/mocked-repo.js";
import { mockedIssuePRToken } from "./fixtures/mocked-token.js";
import { mockedUri } from "./fixtures/mocked-uri.js";

global.fetch = mockedFetch;

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({ formatDetailedError: vi.fn() }));
  vi.mock("@release-change/ci", () => ({
    getIssueAndPullRequestToken: vi.fn()
  }));
  vi.mocked(getIssueAndPullRequestToken).mockReturnValue(mockedIssuePRToken);
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if the entry point is empty", () => {
  const expectedError = new Error(
    "Failed to check if auto-merge is allowed: The entry point must not be empty.",
    {
      cause: {
        title: "Failed to check if auto-merge is allowed",
        message: "The entry point must not be empty.",
        details: {
          output: "repositoryEntryPoint: "
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(isAutoMergeAllowed("", mockedContext)).rejects.toThrowError(
    "The entry point must not be empty."
  );
});
it("should throw an error when the request fails", () => {
  vi.mocked(mockedFetch).mockRejectedValue(new Error("Failed to request the URI."));
  expect(isAutoMergeAllowed(mockedUri, mockedContext)).rejects.toThrowError(
    "Failed to request the URI."
  );
});
it.each(mockedFailureFetches)("$title", async ({ response, expectedError }) => {
  vi.mocked(mockedFetch).mockResolvedValue({
    ...response,
    json: () => Promise.resolve({ message: response.statusText })
  });
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  await expect(isAutoMergeAllowed(mockedUri, mockedContext)).rejects.toThrowError(expectedError);
  expect(process.exitCode).toBe(response.status);
});
it.each(mockedRepo)("$title", async ({ response, expected }) => {
  vi.mocked(mockedFetch).mockResolvedValue(response);
  expect(isAutoMergeAllowed(mockedUri, mockedContext)).resolves.toBe(expected);
});
