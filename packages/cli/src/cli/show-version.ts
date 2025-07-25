import { WORKSPACE_VERSION } from "../shared/constants.js";

/**
 * Shows the current version of `release-change`.
 */
export const showVersion = (): void => console.log(`v${WORKSPACE_VERSION}`);
