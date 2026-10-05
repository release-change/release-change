import type { PackageManager } from "@release-change/get-packages";
import type { Context } from "@release-change/shared";

import { getNpmrcFile } from "./get-npmrc-file.js";
import { getYarnrcFile } from "./get-yarnrc-file.js";

import { NPM_AUTH_TOKEN_URL, YARNRC_NPM_AUTH_TOKEN } from "./constants.js";

/**
 * Gets auth token if it already exists.
 * @param packageManager - The package manager to use.
 * @param context - The context where the CLI is running.
 */
export const getAuthToken = (
  packageManager: NonNullable<PackageManager>,
  context: Context
): void => {
  const { cwd } = context;
  const yarnrcFile = packageManager === "yarn" ? getYarnrcFile(cwd) : null;
  const npmrcFile = packageManager === "yarn" ? null : getNpmrcFile(cwd);
  if (yarnrcFile) {
    const lines = yarnrcFile.split("\n");
    const authTokenExists = lines.some(line => line.trim().startsWith(YARNRC_NPM_AUTH_TOKEN));
    context.authToken = {
      fileExists: true,
      authTokenExists
    };
  } else if (npmrcFile) {
    const lines = npmrcFile.split("\n");
    const authTokenExists = lines.some(line => line.trim().startsWith(`${NPM_AUTH_TOKEN_URL}`));
    context.authToken = {
      fileExists: true,
      authTokenExists
    };
  } else {
    context.authToken = {
      fileExists: false,
      authTokenExists: false
    };
  }
};
