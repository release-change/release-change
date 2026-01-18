import type { PackageManifest } from "@release-change/config";
import type { Context, PackageNextRelease } from "@release-change/shared";
import type { PackagePublishing } from "./npm.types.js";

import fs from "node:fs";
import path from "node:path";

import { getPackageManager } from "@release-change/get-packages";
import { setLogger } from "@release-change/logger";
import { deepInspectObject, formatDetailedError } from "@release-change/shared";

/**
 * Prepares the package publishing to the NPM registry if the package is not private.
 * @param packageNextRelease - The next release data to use.
 * @param context - The context where the CLI is running.
 * @return The package publishing data if the package is not private, `null` otherwise.
 */
export const preparePublishing = async (
  packageNextRelease: PackageNextRelease,
  context: Context
): Promise<PackagePublishing | null> => {
  const { name, pathname, version, npmTag } = packageNextRelease;
  const {
    cwd,
    env,
    config: { debug, npmPublish }
  } = context;
  const logger = setLogger(debug);
  logger.setScope("npm");
  const packageManifestPath = path.join(cwd, pathname, "package.json");
  if (fs.existsSync(packageManifestPath)) {
    const packageManifest: PackageManifest = JSON.parse(
      fs.readFileSync(packageManifestPath, "utf-8")
    );
    const packageName = name || "root";
    const isPackagePrivate = Boolean(packageManifest.private);
    if (debug) {
      logger.setDebugScope("npm:prepare-publishing");
      logger.logDebug(`npmPublish: ${npmPublish}`);
      logger.logDebug(`private: ${isPackagePrivate}`);
    }
    if (npmPublish !== false) {
      if (!isPackagePrivate) {
        const packageManager = getPackageManager(cwd, env);
        if (packageManager) {
          const args = ["publish", "--access", "public"];
          const packagePublishing: PackagePublishing = {
            name,
            packageManifestName: packageManifest.name,
            pathname,
            version,
            packageManager,
            args
          };
          if (npmTag) {
            args.push("--tag", npmTag);
            packagePublishing.npmTag = npmTag;
          }
          if (packageManager === "pnpm") args.push("--no-git-checks");
          if (debug) {
            logger.logDebug(`Publishing info prepared for ${packageName} package:`);
            logger.logDebug(deepInspectObject(packagePublishing));
          }
          return packagePublishing;
        }
        process.exitCode = 1;
        throw formatDetailedError({
          title: "Failed to prepare publishing",
          message:
            "The package manager is not found or is not one of those supported (npm or pnpm).",
          details: {
            output: `packageManager: ${packageManager}`
          }
        });
      }
      logger.logWarn(
        `The ${packageName} package is private; therefore, the release will not be published.`
      );
      return null;
    }
    logger.logWarn(
      `The configuration does not allow to publish any packages to NPM; therefore, the release for ${packageName} package will not be published.`
    );
    return null;
  }
  process.exitCode = 1;
  throw formatDetailedError({
    title: "Failed to prepare publishing",
    message: "Could not find the package.",
    details: {
      output: `fs.existsSync(${packageManifestPath}): false`
    }
  });
};
