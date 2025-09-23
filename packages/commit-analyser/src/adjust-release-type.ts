import type { Context } from "@release-change/shared";
import type { ReleaseType } from "./commit-analyser.types.js";

import path from "node:path";

import { getPackageDependencies } from "@release-change/get-packages";

/**
 * Adjusts the release type based on the internal dependencies.
 *
 * The root package is considered having all other internal packages as dependencies.
 * @param context - The context where the CLI is running.
 * @param releaseTypesMap - The map of release types.
 * @return The adjusted map of release types.
 */
export const adjustReleaseType = (
  context: Context,
  releaseTypesMap: Map<string, Set<ReleaseType>>
): Map<string, Set<ReleaseType>> => {
  const { cwd, packages } = context;
  const completedReleaseTypesMap = new Map(releaseTypesMap);
  for (const packageItem of packages) {
    const { name, pathname } = packageItem;
    const dependencies = name
      ? getPackageDependencies(path.join(cwd, pathname, "package.json"))
      : packages.map(packageItem => packageItem.name);
    if (dependencies?.length) {
      const releaseTypes = new Set<ReleaseType>();
      for (const dependency of dependencies) {
        if (completedReleaseTypesMap.has(dependency)) {
          const dependencyReleaseTypes = completedReleaseTypesMap.get(dependency);
          if (dependencyReleaseTypes) {
            for (const dependencyReleaseType of dependencyReleaseTypes) {
              releaseTypes.add(dependencyReleaseType);
            }
          }
        }
      }
      completedReleaseTypesMap.set(name, releaseTypes);
    }
  }
  return completedReleaseTypesMap;
};
