import { assert, expect, it } from "vitest";

import { getIssueAndPullRequestToken } from "../src/get-issue-and-pull-request-token.js";

const mockedToken = "issue-pr-token";
const mockedEnvWithIssueAndPullRequestToken = {
  ISSUE_PR_TOKEN: mockedToken
};
const mockedEnvWithoutIssueAndPullRequestToken = {};

it("should throw an error if the release token is not defined", () => {
  assert.throws(
    () => getIssueAndPullRequestToken(mockedEnvWithoutIssueAndPullRequestToken),
    "The token used to interact with issues and pull requests (comments, state and tags) is not defined."
  );
});
it("should return the token if the release token is defined", () => {
  expect(getIssueAndPullRequestToken(mockedEnvWithIssueAndPullRequestToken)).toBe(mockedToken);
});
