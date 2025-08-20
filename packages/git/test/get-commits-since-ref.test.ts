import { setLogger } from "@release-change/logger";
import { runCommandSync } from "@release-change/shared";
import { afterEach, assert, beforeEach, expect, it, vi } from "vitest";

import { getCommitsSinceRef } from "../src/index.js";
import { mockedContext } from "./fixtures/mocked-context.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

import { COMMIT_SEPARATOR } from "../src/constants.js";

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
  vi.mock("@release-change/logger", () => ({
    setLogger: vi.fn(),
    checkErrorType: vi.fn()
  }));
  vi.mock("@release-change/shared", () => ({
    agreeInNumber: vi.fn((count, words) => (count === 1 ? words[0] : words[1])),
    runCommandSync: vi.fn(),
    WORKSPACE_NAME: "release-change",
    WORKSPACE_VERSION: "0.0.0"
  }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
  vi.mocked(runCommandSync).mockReturnValue({
    status: 0,
    stdout: "",
    stderr: ""
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

it("should log an error message when an error is caught", () => {
  const mockedProcessExit = vi.spyOn(process, "exit").mockImplementation(() => {
    return undefined as never;
  });
  vi.mocked(runCommandSync).mockImplementation(() => {
    throw new Error("Error");
  });
  getCommitsSinceRef(mockedContext);

  expect(mockedLogger.logError).toHaveBeenCalled();
  expect(mockedProcessExit).toHaveBeenCalled();
  mockedProcessExit.mockRestore();
});
it("should return an array of commits", () => {
  const mockedCommandResult = {
    status: 0,
    stdout: mockedCommits,
    stderr: ""
  };
  vi.mocked(runCommandSync).mockReturnValue(mockedCommandResult);
  assert.deepEqual(getCommitsSinceRef(mockedContext), mockedCommitsInArray);
  expect(mockedLogger.logInfo).toHaveBeenCalledWith("Found 8 commits.");
});
it("should return an empty array when no commits are found", () => {
  const mockedCommandResult = {
    status: 0,
    stdout: "",
    stderr: ""
  };
  vi.mocked(runCommandSync).mockReturnValue(mockedCommandResult);
  assert.deepEqual(getCommitsSinceRef(mockedContext), []);
  expect(mockedLogger.logInfo).toHaveBeenCalledWith("Found 0 commits.");
});
it("should run `git log` when there are no Git tags", () => {
  const mockedCommandResult = {
    status: 0,
    stdout: "",
    stderr: ""
  };
  vi.mocked(runCommandSync).mockReturnValue(mockedCommandResult);
  getCommitsSinceRef(mockedContext);
  expect(runCommandSync).toHaveBeenCalledWith("git", ["log"]);
  expect(mockedLogger.logInfo).toHaveBeenCalledWith("Retrieving all commits.");
});
it('should run `git log v1.0.0..HEAD` when the ref is Git tag "v1.0.0"', () => {
  const mockedCommandResult = {
    status: 0,
    stdout: "",
    stderr: ""
  };
  vi.mocked(runCommandSync).mockReturnValue(mockedCommandResult);
  getCommitsSinceRef({ ...mockedContext, lastRelease: { gitTag: "v1.0.0", version: "1.0.0" } });
  expect(runCommandSync).toHaveBeenCalledWith("git", ["log", "v1.0.0..HEAD"]);
  expect(mockedLogger.logInfo).toHaveBeenCalledWith("Retrieving commits since v1.0.0.");
});
