import type { Logger } from "@release-change/logger";
import type { Context } from "@release-change/shared";

import { addErrorToContext, checkErrorType } from "@release-change/logger";
import { runCommand } from "@release-change/shared";

/**
 * Checks whether it is a Git repository or not.
 * @param context - The context where the CLI is running.
 * @param logger - The logger object to log errors.
 * @return `true` if it is a Git repository, `false` otherwise.
 */
export const isGitRepository = async (context: Context, logger: Logger): Promise<boolean> => {
  try {
    const { cwd } = context;
    const gitCommandResult = await runCommand("git", ["rev-parse", "--git-dir"], { cwd });
    return !gitCommandResult.status;
  } catch (error) {
    logger.setScope("git");
    logger.logError(checkErrorType(error));
    addErrorToContext(error, context);
    process.exit(process.exitCode);
  }
};
