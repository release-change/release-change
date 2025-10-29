import type { Package } from "@release-change/shared/";

import { formatDetailedError } from "@release-change/shared";

/**
 * Checks whether the current directory is a monorepo, based on the number of packages.
 * @param packages - The list of packages.
 * @return `true` if there are more than one package, `false` otherwise.
 */
export const isMonorepo = (packages: Package[]) => {
  const { length } = packages;
  if (length) return length > 1;
  throw formatDetailedError({
    title: "Failed to check whether the current directory is a monorepo",
    message: "There must be at least one package.",
    details: {
      output: "packages.length: 0"
    }
  });
};
