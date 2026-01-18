import type { Context } from "@release-change/shared";
import type {
  AssociatedPullRequest,
  GitHubResponseError,
  PullRequestAssociatedWithCommit
} from "./github.types.js";

import { getReleaseToken } from "@release-change/ci";
import { setLogger } from "@release-change/logger";
import { deepInspectObject, formatDetailedError } from "@release-change/shared";

/**
 * Gets the pull requests associated with a given commit.
 * @param uri - The URI to request.
 * @param gitTags - The git tags associated with the commit.
 * @param context - The context where the CLI is running.
 * @return An array of associated pull requests.
 */
export const getAssociatedPullRequests = async (
  uri: string,
  gitTags: string[],
  context: Context
): Promise<AssociatedPullRequest[]> => {
  const {
    env,
    config: { debug }
  } = context;
  const logger = setLogger(debug);
  const releaseToken = getReleaseToken(env);
  const associatedPullRequest: AssociatedPullRequest[] = [];
  const pullRequestResponse = await fetch(uri, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${releaseToken}`,
      "X-GitHub-Api-Version": "2022-11-28"
    }
  });
  const { headers, status, statusText } = pullRequestResponse;
  const pullRequestResponseData = pullRequestResponse.json();
  if (debug) {
    logger.setDebugScope("github:get-associated-pull-requests");
    logger.logDebug(`API entry point: ${uri}`);
    logger.logDebug(`Response status: ${status}`);
    logger.logDebug(`Response status text: ${statusText}`);
    logger.logDebug(`Response headers: ${deepInspectObject(headers)}`);
    logger.logDebug(`Response JSON: ${deepInspectObject(await pullRequestResponseData)}`);
  }
  if (status === 200) {
    const pullRequests: PullRequestAssociatedWithCommit[] = await pullRequestResponseData;
    for (const pullRequest of pullRequests) {
      const { number, title, body } = pullRequest;
      associatedPullRequest.push({
        title,
        body,
        reference: { number, isPullRequest: true, gitTags }
      });
    }
    if (debug) {
      logger.logDebug(`Associated pull requests: ${deepInspectObject(associatedPullRequest)}`);
    }
    return associatedPullRequest;
  }
  if (status === 404) {
    process.exitCode = 404;
    throw formatDetailedError({
      title: "Failed to get the associated pull requests",
      message: `Failed to fetch URI ${uri}.`,
      details: {
        output: `status: ${status}`
      }
    });
  }
  const responseError: GitHubResponseError = await pullRequestResponseData;
  const { message, documentation_url: documentationUrl } = responseError;
  const documentationReference = documentationUrl ? ` See ${documentationUrl}.` : "";
  if (status === 403 || status === 409 || status === 429) {
    process.exitCode = status;
    throw formatDetailedError({
      title: "Failed to get the associated pull requests",
      message: `${message}${documentationReference}`,
      details: {
        output: `status: ${status}`
      }
    });
  }
  process.exitCode = status;
  throw formatDetailedError({
    title: "Failed to get the associated pull requests",
    message,
    details: {
      output: `status: ${status}`
    }
  });
};
