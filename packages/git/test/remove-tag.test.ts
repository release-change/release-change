/** biome-ignore-all lint/correctness/noUnusedVariables: <TODO: drop this line when the command is run> */
import { setLogger } from "@release-change/logger";
import { runCommandSync } from "@release-change/shared";
import { afterEach, assert, beforeEach, describe, expect, it, vi } from "vitest";

import { removeTag } from "../src/index.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

const mockedGitTags = ["v1.0.0", "@monorepo/a@v1.0.0"];

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({ runCommandSync: vi.fn() }));
  vi.mock("@release-change/logger", () => ({ setLogger: vi.fn() }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if the Git tag is empty", () => {
  assert.throws(() => removeTag("", mockedCwd), "The Git tag must not be empty.");
});
describe.each(mockedGitTags)("for Git tag %s", mockedGitTag => {
  it("should run the `git tag` command", () => {
    const mockedCommand = vi
      .mocked(runCommandSync)
      .mockReturnValue({ status: 0, stdout: "", stderr: "" });
    removeTag(mockedGitTag, mockedCwd);
    // TODO: uncomment when the command is run
    // expect(mockedCommand).toHaveBeenCalledWith("git", ["tag", "-d", mockedGitTag], {
    //   cwd: mockedCwd
    // });
    expect(mockedLogger.logInfo).toHaveBeenCalledWith(
      `Removed Git tag ${mockedGitTag} successfully.`
    );
  });
  // TODO: uncomment when the command is run
  // it("should throw an error if the `git tag` command is run and fails", () => {
  //   vi.mocked(runCommandSync).mockReturnValue({
  //     status: 128,
  //     stdout: "",
  //     stderr: "Some error message."
  //   });
  //   assert.throws(() => removeTag(mockedGitTag, mockedCwd), "Some error message.");
  //   expect(mockedLogger.logError).toHaveBeenCalledWith(`Failed to remove Git tag ${mockedGitTag}.`);
  // });
});
