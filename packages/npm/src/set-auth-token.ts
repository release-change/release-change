import type { PackageManager } from "@release-change/get-packages";

import fs from "node:fs";

import { getNpmrcFile } from "./get-npmrc-file.js";
import { getYarnrcFile } from "./get-yarnrc-file.js";

import { NPM_AUTH_TOKEN_URL, YARNRC_NPM_AUTH_TOKEN } from "./constants.js";

/**
 * Sets auth token, writing or updating the `.npmrc` or `.yarnrc.yml` file.
 * @param packageManager - The package manager to use.
 * @param cwd - The current working directory.
 */
export const setAuthToken = (packageManager: NonNullable<PackageManager>, cwd: string): void => {
  const yarnrcFile = packageManager === "yarn" ? getYarnrcFile(cwd) : null;
  const npmrcFile = packageManager === "yarn" ? null : getNpmrcFile(cwd);
  const pathToFile = packageManager === "yarn" ? `${cwd}/.yarnrc.yml` : `${cwd}/.npmrc`;
  const authTokenLine =
    packageManager === "yarn"
      ? `${YARNRC_NPM_AUTH_TOKEN}"\${NPM_TOKEN}"`
      : `${NPM_AUTH_TOKEN_URL}\${NPM_TOKEN}`;
  if (yarnrcFile || npmrcFile) fs.appendFileSync(pathToFile, `\n${authTokenLine}`);
  else fs.writeFileSync(pathToFile, `${authTokenLine}`);
};
