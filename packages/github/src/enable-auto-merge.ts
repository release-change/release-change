import type { Context } from "@release-change/shared";
import type {
  EnableAutoMergeQuery,
  MergeMethod,
  PullRequestReference,
  RepositoryMergeOptions
} from "./github.types.js";

import { getIssueAndPullRequestToken } from "@release-change/ci";
import { COMMITTER_EMAIL, COMMITTER_NAME } from "@release-change/git";
import { setLogger } from "@release-change/logger";
import { deepInspectObject } from "@release-change/shared";

import { GITHUB_GRAPHQL_API_ENDPOINT } from "./constants.js";

/**
 * Enables auto-merge for the release pull request if such an option is allowed.
 *
 * The merge method is determined based on the repository merge options. If the merge method is `MERGE` or `SQUASH`, a commit message is passed explicitlyto avoid GitHub using the pull request description as the commit body when “Use PR title and body as commit message” is enabled in repository settings.
 * @param pullRequestReference - The reference to the pull request to enable auto-merge for.
 * @param mergeOptions - The repository merge options.
 * @param context - The context where the CLI is running.
 */
export const enableAutoMerge = async (
  pullRequestReference: PullRequestReference,
  mergeOptions: RepositoryMergeOptions,
  context: Context
): Promise<void> => {
  const {
    env,
    config: { debug, isMonorepo }
  } = context;
  const logger = setLogger(debug);
  logger.setScope("github");
  const { autoMergeAllowed, mergeCommitAllowed, rebaseMergeAllowed, squashMergeAllowed } =
    mergeOptions;
  if (autoMergeAllowed) {
    const { pullRequestNumber, pullRequestId, commits } = pullRequestReference;
    if (commits.length) {
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
        const [commit] = commits;
        let commitHeadline: string | undefined;
        let commitBody: string | undefined;
        if (mergeMethod !== "REBASE" && commit) {
          if (isMonorepo) {
            commitHeadline = "chore: release version packages";
            const signature = `Co-authored-by: ${COMMITTER_NAME} <${COMMITTER_EMAIL}>`;
            if (mergeMethod === "SQUASH") {
              commitBody = `${commits
                .map(commit => {
                  const newLineIndex = commit.indexOf("\n");
                  return `- ${newLineIndex === -1 ? commit : commit.slice(0, newLineIndex)}`;
                })
                .join("\n")}\n\n${signature}`;
            } else commitBody = signature;
          } else {
            const newLineIndex = commit.indexOf("\n");
            if (newLineIndex === -1) commitHeadline = commit;
            else {
              commitHeadline = commit.slice(0, newLineIndex);
              commitBody = commit.slice(newLineIndex + 2);
            }
          }
          commitHeadline += ` (#${pullRequestNumber})`;
        }
        const query = `
mutation EnablePullRequestAutoMerge(
  $pullRequestId: ID!,
  $mergeMethod: PullRequestMergeMethod!,
  $commitHeadline: String,
  $commitBody: String
) {
  enablePullRequestAutoMerge(
    input: {
      pullRequestId: $pullRequestId,
      mergeMethod: $mergeMethod,
      commitHeadline: $commitHeadline,
      commitBody: $commitBody
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
          mergeMethod,
          commitHeadline,
          commitBody
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
        const { data } = enableAutoMergeResponseData;
        if (data) {
          logger.logInfo(
            `Enabled the auto-merge for the pull request with the ${mergeMethod} method.`
          );
        } else logger.logWarn("Failed to enable the auto-merge for the pull request.");
      }
    }
  }
};
