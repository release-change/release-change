import type { CliOptions, Context, ContextBase } from "./cli.types.js";

import { getReleaseType } from "../commit-analyser/get-release-type.js";
import { debugConfig } from "../config/debug-config.js";
import { getConfig } from "../config/index.js";
import { checkBranch } from "../git/check-branch.js";
import { checkPushPermissions } from "../git/check-push-permissions.js";
import { checkRepository } from "../git/check-repository.js";
import { getBranchName } from "../git/get-branch-name.js";
import { getCommitsSinceRef } from "../git/get-commits-since-ref.js";
import { setLogger } from "../logger/index.js";
import { setLastRelease } from "../release/set-last-release.js";

import { PACKAGE_NAME, PACKAGE_VERSION } from "../shared/constants.js";

export const run = async (cliOptions: CliOptions, contextBase: ContextBase): Promise<void> => {
  const config = await getConfig(cliOptions);
  const logger = setLogger(config.debug);
  const branch = getBranchName(logger);
  const context: Context = {
    ...contextBase,
    branch,
    config
  };
  logger.logInfo(`Running ${PACKAGE_NAME} version ${PACKAGE_VERSION}`);
  debugConfig(context);
  await checkRepository(logger);
  checkBranch(context);
  console.log("context.branch", context.branch);
  console.log("context.config.dryRun", context.config.dryRun);
  await checkPushPermissions(context.config.repositoryUrl, context);
  setLastRelease(context);
  const commits = getCommitsSinceRef(context);
  console.log("lastRelease", context.lastRelease);
  getReleaseType(commits, context);
  console.log("exit", process.exitCode, process.exitCode ?? 0);
};
