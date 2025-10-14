/** biome-ignore-all lint/correctness/noUnusedImports: <TODO: drop this line when the API is used> */
/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <TODO: drop this line when the API is used> */
import { getIssueAndPullRequestToken } from "@release-change/ci";
import { setLogger } from "@release-change/logger";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getRepositoryRelatedEntryPoint, postFailComment } from "../src/index.js";
import {
  mockedContextWithNextRelease,
  mockedContextWithNextReleaseInMonorepo,
  mockedContextWithoutBranch
} from "./fixtures/mocked-context.js";
import { mockedFailComments } from "./fixtures/mocked-fail-comments.js";
import { mockedFailureFetches } from "./fixtures/mocked-failure-fetches.js";
import { mockedFetch } from "./fixtures/mocked-fetch.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedIssuePRToken } from "./fixtures/mocked-token.js";
import { mockedUriForComments } from "./fixtures/mocked-uri.js";

global.fetch = mockedFetch;

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({ runCommand: vi.fn() }));
  vi.mock("@release-change/logger", () => ({ setLogger: vi.fn() }));
  vi.mock("@release-change/ci", () => ({
    getIssueAndPullRequestToken: vi.fn()
  }));
  vi.mock("../src/get-repository-related-entry-point.js", () => ({
    getRepositoryRelatedEntryPoint: vi.fn()
  }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
  vi.mocked(getIssueAndPullRequestToken).mockReturnValue(mockedIssuePRToken);
  vi.mocked(getRepositoryRelatedEntryPoint).mockReturnValue(
    "https://api.github.com/repos/user-id/repo-name"
  );
});
afterEach(() => {
  vi.clearAllMocks();
});

describe.each(mockedFailComments)(
  "for $type and reference $reference",
  ({ type, isMonorepo, reference, expectedBody }) => {
    it("should throw an error if no branch is defined", async () => {
      await expect(postFailComment(reference, mockedContextWithoutBranch)).rejects.toThrowError(
        "The target branch is not defined."
      );
    });
    // TODO: uncomment when the API is used
    // it("should throw an error when the request fails", async () => {
    //   vi.mocked(mockedFetch).mockRejectedValue(new Error("Failed to request the URI."));
    //   await expect(postFailComment(reference, mockedContextWithNextRelease)).rejects.toThrow(
    //     "Failed to request the URI."
    //   );
    // });
    // it.each(mockedFailureFetches)("$title", async ({ response, expectedError }) => {
    //   vi.mocked(mockedFetch).mockResolvedValue({
    //     ...response,
    //     json: () => Promise.resolve({ message: response.statusText })
    //   });
    //   await expect(postFailComment(reference, mockedContextWithNextRelease)).rejects.toThrow(
    //     expectedError
    //   );
    //   expect(mockedLogger.logError).toHaveBeenCalledWith(
    //     `Failed to post the fail comment on ${type} #${reference.number}.`
    //   );
    //   expect(process.exitCode).toBe(response.status);
    // });
    // it("should log a warning message if the URI is not found", async () => {
    //   const context = isMonorepo
    //     ? mockedContextWithNextReleaseInMonorepo
    //     : mockedContextWithNextRelease;
    //   vi.mocked(mockedFetch).mockResolvedValue({
    //     status: 404,
    //     statusText: "Not Found",
    //     json: () => Promise.resolve({ message: "Not Found" })
    //   });
    //   await postFailComment(reference, context);
    //   expect(mockedLogger.logWarn).toHaveBeenCalledWith(
    //     `The resource requested for ${type} #123 has not been found; therefore, the fail comment has not been added.`
    //   );
    // });
    // it("should post a fail comment", async () => {
    //   const context = isMonorepo
    //     ? mockedContextWithNextReleaseInMonorepo
    //     : mockedContextWithNextRelease;
    //   vi.mocked(mockedFetch).mockResolvedValue({
    //     status: 201,
    //     statusText: "Created",
    //     json: () => Promise.resolve({ message: "Created" })
    //   });
    //   await postFailComment(reference, context);
    //   expect(mockedFetch).toHaveBeenCalledWith(mockedUriForComments, {
    //     method: "POST",
    //     headers: {
    //       Accept: "application/vnd.github+json",
    //       Authorization: `Bearer ${mockedIssuePRToken}`,
    //       "Content-Type": "application/json",
    //       "X-GitHub-Api-Version": "2022-11-28"
    //     },
    //     body: JSON.stringify({
    //       body: expectedBody
    //     })
    //   });
    //   expect(mockedLogger.logInfo).toHaveBeenCalledWith(`Added fail comment on ${type} #123.`);
    // });
  }
);
