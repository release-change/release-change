import type { Context, Reference } from "@release-change/shared";
import type { PullRequestAssociatedWithCommit } from "./github.types.js";

import { setLogger } from "@release-change/logger";
import { runCommand } from "@release-change/shared";

import { getRepositoryRelatedEntryPoint } from "./get-repository-related-entry-point.js";
import { setCurlHeaders } from "./set-curl-headers.js";

/**
 * Gets the pull requests related to a commit.
 * @param sha - The commit SHA to use to get the pull requests associated with.
 * @param context - The context where the CLI is running.
 * @return An array of objects with the pull request number and the `isPullRequest` property set to `true`.
 */
export const getPullRequests = async (sha: string, context: Context): Promise<Reference[]> => {
  const { env, config } = context;
  const { debug } = config;
  const logger = setLogger(debug);
  const { repositoryUrl } = config;
  const repositoryEntryPoint = getRepositoryRelatedEntryPoint(repositoryUrl);
  const uri = `${repositoryEntryPoint}/commits/${sha}/pulls`;
  const { status, stdout, stderr } = await runCommand("curl", setCurlHeaders(env, uri));
  if (debug) {
    logger.setDebugScope("github:get-pull-requests");
    logger.logDebug(`Requested URI: ${uri}`);
  }
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
