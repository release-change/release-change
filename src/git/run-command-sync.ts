import type { SpawnSyncOptionsWithStringEncoding } from "node:child_process";

import { spawnSync } from "node:child_process";

import type { GitCommandResult } from "./git.types.js";

/**
 * Runs a Git command asynchronously.
 * @param args - The Git command arguments.
 * @param options - The options for the synchronous command.
 * @return The Git command result with the exit code, the standard output and the standard error.
 */
export const runCommandSync = (
  args: readonly string[],
  options: SpawnSyncOptionsWithStringEncoding
): GitCommandResult => {
  const command = spawnSync("git", args, options);
  const { status, stdout, stderr } = command;
  return {
    status,
    stdout,
    stderr
  };
};
