/**
 * Checks whether a CI tool is detected or not.
 * @param env - The whole available environment variables.
 * @param ciTool - The variable to find.
 * @return `true` if a CI tool is found within the environment variables, `false` otherwise.
 */
export const isCiToolDetected = (env: NodeJS.ProcessEnv, ciTool: string): boolean => {
  return Boolean(env[ciTool]);
};
