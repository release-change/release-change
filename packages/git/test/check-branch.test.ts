import type { Context, ContextBase } from "@release-change/shared";

import { expect, it, vi } from "vitest";

import { checkBranch } from "../src/index.js";

const mockedBasicContext: ContextBase = {
  cwd: "/fake/path",
  env: {}
};
const mockedContext: Context = {
  ...mockedBasicContext,
  branch: undefined,
  ci: {
    isCi: true,
    isPullRequest: false
  },
  config: {
    branches: ["alpha", "beta", "main", "master", "next"],
    releaseType: {
      alpha: {
        channel: "alpha",
        prerelease: true,
        prereleaseIdentifier: "alpha"
      },
      beta: {
        channel: "beta",
        prerelease: true,
        prereleaseIdentifier: "beta"
      },
      main: {
        channel: "default"
      },
      master: {
        channel: "default"
      },
      next: {
        channel: "next",
        prerelease: true,
        prereleaseIdentifier: "rc"
      }
    },
    debug: false,
    dryRun: false,
    repositoryUrl: "https://github.com/user-id/repo-name",
    remoteName: "origin"
  }
};
const mockedContextWithNonEligibleBranch = { ...mockedContext, branch: "non-eligible-branch" };
const mockedContextWithMainBranch = { ...mockedContext, branch: "main" };

it("should return `false` in case of non-zero exit code", () => {
  vi.stubGlobal("process", { exitCode: 1 });
  expect(checkBranch(mockedContext)).toBe(false);
  vi.unstubAllGlobals();
});
it("should return `false` if the branch name is undefined", async () => {
  expect(checkBranch(mockedContext)).toBe(false);
});
it('should return `false` if the branch name is `"non-eligible-branch"`', () => {
  expect(checkBranch(mockedContextWithNonEligibleBranch)).toBe(false);
});
it('should return `undefined` if the branch name is `"main"`', () => {
  expect(checkBranch(mockedContextWithMainBranch)).toBe(undefined);
});
it("should activate dry-run mode if the branch name is undefined", async () => {
  expect(mockedContext.config.dryRun).toBe(true);
});
it('should activate dry-run mode if the branch name is `"non-eligible-branch"`', () => {
  expect(mockedContextWithNonEligibleBranch.config.dryRun).toBe(true);
});
