import type { PackageManifest } from "@release-change/config";
import type { Context, PackageNextRelease } from "@release-change/shared";

import fs from "node:fs";
import path from "node:path";

import { setLogger } from "@release-change/logger";
import { formatDetailedError } from "@release-change/shared";

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
  logger.setScope("release");
  const packageName = `${name || "root"} package`;
  const packageManifestPath = path.join(cwd, pathname, "package.json");
  if (fs.existsSync(packageManifestPath)) {
    const packageManifest: PackageManifest = JSON.parse(
      fs.readFileSync(packageManifestPath, "utf-8")
    );
    packageManifest.version = version;
    fs.writeFileSync(packageManifestPath, `${JSON.stringify(packageManifest, null, 2)}\n`);
    logger.logInfo(`Package version updated to ${version} for ${packageName}.`);
    if (debug) {
      logger.setDebugScope("release:update-package-version");
      logger.logDebug(`Package version for ${packageName}: ${packageManifest.version}`);
    }
  } else {
    throw formatDetailedError({
      title: "Failed to update the package version",
      message: `Package ${packageManifestPath} not found for ${packageName}.`,
      details: {
        output: `fs.existsSync(${packageManifestPath}): false`
      }
    });
  }
};
