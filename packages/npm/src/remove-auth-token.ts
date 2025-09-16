import type { AuthToken } from "@release-change/shared";

import fs from "node:fs";
import path from "node:path";

import { getNpmrcFile } from "./get-npmrc-file.js";

import { NPM_AUTH_TOKEN_URL } from "./constants.js";

/**
 * Removes auth token from the `.npmrc` file, either removing the file itself if created for this purpose or removing the line containing the token otherwise, provided the token was not already set when parsing the `.npmrc` file.
 * @param cwd - The current working directory.
 * @param authToken - The context where the auth token was set: whether the `.npmrc` already existed or not, whether the auth token was already set when parsing the `.npmrc` file or not.
 */
export const removeAuthToken = (cwd: string, authToken: AuthToken): void => {
  const { fileExists, authTokenExists } = authToken;
  const pathToFile = path.join(cwd, ".npmrc");
  if (fileExists) {
    const npmrcFile = getNpmrcFile(cwd);
    if (npmrcFile) {
      if (authTokenExists) return;
      fs.writeFileSync(
        pathToFile,
        npmrcFile
          .split("\n")
          .filter(line => !line.trim().startsWith(`${NPM_AUTH_TOKEN_URL}`))
          .join("\n")
      );
    } else {
      process.exitCode = 1;
      throw new Error("Failed to find the `.npmrc` file.");
    }
  } else fs.rmSync(pathToFile);
};
