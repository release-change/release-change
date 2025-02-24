import { cwd } from "node:process";

import { getRootPackage } from "./get-root-package.js";
import { switchUrlToHttpsProtocol } from "./switch-url-to-https-protocol.js";

/**
 * Gets repository URL from the package file.
 * If necessary, the URL is switched from Git+HTTPS to HTTPS protocol.
 * @return The URL (using HTTPS protocol) if it is defined by the package file, `null` otherwise.
 */
export const getRepositoryUrl = (): string | null => {
  const rootPackage = getRootPackage(`${cwd()}/package.json`);
  if (rootPackage) {
    const { repository } = rootPackage;
    if (typeof repository === "string") return switchUrlToHttpsProtocol(repository);
    if (typeof repository === "object") return switchUrlToHttpsProtocol(repository.url);
    return null;
  }
  return null;
};
