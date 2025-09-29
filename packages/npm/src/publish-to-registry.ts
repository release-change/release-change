import type { Context, ReleaseInfoNpm } from "@release-change/shared";
import type { PackagePublishing } from "./npm.types.js";

import path from "node:path";
import { inspect } from "node:util";

import { setLogger } from "@release-change/logger";
import { runCommand } from "@release-change/shared";

import { getAuthToken } from "./get-auth-token.js";
import { removeAuthToken } from "./remove-auth-token.js";
import { setAuthToken } from "./set-auth-token.js";

/**
 * Publishes the package to the NPM registry.
 * @param packagePublishing - The package publishing data to use.
 * @param context - The context where the CLI is running.
 */
export const publishToRegistry = async (
  packagePublishing: PackagePublishing,
  context: Context
): Promise<void> => {
  const { name, packageManifestName, pathname, version, packageManager, args, npmTag } =
    packagePublishing;
  const {
    cwd,
    env,
    config: { debug }
  } = context;
  const logger = setLogger(debug);
  logger.setScope("npm");
  getAuthToken(context);
  const { authToken } = context;
  if (authToken) {
    const isAuthTokenNotDefined = !authToken.fileExists || !authToken.authTokenExists;
    if (isAuthTokenNotDefined) setAuthToken(cwd);
    const packageManagerCommandResult = await runCommand(packageManager, args, {
      cwd: path.resolve(cwd, pathname),
      env
    });
    const { status, stdout, stderr } = packageManagerCommandResult;
    const packageName = name || "root";
    if (debug) {
      logger.setDebugScope("npm:publish-to-registry");
      logger.logDebug(`Auth token: ${inspect(authToken, { depth: Number.POSITIVE_INFINITY })}`);
      logger.logDebug(`Command run: ${packageManager} ${args.join(" ")}`);
      logger.logDebug(inspect(packageManagerCommandResult, { depth: Number.POSITIVE_INFINITY }));
    }
    if (status) {
      logger.logError(
        `Failed to publish release ${version} of ${packageName} package to the NPM registry.`
      );
      throw new Error(stderr || stdout || `Command failed with exit code ${status}.`);
    }
    const channel = `${npmTag ? npmTag : "default"} channel`;
    logger.logSuccess(
      `Published release ${version} of ${packageName} package to the NPM registry on ${channel}.`
    );
    if (isAuthTokenNotDefined) removeAuthToken(cwd, authToken);
    const releaseInfo: ReleaseInfoNpm = {
      type: "npm",
      name: `NPM (${npmTag ? npmTag : "latest"} distribution tag)`,
      url: `https://www.npmjs.com/package/${packageManifestName}/v/${version}`
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
};
