import type { Commit } from "@release-change/shared";

const commitMessage = "docs: some description";
const commitMessageWithPullRequest = "feat: some description (#123)";
const commitBody = ["Some text.", "Another text."];
const commitKeyValueFooter = "Footer-key: value";
const commitReferencesFooter = "Refs: #456, #789";
const commitSha = "0123456789abcdef";
const mockedCommitSample: Commit = {
  isMergeCommit: false,
  sha: commitSha,
  message: commitMessage,
  body: [],
  footer: [],
  releaseType: null
};
const mockedCommitSampleWithKeyValueFooter: Commit = {
  isMergeCommit: false,
  sha: commitSha,
  message: commitMessage,
  body: [],
  footer: [commitKeyValueFooter],
  releaseType: null
};
const mockedCommitSampleWithReferencesFooter: Commit = {
  isMergeCommit: false,
  sha: commitSha,
  message: commitMessage,
  body: [],
  footer: [commitReferencesFooter],
  releaseType: null
};
const mockedCommitSampleWithBothFooters: Commit = {
  isMergeCommit: false,
  sha: commitSha,
  message: commitMessage,
  body: [],
  footer: [commitKeyValueFooter, commitReferencesFooter],
  releaseType: null
};
const mockedCommitSampleWithBody: Commit = {
  isMergeCommit: false,
  sha: commitSha,
  message: commitMessage,
  body: commitBody,
  footer: [],
  releaseType: null
};
const mockedCommitSampleWithBodyWithKeyValueFooter: Commit = {
  isMergeCommit: false,
  sha: commitSha,
  message: commitMessage,
  body: commitBody,
  footer: [commitKeyValueFooter],
  releaseType: null
};
const mockedCommitSampleWithBodyWithReferencesFooter: Commit = {
  isMergeCommit: false,
  sha: commitSha,
  message: commitMessage,
  body: commitBody,
  footer: [commitReferencesFooter],
  releaseType: null
};
const mockedCommitSampleWithBodyWithBothFooters: Commit = {
  isMergeCommit: false,
  sha: commitSha,
  message: commitMessage,
  body: commitBody,
  footer: [commitKeyValueFooter, commitReferencesFooter],
  releaseType: null
};
const mockedMergeCommitSample: Commit = {
  isMergeCommit: true,
  sha: commitSha,
  message: commitMessageWithPullRequest,
  body: [],
  footer: [],
  releaseType: "minor"
};
const mockedMergeCommitSampleWithKeyValueFooter: Commit = {
  isMergeCommit: true,
  sha: commitSha,
  message: commitMessageWithPullRequest,
  body: [],
  footer: [commitKeyValueFooter],
  releaseType: "minor"
};
const mockedMergeCommitSampleWithReferencesFooter: Commit = {
  isMergeCommit: true,
  sha: commitSha,
  message: commitMessageWithPullRequest,
  body: [],
  footer: [commitReferencesFooter],
  releaseType: "minor"
};
const mockedMergeCommitSampleWithBothFooters: Commit = {
  isMergeCommit: true,
  sha: commitSha,
  message: commitMessageWithPullRequest,
  body: [],
  footer: [commitKeyValueFooter, commitReferencesFooter],
  releaseType: "minor"
};
const mockedMergeCommitSampleWithBody: Commit = {
  isMergeCommit: true,
  sha: commitSha,
  message: commitMessageWithPullRequest,
  body: commitBody,
  footer: [],
  releaseType: "minor"
};
const mockedMergeCommitSampleWithBodyWithKeyValueFooter: Commit = {
  isMergeCommit: true,
  sha: commitSha,
  message: commitMessageWithPullRequest,
  body: commitBody,
  footer: [commitKeyValueFooter],
  releaseType: "minor"
};
const mockedMergeCommitSampleWithBodyWithReferencesFooter: Commit = {
  isMergeCommit: true,
  sha: commitSha,
  message: commitMessageWithPullRequest,
  body: commitBody,
  footer: [commitReferencesFooter],
  releaseType: "minor"
};
const mockedMergeCommitSampleWithBodyWithBothFooters: Commit = {
  isMergeCommit: true,
  sha: commitSha,
  message: commitMessageWithPullRequest,
  body: commitBody,
  footer: [commitKeyValueFooter, commitReferencesFooter],
  releaseType: "minor"
};
export const mockedCommits = [
  mockedCommitSample,
  mockedCommitSampleWithBody,
  mockedCommitSampleWithKeyValueFooter,
  mockedCommitSampleWithBodyWithKeyValueFooter,
  mockedCommitSampleWithReferencesFooter,
  mockedCommitSampleWithBodyWithReferencesFooter,
  mockedCommitSampleWithBothFooters,
  mockedCommitSampleWithBodyWithBothFooters,
  mockedMergeCommitSample,
  mockedMergeCommitSampleWithBody,
  mockedMergeCommitSampleWithKeyValueFooter,
  mockedMergeCommitSampleWithBodyWithKeyValueFooter,
  mockedMergeCommitSampleWithReferencesFooter,
  mockedMergeCommitSampleWithBodyWithReferencesFooter,
  mockedMergeCommitSampleWithBothFooters,
  mockedMergeCommitSampleWithBodyWithBothFooters
];
