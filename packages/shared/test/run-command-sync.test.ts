import { spawnSync } from "node:child_process";

import { expect, expectTypeOf, it, vi } from "vitest";

import { formatOutputFromCommandResult, runCommandSync } from "../src/index.js";
import { mockedArgs } from "./fixtures/mocked-args.js";
import { mockedOptionsSync } from "./fixtures/mocked-options.js";

const mockSpawnSync = spawnSync as ReturnType<typeof vi.fn>;

vi.mock("node:child_process", () => ({ spawnSync: vi.fn() }));
vi.mock("../src/format-output-from-command-result.js", () => ({
  formatOutputFromCommandResult: vi.fn()
}));

it("should throw an error containing the command and args in the cause if the command returns a non-zero status", () => {
  const mockedCommand = "git";
  const mockedArgs = ["add", "file.txt"];
  const expectedOutput = "status: 1\n\nstdout: \n\nstderr: Stderr";
  mockSpawnSync.mockImplementation(() => ({
    status: 1,
    stdout: "",
    stderr: "Stderr"
  }));
  vi.mocked(formatOutputFromCommandResult).mockReturnValue(expectedOutput);
  expect(() => runCommandSync(mockedCommand, mockedArgs)).toThrow(
    new Error("Failed to run the `git` command: The command failed with status 1.", {
      cause: {
        title: "Failed to run the `git` command",
        message: "The command failed with status 1.",
        details: { output: expectedOutput, command: "git add file.txt" }
      }
    })
  );
});
it("should return an object with status, stdout and stderr properties and correct types", () => {
  mockSpawnSync.mockImplementation(() => ({
    status: 0,
    stdout: "Stdout",
    stderr: "Stderr"
  }));
  expectTypeOf(runCommandSync("git", mockedArgs, mockedOptionsSync)).toMatchObjectType<{
    status: number | null;
    stdout: string;
    stderr: string;
  }>();
});
