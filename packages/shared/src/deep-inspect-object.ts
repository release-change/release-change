import { inspect } from "node:util";

/**
 * Displays a deep inspection of an object, including all nested properties.
 * @param object - The object to inspect.
 * @return A string representation of the object with all properties displayed.
 */
export const deepInspectObject = (object: unknown): string => {
  return inspect(object, { depth: Number.POSITIVE_INFINITY });
};
