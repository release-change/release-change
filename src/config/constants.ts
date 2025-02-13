import childProcess from "node:child_process";

import packageManager from "../../package.json" with { type: "json" };

export const DEFAULT_CONFIG = {
  branches: ["alpha", "beta", "main", "master", "next"],
  repositoryUrl:
    packageManager.repository.url ?? childProcess.execSync("git remote get-url origin"),
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
