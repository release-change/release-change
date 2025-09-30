import { assert, it } from "vitest";

import { getIssues } from "../src/get-issues.js";

const mockedContents = [
  {
    type: "an empty array if there are no issues (commit)",
    contents: {
      sha: "0123456789",
      description: "fix: prevent racing of requests",
      body: [],
      footer: []
    },
    expected: []
  },
  {
    type: "an empty array if there are no issues (pull request body)",
    contents: { body: ["This is a sample description of a pull request."] },
    expected: []
  },
  {
    type: "an array with one item if the issue is repeated (commit)",
    contents: {
      sha: "0123456789",
      description: "fix: fix issue #123",
      body: [],
      footer: ["Refs: #123"]
    },
    expected: [{ number: 123, isPullRequest: false, gitTags: ["v1.2.3"] }]
  },
  {
    type: "an array with one item if the issue is repeated (pull request body)",
    contents: {
      sha: "0123456789",
      description: "This PR fixes the issue #123.",
      body: [],
      footer: ["Refs: #123"]
    },
    expected: [{ number: 123, isPullRequest: false, gitTags: ["v1.2.3"] }]
  },
  {
    type: "an array with one item per issue (commit)",
    contents: {
      sha: "0123456789",
      description: "fix: prevent racing of requests",
      body: [],
      footer: ["Refs: #123, #456, #789"]
    },
    expected: [
      { number: 123, isPullRequest: false, gitTags: ["v1.2.3"] },
      { number: 456, isPullRequest: false, gitTags: ["v1.2.3"] },
      { number: 789, isPullRequest: false, gitTags: ["v1.2.3"] }
    ]
  },
  {
    type: "an array with one item per issue (pull request body)",
    contents: { body: ["This PR fixes the issues #123, #456 and #789."] },
    expected: [
      { number: 123, isPullRequest: false, gitTags: ["v1.2.3"] },
      { number: 456, isPullRequest: false, gitTags: ["v1.2.3"] },
      { number: 789, isPullRequest: false, gitTags: ["v1.2.3"] }
    ]
  }
];

it.each(mockedContents)("should return $type", ({ contents, expected }) => {
  assert.deepEqual(getIssues(contents, ["v1.2.3"]), expected);
});
