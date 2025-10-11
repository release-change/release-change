import type { SpawnSyncOptions } from "node:child_process";
import type { CommandResult } from "./shared.types.js";

import { spawnSync } from "node:child_process";

/**
 * Runs a command synchronously.
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
  const stdoutString = stdout.toString();
  const stderrString = stderr.toString();
  if (status) {
    process.exitCode = status;
    throw new Error(stderrString || stdoutString || `Command failed with status ${status}.`, {
      cause: `${command} ${args.join(" ")}`
    });
  }
  return {
    status,
    stdout: stdoutString,
    stderr: stderrString
  };
};
