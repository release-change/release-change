import type { GitCommandResult } from "./git.types.js";

import { spawn } from "node:child_process";

/**
 * Runs a Git command asynchronously.
 * @param args - The Git command arguments.
 * @return The Git command result with the exit code, the standard output and the standard error.
 */
export const runCommand = async (args: readonly string[]): Promise<GitCommandResult> => {
  return new Promise((resolve, reject) => {
    const gitCommandResult: GitCommandResult = {
      status: null,
      stdout: "",
      stderr: ""
    };
    const command = spawn("git", args);
    command.stdout.on("data", data => {
      gitCommandResult.stdout += data.toString();
    });
    command.stderr.on("data", data => {
      gitCommandResult.stderr += data.toString();
    });
    command.on("close", code => {
      gitCommandResult.status = code;
      process.exitCode = Number(code);
      resolve(gitCommandResult);
    });
    command.on("error", error => {
      process.exitCode = Number(command.exitCode);
      reject(new Error(error.message));
    });
  });
};
