import type { Context } from "../../src/cli/cli.types.js";
import type { Config } from "../../src/config/config.types.js";

import { beforeEach, describe, expect, it, vi } from "vitest";

import checkBranch from "../../src/git/check-branch.js";
import * as getBranchName from "../../src/git/get-branch-name.js";

import { DEFAULT_CONFIG } from "../../src/config/constants.js";

describe("check branch", () => {
  let mockedContext: Required<Context>;

  beforeEach(() => {
    mockedContext = {
      cwd: "/fake/path",
      env: {},
      config: DEFAULT_CONFIG as unknown as Config,
      logger: {
        logDebug: vi.fn(),
        logInfo: vi.fn(),
        logError: vi.fn(),
        logWarn: vi.fn(),
        logSuccess: vi.fn()
      },
      branch: ""
    };
  });

  it("should return `false` in case of non-zero exit code", () => {
    vi.stubGlobal("process", { exitCode: 1 });
    expect(checkBranch(mockedContext)).toBe(false);
    vi.unstubAllGlobals();
  });
  it("should return `false` if the branch name is undefined", async () => {
    vi.spyOn(getBranchName, "default").mockReturnValue(undefined);
    expect(checkBranch(mockedContext)).toBe(false);
  });
  it('should return `false` if the branch name is `"non-eligible-branch"`', () => {
    vi.spyOn(getBranchName, "default").mockReturnValue("non-eligible-branch");
    expect(checkBranch(mockedContext)).toBe(false);
  });
  it('should return `undefined` if the branch name is `"main"`', () => {
    vi.spyOn(getBranchName, "default").mockReturnValue("main");
    expect(checkBranch(mockedContext)).toBe(undefined);
  });
  it("should activate dry run mode if the branch name is undefined", async () => {
    vi.spyOn(getBranchName, "default").mockReturnValue(undefined);
    expect(mockedContext.config.dryRun).toBe(true);
  });
  it('should activate dry run mode if the branch name is `"non-eligible-branch"`', () => {
    vi.spyOn(getBranchName, "default").mockReturnValue("non-eligible-branch");
    expect(mockedContext.config.dryRun).toBe(true);
  });
  it("should not set `context.branch` if the branch name is undefined", async () => {
    vi.spyOn(getBranchName, "default").mockReturnValue(undefined);
    checkBranch(mockedContext);
    expect(mockedContext.branch).toBe("");
  });
  it('should not set `context.branch` if the branch name is `"non-eligible-branch"`', () => {
    vi.spyOn(getBranchName, "default").mockReturnValue("non-eligible-branch");
    checkBranch(mockedContext);
    expect(mockedContext.branch).toBe("");
  });
  it('should set `context.branch` if the branch name is `"main"`', () => {
    vi.spyOn(getBranchName, "default").mockReturnValue("main");
    checkBranch(mockedContext);
    expect(mockedContext.branch).toBe("main");
  });
});
