import type { Commit } from "@release-change/commit-analyser";

import { inspect } from "node:util";

import { checkErrorType, setLogger } from "@release-change/logger";
import { type Context, type Reference, removeDuplicateObjects } from "@release-change/shared";

import { getIssues } from "./get-issues.js";
import { getPullRequestBody } from "./get-pull-request-body.js";
import { getPullRequests } from "./get-pull-requests.js";

/**
 * Gets pull requests and issues related to the commits which are part of the release.
 * @param commits - The commits to parse.
 * @param context - The context where the CLI is running.
 */
export const getRelatedPullRequestsAndIssues = async (
  commits: Commit[],
  context: Context
): Promise<void> => {
  const { config } = context;
  const { debug } = config;
  const logger = setLogger(debug);
  try {
    const references: Reference[] = [];
    for (const commit of commits) {
      const { sha } = commit;
      if (sha) references.push(...(await getPullRequests(sha, context)));
      references.push(...getIssues(commit));
    }
    const pullRequests: number[] = references
      .filter(reference => reference.isPullRequest)
      .map(reference => reference.number);
    for (const pullRequest of pullRequests) {
      const pullRequestBody = await getPullRequestBody(pullRequest, context);
      if (pullRequestBody) references.push(...getIssues({ body: pullRequestBody }));
    }
    context.references = removeDuplicateObjects(references);
    if (debug) {
      logger.setDebugScope("github:get-related-pull-requests-and-issues");
      logger.logDebug("context.references:");
      logger.logDebug(inspect(context.references, { depth: Number.POSITIVE_INFINITY }));
    }
  } catch (error) {
    logger.logError("Failed to get related pull requests and issues.");
    logger.logError(checkErrorType(error));
    process.exit(process.exitCode ?? 1);
  }
};
