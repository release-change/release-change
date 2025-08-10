import { WORKSPACE_NAME } from "@release-change/shared";

export const HTTPS_URL_PATTERN =
  /^(git\+)?ht{2}ps:\/{2}(?<host>[^/]+)\/(?<user>[-_./a-z0-9]+)\/(?<repo>[-_./a-z0-9]+)(?<extension>\.git)$/i;
export const STANDALONE_SSH_URL_PATTERN =
  /^git@(?<host>[^:]+):(?<user>[-_./a-z0-9]+)\/(?<repo>[-_./a-z0-9]+)(?<extension>\.git)$/i;
export const SSH_URL_PATTERN =
  /^(git\+)?s{2}h:\/{2}git@(?<host>[^/]+)\/(?<user>[-_./a-z0-9]+)\/(?<repo>[-_./a-z0-9]+)(?<extension>\.git)$/i;
export const GITHUB_URL_PATTERN = /^github:(?<user>[-_./a-z0-9]+)\/(?<repo>[-_./a-z0-9]+)$/i;
export const HTTPS_GITHUB_URL_REPLACEMENT_PATTERN = "https://github.com/$<user>/$<repo>.git";
export const SSH_GITHUB_URL_REPLACEMENT_PATTERN = "ssh://git@github.com/$<user>/$<repo>.git";
export const DEFAULT_CONFIG = {
  branches: ["alpha", "beta", "main", "master", "next"],
  releaseType: {
    alpha: {
      channel: "alpha",
      prerelease: true,
      prereleaseIdentifier: "alpha"
    },
    beta: {
      channel: "beta",
      prerelease: true,
      prereleaseIdentifier: "beta"
    },
    main: {
      channel: "default"
    },
    master: {
      channel: "default"
    },
    next: {
      channel: "next",
      prerelease: true,
      prereleaseIdentifier: "rc"
    }
  },
  debug: false,
  dryRun: false
} as const;
export const CONFIG_FILE_NAME = `${WORKSPACE_NAME}.config.json`;
