import type { CliOptions, Context, ContextBase } from "@release-change/shared";

import { configureCiEnvironment, isUsableCiEnvironment } from "@release-change/ci";
import { getReleaseType } from "@release-change/commit-analyser";
import { debugConfig, getConfig } from "@release-change/config";
import { getPackages, isMonorepo } from "@release-change/get-packages";
import {
  checkBranch,
  checkPushPermissions,
  checkRepository,
  getBranchName,
  getCommitsSinceRef
} from "@release-change/git";
import { getRelatedPullRequestsAndIssues } from "@release-change/github";
import { setLogger } from "@release-change/logger";
import { setLastRelease, setNextRelease } from "@release-change/release";
import { WORKSPACE_NAME, WORKSPACE_VERSION } from "@release-change/shared";

/**
 * Runs the CLI.
 * @param cliOptions - The CLI options.
 * @param contextBase - The already known context where the CLI is running.
 */
export const run = async (cliOptions: CliOptions, contextBase: ContextBase): Promise<void> => {
  const logger = setLogger(contextBase.config.debug);
  logger.logInfo(`Running ${WORKSPACE_NAME} version ${WORKSPACE_VERSION}…`);
  const packages = await getPackages(contextBase);
  const config = await getConfig(cliOptions, isMonorepo(packages));
  const branch = getBranchName(logger);
  const ci = configureCiEnvironment(contextBase.env);
  const context: Context = {
    ...contextBase,
    branch,
    config,
    ci,
    packages
  };
  debugConfig(context);
  await checkRepository(logger);
  if (isUsableCiEnvironment(context)) {
    checkBranch(context);
    await checkPushPermissions(context.config.repositoryUrl, context);
    setLastRelease(context);
    const commits = getCommitsSinceRef(context);
    const releaseType = getReleaseType(commits, context);
    setNextRelease(releaseType, context);
    if (context.nextRelease) {
      const { debug, dryRun } = context.config;
      if (debug) {
        logger.setDebugScope("cli:run");
        logger.logDebug(`Dry-run mode enabled: ${dryRun}`);
      }
      if (dryRun) {
        logger.logWarn(
          "The dry-run mode is enabled; therefore, the release will not be published."
        );
      } else {
        await getRelatedPullRequestsAndIssues(commits, context);
        const { references } = context;
        console.log("context.references", references?.length, references);
      }
    }
  }
};
