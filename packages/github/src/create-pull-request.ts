import type { Context } from "@release-change/shared";
import type { GitHubResponseError } from "./github.types.js";

import { inspect } from "node:util";

import { getIssueAndPullRequestToken } from "@release-change/ci";
import { setLogger } from "@release-change/logger";
import { formatDetailedError } from "@release-change/shared";

import { getRepositoryRelatedEntryPoint } from "./get-repository-related-entry-point.js";
import { isAutoMergeAllowed } from "./is-auto-merge-allowed.js";

/**
 * Creates a pull request.
 * @param headBranch - The name of the branch to create the pull request from.
 * @param context - The context where the CLI is running.
 */
export const createPullRequest = async (headBranch: string, context: Context): Promise<void> => {
  const {
    env,
    config: { debug, repositoryUrl, isMonorepo },
    branch,
    nextRelease
  } = context;
  if (branch && headBranch) {
    const logger = setLogger(debug);
    logger.setScope("github");
    const issuePullRequestToken = getIssueAndPullRequestToken(env);
    const repositoryEntryPoint = getRepositoryRelatedEntryPoint(repositoryUrl);
    const uri = `${repositoryEntryPoint}/pulls`;
    const packageNumber = isMonorepo ? "packages" : "package";
    const releasesBody = nextRelease?.length
      ? `\n#### Releases\n\n${nextRelease.map(release => `- ${release.gitTag}`).join("\n")}\n`
      : "";
    const autoMergeBody = (await isAutoMergeAllowed(repositoryEntryPoint, context))
      ? "The auto-merge is enabled."
      : "The auto-merge is disabled. Please merge this pull request manually.";
    const commentBody = `This pull request was automatically created.

${autoMergeBody}
${releasesBody}`;
    const requestBody = {
      title: `chore: release version ${packageNumber} [skip ci]`,
      head: headBranch,
      base: branch,
      body: commentBody
    };
    const pullRequestCreationResponse = await fetch(uri, {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${issuePullRequestToken}`,
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28"
      },
      body: JSON.stringify(requestBody)
    });
    const { headers, status, statusText } = pullRequestCreationResponse;
    const pullRequestCreationResponseData = pullRequestCreationResponse.json();
    if (debug) {
      logger.setDebugScope("github:create-pull-request");
      logger.logDebug(`API entry point: ${uri}`);
      logger.logDebug(`Request body: ${inspect(requestBody, { depth: Number.POSITIVE_INFINITY })}`);
      logger.logDebug(`Response status: ${status}`);
      logger.logDebug(`Response status text: ${statusText}`);
      logger.logDebug(`Response headers: ${inspect(headers, { depth: Number.POSITIVE_INFINITY })}`);
      logger.logDebug(
        `Response JSON: ${inspect(await pullRequestCreationResponseData, { depth: Number.POSITIVE_INFINITY })}`
      );
    }
    if (status === 201) logger.logSuccess("Created the pull request successfully.");
    else {
      const responseError: GitHubResponseError = await pullRequestCreationResponseData;
      const { message, documentation_url: documentationUrl } = responseError;
      const documentationReference = documentationUrl ? ` See ${documentationUrl}.` : "";
      logger.logError("Failed to create the pull request.");
      process.exitCode = status;
      throw formatDetailedError({
        title: "Failed to create the pull request",
        message: `${message}${documentationReference}`,
        details: {
          output: `status: ${status}`,
          command: `POST ${uri}`
        }
      });
    }
  } else {
    process.exitCode = 1;
    throw formatDetailedError({
      title: "Failed to create the pull request",
      message: branch
        ? "The head branch must not be empty."
        : headBranch
          ? "The target branch is not defined."
          : "Both the target branch and the head branch must be defined.",
      details: {
        output: branch
          ? `branch: ${branch}, headBranch: `
          : headBranch
            ? `branch: undefined, headBranch: ${headBranch}`
            : "branch: undefined, headBranch: ",
        command: "POST /repos/:owner/:repo/pulls"
      }
    });
  }
};
