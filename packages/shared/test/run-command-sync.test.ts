import { spawnSync } from "node:child_process";

import { afterEach, beforeEach, expect, expectTypeOf, it, vi } from "vitest";

import { runCommandSync } from "../src/index.js";
import { mockedArgs } from "./fixtures/mocked-args.js";
import { mockedOptionsSync } from "./fixtures/mocked-options.js";

const mockSpawnSync = spawnSync as ReturnType<typeof vi.fn>;

beforeEach(() => {
  vi.mock("node:child_process", () => ({ spawnSync: vi.fn() }));
});
afterEach(() => {
  vi.clearAllMocks();
});

it("should throw an error containing the command and args in the cause if the command returns a non-zero status", () => {
  const mockedCommand = "git";
  const mockedArgs = ["add", "file.txt"];
  mockSpawnSync.mockImplementation((_command, _args, _options) => {
    return {
      status: 1,
      stdout: "",
      stderr: "Stderr"
    };
  });
  expect(() => runCommandSync(mockedCommand, mockedArgs)).toThrow("Stderr");
  try {
    runCommandSync(mockedCommand, mockedArgs);
  } catch (error) {
    expect(error).toBeInstanceOf(Error);
    if (error instanceof Error) expect(error.cause).toBe("git add file.txt");
  }
});
it("should return an object with status, stdout and stderr properties and correct types", () => {
  mockSpawnSync.mockImplementation((_command, _args, _options) => {
    return {
      status: 0,
      stdout: "Stdout",
      stderr: "Stderr"
    };
  });
  expectTypeOf(runCommandSync("git", mockedArgs, mockedOptionsSync)).toMatchObjectType<{
    status: number | null;
    stdout: string;
    stderr: string;
  }>();
});
