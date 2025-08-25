/**
 * Gets the package manager used.
 * @param env - The whole available environment variables.
 * @return The package manager used if it is `npm` or `pnpm`, `null` otherwise.
 */
export const getPackageManager = (env: NodeJS.ProcessEnv): "npm" | "pnpm" | null => {
  const { npm_config_user_agent: npmConfigUserAgent } = env;
  if (npmConfigUserAgent) {
    if (npmConfigUserAgent.includes("pnpm")) return "pnpm";
    if (npmConfigUserAgent.includes("npm")) return "npm";
    return null;
  }
  return null;
};
