import type { Logger } from "@release-change/logger";

import { checkErrorType } from "@release-change/logger";
import { runCommand } from "@release-change/shared";

/**
 * Checks whether it is a Git repository or not.
 * @param cwd - The current working directory.
 * @param logger - The logger object to log errors.
 * @return `true` if it is a Git repository, `false` otherwise.
 */
export const isGitRepository = async (cwd: string, logger: Logger): Promise<boolean> => {
  try {
    const gitCommandResult = await runCommand("git", ["rev-parse", "--git-dir"], { cwd });
    return !gitCommandResult.status;
  } catch (error) {
    logger.setScope("git");
    logger.logError(checkErrorType(error));
    process.exit(process.exitCode);
  }
};
