/** biome-ignore-all lint/correctness/noUnusedImports: <TODO: drop this line when the API is used> */
import { setLogger } from "@release-change/logger";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { tagPullRequestAndIssue } from "../src/tag-pull-request-and-issue.js";
import {
  mockedContext,
  mockedContextInMonorepo,
  mockedContextWithNextRelease
} from "./fixtures/mocked-context.js";
import { mockedFailureFetches } from "./fixtures/mocked-failure-fetches.js";
import { mockedFetch } from "./fixtures/mocked-fetch.js";
import { mockedIssueNumber } from "./fixtures/mocked-issue-number.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedPullRequestsAndIssuesToTag } from "./fixtures/mocked-pull-requests-and-issues-to-tag.js";
import { mockedIssuePRToken } from "./fixtures/mocked-token.js";
import { mockedUriForIssue } from "./fixtures/mocked-uri.js";

global.fetch = mockedFetch;

beforeEach(() => {
  vi.mock("@release-change/logger", () => ({ setLogger: vi.fn() }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if `nextRelease` is not defined", async () => {
  await expect(
    tagPullRequestAndIssue(
      { number: mockedIssueNumber, isPullRequest: false, gitTags: [] },
      mockedContext
    )
  ).rejects.toThrowError("The next release is not defined.");
});
// TODO: uncomment when the API is used
// describe.each(mockedPullRequestsAndIssuesToTag)(
//   "for $type #$reference.number with Git tags $reference.gitTags",
//   async ({ isMonorepo, type, reference, nextRelease, expectedLabels }) => {
//     const context = isMonorepo
//       ? { ...mockedContextInMonorepo, nextRelease }
//       : { ...mockedContext, nextRelease };
//     it.each(mockedFailureFetches)("$title", async ({ response, expectedError }) => {
//       vi.mocked(mockedFetch).mockResolvedValue(response);
//       await expect(tagPullRequestAndIssue(reference, mockedContextWithNextRelease)).rejects.toThrow(
//         expectedError
//       );
//       expect(mockedLogger.logError).toHaveBeenCalledWith(
//         `Failed to tag ${type} #${mockedIssueNumber}.`
//       );
//       expect(process.exitCode).toBe(response.status);
//     });
//     it("should log a warning message if the URI is not found", async () => {
//       vi.mocked(mockedFetch).mockResolvedValue({
//         status: 404,
//         statusText: "Not Found"
//       });
//       await tagPullRequestAndIssue(reference, context);
//       expect(mockedLogger.logWarn).toHaveBeenCalledWith(
//         `The resource requested for ${type} #${mockedIssueNumber} has not been found; therefore, no labels have been added.`
//       );
//     });
//     it(`should tag the ${type}`, async () => {
//       const expectedLabelEnumeration = new Intl.ListFormat("en-GB", {
//         style: "long",
//         type: "conjunction"
//       }).format(expectedLabels.map(label => `\`${label}\``));
//       const expectedLabelsDisplay =
//         expectedLabels.length > 1
//           ? `labels ${expectedLabelEnumeration}`
//           : `label \`${[expectedLabels]}\``;
//       const expectedLabelMessage = expectedLabels.length ? ` with ${expectedLabelsDisplay}` : "";
//       vi.mocked(mockedFetch).mockResolvedValue({
//         status: 200,
//         statusText: "OK"
//       });
//       await tagPullRequestAndIssue(reference, context);
//       expect(mockedFetch).toHaveBeenCalledWith(mockedUriForIssue, {
//         method: "PATCH",
//         headers: {
//           Accept: "application/vnd.github+json",
//           Authorization: `Bearer ${mockedIssuePRToken}`,
//           "X-GitHub-Api-Version": "2022-11-28"
//         },
//         body: JSON.stringify({
//           labels: expectedLabels
//         })
//       });
//       expect(mockedLogger.logSuccess).toHaveBeenCalledWith(
//         `Tagged ${type} #${mockedIssueNumber} successfully${expectedLabelMessage}.`
//       );
//     });
//   }
// );
