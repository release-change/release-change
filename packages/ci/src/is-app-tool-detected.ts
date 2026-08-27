/**
 * Checks whether an app tool, such as a GitHub App, is detected or not.
 * @param env - The whole available environment variables.
 * @param appTool - The variable to find.
 * @return `true` if an app tool is found within the environment variables, `false` otherwise.
 */
export const isAppToolDetected = (env: NodeJS.ProcessEnv, appTool: string): boolean => {
  return Boolean(env[appTool]);
};
