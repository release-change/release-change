import { assert, it } from "vitest";

import { getReleaseType } from "../src/index.js";
import { mockedContext, mockedContextInMonorepo } from "./fixtures/mocked-context.js";

const commitBreakingChangeFooter = ["BREAKING CHANGE: some explanation."];
const mockedSha = "0123456789abcdef0123456789abcdef01234567";
const mockedModifiedFiles = ["packages/a/src/some-file.ts", "packages/b/src/some-file.ts"];
const mockedMajorCommit = {
  sha: mockedSha,
  description: "feat!: add new breaking change feature",
  body: [],
  footer: []
};
const mockedMajorCommitWithModifiedFiles = {
  sha: mockedSha,
  description: "feat!: add new breaking change feature",
  body: [],
  footer: [],
  modifiedFiles: mockedModifiedFiles
};
const mockedMajorCommitWithBreakingChangeFooter = {
  sha: mockedSha,
  description: "feat: add new feature",
  body: [],
  footer: commitBreakingChangeFooter
};
const mockedMajorCommitWithBreakingChangeFooterWithModifiedFiles = {
  sha: mockedSha,
  description: "feat: add new feature",
  body: [],
  footer: commitBreakingChangeFooter,
  modifiedFiles: mockedModifiedFiles
};
const mockedMinorCommit = {
  sha: mockedSha,
  description: "feat: add new feature",
  body: [],
  footer: []
};
const mockedMinorCommitWithModifiedFiles = {
  sha: mockedSha,
  description: "feat: add new feature",
  body: [],
  footer: [],
  modifiedFiles: mockedModifiedFiles
};
const mockedPatchCommit = { sha: mockedSha, description: "fix: fix bug", body: [], footer: [] };
const mockedPatchCommitWithModifiedFiles = {
  sha: mockedSha,
  description: "fix: fix bug",
  body: [],
  footer: [],
  modifiedFiles: mockedModifiedFiles
};
const mockedNoReleaseCommit = {
  sha: mockedSha,
  description: "chore: some description",
  body: [],
  footer: []
};
const mockedNoReleaseCommitWithModifiedFiles = {
  sha: mockedSha,
  description: "chore: some description",
  body: [],
  footer: [],
  modifiedFiles: mockedModifiedFiles
};

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
