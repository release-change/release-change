import { formatDetailedError } from "@release-change/shared";
import { expect, it, vi } from "vitest";

import { getIssueAndPullRequestToken } from "../src/index.js";

const mockedToken = "issue-pr-token";
const mockedEnvWithIssueAndPullRequestToken = {
  ISSUE_PR_TOKEN: mockedToken
};
const mockedEnvWithoutIssueAndPullRequestToken = {};

vi.mock("@release-change/shared", () => ({ formatDetailedError: vi.fn() }));

it("should throw an error if the release token is not defined", () => {
  const expectedError = new Error(
    "Failed to get issue and pull request token: The token used to interact with issues and pull requests (comments, state and tags) is not defined.",
    {
      cause: {
        title: "Failed to get issue and pull request token",
        message:
          "The token used to interact with issues and pull requests (comments, state and tags) is not defined.",
        details: {
          output: "env.ISSUE_PR_TOKEN: undefined"
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  expect(() => getIssueAndPullRequestToken(mockedEnvWithoutIssueAndPullRequestToken)).toThrow(
    expectedError
  );
});
it("should return the token if the release token is defined", () => {
  expect(getIssueAndPullRequestToken(mockedEnvWithIssueAndPullRequestToken)).toBe(mockedToken);
});
