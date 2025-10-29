import type { DetailedError } from "@release-change/shared";

/**
 * Checks if an unknown value satisfies the `DetailedError` type.
 * @param value - The value to check.
 * @return `true` if the value is of type `DetailedError`, `false` otherwise.
 */
export const isDetailedError = (value: unknown): value is DetailedError => {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  const { title, message, details } = candidate;
  return (
    typeof title === "string" &&
    typeof message === "string" &&
    typeof details === "object" &&
    details !== null &&
    typeof (candidate.details as Record<string, unknown>).output === "string" &&
    (typeof (candidate.details as Record<string, unknown>).command === "string" ||
      (candidate.details as Record<string, unknown>).command === undefined)
  );
};
