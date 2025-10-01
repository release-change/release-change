import type { Commit, Context, Reference } from "@release-change/shared";
import type { AssociatedPullRequest } from "./github.types.js";

import { inspect } from "node:util";

import { getGitTags } from "@release-change/commit-analyser";
import { checkErrorType, setLogger } from "@release-change/logger";
import { removeDuplicateObjects } from "@release-change/shared";

import { getAssociatedPullRequests } from "./get-associated-pull-requests.js";
import { getIssues } from "./get-issues.js";
import { getRepositoryRelatedEntryPoint } from "./get-repository-related-entry-point.js";

/**
 * Gets pull requests and issues related to the commits which are part of the release.
 *
 * First, the pull requests associated with each commit are retrieved. Then, the issues mentioned in the commit message, body and footer are retrieved. Finally, those mentioned in the pull request titles and bodies are retrieved.
 * @param commits - The commits to parse.
 * @param context - The context where the CLI is running.
 */
export const getRelatedPullRequestsAndIssues = async (
  commits: Commit[],
  context: Context
): Promise<void> => {
  const { env, config, nextRelease } = context;
  const { debug, repositoryUrl } = config;
  const logger = setLogger(debug);
  logger.setScope("github");
  try {
    const repositoryEntryPoint = getRepositoryRelatedEntryPoint(repositoryUrl);
    if (commits.length && nextRelease) {
      const references: Reference[] = [];
      const pullRequestReferences: AssociatedPullRequest[] = [];
      const commitsWithSha = commits.filter(commit => typeof commit.sha === "string");
      if (commitsWithSha.length) {
        for (const commitWithSha of commitsWithSha) {
          const pullRequests = await getAssociatedPullRequests(
            `${repositoryEntryPoint}/commits/${commitWithSha.sha}/pulls`,
            getGitTags(commitWithSha, context),
            env
          );
          pullRequestReferences.push(...pullRequests);
          references.push(...pullRequests.map(pullRequest => pullRequest.reference));
        }
      }
      const pullRequestNumberSet = new Set(
        pullRequestReferences.map(pullRequestReference => pullRequestReference.reference.number)
      );
      for (const commit of commits) {
        const issues = getIssues(commit, getGitTags(commit, context)).filter(
          issue => !pullRequestNumberSet.has(issue.number)
        );
        references.push(...issues);
      }
      const pullRequestTitlesAndBodies = pullRequestReferences.flatMap(pullRequestReference =>
        getIssues(
          {
            message: pullRequestReference.title,
            body: pullRequestReference.body?.split(/\n{2,}/) ?? [""]
          },
          pullRequestReference.reference.gitTags
        ).filter(issue => !pullRequestNumberSet.has(issue.number))
      );
      references.push(...pullRequestTitlesAndBodies);
      context.references = removeDuplicateObjects(references);
    } else context.references = [];
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
