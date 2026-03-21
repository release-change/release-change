import type { CommandResult } from "./shared.types.js";

/**
 * Formats the output from a command result.
 *
 * If the status is not provided as a number, it defaults to 0.
 * @param commandResult - The command result to format.
 * @return The formatted output, with status, stdout and stderr.
 */
export const formatOutputFromCommandResult = (commandResult: CommandResult): string => {
  const { status, stdout, stderr } = commandResult;
  return `status: ${status ?? 0}

stdout: ${stdout}

stderr: ${stderr}`;
};
