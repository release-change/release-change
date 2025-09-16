import fs from "node:fs";

import { getNpmrcFile } from "./get-npmrc-file.js";

import { NPM_AUTH_TOKEN_URL } from "./constants.js";

/**
 * Sets auth token, writing or updating the `.npmrc` file.
 * @param cwd - The current working directory.
 */
export const setAuthToken = (cwd: string): void => {
  const npmrcFile = getNpmrcFile(cwd);
  const pathToFile = `${cwd}/.npmrc`;
  const authTokenLine = `${NPM_AUTH_TOKEN_URL}\${NPM_TOKEN}`;
  if (npmrcFile) fs.appendFileSync(pathToFile, `\n${authTokenLine}`);
  else fs.writeFileSync(pathToFile, `${authTokenLine}`);
};
