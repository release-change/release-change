import { assert, it } from "vitest";

import { getReleaseType } from "../src/index.js";
import {
  mockedMajorCommit,
  mockedMajorCommitWithBreakingChangeFooter,
  mockedMajorCommitWithBreakingChangeFooterWithModifiedFiles,
  mockedMajorCommitWithModifiedFiles,
  mockedMinorCommit,
  mockedMinorCommitWithModifiedFiles,
  mockedNoReleaseCommit,
  mockedNoReleaseCommitWithModifiedFiles,
  mockedPatchCommit,
  mockedPatchCommitWithModifiedFiles
} from "./fixtures/mocked-commits-by-release-type.js";
import { mockedContext, mockedContextInMonorepo } from "./fixtures/mocked-context.js";

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
