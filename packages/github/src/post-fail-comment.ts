/** biome-ignore-all lint/correctness/noUnusedImports: <TODO: drop this line when the API is used> */
/** biome-ignore-all lint/correctness/noUnusedVariables: <TODO: drop this line when the API is used> */
import type { Context, Reference } from "@release-change/shared";
import type { GitHubResponseError } from "./github.types.js";

import { inspect } from "node:util";

import { getIssueAndPullRequestToken } from "@release-change/ci";
import { setLogger } from "@release-change/logger";

import { getRepositoryRelatedEntryPoint } from "./get-repository-related-entry-point.js";

/**
 * Posts a fail comment on the issue or the pull request to notify the release failure.
 * @param reference - The reference of the issue or pull request.
 * @param context - The context where the CLI is running.
 */
export const postFailComment = async (reference: Reference, context: Context): Promise<void> => {
  const {
    env,
    config: { debug, repositoryUrl },
    branch
  } = context;
  const logger = setLogger(debug);
  if (branch) {
    const issuePullRequestToken = getIssueAndPullRequestToken(env);
    const repositoryEntryPoint = getRepositoryRelatedEntryPoint(repositoryUrl);
    const { number, isPullRequest } = reference;
    const uri = `${repositoryEntryPoint}/issues/${number}/comments`;
    const commentBody = `#### The release failed

The release from the \`${branch}\` branch failed.`;
    const requestBody = {
      body: commentBody
    };
    // TODO: uncomment to use GiHub API
    // const failCommentResponse = await fetch(uri, {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/vnd.github+json",
    //     Authorization: `Bearer ${issuePullRequestToken}`,
    //     "X-GitHub-Api-Version": "2022-11-28"
    //   },
    //   body: JSON.stringify(requestBody)
    // });
    // const { status, statusText } = failCommentResponse;
    const issueType = isPullRequest ? "pull request" : "issue";
    if (debug) {
      logger.setDebugScope("github:post-fail-comment");
      logger.logDebug(`API entry point: ${uri}`);
      logger.logDebug(`Request body: ${inspect(requestBody, { depth: Number.POSITIVE_INFINITY })}`);
      // logger.logDebug(`Response status: ${status}`);
      // logger.logDebug(`Response status text: ${statusText}`);
      // logger.logDebug(
      //   `Response JSON: ${inspect(await failCommentResponse.json(), { depth: Number.POSITIVE_INFINITY })}`
      // );
    }
    // TODO: uncomment when the API is used
    // if (status === 201) logger.logInfo(`Added fail comment on ${issueType} #${number}.`);
    // else if (status === 404)
    //   logger.logWarn(
    //     `The resource requested for ${issueType} #${number} has not been found; therefore, the fail comment has not been added.`
    //   );
    // else {
    //   const responseError: GitHubResponseError = await failCommentResponse.json();
    //   const { message, documentation_url: documentationUrl } = responseError;
    //   const documentationReference = documentationUrl ? ` See ${documentationUrl}.` : "";
    //   logger.logError(`Failed to post the fail comment on ${issueType} #${number}.`);
    //   process.exitCode = status;
    //   throw new Error(`${message}${documentationReference}`);
    // }
  } else {
    process.exitCode = 1;
    throw new Error("The target branch is not defined.");
  }
};
