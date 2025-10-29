import type { DetailedError } from "./index.js";

/**
 * Formats a detailed error with a title, a message and details.
 * @param detailedError - The detailed error to format.
 * @return An `Error` object.
 */
export const formatDetailedError = (detailedError: DetailedError): Error => {
  const { title, message, details } = detailedError;
  return new Error(`${title}: ${message}`, {
    cause: { title, message, details }
  });
};
