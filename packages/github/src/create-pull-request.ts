import type { Context } from "@release-change/shared";
import type {
  GitHubResponseError,
  PullRequestReference,
  RepositoryMergeOptions
} from "./github.types.js";

import { getReleaseToken } from "@release-change/ci";
import { setLogger } from "@release-change/logger";
import {
  deepInspectObject,
  formatDetailedError,
  GITHUB_API_ACCEPT_HEADER,
  GITHUB_API_VERSION
} from "@release-change/shared";

import { getRepositoryRelatedEndpoint } from "./get-repository-related-endpoint.js";

/**
 * Creates a pull request.
 * @param headBranch - The name of the branch to create the pull request from.
 * @param mergeOptions - The repository merge options.
 * @param context - The context where the CLI is running.
 * @return The number and the node ID of the newly created pull request.
 */
export const createPullRequest = async (
  headBranch: string,
  mergeOptions: RepositoryMergeOptions,
  context: Context
): Promise<Omit<PullRequestReference, "commits">> => {
  const {
    env,
    config: { debug, repositoryUrl, isMonorepo },
    branch,
    nextRelease
  } = context;
  if (branch && headBranch) {
    const logger = setLogger(debug);
    logger.setScope("github");
    const releaseToken = getReleaseToken(env);
    const repositoryEndpoint = getRepositoryRelatedEndpoint(repositoryUrl);
    const uri = `${repositoryEndpoint}/pulls`;
    const packageNumber = isMonorepo ? "packages" : "package";
    const releasesBody = nextRelease?.length
      ? `\n#### Releases\n\n${nextRelease.map(release => `- ${release.gitTag}`).join("\n")}\n`
      : "";
    const autoMergeBody = mergeOptions.autoMergeAllowed
      ? "The auto-merge is enabled."
      : "The auto-merge is disabled. Please merge this pull request manually.";
    const commentBody = `This pull request was automatically created.

${autoMergeBody}
${releasesBody}`;
    const requestBody = {
      title: `chore: release version ${packageNumber}`,
      head: headBranch,
      base: branch,
      body: commentBody
    };
    const pullRequestCreationResponse = await fetch(uri, {
      method: "POST",
      headers: {
        Accept: GITHUB_API_ACCEPT_HEADER,
        Authorization: `Bearer ${releaseToken}`,
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": GITHUB_API_VERSION
      },
      body: JSON.stringify(requestBody)
    });
    const { headers, status, statusText } = pullRequestCreationResponse;
    const pullRequestCreationResponseData = await pullRequestCreationResponse.json();
    if (debug) {
      logger.setDebugScope("github:create-pull-request");
      logger.logDebug(`API endpoint: ${uri}`);
      logger.logDebug(`Request body: ${deepInspectObject(requestBody)}`);
      logger.logDebug(`Response status: ${status}`);
      logger.logDebug(`Response status text: ${statusText}`);
      logger.logDebug(`Response headers: ${deepInspectObject(headers)}`);
      logger.logDebug(`Response JSON: ${deepInspectObject(pullRequestCreationResponseData)}`);
    }
    if (status === 201) {
      logger.logSuccess("Created the pull request successfully.");
      const { number, node_id } = pullRequestCreationResponseData;
      return {
        pullRequestNumber: number,
        pullRequestId: node_id
      };
    }
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
};
