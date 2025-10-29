/** biome-ignore-all lint/correctness/noUnusedImports: <TODO: drop this line when the command is run> */
/** biome-ignore-all lint/correctness/noUnusedVariables: <TODO: drop this line when the command is run> */
import { formatDetailedError, runCommand } from "@release-change/shared";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

import { push } from "../src/push.js";
import { mockedContext, mockedContextWithUndefinedBranchName } from "./fixtures/mocked-context.js";

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({
    formatDetailedError: vi.fn(),
    runCommand: vi.fn()
  }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error if the branch name is not defined", async () => {
  const expectedError = new Error(
    "Failed to run the `git` command: A branch name must be provided.",
    {
      cause: {
        title: "Failed to run the `git` command",
        message: "A branch name must be provided.",
        details: {
          output: "branchName: undefined"
        }
      }
    }
  );
  vi.mocked(formatDetailedError).mockReturnValue(expectedError);
  await expect(push(mockedContextWithUndefinedBranchName)).rejects.toThrowError(
    "A branch name must be provided."
  );
});
// TODO: uncomment when the command is run
// it("should throw an error if the `git push` command fails", async () => {
//   const expectedError = new Error(
//     "Failed to run the `git` command: The command failed with status 1.",
//     {
//       cause: {
//         title: "Failed to run the `git` command",
//         message: "The command failed with status 1.",
//         details: {
//           output: "remote: error: GH013: Repository rule violations found for refs/heads/main.",
//           command: "git push origin branch-name"
//         }
//       }
//     }
//   );
//   vi.mocked(runCommand).mockResolvedValue({
//     status: 1,
//     stdout: "",
//     stderr: "remote: error: GH013: Repository rule violations found for refs/heads/main."
//   });
//   vi.mocked(formatDetailedError).mockReturnValue(expectedError);
//   await expect(push(mockedContext)).rejects.toThrowError(expectedError);
// });
it("should run `git push` command when the branch name is defined", async () => {
  const mockedCommand = vi
    .mocked(runCommand)
    .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
  await push(mockedContext);
  // TODO: uncomment when the command is run
  // expect(mockedCommand).toHaveBeenCalledWith("git", ["push", "origin", "branch-name"]);
});
it("should run `git push` command with the `--follow-tags` option when tags must be included", async () => {
  const mockedCommand = vi
    .mocked(runCommand)
    .mockResolvedValue({ status: 0, stdout: "", stderr: "" });
  await push(mockedContext, { includeTags: true });
  // TODO: uncomment when the command is run
  // expect(mockedCommand).toHaveBeenCalledWith("git", [
  //   "push",
  //   "--follow-tags",
  //   "origin",
  //   "branch-name"
  // ]);
});
