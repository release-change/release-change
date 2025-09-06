import type {
  AssociatedPullRequest,
  GitHubResponseError,
  PullRequestAssociatedWithCommit
} from "./github.types.js";

import { getReleaseToken } from "@release-change/ci";

/**
 * Gets the pull requests associated with a given commit.
 * @param uri - The URI to request.
 * @param env - The environment variables.
 * @return An array of associated pull requests.
 */
export const getAssociatedPullRequests = async (
  uri: string,
  env: NodeJS.ProcessEnv
): Promise<AssociatedPullRequest[]> => {
  const releaseToken = getReleaseToken(env);
  const associatedPullRequest: AssociatedPullRequest[] = [];
  const pullRequestResponse = await fetch(uri, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${releaseToken}`,
      "X-GitHub-Api-Version": "2022-11-28"
    }
  });
  const { status } = pullRequestResponse;
  if (status === 200) {
    const pullRequests: PullRequestAssociatedWithCommit[] = await pullRequestResponse.json();
    for (const pullRequest of pullRequests) {
      const { number, title, body } = pullRequest;
      associatedPullRequest.push({ title, body, reference: { number, isPullRequest: true } });
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
