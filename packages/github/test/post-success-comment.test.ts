import { getIssueAndPullRequestToken } from "@release-change/ci";
import { setLogger } from "@release-change/logger";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getRepositoryRelatedEntryPoint } from "../src/index.js";
import { postSuccessComment } from "../src/post-success-comment.js";
import {
  mockedContext,
  mockedContextWithNextRelease,
  mockedContextWithNextReleaseInMonorepo
} from "./fixtures/mocked-context.js";
import { mockedFailureFetchesForComments } from "./fixtures/mocked-failure-fetches.js";
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
    it("should throw an error when the request fails", async () => {
      vi.mocked(mockedFetch).mockRejectedValue(new Error("Failed to request the URI."));
      await expect(postSuccessComment(reference, mockedContextWithNextRelease)).rejects.toThrow(
        "Failed to request the URI."
      );
    });
    it.each(mockedFailureFetchesForComments)("$title", async ({ response, expectedError }) => {
      vi.mocked(mockedFetch).mockResolvedValue(response);
      await expect(postSuccessComment(reference, mockedContextWithNextRelease)).rejects.toThrow(
        expectedError
      );
      expect(mockedLogger.logError).toHaveBeenCalledWith(
        `Failed to post the success comment on ${type} #${reference.number}.`
      );
      expect(process.exitCode).toBe(response.status);
    });
    it("should post a success comment", async () => {
      const context = isMonorepo
        ? { ...mockedContextWithNextReleaseInMonorepo, releaseInfos }
        : { ...mockedContextWithNextRelease, releaseInfos };
      vi.mocked(mockedFetch).mockResolvedValue({
        status: 201,
        statusText: "Created"
      });
      await postSuccessComment(reference, context);
      expect(mockedFetch).toHaveBeenCalledWith(mockedUriForComments, {
        method: "POST",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${mockedIssuePRToken}`,
          "X-GitHub-Api-Version": "2022-11-28"
        },
        body: JSON.stringify({
          body: expectedBody
        })
      });
    });
  }
);
// it.each(issueTypes)(
//   "should post a success comment with GitHub release info only for a prerelease (%s)",
//   async issueType => {
//     const mockedReference =
//       issueType === "issue" ? mockedIssueReference : mockedPullRequestReference;
//     const expectedPrereleaseRequestBody =
//       issueType === "issue"
//         ? expectedIssuePrereleaseRequestBodyWithGithubReleaseInfos
//         : expectedPullRequestPrereleaseRequestBodyWithGithubReleaseInfos;
//     const mockedCommand = vi
//       .mocked(runCommand)
//       .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
//     await postSuccessComment(mockedReference, {
//       ...mockedContextWithPrerelease,
//       releaseInfos: [
//         {
//           type: "github",
//           name: "GitHub release",
//           url: "https://github.com/owner/repository/releases/tag/v1.0.0-alpha.1"
//         }
//       ]
//     });
//     expect(mockedCommand).toHaveBeenCalledWith("curl", [
//       ...mockedRequestHeaders,
//       "-d",
//       expectedPrereleaseRequestBody
//     ]);
//     expect(mockedLogger.logInfo).toHaveBeenCalledWith(
//       `Added success comment on ${issueType} #${mockedReference.number}.`
//     );
//   }
// );
// it.each(issueTypes)(
//   "should post a success comment with GitHub release info only for a release (%s)",
//   async issueType => {
//     const mockedReference =
//       issueType === "issue" ? mockedIssueReference : mockedPullRequestReference;
//     const expectedReleaseRequestBody =
//       issueType === "issue"
//         ? expectedIssueReleaseRequestBodyWithGithubReleaseInfos
//         : expectedPullRequestReleaseRequestBodyWithGithubReleaseInfos;
//     const mockedCommand = vi
//       .mocked(runCommand)
//       .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
//     await postSuccessComment(mockedReference, {
//       ...mockedContext,
//       releaseInfos: [
//         {
//           type: "github",
//           name: "GitHub release",
//           url: "https://github.com/owner/repository/releases/tag/v1.0.0"
//         }
//       ]
//     });
//     expect(mockedCommand).toHaveBeenCalledWith("curl", [
//       ...mockedRequestHeaders,
//       "-d",
//       expectedReleaseRequestBody
//     ]);
//     expect(mockedLogger.logInfo).toHaveBeenCalledWith(
//       `Added success comment on ${issueType} #${mockedReference.number}.`
//     );
//   }
// );
// it.each(issueTypes)(
//   "should post a success comment with NPM release info only for a prerelease (%s)",
//   async issueType => {
//     const mockedReference =
//       issueType === "issue" ? mockedIssueReference : mockedPullRequestReference;
//     const expectedPrereleaseRequestBody =
//       issueType === "issue"
//         ? expectedIssuePrereleaseRequestBodyWithNpmReleaseInfos
//         : expectedPullRequestPrereleaseRequestBodyWithNpmReleaseInfos;
//     const mockedCommand = vi
//       .mocked(runCommand)
//       .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
//     await postSuccessComment(mockedReference, {
//       ...mockedContextWithPrerelease,
//       releaseInfos: [
//         {
//           type: "npm",
//           name: "NPM (alpha distribution tag)",
//           url: "https://www.npmjs.com/package/package-name/v/1.0.0-alpha.1"
//         }
//       ]
//     });
//     expect(mockedCommand).toHaveBeenCalledWith("curl", [
//       ...mockedRequestHeaders,
//       "-d",
//       expectedPrereleaseRequestBody
//     ]);
//     expect(mockedLogger.logInfo).toHaveBeenCalledWith(
//       `Added success comment on ${issueType} #${mockedReference.number}.`
//     );
//   }
// );
// it.each(issueTypes)(
//   "should post a success comment with NPM release info only for a release (%s)",
//   async issueType => {
//     const mockedReference =
//       issueType === "issue" ? mockedIssueReference : mockedPullRequestReference;
//     const expectedReleaseRequestBody =
//       issueType === "issue"
//         ? expectedIssueReleaseRequestBodyWithNpmReleaseInfos
//         : expectedPullRequestReleaseRequestBodyWithNpmReleaseInfos;
//     const mockedCommand = vi
//       .mocked(runCommand)
//       .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
//     await postSuccessComment(mockedReference, {
//       ...mockedContext,
//       releaseInfos: [
//         {
//           type: "npm",
//           name: "NPM (latest distribution tag)",
//           url: "https://www.npmjs.com/package/package-name/v/1.0.0"
//         }
//       ]
//     });
//     expect(mockedCommand).toHaveBeenCalledWith("curl", [
//       ...mockedRequestHeaders,
//       "-d",
//       expectedReleaseRequestBody
//     ]);
//     expect(mockedLogger.logInfo).toHaveBeenCalledWith(
//       `Added success comment on ${issueType} #${mockedReference.number}.`
//     );
//   }
// );
// it.each(issueTypes)(
//   "should post a success comment with both GitHub and NPM release info for a prerelease (%s)",
//   async issueType => {
//     const mockedReference =
//       issueType === "issue" ? mockedIssueReference : mockedPullRequestReference;
//     const expectedPrereleaseRequestBody =
//       issueType === "issue"
//         ? expectedIssuePrereleaseRequestBodyWithGithubNpmReleaseInfos
//         : expectedPullRequestPrereleaseRequestBodyWithGithubNpmReleaseInfos;
//     const mockedCommand = vi
//       .mocked(runCommand)
//       .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
//     await postSuccessComment(mockedReference, {
//       ...mockedContextWithPrerelease,
//       releaseInfos: [
//         {
//           type: "github",
//           name: "GitHub release",
//           url: "https://github.com/owner/repository/releases/tag/v1.0.0-alpha.1"
//         },
//         {
//           type: "npm",
//           name: "NPM (alpha distribution tag)",
//           url: "https://www.npmjs.com/package/package-name/v/1.0.0-alpha.1"
//         }
//       ]
//     });
//     expect(mockedCommand).toHaveBeenCalledWith("curl", [
//       ...mockedRequestHeaders,
//       "-d",
//       expectedPrereleaseRequestBody
//     ]);
//     expect(mockedLogger.logInfo).toHaveBeenCalledWith(
//       `Added success comment on ${issueType} #${mockedReference.number}.`
//     );
//   }
// );
// it.each(issueTypes)(
//   "should post a success comment with both GitHub and NPM release info for a release (%s)",
//   async issueType => {
//     const mockedReference =
//       issueType === "issue" ? mockedIssueReference : mockedPullRequestReference;
//     const expectedReleaseRequestBody =
//       issueType === "issue"
//         ? expectedIssueReleaseRequestBodyWithGithubNpmReleaseInfos
//         : expectedPullRequestReleaseRequestBodyWithGithubNpmReleaseInfos;
//     const mockedCommand = vi
//       .mocked(runCommand)
//       .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
//     await postSuccessComment(mockedReference, {
//       ...mockedContext,
//       releaseInfos: [
//         {
//           type: "github",
//           name: "GitHub release",
//           url: "https://github.com/owner/repository/releases/tag/v1.0.0"
//         },
//         {
//           type: "npm",
//           name: "NPM (latest distribution tag)",
//           url: "https://www.npmjs.com/package/package-name/v/1.0.0"
//         }
//       ]
//     });
//     expect(mockedCommand).toHaveBeenCalledWith("curl", [
//       ...mockedRequestHeaders,
//       "-d",
//       expectedReleaseRequestBody
//     ]);
//     expect(mockedLogger.logInfo).toHaveBeenCalledWith(
//       `Added success comment on ${issueType} #${mockedReference.number}.`
//     );
//   }
// );
