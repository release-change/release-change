import type { Context } from "../cli/cli.types.js";

import { setLogger } from "../logger/index.js";
import { checkAuthorisation } from "./check-authorisation.js";
import { isBranchUpToDate } from "./is-branch-up-to-date.js";

/**
 * Checks the permissions to push to the remote repository.
 * @param repositoryUrl - The repository URL.
 * @param context - The context where the CLI is running.
 */
export const checkPushPermissions = async (
  repositoryUrl: string,
  context: Context
): Promise<void> => {
  const logger = context.logger ?? setLogger();
  try {
    await checkAuthorisation(repositoryUrl, context);
    const { branch } = context;
    if (branch) {
      if (!(await isBranchUpToDate(branch))) {
        logger.logWarn(
          `The local branch ${branch} is behind the remote one; therefore, a new version will not be published.`
        );
      } else logger.logSuccess("Allowed to push to the Git repository");
    }
  } catch (error) {
    if (error instanceof Error) logger.logError(error.message);
    else logger.logError(`Unknown error: ${error}`);
    process.exitCode = 1;
  }
};
