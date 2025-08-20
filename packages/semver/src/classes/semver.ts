import type {
  SemverData,
  SemverIdentifierBase,
  SemverOptionsLoose,
  SemverPrerelease,
  SemverPrereleaseIdentifiers,
  SemverReleaseType,
  SemverVersionComponents
} from "../semver.types.js";

import {
  PRERELEASE_PATTERN,
  VALID_SEMVER_PATTERN,
  VALID_SEMVER_PATTERN_LOOSE
} from "../constants.js";

/**
 * `Semver` object.
 */
export class Semver {
  raw = "";
  version = "";
  major = 0;
  minor = 0;
  patch = 0;
  prerelease: SemverPrerelease = [];
  build: ReadonlyArray<string> = [];

  /**
   * Creates a new `Semver` instance.
   * @param version - The version string.
   * @param [options] - The options to use (`loose`: whether to use loose mode or not).
   */
  constructor(version: string | null | undefined, options?: SemverOptionsLoose) {
    if (!version) throw new Error("Invalid version: the version must be a non-empty string.");
    const match = version
      .trim()
      .match(options?.loose ? VALID_SEMVER_PATTERN_LOOSE : VALID_SEMVER_PATTERN);
    if (!match || !match.groups) throw new Error(`Invalid version \`${version}\`.`);
    const { versionCore, major, minor, patch, prerelease, build } = match.groups;
    if (!versionCore) throw new Error("Invalid version core.");
    this.raw = version;
    this.version = versionCore + (prerelease ? `-${prerelease}` : "") + (build ? `+${build}` : "");
    this.major = Number(major);
    this.major = Number(major);
    this.minor = Number(minor);
    this.patch = Number(patch);
    if (prerelease) this.prerelease = this.splitPrereleaseComponents(prerelease);
    if (build) this.build = build.split(".");
    if (this.major > Number.MAX_SAFE_INTEGER || Number.isNaN(major)) {
      throw new Error("Invalid major version.");
    }
    if (this.minor > Number.MAX_SAFE_INTEGER || Number.isNaN(minor)) {
      throw new Error("Invalid minor version.");
    }
    if (this.patch > Number.MAX_SAFE_INTEGER || Number.isNaN(patch)) {
      throw new Error("Invalid patch version.");
    }
  }

  /**
   * Splits the prerelease components.
   *
   * The number components are converted to numbers if they are less than or equal to `Number.MAX_SAFE_INTEGER`.
   * @param prerelease - The prerelease string.
   * @return An array of dot-separated prerelease components.
   */
  splitPrereleaseComponents(prerelease: string): SemverPrerelease {
    return prerelease.split(".").map(id => {
      if (id.match(/^[0-9]+$/)) {
        const number = Number(id);
        if (number <= Number.MAX_SAFE_INTEGER) return number;
      }
      return id;
    });
  }

  /**
   * Formats the `raw` and `version` properties.
   * @param versionComponents - The version components to use.
   */
  format(versionComponents: SemverVersionComponents): void {
    const { major, minor, patch, prerelease, build } = versionComponents;
    const prereleaseComponents = prerelease.length ? `-${prerelease.join(".")}` : "";
    const buildComponents = build.length ? `+${build.join(".")}` : "";
    this.raw = `${major}.${minor}.${patch}${prereleaseComponents}${buildComponents}`;
    this.version = `${major}.${minor}.${patch}${prereleaseComponents}`;
  }

  /**
   * Converts this `Semver` instance to a plain data object.
   * @return A plain object containing only the data properties.
   */
  toData(): SemverData {
    return this;
  }

  /**
   * Prepares the prerelease components for a version bump.
   * @param prefix - The prefix to use.
   * @param identifierBase - The identifier to use and base on.
   */
  preparePrerelease(
    prefix: string | undefined,
    identifierBase: SemverIdentifierBase | undefined
  ): void {
    const hasPrereleaseNumber = identifierBase !== false;
    const prereleaseNumberBase = hasPrereleaseNumber ? (Number(identifierBase) ? 1 : 0) : null;
    const prereleaseComponents: (string | number)[] = [];
    if (this.prerelease.length) {
      prereleaseComponents.push(...this.prerelease);
      for (let i = prereleaseComponents.length - 1; i >= 0; i--) {
        const component = prereleaseComponents[i];
        if (typeof component === "number") {
          prereleaseComponents[i] = component + 1;
          break;
        }
      }
      if (
        !prereleaseComponents.some(component => typeof component === "number") &&
        typeof prereleaseNumberBase === "number"
      ) {
        prereleaseComponents.push(prereleaseNumberBase);
      }
    } else if (typeof prereleaseNumberBase === "number") {
      prereleaseComponents.push(prereleaseNumberBase);
    }
    if (prefix) {
      const newPrereleaseComponents: (string | number)[] =
        typeof prereleaseNumberBase === "number"
          ? [...this.splitPrereleaseComponents(prefix), prereleaseNumberBase]
          : [...this.splitPrereleaseComponents(prefix)];
      const [first, second] = this.prerelease;
      if (prefix === String(first) && typeof second === "number") {
        this.prerelease = prereleaseComponents;
      } else this.prerelease = newPrereleaseComponents;
    } else this.prerelease = prereleaseComponents;
  }

  /**
   * Increases the version.
   *
   * The increment follows the following rules:
   * - if the release type is `major`: if this is a pre-major version, it bumps up to the same major version, increments major otherwise;
   * - if the release type is `minor`: if this is a pre-minor version, it bumps up to the same minor version, increments minor otherwise;
   * - if the release type is `patch`: if this is a pre-patch version, it bumps up to the same patch version, increments patch otherwise;
   * - if the release type is `release`: it bumps up to the same version core (major, minor and patch) and removes all pre-release components;
   * - if the release type is `premajor`, `preminor` or `prepatch`, it bumps the version up to the next major, minor or patch release and immediately down to pre-release.
   * - otherwise: if this is not a pre-release version, it does the same as a pre-patch, increments the pre-release number otherwise.
   * @example
   * Major releases:
   * `1.0.0-5` bumps to `1.0.0`,
   * `1.1.0` bumps to `2.0.0`.
   * Minor releases:
   * `1.2.0-5` bumps to `1.2.0`,
   * `1.2.1` bumps to `1.3.0`.
   * Patch releases:
   * `1.2.0-5` bumps to `1.2.0`,
   * `1.2.0` bumps to `1.2.1`.
   * @param releaseType - The release type to use for the increment.
   * @param prereleaseIdentifiers - When using pre-releases, an object containing the prefix and the identifier to use, the identifier being the increment base.
   * @return A plain object containing only the data properties matching the new version.
   */
  increase(
    releaseType: SemverReleaseType,
    prereleaseIdentifiers?: SemverPrereleaseIdentifiers
  ): SemverData | null {
    const { prefix, identifierBase } = prereleaseIdentifiers ?? {};
    if (releaseType.startsWith("pre")) {
      if (!prefix && identifierBase === false) {
        throw new Error("Invalid increment argument: the prefix is empty.");
      }
      if (prefix) {
        const match = `-${prefix}`.match(PRERELEASE_PATTERN);
        if (!match || !match.groups || match.groups.prerelease !== prefix) {
          throw new Error(`Invalid increment argument: the prefix \`${prefix}\` is invalid.`);
        }
      }
    }
    switch (releaseType) {
      case "major":
        if (this.minor || this.patch || !this.prerelease.length) this.major++;
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;
      case "minor":
        if (this.patch || !this.prerelease.length) this.minor++;
        this.patch = 0;
        this.prerelease = [];
        break;
      case "patch":
        if (!this.prerelease.length) this.patch++;
        this.prerelease = [];
        break;
      case "release":
        if (!this.prerelease.length) {
          throw new Error("There are no prerelease components to remove.");
        }
        this.prerelease = [];
        break;
      case "premajor":
        this.major++;
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        this.preparePrerelease(prefix, identifierBase);
        break;
      case "preminor":
        this.minor++;
        this.patch = 0;
        this.prerelease = [];
        this.preparePrerelease(prefix, identifierBase);
        break;
      case "prepatch":
        this.patch++;
        this.prerelease = [];
        this.preparePrerelease(prefix, identifierBase);
        break;
      case "prerelease":
        if (prefix && this.prerelease.join(".") === prefix && identifierBase === false) {
          throw new Error(`Invalid increment argument: the prefix \`${prefix}\` already exists.`);
        }
        if (!this.prerelease.length) this.patch++;
        this.preparePrerelease(prefix, identifierBase);
        break;
      default:
        throw new Error(`Invalid release type \`${releaseType}\`.`);
    }
    this.format({
      major: this.major,
      minor: this.minor,
      patch: this.patch,
      prerelease: this.prerelease,
      build: this.build
    });
    return this.toData();
  }
}

/**
 * This class is set for compatibility with npm’s semver.
 */
export const SemVer = Semver;
