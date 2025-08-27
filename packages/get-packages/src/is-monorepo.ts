import type { Package } from "@release-change/shared/";

/**
 * Checks whether the current directory is a monorepo, based on the number of packages.
 * @param packages - The list of packages.
 * @return `true` if there are more than one package, `false` otherwise.
 */
export const isMonorepo = (packages: Package[]) => {
  const { length } = packages;
  if (length) return length > 1;
  throw new Error("There must be at least one package.");
};
