import type { Config } from "@release-change/shared";

/**
 * Sets the config, finalising it by setting the `isMonorepo` and `dependencyUpdateMethod` parameters based on the package resolution.
 * @param configBase - The config base.
 * @param isMonorepo - Whether the current directory is a monorepo or not.
 * @return The config to use based on CLI options, config file and/or default config.
 */
export const setConfig = (configBase: Config, isMonorepo: boolean): Config => {
  const dependencyUpdateMethod = isMonorepo ? (configBase.dependencyUpdateMethod ?? "pin") : null;
  return {
    ...configBase,
    isMonorepo,
    dependencyUpdateMethod
  };
};
