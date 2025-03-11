import type { Context, ContextBase } from "../../src/cli/cli.types.js";
import type { Config } from "../../src/config/config.types.js";

import { describe, expect, it, vi } from "vitest";

import { checkBranch } from "../../src/git/check-branch.js";

import { DEFAULT_CONFIG } from "../../src/config/constants.js";

describe("check branch", () => {
  const mockedConfig = DEFAULT_CONFIG as unknown as Config;
  const mockedLogger = {
    logDebug: vi.fn(),
    logInfo: vi.fn(),
    logError: vi.fn(),
    logWarn: vi.fn(),
    logSuccess: vi.fn()
  };
  const mockedBasicContext: ContextBase = {
    cwd: "/fake/path",
    env: {}
  };
  const mockedContext: Context = {
    ...mockedBasicContext,
    branch: undefined,
    config: mockedConfig,
    logger: mockedLogger
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
  it("should activate dry run mode if the branch name is undefined", async () => {
    expect(mockedContext.config.dryRun).toBe(true);
  });
  it('should activate dry run mode if the branch name is `"non-eligible-branch"`', () => {
    expect(mockedContextWithNonEligibleBranch.config.dryRun).toBe(true);
  });
});
