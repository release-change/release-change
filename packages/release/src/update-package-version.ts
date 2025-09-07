import type { PackageManifest } from "@release-change/config";
import type { Context, PackageNextRelease } from "@release-change/shared";

import fs from "node:fs";
import path from "node:path";

import { setLogger } from "@release-change/logger";

/**
 * Updates the package manifest file with the new version.
 * @param packageNextRelease - The package to update.
 * @param context - The context where the CLI is running.
 */
export const updatePackageVersion = (
  packageNextRelease: PackageNextRelease,
  context: Context
): void => {
  const { name, version } = packageNextRelease;
  const {
    cwd,
    config: { debug },
    packages,
    nextRelease
  } = context;
  const logger = setLogger(debug);
  const [packagePathname] = packages.filter(packageItem => packageItem.name === name);
  if (packagePathname) {
    const { path: pathname } = packagePathname;
    const packagePath = path.join(cwd, pathname, "package.json");
    const packageName = `${name ?? "root"} package`;
    if (fs.existsSync(packagePath)) {
      const packageManifest: PackageManifest = JSON.parse(fs.readFileSync(packagePath, "utf-8"));
      if (nextRelease) {
        const [packageNextRelease] = nextRelease.filter(release => release.name === name);
        if (packageNextRelease) {
          packageManifest.version = version;
          // TODO: uncomment to write updated package manifest content to file
          // fs.writeFileSync(packagePath, JSON.stringify(packageManifest, null, 2));
          logger.logInfo(`Package version updated to ${version} for ${packageName}.`);
          if (debug) {
            logger.setDebugScope("release:update-package-version");
            logger.logDebug(`Package version for ${packageName}: ${packageManifest.version}`);
          }
        } else throw new Error(`No next release found for ${packageName}.`);
      } else throw new Error("No next release found.");
    } else throw new Error(`Package ${packagePath} not found for ${packageName}.`);
  } else throw new Error(`Package ${name} not found.`);
};
