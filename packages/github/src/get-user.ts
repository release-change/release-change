import type { GitHubResponseError, GitHubUser } from "./github.types.js";

import { getReleaseToken } from "@release-change/ci";
import { setLogger } from "@release-change/logger";
import {
  formatDetailedError,
  GITHUB_API_ACCEPT_HEADER,
  GITHUB_API_VERSION
} from "@release-change/shared";

/**
 * Gets the GitHub user from the release token.
 * @param env - The whole available environment variables.
 * @return An object with the login and the id of the GitHub user if the response status is 200, `null` otherwise.
 */
export const getUser = async (env: NodeJS.ProcessEnv): Promise<GitHubUser | null> => {
  const logger = setLogger();
  logger.setScope("github");
  const userResponse = await fetch("https://api.github.com/user", {
    headers: {
      Accept: GITHUB_API_ACCEPT_HEADER,
      Authorization: `Bearer ${getReleaseToken(env)}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": GITHUB_API_VERSION
    }
  });
  const { status } = userResponse;
  const userResponseData = userResponse.json();
  if (status === 200) {
    const user: GitHubUser = await userResponseData;
    const { login, id } = user;
    return { login, id };
  }
  if (status === 304) return null;
  const responseError: GitHubResponseError = await userResponseData;
  const { message, documentation_url: documentationUrl } = responseError;
  const documentationReference = documentationUrl ? ` See ${documentationUrl}.` : "";
  logger.logError("Failed to get user.");
  process.exitCode = status;
  throw formatDetailedError({
    title: "Failed to tag the issue or pull request",
    message: `${message}${documentationReference}`,
    details: {
      output: `status: ${status}`
    }
  });
};
