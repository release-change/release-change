import type { Config } from "@release-change/shared";

import { DEFAULT_CONFIG } from "@release-change/config";
import { assert, describe, expect, it } from "vitest";

import { parseCommit } from "../src/parse-commit.js";

describe("parse commit", () => {
  const commitIndent = " ".repeat(4);
  const commitId = "commit 0123456789abcdef";
  const commitAuthor = "Author: Contributor <0+userId@users.noreply.github.com>";
  const commitDate = "Date:   Wed Jan 1 13:37:42 2025 +0000";
  const commitDescription = `${commitIndent}docs: some description`;
  const commitKeyValueFooter = `${commitIndent}Footer-key: value`;
  const commitBreakingChangeFooter = `${commitIndent}BREAKING CHANGE: some explanation.`;
  const expectedDefaultConfig = DEFAULT_CONFIG as unknown as Config;
  const mockedContext = {
    cwd: "/fake/path",
    env: {},
    branch: "main",
    ci: {
      isCi: true,
      isPullRequest: false
    },
    config: expectedDefaultConfig
  };
  const description = commitDescription.trim();
  const keyValueFooter = commitKeyValueFooter.trim();
  const breakingChangeFooter = commitBreakingChangeFooter.trim();
  const mockedCommitSample = `${commitId}\n${commitAuthor}\n${commitDate}\n\n${commitDescription}`;
  const mockedCommits = [
    {
      type: "commit with just a description",
      commit: mockedCommitSample,
      expected: {
        description,
        footer: []
      }
    },
    {
      type: "commit with a description and a key/value footer",
      commit: `${mockedCommitSample}\n${commitIndent}\n${commitKeyValueFooter}`,
      expected: {
        description,
        footer: [keyValueFooter]
      }
    },
    {
      type: "commit with a description and a breaking change footer",
      commit: `${mockedCommitSample}\n${commitIndent}\n${commitBreakingChangeFooter}`,
      expected: {
        description,
        footer: [breakingChangeFooter]
      }
    },
    {
      type: "commit with a description and both footers",
      commit: `${mockedCommitSample}\n${commitIndent}\n${commitKeyValueFooter}\n${commitBreakingChangeFooter}`,
      expected: {
        description,
        footer: [keyValueFooter, breakingChangeFooter]
      }
    }
  ];

  it.each(mockedCommits)("should parse a commit ($type)", ({ commit, expected }) => {
    assert.deepEqual(parseCommit(commit, mockedContext), expected);
  });
  it("should throw an error if the commit has no description", () => {
    expect(() =>
      parseCommit(`${commitId}\n${commitAuthor}\n${commitDate}`, mockedContext)
    ).toThrowError("Failed to parse commit: no description found.");
  });
});
