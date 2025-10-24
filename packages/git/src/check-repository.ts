import type { Logger } from "@release-change/logger";
import type { Context } from "@release-change/shared";

import { checkErrorType } from "@release-change/logger";
import { runCommand } from "@release-change/shared";

/**
 * Checks the repository.
 * @param context - The context where the CLI is running.
 * @param logger - The logger object to log errors.
 * @return The current exit code if it is a Git repository, the exit code set to `1` with immediate effect otherwise.
 */
export const checkRepository = async (
  context: Context,
  logger: Logger
): Promise<string | number | undefined> => {
  try {
    const gitCommandResult = await runCommand("git", ["rev-parse", "--git-dir"], {
      cwd: context.cwd
    });
    const { status } = gitCommandResult;
    if (status) {
      logger.logError("The current directory is not a Git repository.");
      process.exit(process.exitCode);
    }
    return process.exitCode ?? 0;
  } catch (error) {
    logger.setScope("git");
    logger.logError(checkErrorType(error));
    context.errors.push(error);
    process.exit(process.exitCode);
  }
};
