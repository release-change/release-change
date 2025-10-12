import type { Logger } from "@release-change/logger";

import { checkErrorType } from "@release-change/logger";
import { runCommand } from "@release-change/shared";

/**
 * Checks the repository.
 * @param cwd - The current working directory.
 * @param logger - The logger object to log errors.
 * @return The current exit code if it is a Git repository, the exit code set to `1` with immediate effect otherwise.
 */
export const checkRepository = async (
  cwd: string,
  logger: Logger
): Promise<string | number | undefined> => {
  try {
    const gitCommandResult = await runCommand("git", ["rev-parse", "--git-dir"], { cwd });
    const { status } = gitCommandResult;
    if (status) {
      logger.logError("The current directory is not a Git repository.");
      process.exit(process.exitCode);
    }
    return process.exitCode ?? 0;
  } catch (error) {
    logger.setScope("git");
    logger.logError(checkErrorType(error));
    process.exit(process.exitCode);
  }
};
