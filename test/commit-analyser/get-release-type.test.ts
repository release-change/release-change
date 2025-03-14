import type { Config } from "../../src/config/config.types.js";

import { describe, expect, it } from "vitest";

import { getReleaseType } from "../../src/commit-analyser/get-release-type.js";

import { DEFAULT_CONFIG } from "../../src/config/constants.js";

describe("get release type", () => {
  const commitIndent = " ".repeat(4);
  const commitId = "commit 0123456789abcdef";
  const commitAuthor = "Author: Contributor <0+userId@users.noreply.github.com>";
  const commitDate = "Date:   Wed Jan 1 13:37:42 2025 +0000";
  const commitBreakingChangeFooter = `${commitIndent}BREAKING CHANGE: some explanation.`;
  const expectedDefaultConfig = DEFAULT_CONFIG as unknown as Config;
  const mockedContext = {
    cwd: "/fake/path",
    env: {},
    branch: "main",
    config: expectedDefaultConfig
  };
  const mockedCommitHead = `${commitId}\n${commitAuthor}\n${commitDate}`;
  const mockedMajorCommit = `${mockedCommitHead}\n\n${commitIndent}feat!: add new breaking change feature`;
  const mockedMajorCommitWithBreakingChangeFooter = `${mockedCommitHead}\n\n${commitIndent}feat: add new feature\n${commitIndent}\n${commitBreakingChangeFooter}`;
  const mockedMinorCommit = `${mockedCommitHead}\n\n${commitIndent}feat: add new feature`;
  const mockedPatchCommit = `${mockedCommitHead}\n\n${commitIndent}fix: fix bug`;
  const mockedNoReleaseCommit = `${mockedCommitHead}\n\n${commitIndent}chore: some description`;

  it("should return `major`", () => {
    const mockedCommits = [
      mockedNoReleaseCommit,
      mockedMajorCommit,
      mockedPatchCommit,
      mockedMinorCommit
    ];
    expect(getReleaseType(mockedCommits, mockedContext)).toBe("major");
  });
  it("should return `major` if there is a breaking change footer", () => {
    const mockedCommits = [
      mockedNoReleaseCommit,
      mockedMajorCommitWithBreakingChangeFooter,
      mockedPatchCommit,
      mockedMinorCommit
    ];
    expect(getReleaseType(mockedCommits, mockedContext)).toBe("major");
  });
  it("should return `minor`", () => {
    const mockedCommits = [
      mockedNoReleaseCommit,
      mockedNoReleaseCommit,
      mockedPatchCommit,
      mockedMinorCommit
    ];
    expect(getReleaseType(mockedCommits, mockedContext)).toBe("minor");
  });
  it("should return `patch`", () => {
    const mockedCommits = [
      mockedNoReleaseCommit,
      mockedPatchCommit,
      mockedNoReleaseCommit,
      mockedPatchCommit
    ];
    expect(getReleaseType(mockedCommits, mockedContext)).toBe("patch");
  });
  it("should return `null`", () => {
    const mockedCommits = [
      mockedNoReleaseCommit,
      mockedNoReleaseCommit,
      mockedNoReleaseCommit,
      mockedNoReleaseCommit
    ];
    expect(getReleaseType(mockedCommits, mockedContext)).toBe(null);
  });
});
