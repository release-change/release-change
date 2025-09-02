/**
 * Get the release token from the environment variables.
 * @param env - The whole available environment variables.
 * @return The token if the `RELEASE_TOKEN` environment variable is defined.
 */
export const getReleaseToken = (env: NodeJS.ProcessEnv): string => {
  const releaseToken = env.RELEASE_TOKEN;
  if (!releaseToken) {
    process.exitCode = 1;
    throw new Error("The release token is not defined.");
  }
  return releaseToken;
};
