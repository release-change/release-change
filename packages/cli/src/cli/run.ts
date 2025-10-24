import type { CliOptions, Context, ContextBase } from "@release-change/shared";

import { configureCiEnvironment, isUsableCiEnvironment } from "@release-change/ci";
import { getReleaseType } from "@release-change/commit-analyser";
import { debugConfig, getConfig } from "@release-change/config";
import { getPackages, isMonorepo } from "@release-change/get-packages";
import {
  COMMITTER_EMAIL,
  COMMITTER_NAME,
  checkBranch,
  checkPushPermissions,
  checkRepository,
  getBranchName,
  getCommitsSinceRef
} from "@release-change/git";
import {
  closeIssue,
  getRelatedPullRequestsAndIssues,
  postFailComment,
  postSuccessComment,
  tagPullRequestAndIssue
} from "@release-change/github";
import { checkErrorType, setLogger } from "@release-change/logger";
import { publish, setLastRelease, setNextRelease } from "@release-change/release";
import { WORKSPACE_NAME, WORKSPACE_VERSION } from "@release-change/shared";

/**
 * Runs the CLI.
 * @param cliOptions - The CLI options.
 * @param contextBase - The already known context where the CLI is running.
 */
export const run = async (cliOptions: CliOptions, contextBase: ContextBase): Promise<void> => {
  const logger = setLogger(contextBase.config.debug);
  logger.setScope("cli");
  logger.logInfo(`Running ${WORKSPACE_NAME} version ${WORKSPACE_VERSION}…`);
  const packages = await getPackages(contextBase);
  const config = await getConfig(cliOptions, isMonorepo(packages));
  const branch = getBranchName(contextBase, logger);
  const ci = configureCiEnvironment(contextBase.env);
  const context: Context = {
    ...contextBase,
    branch,
    config,
    ci,
    packages,
    releaseInfos: []
  };
  await checkRepository(context, logger);
  if (isUsableCiEnvironment(context)) {
    Object.assign(context.env, {
      GIT_AUTHOR_NAME: COMMITTER_NAME,
      GIT_AUTHOR_EMAIL: COMMITTER_EMAIL,
      GIT_COMMITTER_NAME: COMMITTER_NAME,
      GIT_COMMITTER_EMAIL: COMMITTER_EMAIL
    });
    debugConfig(context);
    checkBranch(context);
    await checkPushPermissions(context.config.repositoryUrl, context);
    setLastRelease(context);
    const commits = getCommitsSinceRef(context);
    context.commits = commits;
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
        try {
          await publish(context);
          if (references) {
            for (const reference of references) {
              const { number, isPullRequest } = reference;
              await postSuccessComment(reference, context);
              if (!isPullRequest) await closeIssue(number, context);
              await tagPullRequestAndIssue(reference, context);
            }
          }
        } catch (error) {
          logger.logError(checkErrorType(error));
          context.errors.push(error);
          if (references) {
            for (const reference of references) {
              await postFailComment(reference, context);
            }
          }
        }
      }
    }
  }
};
