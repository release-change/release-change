import type { Context, ContextBase } from "@release-change/shared";

import { isDetailedError } from "./is-detailed-error.js";

/**
 * Adds an error to the context.
 * @param error - The error to add.
 * @param context - The context where the CLI is running.
 */
export const addErrorToContext = (error: unknown, context: Context | ContextBase): void => {
  if (error instanceof Error) {
    const { cause } = error;
    if (cause && isDetailedError(cause)) {
      const { title, message, details } = cause;
      context.errors.push({
        title,
        message,
        details
      });
    }
  }
};
