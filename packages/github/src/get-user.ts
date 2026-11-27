import type { GitHubUser, GitHubUserQuery } from "./github.types.js";

import { getReleaseToken } from "@release-change/ci";
import { setLogger } from "@release-change/logger";
import { formatDetailedError } from "@release-change/shared";

import { GITHUB_GRAPHQL_API_ENDPOINT } from "./constants.js";

/**
 * Gets the GitHub user from the release token.
 * @param env - The whole available environment variables.
 * @return An object with the login and the id of the GitHub user if the response has data and no errors, `null` otherwise.
 */
export const getUser = async (env: NodeJS.ProcessEnv): Promise<GitHubUser | null> => {
  const logger = setLogger();
  logger.setScope("github");
  const query = `
query {
  viewer {
    login
    databaseId
  }
}
`;
  const userResponse = await fetch(GITHUB_GRAPHQL_API_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getReleaseToken(env)}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });
  const userResponseData: GitHubUserQuery = await userResponse.json();
  const { data, errors } = userResponseData;
  if (data && !errors) {
    const {
      viewer: { login, databaseId: id }
    } = data;
    return {
      login,
      id
    };
  }
  if (errors) {
    process.exitCode = 1;
    logger.logError("Failed to get user.");
    throw formatDetailedError({
      title: "Failed to get GitHub user login and ID.",
      message: "The GitHub API failed to provide information about the used login and ID.",
      details: {
        output: errors ? `errors: ${JSON.stringify(errors)}` : "{}",
        command: `POST ${GITHUB_GRAPHQL_API_ENDPOINT} query { viewer { login databaseId } }`
      }
    });
  }
  return null;
};
