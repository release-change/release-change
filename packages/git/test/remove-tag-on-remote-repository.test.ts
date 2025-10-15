/** biome-ignore-all lint/correctness/noUnusedVariables: <TODO: drop this lien when the Git command is run> */
import { setLogger } from "@release-change/logger";
import { runCommand } from "@release-change/shared";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { removeTagOnRemoteRepository } from "../src/index.js";
import { mockedContext } from "./fixtures/mocked-context.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

const mockedGitTags = ["v1.0.0", "@monorepo/a@v1.0.0"];

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({ runCommand: vi.fn() }));
  vi.mock("@release-change/logger", () => ({ setLogger: vi.fn() }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if the Git tag is empty", async () => {
  await expect(removeTagOnRemoteRepository("", mockedContext)).rejects.toThrow(
    "The Git tag must not be empty."
  );
});
describe.each(mockedGitTags)("for Git tag %s", mockedGitTag => {
  it("should run the `git push --delete` command", async () => {
    const mockedCommand = vi
      .mocked(runCommand)
      .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
    await removeTagOnRemoteRepository(mockedGitTag, mockedContext);
    // TODO: uncomment when the command is run
    // expect(mockedCommand).toHaveBeenCalledWith("git", ["push", "--delete", "origin", mockedGitTag]);
    expect(mockedLogger.logInfo).toHaveBeenCalledWith(
      `Removed remote Git tag ${mockedGitTag} successfully.`
    );
  });
  // TODO: uncomment when the command is run
  // it("should throw an error if the `git tag` command is run and fails", async () => {
  //   vi.mocked(runCommand).mockResolvedValue({
  //     status: 128,
  //     stdout: "",
  //     stderr: "Some error message."
  //   });
  //   await expect(removeTagOnRemoteRepository(mockedGitTag, mockedContext)).rejects.toThrow(
  //     "Some error message."
  //   );
  //   expect(mockedLogger.logError).toHaveBeenCalledWith(
  //     `Failed to remotely remove Git tag ${mockedGitTag} on origin.`
  //   );
  // });
});
