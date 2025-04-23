import type { SpawnSyncOptions } from "node:child_process";

import { spawnSync } from "node:child_process";

import type { CommandResult } from "./shared.types.js";

/**
 * Runs a command asynchronously.
 * @param command - The command to run.
 * @param args - The command arguments.
 * @param [options] - The options for the synchronous command.
 * @return The command result with the exit code, the standard output and the standard error.
 */
export const runCommandSync = (
  command: string,
  args: readonly string[],
  options?: SpawnSyncOptions
): CommandResult => {
  const childProcess = spawnSync(command, args, options);
  const { status, stdout, stderr } = childProcess;
  if (status) {
    process.exitCode = status;
    throw new Error(stderr.toString());
  }
  return {
    status,
    stdout: stdout.toString(),
    stderr: stderr.toString()
  };
};
