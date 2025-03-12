import type { GitCommandResult } from "./git.types.js";

import { spawn } from "node:child_process";

/**
 * Runs a Git command asynchronously.
 * @param args - The Git command arguments.
 * @return The Git command result with the exit code, the standard output and the standard error.
 */
export const runCommand = async (args: readonly string[]): Promise<GitCommandResult> => {
  const gitCommandResult: GitCommandResult = {
    status: null,
    stdout: "",
    stderr: ""
  };
  const command = spawn("git", args);
  command.stdout.on("data", data => {
    gitCommandResult.stdout = data;
  });
  command.stderr.on("data", data => {
    gitCommandResult.stderr = data;
  });
  command.on("close", code => {
    gitCommandResult.status = code;
  });
  command.on("error", error => {
    gitCommandResult.status = 1;
    gitCommandResult.stderr = error.message;
  });
  return gitCommandResult;
};
