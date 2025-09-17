import type { PackageManifest } from "@release-change/config";
import type { Context, PackageNextRelease, ReleaseInfoNpm } from "@release-change/shared";

import fs from "node:fs";
import path from "node:path";
import { inspect } from "node:util";

import { getPackageManager } from "@release-change/get-packages";
import { setLogger } from "@release-change/logger";
import { runCommand } from "@release-change/shared";

import { getAuthToken } from "./get-auth-token.js";
import { removeAuthToken } from "./remove-auth-token.js";
import { setAuthToken } from "./set-auth-token.js";

/**
 * Publishes the package to the NPM registry if it is not private.
 * @param packageNextRelease - The next release data to use.
 * @param context - The context where the CLI is running.
 */
export const publishToRegistry = async (
  packageNextRelease: PackageNextRelease,
  context: Context
): Promise<void> => {
  const { name, path: pathname, version, npmTag } = packageNextRelease;
  const {
    cwd,
    env,
    config: { debug, npmPublish }
  } = context;
  const logger = setLogger(debug);
  const packageManifestPath = path.join(cwd, pathname, "package.json");
  if (fs.existsSync(packageManifestPath)) {
    const packageManifest: PackageManifest = JSON.parse(
      fs.readFileSync(packageManifestPath, "utf-8")
    );
    const isPackagePrivate = Boolean(packageManifest.private);
    if (debug) {
      logger.setDebugScope("npm:publish-to-registry");
      logger.logDebug(`private: ${isPackagePrivate}`);
    }
    if (npmPublish !== false && !isPackagePrivate) {
      const packageManager = getPackageManager(cwd, env);
      if (packageManager) {
        getAuthToken(context);
        const { authToken } = context;
        if (authToken) {
          const isAuthTokenNotDefined = !authToken.fileExists || !authToken.authTokenExists;
          if (isAuthTokenNotDefined) setAuthToken(cwd);
          // TODO: remove `--dry-run` flag to truly publish the release to the NPM registry
          const args = ["publish", "--dry-run", "--access", "public"];
          if (npmTag) args.push("--tag", npmTag);
          const { status, stdout, stderr } = await runCommand(packageManager, args);
          const packageName = name || "root";
          if (debug) {
            logger.logDebug(
              `Auth token: ${inspect(authToken, { depth: Number.POSITIVE_INFINITY })}`
            );
            logger.logDebug(`Package manager: ${packageManager}`);
            logger.logDebug(`Package name: ${packageName}`);
            logger.logDebug(`npmTag: ${npmTag}`);
            logger.logDebug(`Command run: ${packageManager} ${args.join(" ")}`);
            logger.logDebug(`Command exit code: ${status}`);
            logger.logDebug(`Command stdout: ${stdout}`);
            logger.logDebug(`Command stderr: ${stderr}`);
          }
          if (status) {
            logger.logError(
              `Failed to publish release ${version} of ${packageName} package to the NPM registry.`
            );
            throw new Error(stderr);
          }
          const channel = `${npmTag ? npmTag : "default"} channel`;
          logger.logSuccess(
            `Published release ${version} of ${packageName} package to the NPM registry on ${channel}.`
          );
          if (isAuthTokenNotDefined) removeAuthToken(cwd, authToken);
          const releaseInfo: ReleaseInfoNpm = {
            type: "npm",
            name: `NPM (${npmTag ? npmTag : "latest"} distribution tag)`,
            url: `https://www.npmjs.com/package/${packageManifest.name}/v/${version}`
          };
          if (!context.releaseInfos) context.releaseInfos = [];
          context.releaseInfos.push(releaseInfo);
          if (debug) {
            logger.logDebug("context.releaseInfos:");
            logger.logDebug(inspect(context.releaseInfos, { depth: Number.POSITIVE_INFINITY }));
          }
        } else {
          process.exitCode = 1;
          throw new Error("Failed to load the auth token context.");
        }
      } else {
        process.exitCode = 1;
        throw new Error(
          "The package manager is not found or is not one of those supported (npm or pnpm)."
        );
      }
    } else logger.logWarn("The package is private; therefore, the release will not be published.");
  } else {
    process.exitCode = 1;
    throw new Error("Could not find the package.");
  }
};
