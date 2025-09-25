import type { PackageManifest } from "@release-change/config";
import type { Context, PackageNextRelease } from "@release-change/shared";

import fs from "node:fs";
import path from "node:path";

import { setLogger } from "@release-change/logger";

/**
 * Updates the package manifest file with the new version of the updated internal dependencies.
 * @param packageNextRelease - The next release data to use.
 * @param packageDependencies - The package internal dependencies to update.
 * @param context - The context where the CLI is running.
 */
export const updatePackageDependenciesVersions = (
  packageNextRelease: PackageNextRelease,
  packageDependencies: PackageNextRelease[],
  context: Context
): void => {
  const { name, pathname } = packageNextRelease;
  const {
    cwd,
    config: { debug, dependencyUpdateMethod }
  } = context;
  const logger = setLogger(debug);
  const packageName = `${name || "root"} package`;
  const packagePath = path.join(cwd, pathname, "package.json");
  if (dependencyUpdateMethod) {
    if (fs.existsSync(packagePath)) {
      if (debug) logger.setDebugScope("release:update-package-dependencies-versions");
      const packageManifest: PackageManifest = JSON.parse(fs.readFileSync(packagePath, "utf-8"));
      const { dependencies, devDependencies } = packageManifest;
      for (const packageDependency of packageDependencies) {
        const { name, version } = packageDependency;
        const dependencyType =
          dependencies && name in dependencies
            ? "dependencies"
            : devDependencies && name in devDependencies
              ? "devDependencies"
              : undefined;
        if (dependencyType && packageManifest[dependencyType]) {
          if (dependencyUpdateMethod === "workspace") {
            packageManifest[dependencyType][name] = "workspace:*";
            logger.logInfo(
              `Package version updated to workspace:* for package dependency ${name}.`
            );
          } else {
            const range =
              dependencyUpdateMethod === "caret-range"
                ? "^"
                : dependencyUpdateMethod === "tilde-range"
                  ? "~"
                  : "";
            packageManifest[dependencyType][name] = range + version;
            logger.logInfo(`Package version updated to ${version} for package dependency ${name}.`);
          }
          if (debug) {
            logger.logDebug(
              `Package version for package dependency ${name}: ${packageManifest[dependencyType][name]}`
            );
          }
        }
      }
      // TODO: uncomment to write updated package manifest content to file
      // fs.writeFileSync(packagePath, JSON.stringify(packageManifest, null, 2));
    } else throw new Error(`Package ${packagePath} not found for ${packageName}.`);
  } else throw new Error("Dependency update method not found.");
};
