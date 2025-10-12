import type { Context } from "@release-change/shared";
import type {
  AssociatedPullRequest,
  GitHubResponseError,
  PullRequestAssociatedWithCommit
} from "./github.types.js";

import { inspect } from "node:util";

import { getReleaseToken } from "@release-change/ci";
import { setLogger } from "@release-change/logger";

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
  const { status, statusText } = pullRequestResponse;
  if (debug) {
    logger.setDebugScope("github:get-associated-pull-requests");
    logger.logDebug(`API entry point: ${uri}`);
    logger.logDebug(`Response status: ${status}`);
    logger.logDebug(`Response status text: ${statusText}`);
    logger.logDebug(
      `Response JSON: ${inspect(await pullRequestResponse.json(), { depth: Number.POSITIVE_INFINITY })}`
    );
  }
  if (status === 200) {
    const pullRequests: PullRequestAssociatedWithCommit[] = await pullRequestResponse.json();
    for (const pullRequest of pullRequests) {
      const { number, title, body } = pullRequest;
      associatedPullRequest.push({
        title,
        body,
        reference: { number, isPullRequest: true, gitTags }
      });
    }
    if (debug) {
      logger.logDebug(
        `Associated pull requests: ${inspect(associatedPullRequest, { depth: Number.POSITIVE_INFINITY })}`
      );
    }
    return associatedPullRequest;
  }
  if (status === 404) {
    process.exitCode = 404;
    throw new Error(`Failed to fetch URI ${uri}.`);
  }
  const responseError: GitHubResponseError = await pullRequestResponse.json();
  const { message, documentation_url: documentationUrl } = responseError;
  const documentationReference = documentationUrl ? ` See ${documentationUrl}.` : "";
  if (status === 403 || status === 409 || status === 429) {
    process.exitCode = status;
    throw new Error(`${message}${documentationReference}`);
  }
  process.exitCode = status;
  throw new Error(message);
};
