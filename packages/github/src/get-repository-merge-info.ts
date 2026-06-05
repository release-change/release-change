import type { RepositoryMergeInfoQuery, RepositoryMergeOptions } from "./github.types.js";

import { getIssueAndPullRequestToken } from "@release-change/ci";
import { setLogger } from "@release-change/logger";
import {
  type Context,
  deepInspectObject,
  formatDetailedError,
  parsePathname
} from "@release-change/shared";

import { GITHUB_GRAPHQL_API_ENDPOINT } from "./constants.js";

/**
 * Gets the repository information about the merge options.
 * @param context - The context where the CLI is running.
 * @return The merge options for the repository.
 */
export const getRepositoryMergeInfo = async (context: Context): Promise<RepositoryMergeOptions> => {
  const {
    env,
    config: { debug, repositoryUrl }
  } = context;
  const logger = setLogger(debug);
  const pathname = parsePathname(repositoryUrl);
  if (pathname) {
    const issuePullRequestToken = getIssueAndPullRequestToken(env);
    const query = `
query($owner: String!, $repository: String!) {
  repository(owner: $owner, name: $repository) {
    autoMergeAllowed
    mergeCommitAllowed
    rebaseMergeAllowed
    squashMergeAllowed
  }
}
`;
    const repositoryMergeInfoResponse = await fetch(GITHUB_GRAPHQL_API_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${issuePullRequestToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query,
        pathname
      })
    });
    const repositoryMergeInfoResponseData: RepositoryMergeInfoQuery =
      await repositoryMergeInfoResponse.json();
    if (debug) {
      logger.setDebugScope("github:get-repository-merge-info");
      logger.logDebug(`API endpoint: ${GITHUB_GRAPHQL_API_ENDPOINT}`);
      logger.logDebug(`GraphQL query: ${deepInspectObject(query)}`);
      logger.logDebug(`GraphQL variables: ${deepInspectObject(pathname)}`);
      logger.logDebug(`Response JSON: ${deepInspectObject(repositoryMergeInfoResponseData)}`);
    }
    const { data, errors } = repositoryMergeInfoResponseData;
    if (data && !errors) return data.repository;
    process.exitCode = 1;
    logger.logError("Failed to get the information about the repository merge options.");
    throw formatDetailedError({
      title: "Failed to get the information about the repository merge options",
      message: "The GitHub API failed to provide information about the repository merge options.",
      details: {
        output: errors ? `errors: ${JSON.stringify(errors)}` : "{}",
        command: `POST ${GITHUB_GRAPHQL_API_ENDPOINT} query($owner, $repository) { repository(owner, name) {} }`
      }
    });
  }
  logger.logError("Failed to parse the repository URL.");
  process.exitCode = 1;
  throw formatDetailedError({
    title: "Failed to parse the repository URL",
    message:
      "The provided repository URL could not be parsed into owner and repository components.",
    details: {
      output: "null"
    }
  });
};
