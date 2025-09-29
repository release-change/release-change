/** biome-ignore-all lint/correctness/noUnusedVariables: <TODO: drop this line when the command is run> */
import { setLogger } from "@release-change/logger";
import { runCommandSync } from "@release-change/shared";
import { afterEach, assert, beforeEach, expect, it, vi } from "vitest";

import { cancelCommitsSinceRef } from "../src/index.js";
import { mockedCwd } from "./fixtures/mocked-cwd.js";
import { mockedLogger } from "./fixtures/mocked-logger.js";

const mockedCommitRef = "0123456789abcdefg";

beforeEach(() => {
  vi.mock("@release-change/shared", () => ({ runCommandSync: vi.fn() }));
  vi.mock("@release-change/logger", () => ({ setLogger: vi.fn() }));
  vi.mocked(setLogger).mockReturnValue(mockedLogger);
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should run the `git reset --hard` command", () => {
  const mockedCommand = vi
    .mocked(runCommandSync)
    .mockReturnValue({ status: 0, stdout: "", stderr: "" });
  cancelCommitsSinceRef(mockedCommitRef, mockedCwd);
  // TODO: uncomment when the command is run
  // expect(mockedCommand).toHaveBeenCalledWith("git", ["reset", "--hard", mockedCommitRef], {
  //   cwd: mockedCwd
  // });
  expect(mockedLogger.logSuccess).toHaveBeenCalledWith(
    `Commits since ${mockedCommitRef} cancelled successfully.`
  );
});
it("should throw an error if the commit ref is empty", () => {
  assert.throws(
    () => cancelCommitsSinceRef("", mockedCwd),
    "The commit reference must not be empty."
  );
});
// TODO: uncomment when the command is run
// it("should throw an error if the `git reset --hard` command is run and fails", () => {
//   vi.mocked(runCommandSync).mockReturnValue({
//     status: 128,
//     stdout: "",
//     stderr: "Some error message."
//   });
//   assert.throws(() => cancelCommitsSinceRef(mockedCommitRef, mockedCwd), "Some error message.");
//   expect(mockedLogger.logError).toHaveBeenCalledWith(
//     `Failed to cancel the commits since ${mockedCommitRef}.`
//   );
// });
