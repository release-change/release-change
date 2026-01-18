import type { Context, ReleaseInfoNpm } from "@release-change/shared";
import type { PackagePublishing } from "./npm.types.js";

import path from "node:path";

import { setLogger } from "@release-change/logger";
import { deepInspectObject, formatDetailedError, runCommand } from "@release-change/shared";

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
      logger.logDebug(`Auth token: ${deepInspectObject(authToken)}`);
      logger.logDebug(`Command run: ${packageManager} ${args.join(" ")}`);
      logger.logDebug(deepInspectObject(packageManagerCommandResult));
    }
    if (status) {
      logger.logError(
        `Failed to publish release ${version} of ${packageName} package to the NPM registry.`
      );
      throw formatDetailedError({
        title: `Failed to run the \`${packageManager}\` command`,
        message: `The command failed with exit code ${status}.`,
        details: {
          output: stdout || stderr || `Command failed with exit code ${status}.`,
          command: `${packageManager} ${args.join(" ")}`
        }
      });
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
    context.releaseInfos.push(releaseInfo);
    if (debug) {
      logger.logDebug("context.releaseInfos:");
      logger.logDebug(deepInspectObject(context.releaseInfos));
    }
  } else {
    process.exitCode = 1;
    throw formatDetailedError({
      title: "Failed to publish to the NPM registry",
      message: "The auth token context could not be loaded.",
      details: {
        output: "authToken: undefined"
      }
    });
  }
};
