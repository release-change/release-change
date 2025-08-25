import fs from "node:fs";
import path from "node:path";

/**
 * Gets the package manager used.
 * @param cwd - The current working directory.
 * @param env - The whole available environment variables.
 * @return The package manager used if it is `npm` or `pnpm`, `null` otherwise.
 */
export const getPackageManager = (cwd: string, env: NodeJS.ProcessEnv): "npm" | "pnpm" | null => {
  const { npm_config_user_agent: npmConfigUserAgent, PNPM_HOME } = env;
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "package-lock.json"))) return "npm";
  if (PNPM_HOME) return "pnpm";
  if (npmConfigUserAgent) {
    if (npmConfigUserAgent.includes("pnpm")) return "pnpm";
    if (npmConfigUserAgent.includes("npm")) return "npm";
    return null;
  }
  return null;
};
