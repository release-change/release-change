import { getIssueAndPullRequestToken } from "@release-change/ci";
import { setLogger } from "@release-change/logger";
import { agreeInNumber, formatDetailedError } from "@release-change/shared";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getRepositoryRelatedEntryPoint, tagPullRequestAndIssue } from "../src/index.js";
import { mockedContext, mockedContextInMonorepo } from "./fixtures/mocked-context.js";
import { mockedFailureFetches } from "./fixtures/mocked-failure-fetches.js";
import { mockedFetch } from "./fixtures/mocked-fetch.js";
import { mockedIssueNumber } from "./fixtures/mocked-issue-number.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedPullRequestsAndIssuesToTag } from "./fixtures/mocked-pull-requests-and-issues-to-tag.js";
import { mockedIssuePRToken } from "./fixtures/mocked-token.js";
import { mockedUri, mockedUriForLabels } from "./fixtures/mocked-uri.js";

global.fetch = mockedFetch;

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({
    agreeInNumber: vi.fn(),
    formatDetailedError: vi.fn(),
    parsePathname: vi.fn()
  }));
  vi.mock("@release-change/logger", () => ({ setLogger: vi.fn() }));
  vi.mock("@release-change/ci", () => ({ getIssueAndPullRequestToken: vi.fn() }));
  vi.mock("../src/get-repository-related-entry-point.js", () => ({
    getRepositoryRelatedEntryPoint: vi.fn()
  }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if `nextRelease` is not defined", async () => {
  const expectedError = new Error(
    "Failed to tag the issue or pull request: The next release is not defined.",
    {
      cause: {
        title: "Failed to tag the issue or pull request",
        message: "The next release is not defined.",
        details: {
          output: "nextRelease: undefined"
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  await expect(
    tagPullRequestAndIssue(
      { number: mockedIssueNumber, isPullRequest: false, gitTags: [] },
      mockedContext
    )
  ).rejects.toThrowError(expectedError);
});
describe.each(
  mockedPullRequestsAndIssuesToTag
)("for $type #$reference.number with Git tags $reference.gitTags", async ({
  isMonorepo,
  type,
  reference,
  nextRelease,
  expectedLabels
}) => {
  const context = isMonorepo
    ? { ...mockedContextInMonorepo, nextRelease }
    : { ...mockedContext, nextRelease };
  it.each(mockedFailureFetches)("$title", async ({ response, expectedError }) => {
    vi.mocked(getIssueAndPullRequestToken).mockReturnValue(mockedIssuePRToken);
    vi.mocked(getRepositoryRelatedEntryPoint).mockReturnValue(mockedUri);
    vi.mocked(mockedFetch).mockResolvedValue({
      ...response,
      json: () => Promise.resolve({ message: response.statusText })
    });
    vi.mocked(formatDetailedError).mockReturnValue(expectedError);
    await expect(tagPullRequestAndIssue(reference, context)).rejects.toThrowError(expectedError);
    expect(nextRelease.length).toBeGreaterThan(0);
    expect(mockedLogger.logError).toHaveBeenCalledWith(
      `Failed to tag ${type} #${mockedIssueNumber}.`
    );
    expect(process.exitCode).toBe(response.status);
  });
  it("should log a warning message if the URI is not found", async () => {
    vi.mocked(mockedFetch).mockResolvedValue({
      status: 404,
      statusText: "Not Found",
      json: () => Promise.resolve({ message: "Not Found" })
    });
    await tagPullRequestAndIssue(reference, context);
    expect(mockedLogger.logWarn).toHaveBeenCalledWith(
      `The resource requested for ${type} #${mockedIssueNumber} has not been found; therefore, no labels have been added.`
    );
  });
  it(`should tag the ${type}`, async () => {
    const expectedLabelEnumeration = new Intl.ListFormat("en-GB", {
      style: "long",
      type: "conjunction"
    }).format(expectedLabels.map(label => `\`${label}\``));
    const expectedLabelsDisplay =
      expectedLabels.length > 1
        ? `labels ${expectedLabelEnumeration}`
        : `label \`${[expectedLabels]}\``;
    const expectedLabelMessage = expectedLabels.length ? ` with ${expectedLabelsDisplay}` : "";
    vi.mocked(agreeInNumber).mockReturnValue(expectedLabels.length > 1 ? "labels" : "label");
    vi.mocked(mockedFetch).mockResolvedValue({
      status: 200,
      statusText: "OK",
      json: () => Promise.resolve({ message: "OK" })
    });
    await tagPullRequestAndIssue(reference, context);
    expect(mockedFetch).toHaveBeenCalledWith(mockedUriForLabels, {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${mockedIssuePRToken}`,
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28"
      },
      body: JSON.stringify({
        labels: expectedLabels
      })
    });
    expect(mockedLogger.logSuccess).toHaveBeenCalledWith(
      `Tagged ${type} #${mockedIssueNumber} successfully${expectedLabelMessage}.`
    );
  });
});
