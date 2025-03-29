import type { Logger } from "../logger/logger.types.js";

import { checkErrorType } from "../logger/check-error-type.js";
import { runCommand } from "./run-command.js";

/**
 * Checks the repository.
 * @param logger - The logger object to log errors.
 * @return The current exit code if it is a Git repository, the exit code set to `1` with immediate effect otherwise.
 */
export const checkRepository = async (logger: Logger): Promise<string | number | undefined> => {
  try {
    const gitCommandResult = await runCommand(["rev-parse", "--git-dir"]);
    const { status } = gitCommandResult;
    if (status) {
      logger.logError("The current directory is not a Git repository.");
      process.exit(process.exitCode);
    }
    return process.exitCode;
  } catch (error) {
    logger.logError(checkErrorType(error));
    process.exit(process.exitCode);
  }
};
