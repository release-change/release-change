import { cwd } from "node:process";

import { getRootPackage } from "./get-root-package.js";

/**
 * Gets repository URL from the package file.
 * @return The URL if it is defined by the package file, `null` otherwise.
 */
export const getRepositoryUrl = (): string | null => {
  const rootPackage = getRootPackage(`${cwd()}/package.json`);
  if (rootPackage) {
    const { repository } = rootPackage;
    return typeof repository === "string" ? repository : (repository?.url ?? null);
  }
  return null;
};
