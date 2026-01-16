import { setLogger } from "@release-change/logger";

import { WORKSPACE_VERSION } from "./constants.js";

/**
 * Shows the current version of `release-change`.
 */
export const showVersion = (): void => {
  const logger = setLogger();
  logger.logWithoutFormatting(`v${WORKSPACE_VERSION}`);
};
