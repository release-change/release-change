import type { SpawnSyncOptionsWithStringEncoding } from "node:child_process";

import { spawnSync } from "node:child_process";

import { afterEach, beforeEach, describe, expectTypeOf, it, vi } from "vitest";
import { runCommand } from "../../src/git/run-command.js";

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

  it("should return an object with status, stdout and stderr properties and correct types", () => {
    mockSpawnSync.mockImplementation((_command, _args, _options) => {
      return {
        status: 0,
        stdout: "Stdout",
        stderr: "Stderr"
      };
    });
    expectTypeOf(runCommand(mockedArgs, mockedOptions)).toMatchTypeOf<{ status: number | null }>();
    expectTypeOf(runCommand(mockedArgs, mockedOptions)).toMatchTypeOf<{ stdout: string }>();
    expectTypeOf(runCommand(mockedArgs, mockedOptions)).toMatchTypeOf<{ stderr: string }>();
  });
});
