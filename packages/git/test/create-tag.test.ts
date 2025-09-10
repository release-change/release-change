/** biome-ignore-all lint/correctness/noUnusedVariables: <TODO: drop this line when the command is run> */
/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <TODO: drop this line when the command is run> */
import { setLogger } from "@release-change/logger";
import { runCommandSync } from "@release-change/shared";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { createTag } from "../src/index.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";
import { mockedNextReleases } from "./fixtures/mocked-next-releases.js";

const mockedCommitRef = "0123456789abcdef0123456789abcdef01234567";

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({ runCommandSync: vi.fn() }));
  vi.mock("@release-change/logger", () => ({ setLogger: vi.fn() }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});
afterEach(() => {
  vi.clearAllMocks();
});

describe.each(mockedNextReleases)("for $packageName", ({ packageName, nextRelease }) => {
  const { gitTag } = nextRelease;
  it("should throw an error if the commit reference is not defined", () => {
    expect(() => createTag(nextRelease, "")).toThrowError(
      "The commit reference must not be empty."
    );
  });
  it("should log an error message if the `git tag` command is run and fails", () => {
    vi.mocked(runCommandSync).mockReturnValue({
      status: 128,
      stdout: "",
      stderr: "Some error message."
    });
    createTag(nextRelease, mockedCommitRef);
    // TODO: uncomment when the command is run
    // expect(mockedLogger.logError).toHaveBeenCalledWith(
    //   `Failed to create Git tag ${gitTag} for ${packageName}: Some error message.`
    // );
  });
  it("should run the `git tag` command", () => {
    const mockedCommand = vi
      .mocked(runCommandSync)
      .mockReturnValue({ status: 0, stdout: "", stderr: "" });
    createTag(nextRelease, mockedCommitRef);
    // TODO: uncomment when the command is run
    // expect(mockedCommand).toHaveBeenCalledWith("git", [
    //   "tag",
    //   gitTag,
    //   "-m",
    //   gitTag,
    //   mockedCommitRef
    // ]);
    // expect(mockedLogger.logSuccess).toHaveBeenCalledWith(
    //   `Created Git tag ${gitTag} for ${packageName}.`
    // );
  });
});
