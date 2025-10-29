import { formatDetailedError } from "@release-change/shared";

/**
 * Get the release token from the environment variables.
 * @param env - The whole available environment variables.
 * @return The token if the `RELEASE_TOKEN` environment variable is defined.
 */
export const getReleaseToken = (env: NodeJS.ProcessEnv): string => {
  const releaseToken = env.RELEASE_TOKEN;
  if (!releaseToken) {
    process.exitCode = 1;
    throw formatDetailedError({
      title: "Failed to get the release token",
      message: "The release token is not defined.",
      details: {
        output: "env.RELEASE_TOKEN: undefined"
      }
    });
  }
  return releaseToken;
};
