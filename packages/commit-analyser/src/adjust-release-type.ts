import type { Context, ReleaseType } from "@release-change/shared";

import path from "node:path";

import { getPackageDependencies } from "@release-change/get-packages";

/**
 * Adjusts the release type based on the internal dependencies.
 *
 * The root package is considered to have all other internal packages as dependencies.
 *
 * For each package, the existing release types are kept.
 *
 * The release types of a package are propagated to all the packages depending on it, directly or transitively (e.g.: `a -> b -> c`, a release of `a` also impacts `c`).
 *
 * The members of a dependency cycle receive the union of the cycle types (e.g.: `a -> b` and `b -> a`).
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
  const internalPackageNames = new Set(packages.map(packageItem => packageItem.name));
  const internalDependencies = new Map<string, string[]>();
  for (const packageItem of packages) {
    const { name, pathname } = packageItem;
    const dependencies = name
      ? getPackageDependencies(path.join(cwd, pathname, "package.json"))
      : packages.map(packageItem => packageItem.name).filter(packageName => packageName !== name);
    if (dependencies?.length) {
      completedReleaseTypesMap.set(
        name,
        completedReleaseTypesMap.get(name) ?? new Set<ReleaseType>()
      );
      const packageInternalDependencies = dependencies.filter(
        dependency => dependency !== name && internalPackageNames.has(dependency)
      );
      if (packageInternalDependencies.length) {
        internalDependencies.set(name, packageInternalDependencies);
      }
    }
  }
  if (!internalDependencies.size) return completedReleaseTypesMap;
  let hasChanged = true;
  while (hasChanged) {
    hasChanged = false;
    for (const [name, dependencies] of internalDependencies) {
      const releaseTypes = completedReleaseTypesMap.get(name) ?? new Set<ReleaseType>();
      const releaseTypesCount = releaseTypes.size;
      for (const dependency of dependencies) {
        const dependencyReleaseTypes = completedReleaseTypesMap.get(dependency);
        if (dependencyReleaseTypes) {
          for (const dependencyReleaseType of dependencyReleaseTypes) {
            releaseTypes.add(dependencyReleaseType);
          }
        }
      }
      if (releaseTypes.size > releaseTypesCount) {
        completedReleaseTypesMap.set(name, releaseTypes);
        hasChanged = true;
      }
    }
  }
  return completedReleaseTypesMap;
};
