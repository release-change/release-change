import type { Logger } from "@release-change/logger";

import { vi } from "vitest";

export const mockedLogger: Logger = {
  setDebugScope: vi.fn(),
  logDebug: vi.fn(),
  logInfo: vi.fn(),
  logError: vi.fn(),
  logWarn: vi.fn(),
  logSuccess: vi.fn(),
  logWithoutFormatting: vi.fn()
};
