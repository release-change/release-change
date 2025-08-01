import type { Context } from "../../src/cli/cli.types.js";
import type { Logger } from "../../src/logger/logger.types.js";

import { afterEach, assert, beforeEach, describe, expect, it, vi } from "vitest";

import { getCommitsSinceRef } from "../../src/git/get-commits-since-ref.js";
import * as setLoggerModule from "../../src/logger/set-logger.js";
import * as runCommandSyncModule from "../../src/shared/run-command-sync.js";

import { COMMIT_SEPARATOR } from "../../src/git/constants.js";

describe("get commits since the previous release or the beginning", () => {
  const mockedRepositoryUrl = "https://github.com/user-id/repo-name";
  const mockedConfig = {
    branches: ["main"],
    releaseType: {
      main: {
        channel: "latest"
      }
    },
    debug: false,
    dryRun: false,
    repositoryUrl: mockedRepositoryUrl,
    remoteName: "origin"
  };
  const mockedContext = {
    cwd: "/fake/path",
    env: {},
    branch: "main",
    ci: {
      isCi: true,
      isPullRequest: false
    },
    config: mockedConfig,
    lastRelease: {
      gitTag: null,
      version: "0.0.0"
    }
  } as Context;
  const mockedLogger: Logger = {
    setDebugScope: vi.fn(),
    logDebug: vi.fn(),
    logInfo: vi.fn(),
    logError: vi.fn(),
    logWarn: vi.fn(),
    logSuccess: vi.fn()
  };
  const mockedCommits = `commit 4013e0fe6eb7f5a0b9cb81f0967e89fdbe1088f5
Merge: 7908467 72f01b7
Author: Contributor <0+userId@users.noreply.github.com>
Date:   Mon Mar 10 08:36:27 2025 +0100

    feat(release): set last release (#75)

commit 72f01b737cc5308bda1a7035c56a95987187f0bc (origin/feature-branch)
Author: userId <mail@mailbox.com>
Date:   Mon Mar 10 08:34:05 2025 +0100

    test(release): refactor the code getting the latest valid Git tag

commit bc13eeeb0c0c57212ef7f634ec41f610e29438a2
Author: userId <mail@mailbox.com>
Date:   Mon Mar 10 08:33:29 2025 +0100

    refactor(release): refactor the code getting the latest valid Git tag

commit 2e8e93680920d864c5e53fe4114313104a56ef32
Author: userId <mail@mailbox.com>
Date:   Mon Mar 10 06:03:59 2025 +0100

    test(release): set last release

commit 08a2ebaf8d959c900657f78fb8bf16a2f2ef9d67
Author: userId <mail@mailbox.com>
Date:   Mon Mar 10 06:03:37 2025 +0100

    feat(release): set last release

commit 23c8ae7c866ab138968e26e865bf28388aa893d1
Author: userId <mail@mailbox.com>
Date:   Mon Mar 10 04:48:26 2025 +0100

    test(git): remove test checking the return \`false\` if the package cannot publish from the branch
    
    Another function calling \`getAllTags()\` checks such a condition from now on.

commit 67a67bf2f614c1e3c5292c780bb4c5c4e91b4c78
Author: userId <mail@mailbox.com>
Date:   Mon Mar 10 04:45:41 2025 +0100

    refactor(git): stop checking if the package can publish from branch
    
    Another function calling \`getAllTags()\` does such a checking from now on.

commit 60e154c496f20f0d806229893cad54d53c6c8bc8
Author: userId <mail@mailbox.com>
Date:   Mon Mar 10 04:42:01 2025 +0100

    refactor(config): add \`version\` optional property to type \`Package\`
`;
  const mockedCommitsInArray = mockedCommits.split(COMMIT_SEPARATOR);

  beforeEach(() => {
    vi.spyOn(setLoggerModule, "setLogger").mockReturnValue(mockedLogger);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should log an error message when an error is caught", () => {
    vi.spyOn(runCommandSyncModule, "runCommandSync").mockImplementation(() => {
      throw new Error("Error");
    });
    try {
      getCommitsSinceRef(mockedContext);
    } catch {
      expect(mockedLogger.logError).toHaveBeenCalled();
    }
  });
  it("should return an array of commits", () => {
    const mockedCommandResult = {
      status: 0,
      stdout: mockedCommits,
      stderr: ""
    };
    vi.spyOn(runCommandSyncModule, "runCommandSync").mockReturnValue(mockedCommandResult);
    assert.deepEqual(getCommitsSinceRef(mockedContext), mockedCommitsInArray);
    expect(mockedLogger.logInfo).toHaveBeenCalledWith("Found 8 commits.");
  });
  it("should return an empty array when no commits are found", () => {
    const mockedCommandResult = {
      status: 0,
      stdout: "",
      stderr: ""
    };
    vi.spyOn(runCommandSyncModule, "runCommandSync").mockReturnValue(mockedCommandResult);
    assert.deepEqual(getCommitsSinceRef(mockedContext), []);
    expect(mockedLogger.logInfo).toHaveBeenCalledWith("Found 0 commits.");
  });
  it("should run `git log` when there are no Git tags", () => {
    const mockedCommand = vi.spyOn(runCommandSyncModule, "runCommandSync");
    getCommitsSinceRef(mockedContext);
    expect(mockedCommand).toHaveBeenCalledWith("git", ["log"]);
    expect(mockedLogger.logInfo).toHaveBeenCalledWith("Retrieving all commits.");
  });
  it('should run `git log v1.0.0..HEAD` when the ref is Git tag "v1.0.0"', () => {
    const mockedCommand = vi.spyOn(runCommandSyncModule, "runCommandSync");
    getCommitsSinceRef({ ...mockedContext, lastRelease: { gitTag: "v1.0.0", version: "1.0.0" } });
    expect(mockedCommand).toHaveBeenCalledWith("git", ["log", "v1.0.0..HEAD"]);
    expect(mockedLogger.logInfo).toHaveBeenCalledWith("Retrieving commits since v1.0.0.");
  });
});
