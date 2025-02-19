import { getRemoteRepositoryUrl } from "./get-remote-repository-url.js";
import { getRepositoryUrl } from "./get-repository-url.js";

import { PACKAGE_NAME } from "../shared/constants.js";

export const DEFAULT_CONFIG = {
  branches: ["alpha", "beta", "main", "master", "next"],
  repositoryUrl: getRepositoryUrl() ?? (await getRemoteRepositoryUrl()),
  releaseType: {
    alpha: {
      channel: "alpha",
      prerelease: true
    },
    beta: {
      channel: "beta",
      prerelease: true
    },
    main: {
      channel: "default"
    },
    master: {
      channel: "default"
    },
    next: {
      channel: "next",
      prerelease: true
    }
  },
  debug: false,
  dryRun: false
} as const;
export const CONFIG_FILE_NAME = `${PACKAGE_NAME}.config.json`;
