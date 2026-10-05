import type { PackageManager } from "@release-change/get-packages";
import type { AuthToken } from "@release-change/shared";

import fs from "node:fs";
import path from "node:path";

import { formatDetailedError } from "@release-change/shared";

import { getNpmrcFile } from "./get-npmrc-file.js";
import { getYarnrcFile } from "./get-yarnrc-file.js";

import { NPM_AUTH_TOKEN_URL, YARNRC_NPM_AUTH_TOKEN } from "./constants.js";

/**
 * Removes auth token from the `.npmrc` or `.yarnrc.yml` file, either removing the file itself if created for this purpose or removing the line containing the token otherwise, provided the token was not already set when parsing the `.npmrc` file.
 * @param packageManager - The package manager to use.
 * @param cwd - The current working directory.
 * @param authToken - The context where the auth token was set: whether the `.npmrc` or `.yarnrc.yml` already existed or not, whether the auth token was already set when parsing the `.npmrc` or `.yarnrc.yml` file or not.
 */
export const removeAuthToken = (
  packageManager: NonNullable<PackageManager>,
  cwd: string,
  authToken: AuthToken
): void => {
  const { fileExists, authTokenExists } = authToken;
  const pathToFile = path.join(cwd, packageManager === "yarn" ? ".yarnrc.yml" : ".npmrc");
  if (fileExists) {
    const rcFile = packageManager === "yarn" ? getYarnrcFile(cwd) : getNpmrcFile(cwd);
    if (rcFile) {
      if (authTokenExists) return;
      fs.writeFileSync(
        pathToFile,
        rcFile
          .split("\n")
          .filter(line =>
            packageManager === "yarn"
              ? !line.startsWith(YARNRC_NPM_AUTH_TOKEN)
              : !line.trim().startsWith(NPM_AUTH_TOKEN_URL)
          )
          .join("\n")
      );
    } else {
      process.exitCode = 1;
      throw formatDetailedError({
        title: "Failed to remove auth token",
        message: `Could not find the \`${packageManager === "yarn" ? ".yarnrc.yml" : ".npmrc"}\` file.`,
        details: {
          output: `${packageManager === "yarn" ? "getYarnrcFile" : "getNpmrcFile"}(${cwd}): null`
        }
      });
    }
  } else fs.rmSync(pathToFile);
};
