import type { SpawnSyncOptionsWithStringEncoding } from "node:child_process";

import { spawnSync } from "node:child_process";

import { afterEach, beforeEach, describe, expect, expectTypeOf, it, vi } from "vitest";
import { runCommandSync } from "../../src/git/run-command-sync.js";

describe("run git command", () => {
  const mockedArgs = ["tag", "-l", "--sort=v:refname", "--merged", "origin/main"];
  const mockedOptions = {
    cwd: "/fake/path",
    encoding: "utf8"
  } as SpawnSyncOptionsWithStringEncoding;
  const mockSpawnSync = spawnSync as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.mock("node:child_process", () => ({ spawnSync: vi.fn() }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should throw an error if the command return a non-zero status", () => {
    mockSpawnSync.mockImplementation((_command, _args, _options) => {
      return {
        status: 1,
        stdout: "Stdout",
        stderr: "Stderr"
      };
    });
    expect(runCommandSync).toThrowError();
  });
  it("should return an object with status, stdout and stderr properties and correct types", () => {
    mockSpawnSync.mockImplementation((_command, _args, _options) => {
      return {
        status: 0,
        stdout: "Stdout",
        stderr: "Stderr"
      };
    });
    expectTypeOf(runCommandSync(mockedArgs, mockedOptions)).toMatchTypeOf<{
      status: number | null;
      stdout: string;
      stderr: string;
    }>();
  });
});
