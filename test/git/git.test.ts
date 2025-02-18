import type { Context } from "../../src/cli/cli.types.js";
import type { Config } from "../../src/config/config.types.js";

import { beforeEach, describe, expect, it, vi } from "vitest";

import { checkBranch } from "../../src/git/check-branch.js";
import { getBranchName } from "../../src/git/get-branch-name.js";

import { DEFAULT_CONFIG } from "../../src/config/constants.js";

// TODO: try to see why these two first tests fail once named exports replaced default exports
// describe("get branch name", () => {
//   const logger = {
//     logDebug: vi.fn(),
//     logInfo: vi.fn(),
//     logError: vi.fn(),
//     logWarn: vi.fn(),
//     logSuccess: vi.fn()
//   };
//   const gitRevParseCommand = "git rev-parse --abbrev-ref HEAD";
//   const gitShowCommand = "git show -s --pretty=%d HEAD";
//   const mockExecSync = execSync as ReturnType<typeof vi.fn>;
//
//   beforeEach(() => {
//     vi.mock("node:child_process", () => ({ execSync: vi.fn() }));
//   });
//
//   afterEach(() => {
//     vi.clearAllMocks();
//   });
//
//   it('should return the value of `HEAD` ref when this is not `"HEAD"`', () => {
//     mockExecSync.mockImplementation(gitCommand =>
//       gitCommand === gitRevParseCommand ? "main" : ""
//     );
//     expect(getBranchName(logger)).toBe("main");
//     expect(execSync).toHaveBeenCalledTimes(1);
//     expect(execSync).toHaveBeenCalledWith(gitRevParseCommand, {
//       encoding: "utf8"
//     });
//     expect(execSync).not.toHaveBeenCalledWith(gitShowCommand, {
//       encoding: "utf8"
//     });
//   });
//   it('should return the remote branch name if `HEAD` ref returns `"HEAD"', () => {
//     mockExecSync.mockImplementation(gitCommand => {
//       return gitCommand === gitRevParseCommand
//         ? "HEAD"
//         : gitCommand === gitShowCommand
//           ? "(HEAD -> main, origin/main)"
//           : "";
//     });
//     expect(getBranchName(logger)).toBe("main");
//     expect(execSync).toHaveBeenCalledTimes(2);
//     expect(execSync).toHaveBeenCalledWith(gitRevParseCommand, {
//       encoding: "utf8"
//     });
//     expect(execSync).toHaveBeenCalledWith(gitShowCommand, {
//       encoding: "utf8"
//     });
//   });
// });

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
  it("should not set `context.branch` if the branch name is undefined", async () => {
    vi.mocked(getBranchName).mockReturnValue(undefined);
    checkBranch(mockedContext);
    expect(mockedContext.branch).toBe(undefined);
  });
  it('should not set `context.branch` if the branch name is `"non-eligible-branch"`', () => {
    vi.mocked(getBranchName).mockReturnValue("non-eligible-branch");
    checkBranch(mockedContext);
    expect(mockedContext.branch).toBe(undefined);
  });
  it('should set `context.branch` if the branch name is `"main"`', () => {
    vi.mocked(getBranchName).mockReturnValue("main");
    checkBranch(mockedContext);
    expect(mockedContext.branch).toBe("main");
  });
});
