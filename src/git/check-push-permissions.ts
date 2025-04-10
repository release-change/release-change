import type { Context } from "../cli/cli.types.js";

import { checkErrorType } from "../logger/check-error-type.js";
import { setLogger } from "../logger/set-logger.js";
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
  const { branch, config } = context;
  const logger = setLogger(config.debug);
  try {
    await checkAuthorisation(repositoryUrl, context);
    if (branch && config.branches.includes(branch)) {
      if (!(await isBranchUpToDate(branch))) {
        logger.logWarn(
          `The local branch ${branch} is behind the remote one; therefore, a new version will not be published.`
        );
      } else logger.logSuccess("Allowed to push to the Git repository.");
    }
  } catch (error) {
    logger.logError("Not allowed to push to the Git repository.");
    logger.logError(checkErrorType(error));
    process.exit(process.exitCode ?? 1);
  }
};
