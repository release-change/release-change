import { setLogger } from "@release-change/logger";
import { formatDetailedError } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { closeIssue, getRepositoryRelatedEntryPoint } from "../src/index.js";
import { mockedContext } from "./fixtures/mocked-context.js";
import { mockedFailureFetches } from "./fixtures/mocked-failure-fetches.js";
import { mockedFetch } from "./fixtures/mocked-fetch.js";
import { mockedIssueNumber } from "./fixtures/mocked-issue-number.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedIssuePRToken } from "./fixtures/mocked-token.js";
import { mockedUriForIssue } from "./fixtures/mocked-uri.js";

global.fetch = mockedFetch;

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({ formatDetailedError: vi.fn() }));
  vi.mock("@release-change/logger", () => ({ setLogger: vi.fn() }));
  vi.mock("../src/get-repository-related-entry-point.js", () => ({
    getRepositoryRelatedEntryPoint: vi.fn()
  }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
  vi.mocked(getRepositoryRelatedEntryPoint).mockReturnValue(
    "https://api.github.com/repos/user-id/repo-name"
  );
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error when the request fails", async () => {
  vi.mocked(mockedFetch).mockRejectedValue(new Error("Failed to request the URI."));
  await expect(closeIssue(mockedIssueNumber, mockedContext)).rejects.toThrowError(
    "Failed to request the URI."
  );
});
it.each(mockedFailureFetches)("$title", async ({ response, expectedError }) => {
  vi.mocked(mockedFetch).mockResolvedValue({
    ...response,
    json: () => Promise.resolve({ message: response.statusText })
  });
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  await expect(closeIssue(mockedIssueNumber, mockedContext)).rejects.toThrowError(expectedError);
  expect(mockedLogger.logError).toHaveBeenCalledWith(
    `Failed to close issue #${mockedIssueNumber}.`
  );
  expect(process.exitCode).toBe(response.status);
});
it("should log a warning message if the URI is not found", async () => {
  vi.mocked(mockedFetch).mockResolvedValue({
    status: 404,
    statusText: "Not Found",
    json: () => Promise.resolve({ message: "Not Found" })
  });
  await closeIssue(mockedIssueNumber, mockedContext);
  expect(mockedLogger.logWarn).toHaveBeenCalledWith(
    `The resource requested for issue #${mockedIssueNumber} has not been found.`
  );
});
it("should close the issue", async () => {
  vi.mocked(mockedFetch).mockResolvedValue({
    status: 200,
    statusText: "OK",
    json: () => Promise.resolve({ message: "OK" })
  });
  await closeIssue(mockedIssueNumber, mockedContext);
  expect(mockedFetch).toHaveBeenCalledWith(mockedUriForIssue, {
    method: "PATCH",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${mockedIssuePRToken}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28"
    },
    body: JSON.stringify({
      state: "closed",
      state_reason: "completed"
    })
  });
  expect(mockedLogger.logSuccess).toHaveBeenCalledWith(
    `Closed issue #${mockedIssueNumber} successfully.`
  );
});
