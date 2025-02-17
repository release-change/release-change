import type { Context } from "../cli/cli.types.js";

import util from "node:util";

import getBranchName from "./get-branch-name.js";

import packageManager from "../../package.json" with { type: "json" };

/**
 * Checks whether the current branch is part of the branches from which the package can publish.
 * @param context - The context where the CLI is running.
 * @return `undefined` if the package can publish from the branch, `false` otherwise.
 */
const checkBranch = (context: Required<Context>): undefined | false => {
  if (process.exitCode) return false;
  const { config, logger } = context;
  const { branches } = config;
  const branchName = getBranchName(logger);
  if (config.debug) {
    logger.logDebug(`Branches from where to publish: ${util.inspect(branches)}`, "branch");
    logger.logDebug(`Branch name: ${branchName}`, "branch");
  }
  if (!branchName || !branches.includes(branchName)) {
    const runTriggeredOnWrongBranchText = `This run is triggered on the branch ${branchName}, while ${packageManager.name} is configured to only publish from ${branches.join(", ")}; therefore, a new version will not be published`;
    logger.logWarn(runTriggeredOnWrongBranchText);
    context.config.dryRun = true;
    return false;
  }
  context.branch = branchName;
  const runAutomatedReleaseText = `Run automated release from branch ${branchName} on repository ${config.repositoryUrl}`;
  if (config.dryRun) logger.logWarn(`${runAutomatedReleaseText} in dry run mode`);
  else logger.logSuccess(runAutomatedReleaseText);
};

export default checkBranch;
