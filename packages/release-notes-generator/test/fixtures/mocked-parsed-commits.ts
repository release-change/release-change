import type { Commit } from "@release-change/shared";

const testCommit1 = {
  isMergeCommit: false,
  sha: "72f01b737cc5308bda1a7035c56a95987187f0bc",
  message: "test(release): refactor the code getting the latest valid Git tag",
  body: [],
  footer: []
};
const testCommit2 = {
  isMergeCommit: false,
  sha: "2e8e93680920d864c5e53fe4114313104a56ef32",
  message: "test(release): set last release",
  body: [],
  footer: []
};
const testCommit3 = {
  isMergeCommit: false,
  sha: "23c8ae7c866ab138968e26e865bf28388aa893d1",
  message:
    "test(git): remove test checking the return `false` if the package cannot publish from the branch",
  body: ["Another function calling `getAllTags()` checks such a condition from now on."],
  footer: []
};
const refactorCommit1 = {
  isMergeCommit: false,
  sha: "bc13eeeb0c0c57212ef7f634ec41f610e29438a2",
  message: "refactor(release): refactor the code getting the latest valid Git tag",
  body: [],
  footer: []
};
const refactorCommit2 = {
  isMergeCommit: false,
  sha: "67a67bf2f614c1e3c5292c780bb4c5c4e91b4c78",
  message: "refactor(git): stop checking if the package can publish from branch",
  body: ["Another function calling `getAllTags()` does such a checking from now on."],
  footer: []
};
const refactorCommit3 = {
  isMergeCommit: false,
  sha: "60e154c496f20f0d806229893cad54d53c6c8bc8",
  message: "refactor(config): add `version` optional property to type `Package`",
  body: [],
  footer: []
};
const breakingChangeMergeCommit = {
  isMergeCommit: true,
  sha: "a6f7bbb8374290cc40a2fcb05019f3edb1814875",
  message: "chore(node)!: drop support for Node 18 (#75)",
  body: [],
  footer: []
};
const breakingChangeCommit = {
  isMergeCommit: false,
  sha: "d652880132e1100d4c8cf6a3540019b7b094fcf3",
  message: "chore(node)!: drop support for Node 18",
  body: [],
  footer: []
};
const featMergeCommit = {
  isMergeCommit: true,
  sha: "4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5",
  message: "feat(release): set last release (#75)",
  body: [],
  footer: []
};
const featCommit = {
  isMergeCommit: false,
  sha: "08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67",
  message: "feat(release): set last release",
  body: [],
  footer: []
};
const fixMergeCommit = {
  isMergeCommit: true,
  sha: "4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5",
  message: "fix(release): add exit code in case the pathname is not found (#75)",
  body: [],
  footer: []
};
const fixCommit = {
  isMergeCommit: false,
  sha: "cfd9eed163fb42c64ffcd9c163e4462553cec335",
  message: "fix(release): add exit code in case the pathname is not found",
  body: [],
  footer: []
};
export const mockedMajorLevelParsedCommits: Commit[] = [
  breakingChangeMergeCommit,
  testCommit1,
  refactorCommit1,
  testCommit2,
  breakingChangeCommit,
  featCommit,
  fixCommit,
  testCommit3,
  refactorCommit2,
  refactorCommit3
];
export const mockedMinorLevelParsedCommits: Commit[] = [
  featMergeCommit,
  testCommit1,
  refactorCommit1,
  testCommit2,
  featCommit,
  fixCommit,
  testCommit3,
  refactorCommit2,
  refactorCommit3
];
export const mockedPatchLevelParsedCommits: Commit[] = [
  fixMergeCommit,
  testCommit1,
  refactorCommit1,
  testCommit2,
  fixCommit,
  testCommit3,
  refactorCommit2,
  refactorCommit3
];
