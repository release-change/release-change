import type { SpawnSyncOptionsWithStringEncoding } from "node:child_process";
import type { GitCommandResult } from "./git.types.js";

import { spawnSync } from "node:child_process";

export const runCommand = (
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
