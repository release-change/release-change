import packageManager from "../../package.json" with { type: "json" };

/**
 * Shows the current version of `release-change`.
 */
export const showVersion = (): void => console.log(`v${packageManager.version}`);
