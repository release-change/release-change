import packageManifest from "../package.json" with { type: "json" };

export const REQUIRED_NPM_VERSION = packageManifest.engines.npm;
export const REQUIRED_PNPM_VERSION = packageManifest.engines.pnpm;
