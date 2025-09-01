import type { CiConfig } from "@release-change/shared";

import { isCiToolDetected } from "./is-ci-tool-detected.js";

/**
 * Configures CI environment.
 * @param env - The whole available environment variables.
 * @return An object with `isCi` and `isPullRequest` properties set to the boolean suiting the context.
 */
export const configureCiEnvironment = (env: NodeJS.ProcessEnv): CiConfig => {
  if (isCiToolDetected(env, "GITHUB_ACTIONS")) {
    const isPullRequest =
      env.GITHUB_EVENT_NAME === "pull_request" || env.GITHUB_EVENT_NAME === "pull_request_target";
    return {
      isCi: Boolean(env.CI),
      isPullRequest
    };
  }
  return {
    isCi: false,
    isPullRequest: false
  };
};
