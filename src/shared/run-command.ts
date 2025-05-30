import type { CommandResult } from "./shared.types.js";

import { spawn } from "node:child_process";

/**
 * Runs a command asynchronously.
 * @param command - The command to run.
 * @param args - The command arguments.
 * @return The command result with the exit code, the standard output and the standard error.
 */
export const runCommand = async (
  command: string,
  args: readonly string[]
): Promise<CommandResult> => {
  return new Promise((resolve, reject) => {
    const commandResult: CommandResult = {
      status: null,
      stdout: "",
      stderr: ""
    };
    const childProcess = spawn(command, args);
    childProcess.stdout.on("data", data => {
      commandResult.stdout += data.toString();
    });
    childProcess.stderr.on("data", data => {
      commandResult.stderr += data.toString();
    });
    childProcess.on("close", code => {
      commandResult.status = code;
      process.exitCode = Number(code);
      resolve(commandResult);
    });
    childProcess.on("error", error => {
      process.exitCode = Number(childProcess.exitCode);
      reject(new Error(error.message));
    });
  });
};
