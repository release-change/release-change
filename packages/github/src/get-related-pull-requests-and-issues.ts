import type { AssociatedPullRequest } from "./github.types.js";

import { inspect } from "node:util";

import { getGitTags } from "@release-change/commit-analyser";
import { checkErrorType, setLogger } from "@release-change/logger";
import {
  agreeInNumber,
  type Commit,
  type Context,
  type Reference,
  removeDuplicateObjects
} from "@release-change/shared";

import { getAssociatedPullRequests } from "./get-associated-pull-requests.js";
import { getIssues } from "./get-issues.js";
import { getRepositoryRelatedEntryPoint } from "./get-repository-related-entry-point.js";
import { mergeReferencesByNumber } from "./merge-references-by-number.js";

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
      logger.logInfo("Searching for related pull requests and issues…");
      const references: Reference[] = [];
      const relatedPullRequests: AssociatedPullRequest[] = [];
      const commitsWithSha = commits.filter(commit => typeof commit.sha === "string");
      if (commitsWithSha.length) {
        const pullRequestReferences: Reference[] = [];
        for (const commitWithSha of commitsWithSha) {
          const associatedPullRequests = await getAssociatedPullRequests(
            `${repositoryEntryPoint}/commits/${commitWithSha.sha}/pulls`,
            getGitTags(commitWithSha, context),
            env
          );
          relatedPullRequests.push(...associatedPullRequests);
          pullRequestReferences.push(
            ...associatedPullRequests.map(associatedPullRequest => associatedPullRequest.reference)
          );
        }
        references.push(...mergeReferencesByNumber(pullRequestReferences));
      }
      const pullRequestNumberSet = new Set(
        relatedPullRequests.map(pullRequestReference => pullRequestReference.reference.number)
      );
      const issueReferences: Reference[] = [];
      for (const commit of commits) {
        const issues = getIssues(commit, getGitTags(commit, context)).filter(
          issue => !pullRequestNumberSet.has(issue.number)
        );
        issueReferences.push(...issues);
      }
      const pullRequestTitlesAndBodies = relatedPullRequests.flatMap(pullRequestReference =>
        getIssues(
          {
            message: pullRequestReference.title,
            body: pullRequestReference.body?.split(/\n{2,}/) ?? [""]
          },
          pullRequestReference.reference.gitTags
        ).filter(issue => !pullRequestNumberSet.has(issue.number))
      );
      issueReferences.push(...pullRequestTitlesAndBodies);
      references.push(...mergeReferencesByNumber(issueReferences));
      context.references = removeDuplicateObjects(references);
      const totalPullRequestReferences = context.references.filter(
        reference => reference.isPullRequest
      ).length;
      const totalIssueReferences = context.references.filter(
        reference => !reference.isPullRequest
      ).length;
      const totalPullRequestReferencesMessage = `${totalPullRequestReferences || "No"} pull ${agreeInNumber(totalPullRequestReferences, ["request", "requests"])}`;
      const totalIssueReferencesMessage = `${totalIssueReferences || "no"} ${agreeInNumber(totalIssueReferences, ["issue", "issues"])}`;
      logger.logInfo(
        !totalPullRequestReferences && !totalIssueReferences
          ? "No pull requests nor issues found."
          : `${totalPullRequestReferencesMessage} and ${totalIssueReferencesMessage} found.`
      );
    } else {
      context.references = [];
      logger.logInfo("No pull requests nor issues found.");
    }
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
