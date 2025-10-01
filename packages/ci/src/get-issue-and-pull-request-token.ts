/**
 * Gets the token used to interact with issues and pull requests from the environment variables.
 * @param env - The whole available environment variables.
 * @return The token if the `ISSUE_PR_TOKEN` environment variable is defined.
 */
export const getIssueAndPullRequestToken = (env: NodeJS.ProcessEnv): string => {
  const { ISSUE_PR_TOKEN } = env;
  if (ISSUE_PR_TOKEN) return ISSUE_PR_TOKEN;
  process.exitCode = 1;
  throw new Error(
    "The token used to interact with issues and pull requests (comments, state and tags) is not defined."
  );
};
