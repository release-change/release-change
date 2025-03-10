import type { CliOptions, Context } from "./cli.types.js";

import { debugConfig } from "../config/debug-config.js";
import { getConfig } from "../config/index.js";
import { checkBranch } from "../git/check-branch.js";
import { checkPushPermissions } from "../git/check-push-permissions.js";
import { checkRepository } from "../git/check-repository.js";
import { setLogger } from "../logger/index.js";
import { setLastRelease } from "../release/set-last-release.js";

import { PACKAGE_NAME, PACKAGE_VERSION } from "../shared/constants.js";

export const run = async (cliOptions: CliOptions, context: Context): Promise<void> => {
  context.config = await getConfig(cliOptions);
  context.logger = setLogger(context.config.debug);
  const { logger } = context;
  logger.logInfo(`Running ${PACKAGE_NAME} version ${PACKAGE_VERSION}`);
  debugConfig(context);
  await checkRepository(logger);
  checkBranch(context);
  console.log("context.branch", context.branch);
  console.log("context.config.dryRun", context.config.dryRun);
  await checkPushPermissions(context.config.repositoryUrl, context);
  setLastRelease(context);
  console.log("exit", process.exitCode, process.exitCode ?? 0);
};
