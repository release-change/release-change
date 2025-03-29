/**
 * Checks the error type.
 * @param error - The error caught.
 * @return The message from the `message` property if `error` is an instance of `Error`, the error itself within a string otherwise.
 */
export const checkErrorType = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return `Unknown error: ${error}`;
};
