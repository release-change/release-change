import { WORKSPACE_VERSION } from "@release-change/shared";

/**
 * Shows the current version of `release-change`.
 */
export const showVersion = (): void => console.log(`v${WORKSPACE_VERSION}`);
