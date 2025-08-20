import type { SemverData, SemverOptions } from "./semver.types.js";

import { Semver } from "./classes/semver.js";
import { parse } from "./parse.js";

import {
  COERCE,
  COERCE_INCLUDING_PRERELEASE,
  COERCE_INCLUDING_PRERELEASE_RTL,
  COERCE_RTL
} from "./constants.js";

/**
 * Coerces a version string or number to a `Semver` instance.
 *
 * The version string or number may be not compatible with semantic versioning. In this case, the function tries to translate it into a string which is compliant with semantic versioning.
 *
 * The coercion follows the following rules:
 * - it looks for the first digit in a string and consumes all remaining characters which at least satisfy a partial semantic versioning (e.g.: `1`, `1.2`, `1.2.3`);
 * - longer versions are simply truncated: `4.6.3.9.2-alpha2` becomes `4.6.3`;
 * - all surrounding text is simply ignored: `v3.4 replaces v3.3.1` becomes `3.4.0`;
 * - only text which lacks digits fails coercion: `version one` is not valid;
 * - components greater than `Number.MAX_SAFE_INTEGER` (2 ** 53 - 1) are ignored: `10000000000000000.4.7.4` becomes `4.7.4`.
 *
 * If `options.rtl` is set to `true`, then it finds the right-most coercible string which does not share a terminus with a more left-ward coercible string:
 * - `1.2.3.4` becomes `2.3.4`, not `4.0.0`;
 * - `1.2.3/4` becomes `4.0.0` because the `4` is not a part of any other overlapping tuple.
 *
 * If `options.includePrerelease` is set to `true`, then the result contains prerelease and build parts of a version: `1.2.3.4-rc.1+rev.2` preserves prerelease `rc.1` and build `rev.2` in the result.
 * @param version - The version string or number to coerce.
 * @param [options] - The options to use (`includePrerelease`: whether to include prerelease-like and build-like strings or not, `rtl`: whether to find the right-most coercible string or not).
 * @return As is if the version is already a `Semver` instance, an instance of `Semver` if the version string or number is valid, `null` otherwise.
 */
export const coerce = (
  version: string | number | Semver,
  options?: Omit<SemverOptions, "loose">
): SemverData | null => {
  if (version instanceof Semver) return version.toData();
  if (typeof version === "number") {
    return parse(`${version.toString()}${".0".repeat(Number.isInteger(version) ? 2 : 1)}`);
  }
  const { rtl, includePrerelease } = options ?? {};
  const match = rtl
    ? [...version.matchAll(includePrerelease ? COERCE_INCLUDING_PRERELEASE_RTL : COERCE_RTL)].pop()
    : version.match(includePrerelease ? COERCE_INCLUDING_PRERELEASE : COERCE);
  if (!match || !match.groups) return null;
  const { firstIdentifier, restIdentifiers, prerelease, build } = match.groups;
  const identifiersGroups = `${firstIdentifier ?? ""}${restIdentifiers ?? ""}`
    .split(".")
    .map(Number)
    .map(number => (number > Number.MAX_SAFE_INTEGER ? null : number))
    .reduce<number[][]>((acc, current) => {
      if (current === null) {
        acc.push([]);
      } else {
        let lastGroup = acc.at(-1);
        if (!lastGroup) {
          lastGroup = [];
          acc.push(lastGroup);
        }
        lastGroup.push(current);
      }
      return acc;
    }, [])
    .filter(group => group.length);
  if (identifiersGroups.length) {
    const identifiers = rtl ? identifiersGroups.at(-1) : identifiersGroups.at(0);
    if (identifiers) {
      const versionCoreIdentifiers = rtl ? identifiers.slice(-3) : identifiers;
      const [major, minor, patch] = versionCoreIdentifiers;
      const versionPrerelease = prerelease ? `-${prerelease}` : "";
      const versionBuild = build ? `+${build}` : "";
      return parse(`${major ?? 0}.${minor ?? 0}.${patch ?? 0}${versionPrerelease}${versionBuild}`);
    }
    return null;
  }
  return null;
};
