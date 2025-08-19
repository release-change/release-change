import type { Semver } from "./classes/semver.js";
import type {
  SemverIdentifierBase,
  SemverOptionsLoose,
  SemverPrereleaseIdentifiers,
  SemverReleaseType
} from "./semver.types.js";

import { increase } from "./increase.js";

/**
 * @alias increase
 */
export const inc = (
  version: string | Semver,
  releaseType: SemverReleaseType,
  legacyOptions?: string | SemverOptionsLoose,
  legacyIdentifier?: string | SemverIdentifierBase,
  legacyIdentifierBase?: SemverIdentifierBase
) => {
  const prefix =
    typeof legacyOptions === "string" ? legacyOptions : (legacyIdentifier as string | undefined);
  const identifierBase =
    typeof legacyOptions === "string"
      ? (legacyIdentifier as SemverIdentifierBase | undefined)
      : legacyIdentifierBase;
  const options = typeof legacyOptions === "string" ? undefined : legacyOptions;
  const prereleaseIdentifiers: SemverPrereleaseIdentifiers = { prefix, identifierBase };
  return increase(version, releaseType, prereleaseIdentifiers, options);
};
