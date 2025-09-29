import type { Context } from "@release-change/shared";

import util from "node:util";

import { setLogger } from "@release-change/logger";
import { WORKSPACE_NAME } from "@release-change/shared";

/**
 * Checks whether the current branch is part of the branches from which the package can publish.
 * @param context - The context where the CLI is running.
 * @return `undefined` if the package can publish from the branch, `false` otherwise.
 */
export const checkBranch = (context: Context): undefined | false => {
  if (process.exitCode) return false;
  const { branch, config } = context;
  const logger = setLogger(config.debug);
  logger.setScope("git");
  const { branches } = config;
  context.branch = branch;
  if (config.debug) {
    logger.setDebugScope("git:check-branch");
    logger.logDebug(`Branches from where to publish: ${util.inspect(branches)}`);
    logger.logDebug(`Branch name: ${branch}`);
  }
  if (!branch || !branches.includes(branch)) {
    const runTriggeredOnWrongBranchText = `This run is triggered on the branch ${branch}, while ${WORKSPACE_NAME} is configured to only publish from ${new Intl.ListFormat(
      "en-GB",
      {
        style: "long",
        type: "conjunction"
      }
    ).format(branches)}; therefore, a new version will not be published.`;
    logger.logWarn(runTriggeredOnWrongBranchText);
    context.config.dryRun = true;
    return false;
  }
  const runAutomatedReleaseText = `Run automated release from branch ${branch} on repository ${config.repositoryUrl}`;
  if (config.dryRun) logger.logWarn(`${runAutomatedReleaseText} in dry-run mode.`);
  else logger.logSuccess(`${runAutomatedReleaseText}.`);
};
