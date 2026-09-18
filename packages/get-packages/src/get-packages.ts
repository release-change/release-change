import type { ContextBase, Package } from "@release-change/shared";

import path from "node:path";

import { addErrorToContext, checkErrorType, setLogger } from "@release-change/logger";
import { deepInspectObject, formatDetailedError } from "@release-change/shared";

import { getNpmGlobPatterns } from "./get-npm-glob-patterns.js";
import { getPackageManager } from "./get-package-manager.js";
import { getPackageManagerVersion } from "./get-package-manager-version.js";
import { getPackagesFromGlobPatterns } from "./get-packages-from-glob-patterns.js";
import { getPnpmGlobPatterns } from "./get-pnpm-glob-patterns.js";
import { getRootPackageManifest } from "./get-root-package-manifest.js";
import { getRootPnpmWorkspaceManifest } from "./get-root-pnpm-workspace-manifest.js";
import { isPackageManagerVersionCompatible } from "./is-package-manager-version-compatible.js";

import { REQUIRED_NPM_VERSION, REQUIRED_PNPM_VERSION } from "./constants.js";

/**
 * Gets the packages within the current working directory.
 * @param context - The context where the CLI is running.
 * @return An array of package names and paths to the packages found, including the root package.
 */
export const getPackages = async (context: ContextBase): Promise<Package[]> => {
  const { cwd, env, config } = context;
  const { debug } = config;
  const logger = setLogger(debug);
  logger.setScope("get-packages");
  const packageManager = getPackageManager(cwd, env);
  if (packageManager) {
    const packages: Package[] = [{ name: "", pathname: "." }];
    const packageManagerVersion = getPackageManagerVersion(packageManager);
    if (debug) {
      logger.setDebugScope("get-packages:get-packages");
      logger.logDebug(`Package manager: ${packageManager} ${packageManagerVersion}`);
    }
    if (isPackageManagerVersionCompatible(packageManager, packageManagerVersion)) {
      if (packageManager === "pnpm") {
        const content = getRootPnpmWorkspaceManifest(path.join(cwd, "pnpm-workspace.yaml"));
        if (content) {
          try {
            const globPatterns = getPnpmGlobPatterns(content);
            if (globPatterns) {
              packages.push(...(await getPackagesFromGlobPatterns(globPatterns, cwd)));
            }
            if (debug) {
              logger.logDebug(`Packages found (including root package): ${packages.length}`);
              logger.logDebug(deepInspectObject(packages));
            }
          } catch (error) {
            logger.logError(checkErrorType(error));
            addErrorToContext(error, context);
            process.exit(process.exitCode);
          }
        }
        return packages;
      }
      try {
        const rootPackageManifestContent = getRootPackageManifest(path.join(cwd, "package.json"));
        const globPatterns = getNpmGlobPatterns(rootPackageManifestContent);
        if (globPatterns) {
          packages.push(...(await getPackagesFromGlobPatterns(globPatterns, cwd)));
        }
        if (debug) {
          logger.logDebug(`Packages found (including root package): ${packages.length}`);
          logger.logDebug(deepInspectObject(packages));
        }
        return packages;
      } catch (error) {
        logger.logError(checkErrorType(error));
        addErrorToContext(error, context);
        process.exit(process.exitCode);
      }
    }
    const packageVersionRequired = (
      packageManager === "pnpm" ? REQUIRED_PNPM_VERSION : REQUIRED_NPM_VERSION
    ).replace(">=", "");
    throw formatDetailedError({
      title: "Failed to use the package manager",
      message: `The package manager version must be ${packageVersionRequired} or greater.`,
      details: { output: `${packageManager} ${packageManagerVersion}` }
    });
  }
  throw formatDetailedError({
    title: "Failed to get the package manager",
    message: "The package manager must be either `npm` or `pnpm`.",
    details: { output: String(packageManager) }
  });
};
