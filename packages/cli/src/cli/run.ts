import type { CliOptions, Context, ContextBase } from "@release-change/shared";

import { getReleaseType } from "@release-change/commit-analyser";
import { debugConfig, getConfig } from "@release-change/config";
import {
  checkBranch,
  checkPushPermissions,
  checkRepository,
  getBranchName,
  getCommitsSinceRef
} from "@release-change/git";
import { setLogger } from "@release-change/logger";
import { WORKSPACE_NAME, WORKSPACE_VERSION } from "@release-change/shared";

import { configureCiEnvironment } from "../ci/configure-ci-environment.js";
import { isUsableCiEnvironment } from "../ci/is-usable-ci-environment.js";
import { setLastRelease } from "../release/set-last-release.js";
import { setNextRelease } from "../release/set-next-release.js";

export const run = async (cliOptions: CliOptions, contextBase: ContextBase): Promise<void> => {
  const config = await getConfig(cliOptions);
  const logger = setLogger(config.debug);
  const branch = getBranchName(logger);
  const ci = configureCiEnvironment(contextBase.env);
  const context: Context = {
    ...contextBase,
    branch,
    config,
    ci
  };
  logger.logInfo(`Running ${WORKSPACE_NAME} version ${WORKSPACE_VERSION}…`);
  debugConfig(context);
  await checkRepository(logger);
  if (isUsableCiEnvironment(context)) {
    checkBranch(context);
    await checkPushPermissions(context.config.repositoryUrl, context);
    setLastRelease(context);
    const commits = getCommitsSinceRef(context);
    const releaseType = getReleaseType(commits, context);
    setNextRelease(releaseType, context);
    console.log("context.branch", context.branch);
    console.log("context.config.dryRun", context.config.dryRun);
  }
  console.log("exit", process.exitCode, process.exitCode ?? 0);
};
