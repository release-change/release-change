import { getRootPackage } from "../config/get-root-package.js";

/**
 * Gets the package version of the root package file.
 * @param cwd - The current working directory to define the path to the root package file.
 * @return The package version if the root package file is found and has the `version` property, `undefined` otherwise.
 */
export const getRootPackageVersion = (cwd: string): string | undefined => {
  const rootPackage = getRootPackage(`${cwd}/package.json`);
  return rootPackage ? rootPackage.version : undefined;
};
