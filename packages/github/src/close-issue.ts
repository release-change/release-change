import type { Context } from "@release-change/shared";
import type { GitHubResponseError } from "./github.types.js";

import { inspect } from "node:util";

import { getIssueAndPullRequestToken } from "@release-change/ci";
import { setLogger } from "@release-change/logger";

import { getRepositoryRelatedEntryPoint } from "./get-repository-related-entry-point.js";

/**
 * Closes an issue.
 * @param number - The number of the issue to close.
 * @param context - The context where the CLI is running.
 */
export const closeIssue = async (number: number, context: Context): Promise<void> => {
  const {
    env,
    config: { debug, repositoryUrl }
  } = context;
  const logger = setLogger(debug);
  logger.setScope("github");
  const issuePullRequestToken = getIssueAndPullRequestToken(env);
  const repositoryEntryPoint = getRepositoryRelatedEntryPoint(repositoryUrl);
  const uri = `${repositoryEntryPoint}/issues/${number}`;
  const requestBody = {
    state: "closed",
    state_reason: "completed"
  };
  const issueClosingResponse = await fetch(uri, {
    method: "PATCH",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${issuePullRequestToken}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28"
    },
    body: JSON.stringify(requestBody)
  });
  const { status, statusText } = issueClosingResponse;
  if (debug) {
    logger.setDebugScope("github:close-issue");
    logger.logDebug(`API entry point: ${uri}`);
    logger.logDebug(`Request body: ${inspect(requestBody, { depth: Number.POSITIVE_INFINITY })}`);
    logger.logDebug(`Response status: ${status}`);
    logger.logDebug(`Response status text: ${statusText}`);
    logger.logDebug(
      `Response JSON: ${inspect(await issueClosingResponse.json(), { depth: Number.POSITIVE_INFINITY })}`
    );
  }
  if (status === 200) logger.logSuccess(`Closed issue #${number} successfully.`);
  else if (status === 404) {
    logger.logWarn(`The resource requested for issue #${number} has not been found.`);
  } else {
    const responseError: GitHubResponseError = await issueClosingResponse.json();
    const { message, documentation_url: documentationUrl } = responseError;
    const documentationReference = documentationUrl ? ` See ${documentationUrl}.` : "";
    logger.logError(`Failed to close issue #${number}.`);
    process.exitCode = status;
    throw new Error(`${message}${documentationReference}`);
  }
};
