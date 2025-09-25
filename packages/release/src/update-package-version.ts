import type { PackageManifest } from "@release-change/config";
import type { Context, PackageNextRelease } from "@release-change/shared";

import fs from "node:fs";
import path from "node:path";

import { setLogger } from "@release-change/logger";

/**
 * Updates the package manifest file with the new version.
 * @param packageNextRelease - The next release data to use.
 * @param context - The context where the CLI is running.
 */
export const updatePackageVersion = (
  packageNextRelease: PackageNextRelease,
  context: Context
): void => {
  const { name, pathname, version } = packageNextRelease;
  const {
    cwd,
    config: { debug }
  } = context;
  const logger = setLogger(debug);
  const packageName = `${name || "root"} package`;
  const packagePath = path.join(cwd, pathname, "package.json");
  if (fs.existsSync(packagePath)) {
    const packageManifest: PackageManifest = JSON.parse(fs.readFileSync(packagePath, "utf-8"));
    packageManifest.version = version;
    // TODO: uncomment to write updated package manifest content to file
    // fs.writeFileSync(packageManifestPath, JSON.stringify(packageManifest, null, 2));
    logger.logInfo(`Package version updated to ${version} for ${packageName}.`);
    if (debug) {
      logger.setDebugScope("release:update-package-version");
      logger.logDebug(`Package version for ${packageName}: ${packageManifest.version}`);
    }
  } else throw new Error(`Package ${packagePath} not found for ${packageName}.`);
};
