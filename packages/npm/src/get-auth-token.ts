import type { Context } from "@release-change/shared";

import { getNpmrcFile } from "./get-npmrc-file.js";

import { NPM_AUTH_TOKEN_URL } from "./constants.js";

/**
 * Gets auth token if it already exists.
 * @param context - The context where the CLI is running.
 */
export const getAuthToken = (context: Context): void => {
  const { cwd } = context;
  const npmrcFile = getNpmrcFile(cwd);
  if (npmrcFile) {
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
