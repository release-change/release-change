/** biome-ignore-all lint/correctness/noUnusedImports: <TODO: drop this line when the API is used> */
/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <TODO: drop this line when the API is used> */
import { getIssueAndPullRequestToken } from "@release-change/ci";
import { setLogger } from "@release-change/logger";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getRepositoryRelatedEntryPoint, postSuccessComment } from "../src/index.js";
import {
  mockedContext,
  mockedContextWithNextRelease,
  mockedContextWithNextReleaseInMonorepo
} from "./fixtures/mocked-context.js";
import { mockedFailureFetches } from "./fixtures/mocked-failure-fetches.js";
import { mockedFetch } from "./fixtures/mocked-fetch.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedSuccessComments } from "./fixtures/mocked-success-comments.js";
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

describe.each(mockedSuccessComments)(
  "for $type and reference $reference",
  ({ type, isMonorepo, reference, releaseInfos, expectedBody }) => {
    it("should throw an error if no next release is defined", async () => {
      await expect(postSuccessComment(reference, mockedContext)).rejects.toThrowError(
        "The next release is not defined."
      );
    });
    // TODO: uncomment when the API is used
    // it("should throw an error when the request fails", async () => {
    //   vi.mocked(mockedFetch).mockRejectedValue(new Error("Failed to request the URI."));
    //   await expect(postSuccessComment(reference, mockedContextWithNextRelease)).rejects.toThrow(
    //     "Failed to request the URI."
    //   );
    // });
    // it.each(mockedFailureFetches)("$title", async ({ response, expectedError }) => {
    //   vi.mocked(mockedFetch).mockResolvedValue({
    //     ...response,
    //     json: () => Promise.resolve({ message: response.statusText })
    //   });
    //   await expect(postSuccessComment(reference, mockedContextWithNextRelease)).rejects.toThrow(
    //     expectedError
    //   );
    //   expect(mockedLogger.logError).toHaveBeenCalledWith(
    //     `Failed to post the success comment on ${type} #${reference.number}.`
    //   );
    //   expect(process.exitCode).toBe(response.status);
    // });
    // it("should log a warning message if the URI is not found", async () => {
    //   const context = isMonorepo
    //     ? { ...mockedContextWithNextReleaseInMonorepo, releaseInfos }
    //     : { ...mockedContextWithNextRelease, releaseInfos };
    //   vi.mocked(mockedFetch).mockResolvedValue({
    //     status: 404,
    //     statusText: "Not Found"
    //   });
    //   await postSuccessComment(reference, context);
    //   expect(mockedLogger.logWarn).toHaveBeenCalledWith(
    //     `The resource requested for ${type} #123 has not been found; therefore, the success comment has not been added.`
    //   );
    // });
    // it("should post a success comment", async () => {
    //   const context = isMonorepo
    //     ? { ...mockedContextWithNextReleaseInMonorepo, releaseInfos }
    //     : { ...mockedContextWithNextRelease, releaseInfos };
    //   vi.mocked(mockedFetch).mockResolvedValue({
    //     status: 201,
    //     statusText: "Created"
    //   });
    //   await postSuccessComment(reference, context);
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
    //   expect(mockedLogger.logSuccess).toHaveBeenCalledWith(
    //     `Added success comment on ${type} #123.`
    //   );
    // });
  }
);
