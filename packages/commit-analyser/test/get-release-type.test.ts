import { assert, it } from "vitest";

import { getReleaseType } from "../src/index.js";
import { mockedContext, mockedContextInMonorepo } from "./fixtures/mocked-context.js";

const commitBreakingChangeFooter = ["BREAKING CHANGE: some explanation."];
const mockedModifiedFiles = ["packages/a/src/some-file.ts", "packages/b/src/some-file.ts"];
const mockedMajorCommit = { description: "feat!: add new breaking change feature", footer: [] };
const mockedMajorCommitWithModifiedFiles = {
  description: "feat!: add new breaking change feature",
  footer: [],
  modifiedFiles: mockedModifiedFiles
};
const mockedMajorCommitWithBreakingChangeFooter = {
  description: "feat: add new feature",
  footer: commitBreakingChangeFooter
};
const mockedMajorCommitWithBreakingChangeFooterWithModifiedFiles = {
  description: "feat: add new feature",
  footer: commitBreakingChangeFooter,
  modifiedFiles: mockedModifiedFiles
};
const mockedMinorCommit = { description: "feat: add new feature", footer: [] };
const mockedMinorCommitWithModifiedFiles = {
  description: "feat: add new feature",
  footer: [],
  modifiedFiles: mockedModifiedFiles
};
const mockedPatchCommit = { description: "fix: fix bug", footer: [] };
const mockedPatchCommitWithModifiedFiles = {
  description: "fix: fix bug",
  footer: [],
  modifiedFiles: mockedModifiedFiles
};
const mockedNoReleaseCommit = { description: "chore: some description", footer: [] };
const mockedNoReleaseCommitWithModifiedFiles = {
  description: "chore: some description",
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
