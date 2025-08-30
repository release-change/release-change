import { assert, it } from "vitest";

import { getReleaseType } from "../src/index.js";
import { mockedContext, mockedContextInMonorepo } from "./fixtures/mocked-context.js";

const commitIndent = " ".repeat(4);
const commitId = "commit 0123456789abcdef";
const commitAuthor = "Author: Contributor <0+userId@users.noreply.github.com>";
const commitDate = "Date:   Wed Jan 1 13:37:42 2025 +0000";
const commitBreakingChangeFooter = `${commitIndent}BREAKING CHANGE: some explanation.`;
const mockedCommitHead = `${commitId}\n${commitAuthor}\n${commitDate}`;
const mockedModifiedFiles = "packages/a/src/some-file.ts\npackages/b/src/some-file.ts";
const mockedMajorCommit = `${mockedCommitHead}\n\n${commitIndent}feat!: add new breaking change feature`;
const mockedMajorCommitWithModifiedFiles = `${mockedCommitHead}\n\n${commitIndent}feat!: add new breaking change feature\n\n${mockedModifiedFiles}`;
const mockedMajorCommitWithBreakingChangeFooter = `${mockedCommitHead}\n\n${commitIndent}feat: add new feature\n${commitIndent}\n${commitBreakingChangeFooter}`;
const mockedMajorCommitWithBreakingChangeFooterWithModifiedFiles = `${mockedCommitHead}\n\n${commitIndent}feat: add new feature\n${commitIndent}\n${commitBreakingChangeFooter}\n\n${mockedModifiedFiles}`;
const mockedMinorCommit = `${mockedCommitHead}\n\n${commitIndent}feat: add new feature`;
const mockedMinorCommitWithModifiedFiles = `${mockedCommitHead}\n\n${commitIndent}feat: add new feature\n\n${mockedModifiedFiles}`;
const mockedPatchCommit = `${mockedCommitHead}\n\n${commitIndent}fix: fix bug`;
const mockedPatchCommitWithModifiedFiles = `${mockedCommitHead}\n\n${commitIndent}fix: fix bug\n\n${mockedModifiedFiles}`;
const mockedNoReleaseCommit = `${mockedCommitHead}\n\n${commitIndent}chore: some description`;
const mockedNoReleaseCommitWithModifiedFiles = `${mockedCommitHead}\n\n${commitIndent}chore: some description\n\n${mockedModifiedFiles}`;

it("should return `major`", () => {
  const mockedCommits = [
    mockedNoReleaseCommit,
    mockedMajorCommit,
    mockedPatchCommit,
    mockedMinorCommit
  ];
  assert.deepEqual(getReleaseType(mockedCommits, mockedContext), [
    { name: "", releaseType: "major" }
  ]);
});
it("should return `major` if there is a breaking change footer", () => {
  const mockedCommits = [
    mockedNoReleaseCommit,
    mockedMajorCommitWithBreakingChangeFooter,
    mockedPatchCommit,
    mockedMinorCommit
  ];
  assert.deepEqual(getReleaseType(mockedCommits, mockedContext), [
    { name: "", releaseType: "major" }
  ]);
});
it("should return `minor`", () => {
  const mockedCommits = [
    mockedNoReleaseCommit,
    mockedNoReleaseCommit,
    mockedPatchCommit,
    mockedMinorCommit
  ];
  assert.deepEqual(getReleaseType(mockedCommits, mockedContext), [
    { name: "", releaseType: "minor" }
  ]);
});
it("should return `patch`", () => {
  const mockedCommits = [
    mockedNoReleaseCommit,
    mockedPatchCommit,
    mockedNoReleaseCommit,
    mockedPatchCommit
  ];
  assert.deepEqual(getReleaseType(mockedCommits, mockedContext), [
    { name: "", releaseType: "patch" }
  ]);
});
it("should return `null`", () => {
  const mockedCommits = [
    mockedNoReleaseCommit,
    mockedNoReleaseCommit,
    mockedNoReleaseCommit,
    mockedNoReleaseCommit
  ];
  assert.deepEqual(getReleaseType(mockedCommits, mockedContext), [{ name: "", releaseType: null }]);
});
it("should return `major` for concerned packages in a monorepo context", () => {
  const mockedCommits = [
    mockedNoReleaseCommitWithModifiedFiles,
    mockedMajorCommitWithModifiedFiles,
    mockedPatchCommitWithModifiedFiles,
    mockedMinorCommitWithModifiedFiles
  ];
  assert.deepEqual(getReleaseType(mockedCommits, mockedContextInMonorepo), [
    { name: "@monorepo/a", releaseType: "major" },
    { name: "@monorepo/b", releaseType: "major" },
    { name: "", releaseType: "major" }
  ]);
});
it("should return `major` if there is a breaking change footer for concerned packages in a monorepo context", () => {
  const mockedCommits = [
    mockedNoReleaseCommitWithModifiedFiles,
    mockedMajorCommitWithBreakingChangeFooterWithModifiedFiles,
    mockedPatchCommitWithModifiedFiles,
    mockedMinorCommitWithModifiedFiles
  ];
  assert.deepEqual(getReleaseType(mockedCommits, mockedContextInMonorepo), [
    { name: "@monorepo/a", releaseType: "major" },
    { name: "@monorepo/b", releaseType: "major" },
    { name: "", releaseType: "major" }
  ]);
});
it("should return `minor` for concerned packages in a monorepo context", () => {
  const mockedCommits = [
    mockedNoReleaseCommitWithModifiedFiles,
    mockedNoReleaseCommitWithModifiedFiles,
    mockedPatchCommitWithModifiedFiles,
    mockedMinorCommitWithModifiedFiles
  ];
  assert.deepEqual(getReleaseType(mockedCommits, mockedContextInMonorepo), [
    { name: "@monorepo/a", releaseType: "minor" },
    { name: "@monorepo/b", releaseType: "minor" },
    { name: "", releaseType: "minor" }
  ]);
});
it("should return `patch` for concerned packages in a monorepo context", () => {
  const mockedCommits = [
    mockedNoReleaseCommitWithModifiedFiles,
    mockedPatchCommitWithModifiedFiles,
    mockedNoReleaseCommitWithModifiedFiles,
    mockedPatchCommitWithModifiedFiles
  ];
  assert.deepEqual(getReleaseType(mockedCommits, mockedContextInMonorepo), [
    { name: "@monorepo/a", releaseType: "patch" },
    { name: "@monorepo/b", releaseType: "patch" },
    { name: "", releaseType: "patch" }
  ]);
});
it("should return `null` for concerned packages in a monorepo context", () => {
  const mockedCommits = [
    mockedNoReleaseCommitWithModifiedFiles,
    mockedNoReleaseCommitWithModifiedFiles,
    mockedNoReleaseCommitWithModifiedFiles,
    mockedNoReleaseCommitWithModifiedFiles
  ];
  assert.deepEqual(getReleaseType(mockedCommits, mockedContextInMonorepo), [
    { name: "@monorepo/a", releaseType: null },
    { name: "@monorepo/b", releaseType: null },
    { name: "", releaseType: null }
  ]);
});
