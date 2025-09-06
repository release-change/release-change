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
  if (status === 404) throw new Error(`Failed to fetch URI ${uri}.`);
  const responseError: GitHubResponseError = await pullRequestResponse.json();
  const { message, documentation_url: documentationUrl } = responseError;
  const documentationReference = documentationUrl ? ` See ${documentationUrl}.` : "";
  if (status === 409) {
    throw new Error(`There is a conflict with the requested URI ${uri}.${documentationReference}`);
  }
  if ((status === 403 && message.startsWith("API rate limit exceeded")) || status === 429) {
    const errorMessage =
      status === 403
        ? "The GitHub API rate limit has been exceeded."
        : "An abuse detection mechanism has been detected.";
    throw new Error(
      `${errorMessage} Please wait a few minutes and try again.${documentationReference}`
    );
  }
  throw new Error(message);
};
