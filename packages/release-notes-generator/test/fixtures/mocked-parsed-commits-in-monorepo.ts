import type { Commit } from "@release-change/shared";

const testCommit1: Commit = {
  isMergeCommit: false,
  sha: "2e8e93680920d864c5e53fe4114313104a56ef32",
  message: "test(release): set last release",
  body: [],
  footer: [],
  releaseType: null,
  modifiedFiles: ["packages/a/test/set-last-release.test.ts"]
};
const testCommit2: Commit = {
  isMergeCommit: false,
  sha: "72f01b737cc5308bda1a7035c56a95987187f0bc",
  message: "test(release): refactor the code getting the latest valid Git tag",
  body: [],
  footer: [],
  releaseType: null,
  modifiedFiles: ["packages/a/test/get-latest-valid-git-tag.test.ts"]
};
const testCommit3: Commit = {
  isMergeCommit: false,
  sha: "23c8ae7c866ab138968e26e865bf28388aa893d1",
  message:
    "test(git): remove test checking the return `false` if the package cannot publish from the branch",
  body: ["Another function calling `getAllTags()` checks such a condition from now on."],
  footer: [],
  releaseType: null,
  modifiedFiles: ["packages/a/test/file.test.ts"]
};
const refactorCommit1: Commit = {
  isMergeCommit: false,
  sha: "bc13eeeb0c0c57212ef7f634ec41f610e29438a2",
  message: "refactor(release): refactor the code getting the latest valid Git tag",
  body: [],
  footer: [],
  releaseType: null,
  modifiedFiles: ["packages/a/src/get-latest-valid-git-tag.ts"]
};
const refactorCommit2: Commit = {
  isMergeCommit: false,
  sha: "67a67bf2f614c1e3c5292c780bb4c5c4e91b4c78",
  message: "refactor(git): stop checking if the package can publish from branch",
  body: ["Another function calling `getAllTags()` does such a checking from now on."],
  footer: [],
  releaseType: null,
  modifiedFiles: ["packages/a/src/file.ts"]
};
const refactorCommit3: Commit = {
  isMergeCommit: false,
  sha: "60e154c496f20f0d806229893cad54d53c6c8bc8",
  message: "refactor(config): add `version` optional property to type `Package`",
  body: [],
  footer: [],
  releaseType: null,
  modifiedFiles: ["packages/a/src/config.types.ts"]
};
const breakingChangeMergeCommit: Commit = {
  isMergeCommit: true,
  sha: "a6f7bbb8374290cc40a2fcb05019f3edb1814875",
  message: "chore(node)!: drop support for Node 18 (#75)",
  body: [],
  footer: [],
  releaseType: "major"
};
const breakingChangeCommit: Commit = {
  isMergeCommit: false,
  sha: "d652880132e1100d4c8cf6a3540019b7b094fcf3",
  message: "chore(node)!: drop support for Node 18",
  body: [],
  footer: [],
  releaseType: "major",
  modifiedFiles: ["packages/a/package.json"]
};
const breakingChangeCommitForAnotherPackage: Commit = {
  isMergeCommit: false,
  sha: "d652880132e1100d4c8cf6a3540019b7b094fcf3",
  message: "chore(node)!: drop support for Node 16",
  body: [],
  footer: [],
  releaseType: "major",
  modifiedFiles: ["packages/b/package.json"]
};
const featMergeCommit: Commit = {
  isMergeCommit: true,
  sha: "4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5",
  message: "feat(release): set last release (#75)",
  body: [],
  footer: [],
  releaseType: "minor"
};
const featCommit: Commit = {
  isMergeCommit: false,
  sha: "08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67",
  message: "feat(release): set last release",
  body: [],
  footer: [],
  releaseType: "minor",
  modifiedFiles: ["packages/a/src/set-last-release.ts"]
};
const featCommitForAnotherPackage: Commit = {
  isMergeCommit: false,
  sha: "2bc6bf5a98611cbd0e98138de0d8383704500f84",
  message: "feat(github): get PRs and issues related to commits",
  body: [],
  footer: [],
  releaseType: "minor",
  modifiedFiles: ["packages/b/src/get-prs-issues.ts"]
};
const fixMergeCommit: Commit = {
  isMergeCommit: true,
  sha: "4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5",
  message: "fix(release): add exit code in case the pathname is not found (#75)",
  body: [],
  footer: [],
  releaseType: "patch"
};
const fixCommit: Commit = {
  isMergeCommit: false,
  sha: "4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5",
  message: "fix(release): add exit code in case the pathname is not found",
  body: [],
  footer: [],
  releaseType: "patch",
  modifiedFiles: ["packages/a/src/file.ts"]
};
const fixCommitForAnotherPackage: Commit = {
  isMergeCommit: false,
  sha: "f0c9a2ae78d036bbe7d329c9c715e5369857ec0b",
  message: "fix(release): display root when package name is an empty string",
  body: [],
  footer: [],
  releaseType: "patch",
  modifiedFiles: ["packages/b/src/file.ts"]
};
export const mockedMajorLevelParsedCommitsInMonorepo = [
  breakingChangeMergeCommit,
  testCommit1,
  refactorCommit1,
  testCommit2,
  breakingChangeCommit,
  breakingChangeCommitForAnotherPackage,
  featCommit,
  featCommitForAnotherPackage,
  fixCommit,
  fixCommitForAnotherPackage,
  testCommit3,
  refactorCommit2,
  refactorCommit3
];
export const mockedMinorLevelParsedCommitsInMonorepo = [
  featMergeCommit,
  testCommit1,
  refactorCommit1,
  testCommit2,
  featCommit,
  featCommitForAnotherPackage,
  fixCommit,
  fixCommitForAnotherPackage,
  testCommit3,
  refactorCommit2,
  refactorCommit3
];
export const mockedPatchLevelParsedCommitsInMonorepo = [
  fixMergeCommit,
  testCommit1,
  refactorCommit1,
  testCommit2,
  fixCommit,
  fixCommitForAnotherPackage,
  testCommit3,
  refactorCommit2,
  refactorCommit3
];
