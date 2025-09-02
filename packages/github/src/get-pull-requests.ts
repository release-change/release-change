import type { Context, Reference } from "@release-change/shared";
import type { PullRequestAssociatedWithCommit } from "./github.types.js";

import { getReleaseToken } from "@release-change/ci";
import { setLogger } from "@release-change/logger";
import { runCommand } from "@release-change/shared";

import { getRepositoryRelatedEntryPoint } from "./get-repository-related-entry-point.js";

/**
 * Gets the pull requests related to a commit.
 * @param sha - The commit SHA to use to get the pull requests associated with.
 * @param context - The context where the CLI is running.
 * @return An array of objects with the pull request number and the `isPullRequest` property set to `true`.
 */
export const getPullRequests = async (sha: string, context: Context): Promise<Reference[]> => {
  const { env, config } = context;
  const logger = setLogger(config.debug);
  const releaseToken = getReleaseToken(env);
  const { repositoryUrl } = config;
  const repositoryEntryPoint = getRepositoryRelatedEntryPoint(repositoryUrl);
  const { status, stdout, stderr } = await runCommand("curl", [
    "-L",
    "-H",
    "Accept: application/vnd.github+json",
    "-H",
    `Authorization: Bearer ${releaseToken}`,
    "-H",
    "X-GitHub-Api-Version: 2022-11-28",
    `${repositoryEntryPoint}/commits/${sha}/pulls`
  ]);
  if (status) {
    process.exitCode = status;
    logger.logError(`Failed to get related pull requests from commit SHA ${sha}.`);
    throw new Error(stderr);
  }
  const pullRequests: PullRequestAssociatedWithCommit[] = JSON.parse(stdout);
  return pullRequests.map(pullRequest => {
    return {
      number: pullRequest.number,
      isPullRequest: true
    };
  });
};
