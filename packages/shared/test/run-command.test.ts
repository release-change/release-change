import { spawn } from "node:child_process";

import { afterEach, beforeEach, expect, expectTypeOf, it, vi } from "vitest";

import { runCommand } from "../src/index.js";
import { mockedArgs } from "./fixtures/mocked-args.js";
import { mockedOptions } from "./fixtures/mocked-options.js";

const mockedChildProcess = {
  stdout: { on: vi.fn() },
  stderr: { on: vi.fn() },
  on: vi.fn(),
  exitCode: 0
};
const nonExistentCommand = "non-existant-command-12345";
const args = ["some", "args"];
const mockSpawn = spawn as ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.mock("node:child_process", () => ({ spawn: vi.fn() }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error when the command fails with an error", async () => {
  const mockedErrorChildProcess = {
    ...mockedChildProcess,
    exitCode: 1
  };
  mockSpawn.mockImplementation(() => {
    setTimeout(() => {
      const errorCallback = mockedErrorChildProcess.on.mock.calls.find(
        call => call[0] === "error"
      )?.[1];
      if (errorCallback) {
        errorCallback(new Error(`spawn ${nonExistentCommand} ENOENT`));
      }
    }, 0);
    return mockedErrorChildProcess;
  });
  await expect(runCommand(nonExistentCommand, args)).rejects.toThrowError(
    new Error(
      `Failed to run the \`${nonExistentCommand}\` command: The command failed with status 1.`,
      {
        cause: {
          title: `Failed to run the \`${nonExistentCommand}\` command`,
          message: "The command failed with status 1.",
          details: {
            output: `spawn ${nonExistentCommand} ENOENT`,
            command: `${nonExistentCommand} ${args.join(" ")}`
          }
        }
      }
    )
  );
});
it("should throw an error containing the command and args in the cause", async () => {
  const mockedRejectedChildProcess = {
    ...mockedChildProcess,
    exitCode: 1
  };
  mockSpawn.mockImplementation(() => {
    setTimeout(() => {
      const closeCallback = mockedRejectedChildProcess.on.mock.calls.find(
        call => call[0] === "close"
      )?.[1];
      if (closeCallback) closeCallback(0);
    }, 0);
    return mockedRejectedChildProcess;
  });
  try {
    await runCommand(nonExistentCommand, args);
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    if (error instanceof Error) expect(error.cause).toBe(`${nonExistentCommand} ${args.join(" ")}`);
  }
});
it("should return an object with status, stdout and stderr properties and correct types", async () => {
  mockSpawn.mockImplementation(() => {
    setTimeout(() => {
      const closeCallback = mockedChildProcess.on.mock.calls.find(call => call[0] === "close")?.[1];
      if (closeCallback) closeCallback(0);
    }, 0);
    return mockedChildProcess;
  });
  expectTypeOf(await runCommand("git", mockedArgs, mockedOptions)).toMatchObjectType<{
    status: number | null;
    stdout: string;
    stderr: string;
  }>();
});
