import { getReleaseToken } from "@release-change/ci";

/**
 * Sets the headers for the `curl` command.
 * @param env - The whole available environment variables.
 * @param uri - The URI to use for the `curl` command.
 * @return An array of strings with the headers to use for the `curl` command.
 */
export const setCurlHeaders = (env: NodeJS.ProcessEnv, uri: string): string[] => {
  const releaseToken = getReleaseToken(env);
  return [
    "-L",
    "-H",
    "Accept: application/vnd.github+json",
    "-H",
    `Authorization: Bearer ${releaseToken}`,
    "-H",
    "X-GitHub-Api-Version: 2022-11-28",
    uri
  ];
};
