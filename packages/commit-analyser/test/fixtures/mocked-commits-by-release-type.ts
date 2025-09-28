import type { Commit } from "@release-change/shared";

const commitBreakingChangeFooter = ["BREAKING CHANGE: some explanation."];
const mockedSha = "0123456789abcdef0123456789abcdef01234567";
const mockedModifiedFiles = ["packages/a/src/some-file.ts", "packages/b/src/some-file.ts"];
export const mockedMajorCommit: Commit = {
  isMergeCommit: false,
  sha: mockedSha,
  message: "feat!: add new breaking change feature",
  body: [],
  footer: [],
  releaseType: "major"
};
export const mockedMajorCommitWithModifiedFiles: Commit = {
  isMergeCommit: false,
  sha: mockedSha,
  message: "feat!: add new breaking change feature",
  body: [],
  footer: [],
  releaseType: "major",
  modifiedFiles: mockedModifiedFiles
};
export const mockedMajorCommitWithBreakingChangeFooter: Commit = {
  isMergeCommit: false,
  sha: mockedSha,
  message: "feat: add new feature",
  body: [],
  footer: commitBreakingChangeFooter,
  releaseType: "major"
};
export const mockedMajorCommitWithBreakingChangeFooterWithModifiedFiles: Commit = {
  isMergeCommit: false,
  sha: mockedSha,
  message: "feat: add new feature",
  body: [],
  footer: commitBreakingChangeFooter,
  releaseType: "major",
  modifiedFiles: mockedModifiedFiles
};
export const mockedMinorCommit: Commit = {
  isMergeCommit: false,
  sha: mockedSha,
  message: "feat: add new feature",
  body: [],
  footer: [],
  releaseType: "minor"
};
export const mockedMinorCommitWithModifiedFiles: Commit = {
  isMergeCommit: false,
  sha: mockedSha,
  message: "feat: add new feature",
  body: [],
  footer: [],
  releaseType: "minor",
  modifiedFiles: mockedModifiedFiles
};
export const mockedPatchCommit: Commit = {
  isMergeCommit: false,
  sha: mockedSha,
  message: "fix: fix bug",
  body: [],
  footer: [],
  releaseType: "patch"
};
export const mockedPatchCommitWithModifiedFiles: Commit = {
  isMergeCommit: false,
  sha: mockedSha,
  message: "fix: fix bug",
  body: [],
  footer: [],
  releaseType: "patch",
  modifiedFiles: mockedModifiedFiles
};
export const mockedNoReleaseCommit: Commit = {
  isMergeCommit: false,
  sha: mockedSha,
  message: "chore: some message",
  body: [],
  footer: [],
  releaseType: null
};
export const mockedNoReleaseCommitWithModifiedFiles: Commit = {
  isMergeCommit: false,
  sha: mockedSha,
  message: "chore: some message",
  body: [],
  footer: [],
  releaseType: null,
  modifiedFiles: mockedModifiedFiles
};
