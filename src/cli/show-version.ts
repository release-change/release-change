import packageManager from "../../package.json" with { type: "json" };

/**
 * Shows the current version of `release-change`.
 */
const showVersion = (): void => console.log(`v${packageManager.version}`);

export default showVersion;
