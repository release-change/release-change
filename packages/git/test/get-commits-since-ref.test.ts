import { setLogger } from "@release-change/logger";
import { runCommandSync } from "@release-change/shared";
import { afterEach, assert, beforeEach, describe, expect, it, vi } from "vitest";

import { getCommitsSinceRef } from "../src/index.js";
import { mockedCommits } from "./fixtures/mocked-commits.js";
import { mockedCommitsInMonorepo } from "./fixtures/mocked-commits-monorepo.js";
import { mockedContext, mockedContextInMonorepo } from "./fixtures/mocked-context.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedParsedCommits } from "./fixtures/mocked-parsed-commits.js";
import { mockedParsedCommitsInMonorepo } from "./fixtures/mocked-parsed-commits-in-monorepo.js";

const mockedCommitsInArray = mockedParsedCommits;
const mockedCommitsInMonorepoInArray = mockedParsedCommitsInMonorepo;

const commitsSets = [
  {
    isMonorepo: false,
    context: mockedContext,
    commits: mockedCommits,
    expected: mockedCommitsInArray,
    expectedNumber: mockedCommitsInArray.length,
    commandWithoutTag: "git log",
    commandWithTag: "git log v1.0.0..HEAD"
  },
  {
    isMonorepo: true,
    context: mockedContextInMonorepo,
    commits: mockedCommitsInMonorepo,
    expected: mockedCommitsInMonorepoInArray,
    expectedNumber: mockedCommitsInMonorepoInArray.length,
    commandWithoutTag: "git log --name-only",
    commandWithTag: "git log --name-only v1.0.0..HEAD"
  }
];

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
describe.each(commitsSets)(
  "when `context.config.isMonorepo` is $isMonorepo",
  ({ context, commits, expected, expectedNumber, commandWithTag, commandWithoutTag }) => {
    const mockedCommandResultWithNoCommits = {
      status: 0,
      stdout: "",
      stderr: ""
    };
    const argsWithTag = commandWithTag.split(" ").slice(1);
    const argsWithoutTag = commandWithoutTag.split(" ").slice(1);
    it("should return an array of commits", () => {
      vi.mocked(runCommandSync).mockReturnValue({
        status: 0,
        stdout: commits,
        stderr: ""
      });
      assert.deepEqual(getCommitsSinceRef(context), expected);
      expect(mockedLogger.logInfo).toHaveBeenCalledWith(`Found ${expectedNumber} commits.`);
    });
    it("should return an empty array when no commits are found", () => {
      vi.mocked(runCommandSync).mockReturnValue(mockedCommandResultWithNoCommits);
      assert.deepEqual(getCommitsSinceRef(context), []);
      expect(mockedLogger.logInfo).toHaveBeenCalledWith("Found 0 commits.");
    });
    it(`should run \`${commandWithoutTag}\` when there are no Git tags`, () => {
      vi.mocked(runCommandSync).mockReturnValue(mockedCommandResultWithNoCommits);
      getCommitsSinceRef(context);
      expect(runCommandSync).toHaveBeenCalledWith("git", argsWithoutTag, { cwd: mockedCwd });
      expect(mockedLogger.logInfo).toHaveBeenCalledWith("Retrieving all commits…");
    });
    it(`should run \`${commandWithTag}\` when the ref is Git tag "v1.0.0"`, () => {
      vi.mocked(runCommandSync).mockReturnValue(mockedCommandResultWithNoCommits);
      getCommitsSinceRef({
        ...context,
        lastRelease: {
          ref: "v1.0.0",
          packages: [{ name: "", pathname: ".", gitTag: "v1.0.0", version: "1.0.0" }]
        }
      });
      expect(runCommandSync).toHaveBeenCalledWith("git", argsWithTag, { cwd: mockedCwd });
      expect(mockedLogger.logInfo).toHaveBeenCalledWith("Retrieving commits since v1.0.0…");
    });
  }
);
