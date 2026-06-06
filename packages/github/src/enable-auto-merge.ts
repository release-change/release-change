import type { Context } from "@release-change/shared";
import type { EnableAutoMergeQuery, MergeMethod, RepositoryMergeOptions } from "./github.types.js";

import { getIssueAndPullRequestToken } from "@release-change/ci";
import { setLogger } from "@release-change/logger";
import { deepInspectObject } from "@release-change/shared";

import { GITHUB_GRAPHQL_API_ENDPOINT } from "./constants.js";

/**
 * Enables auto-merge for the release pull request if such an option is allowed.
 *
 * The merge method is determined based on the repository merge options.
 * @param pullRequestId - The ID of the pull request to enable auto-merge for.
 * @param mergeOptions - The repository merge options.
 * @param context - The context where the CLI is running.
 */
export const enableAutoMerge = async (
  pullRequestId: string,
  mergeOptions: RepositoryMergeOptions,
  context: Context
): Promise<void> => {
  const {
    env,
    config: { debug, isMonorepo }
  } = context;
  const logger = setLogger(debug);
  const { autoMergeAllowed, mergeCommitAllowed, rebaseMergeAllowed, squashMergeAllowed } =
    mergeOptions;
  if (autoMergeAllowed) {
    const issuePullRequestToken = getIssueAndPullRequestToken(env);
    const mergeMethod: MergeMethod | null = isMonorepo
      ? rebaseMergeAllowed
        ? "REBASE"
        : mergeCommitAllowed
          ? "MERGE"
          : squashMergeAllowed
            ? "SQUASH"
            : null
      : squashMergeAllowed
        ? "SQUASH"
        : mergeCommitAllowed
          ? "MERGE"
          : rebaseMergeAllowed
            ? "REBASE"
            : null;
    if (mergeMethod) {
      const query = `
mutation EnablePullRequestAutoMerge(
  $pullRequestId: ID!,
  $mergeMethod: PullRequestMergeMethod!
) {
  enablePullRequestAutoMerge(
    input: {
      pullRequestId: $pullRequestId,
      mergeMethod: $mergeMethod
    }
  ) {
    pullRequest {
      number
      autoMergeRequest {
        mergeMethod
      }
    }
  }
}
`;
      const variables = {
        pullRequestId,
        mergeMethod
      };
      const enableAutoMergeResponse = await fetch(GITHUB_GRAPHQL_API_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${issuePullRequestToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query, variables })
      });
      const enableAutoMergeResponseData: EnableAutoMergeQuery =
        await enableAutoMergeResponse.json();
      if (debug) {
        logger.setDebugScope("github:enable-auto-merge");
        logger.logDebug(`API endpoint: ${GITHUB_GRAPHQL_API_ENDPOINT}`);
        logger.logDebug(`GraphQL query: ${deepInspectObject(query)}`);
        logger.logDebug(`GraphQL variables: ${deepInspectObject(variables)}`);
        logger.logDebug(`Response JSON: ${deepInspectObject(enableAutoMergeResponseData)}`);
      }
      const { data, errors } = enableAutoMergeResponseData;
      if (data && !errors) {
        logger.logInfo(
          `Enabled the auto-merge for the pull request with the ${mergeMethod} method.`
        );
      } else logger.logWarn("Failed to enable the auto-merge for the pull request.");
    }
  }
};
