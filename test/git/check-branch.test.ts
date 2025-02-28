import type { Context } from "../../src/cli/cli.types.js";
import type { Config } from "../../src/config/config.types.js";

import { beforeEach, describe, expect, it, vi } from "vitest";

import { checkBranch } from "../../src/git/check-branch.js";
import { getBranchName } from "../../src/git/get-branch-name.js";

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
  let mockedBasicContext: Context;
  let mockedContext: Context;

  beforeEach(() => {
    mockedBasicContext = {
      cwd: "/fake/path",
      env: {}
    };
    mockedContext = {
      ...mockedBasicContext,
      config: mockedConfig,
      logger: mockedLogger
    };
    vi.mock("../../src/git/get-branch-name.js", () => ({
      getBranchName: vi.fn()
    }));
  });

  it("should return `false` in case of non-zero exit code", () => {
    vi.stubGlobal("process", { exitCode: 1 });
    expect(checkBranch(mockedContext)).toBe(false);
    vi.unstubAllGlobals();
  });
  it("should return `false` in case `context.config` or `context.logger` are undefined", () => {
    expect(checkBranch(mockedBasicContext)).toBe(false);
  });
  it("should return `false` if the branch name is undefined", async () => {
    vi.mocked(getBranchName).mockReturnValue(undefined);
    expect(checkBranch(mockedContext)).toBe(false);
  });
  it('should return `false` if the branch name is `"non-eligible-branch"`', () => {
    vi.mocked(getBranchName).mockReturnValue("non-eligible-branch");
    expect(checkBranch(mockedContext)).toBe(false);
  });
  it('should return `undefined` if the branch name is `"main"`', () => {
    vi.mocked(getBranchName).mockReturnValue("main");
    expect(checkBranch(mockedContext)).toBe(undefined);
  });
  it("should activate dry run mode if the branch name is undefined", async () => {
    vi.mocked(getBranchName).mockReturnValue(undefined);
    expect(mockedContext.config?.dryRun).toBe(true);
  });
  it('should activate dry run mode if the branch name is `"non-eligible-branch"`', () => {
    vi.mocked(getBranchName).mockReturnValue("non-eligible-branch");
    expect(mockedContext.config?.dryRun).toBe(true);
  });
  it('should set `context.branch` to "undefined" if the branch name is undefined', async () => {
    vi.mocked(getBranchName).mockReturnValue(undefined);
    checkBranch(mockedContext);
    expect(mockedContext.branch).toBe("undefined");
  });
  it('should set `context.branch` if the branch name is `"non-eligible-branch"`', () => {
    vi.mocked(getBranchName).mockReturnValue("non-eligible-branch");
    checkBranch(mockedContext);
    expect(mockedContext.branch).toBe("non-eligible-branch");
  });
  it('should set `context.branch` if the branch name is `"main"`', () => {
    vi.mocked(getBranchName).mockReturnValue("main");
    checkBranch(mockedContext);
    expect(mockedContext.branch).toBe("main");
  });
});
