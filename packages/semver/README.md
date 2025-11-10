# @release-change/semver

The semantic versioning parser used by release-change

![License: MIT](https://img.shields.io/github/license/release-change/release-change)
[![ESM-only package](https://img.shields.io/badge/package-ESM--only-ffe536)](https://nodejs.org/api/esm.html)
[![Conventional Commits 1.0.0](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![Formatted with Biome](https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev/)
![NPM latest version](https://img.shields.io/npm/v/%40release-change%2Fsemver/latest)
![Node support](https://img.shields.io/node/v/%40release-change%2Fsemver)
![Build status](https://img.shields.io/github/actions/workflow/status/release-change/release-change/run-tests.yml)

## Installation

Install package for Node.js:
```
pnpm add --save-dev @release-change/semver
```
You can also install it using `npm`:
```
npm install --save-dev @release-change/semver
```

## Usage

```js
import { coerce, gt, lt, satisfies, validate } from "@release-change/semver";

validate("1.2.3"); // "1.2.3"
validate("a.b.c"); // null
satisfies("1.2.3", "1.x || >=2.5.0 || 5.0.0 - 7.2.3"); // true
gt("1.2.3", "9.8.7"); // false
lt("1.2.3", "9.8.7"); // true
validate(coerce("version2")); // "2.0.0"
validate(coerce("42.6.7.9.3-alpha")); // "42.6.7"
```

## Documentation

### Versions

A version is described by the [Semantic Versioning 2.0.0 specification](https://semver.org/).

### Ranges

A *version range* is a set of *comparators* which specify versions satisfying the range.

A *comparator* is composed of an *operator* and a *version*. The set of primitive *operators* is:
- `<`: less than,
- `<=`: less than or equal to,
- `>`: greater than,
- `>=`: greater than or equal to,
- `=`: equal (if no operator is specified, equality is assumed, so this operator is optional).

For example, the comparator `>=1.2.7` would match the versions `1.2.7`, `1.2.8`, `2.5.3` and `1.3.9`, but not the versions `1.2.6` or `1.1.0`. The comparator `>1` is equivalent to `>=2.0.0` and would match the versions `2.0.0` and `3.1.0`, but not the versions `1.0.1` or `1.1.0`.

Whitespace can join comparators to form a *comparator set*, which is satisfied by the **intersection*- of all the comparators it includes.

A range is composed of one or more comparator sets, joined by `||` (logical or). A version matches a range if and only if the version satisfies every comparator in at least one of the logical-or-separated comparator sets.

For example, the range `>=1.2.7 <1.3.0` would match the versions `1.2.7`, `1.2.8` and `1.2.99`, but not the versions `1.2.6`, `1.3.0` or `1.1.0`.

The range `1.2.7 || >=1.2.9 <2.0.0` would match the versions `1.2.7`, `1.2.9` and `1.4.6`, but not the versions `1.2.8` or `2.0.0`.

#### Pre-release tags

If a version has a pre-release tag (for example, `1.2.3-alpha.3`), then it will only be allowed to satisfy comparator sets if at least one comparator with the same `[major, minor, patch]` tuple also has a pre-release tag.

For example, the range `>1.2.3-alpha.3` would be allowed to match the version `1.2.3-alpha.7`, but it would *not* be satisfied by `3.4.5-alpha.9`, even though `3.4.5-alpha.9` is technically “greater than” `1.2.3-alpha.3` according to the Semantic Versioning sort rules. The version range only accepts pre-release tags on the `1.2.3` version. Version `3.4.5` *would* satisfy the range because it does not have a pre-release flag and `3.4.5` is greater than `1.2.3-alpha.7`.

The purpose of this behaviour is twofold.

First, pre-release versions frequently are updated very quickly and contain many breaking changes that are (by the author’s design) not fit for public consumption yet. Therefore, by default, they are excluded from range-matching semantics.

Second, a user who has opted into using a pre-release version has indicated the intent to use *that specific* set of `alpha`/`beta`/`rc` versions. By including a pre-release tag in the range, the user is indicating being aware of the risk. However, it is still not appropriate to assume that they have opted into taking a similar risk on the *next* set of pre-release versions.

Note that this behaviour can be suppressed (treating all pre-release versions as though they were normal versions, for range matching) by setting the `includePrerelease` flag on the `options` object to any [functions](#functions) doing range matching.

##### Pre-release identifiers

The function `increase` takes a `prereleaseIdentifiers` parameter, which takes an optional property `prefix`, which will append the value of the string as a pre-release identifier:

```js
increase("1.2.3", "prerelease", { prefix: "beta" });
// "1.2.4-beta.0"
```

##### Pre-release identifier base

The function `increase` takes a `prereleaseIdentifiers` parameter, which takes an optional property `identifierBase`, which will let you let your pre-release number as zero-based or one-based. Set to `false` to omit the pre-release number altogether. If you do not specify this parameter, it will default to zero-based.

```js
increase("1.2.3", "prerelease", { prefix: "beta", identifierBase: "1" });
// "1.2.4-beta.1"
```

```js
increase("1.2.3", "prerelease", { prefix: "beta", identifierBase: false });
// "1.2.4-beta"
```

#### Advanced range syntax

Advanced range syntax desugars to primitive comparators in deterministic ways.

Advanced ranges may be combined in the same way as primitive comparators, using white space or `||`.

##### Hyphen ranges (`X.Y.Z - A.B.C`)

Specifies an inclusive set. Example: `1.2.3 - 2.3.4` (is equivalent to `>=1.2.3 <=2.3.4`).

If a partial version is provided as the first version in the inclusive range, then the missing pieces are replaced with zeroes: `1.2 - 2.3.4` is equivalent to `>=1.2.0 <=2.3.4`.

If a partial version is provided as the second version in the inclusive range, then all versions that start with the supplied parts of the tuple are accepted, but nothing that would be greater than the provided tuple parts:
- `1.2.3 - 2.3` is equivalent to `>=1.2.3 <2.4.0-0`,
- `1.2.3 - 2` is equivalent to `>=1.2.3 <3.0.0-0`.

##### X-ranges (`1.2.x`, `1.X`, `1.2.*` and `*`)

Any of `X`, `x` or `*` may be used to “stand in” for one of the numeric values in the `[major, minor, patch]` tuple:
- `*` (is equivalent to `>=0.0.0`: any non-pre-release version satisfies, unless `includePrerelease` is specified, in which case any version at all satisfies),
- `1.x` (is equivalent to `>=1.0.0 <2.0.0-0`: matching a major version),
- `1.2.x` (is equivalent to `>=1.2.0 <1.3.0-0`: matching major and minor versions).

A partial version range is treated as an X-range, so the special character is actually optional:
- `""` (empty string, which is equivalent to `*`, which is equivalent to `>=0.0.0`),
- `1` (is equivalent to `1.x.x`, which is equivalent to `>=1.0.0 <2.0.0-0`),
- `1.2` (is equivalent to `1.2.x`, which is equivalent to `>=1.2.0 <1.3.0-0`).

##### Tilde ranges (`~1.2.3`, `~1.2` and `~1`)

Allows patch-level changes if a minor version is specified on the comparator, minor-level changes otherwise.

Examples:
- `~1.2.3` (is equivalent to `>=1.2.3 <1.(2+1).0`, which is equivalent to `>=1.2.3 <1.3.0-0`),
- `~1.2` (is equivalent to `>=1.2.0 <1.(2+1).0`, which is equivalent to `>=1.2.0 <1.3.0-0`, which is the same as `1.2.x`),
- `~1` (is equivalent to `>=1.0.0 <(1+1).0.0`, which is equivalent to `>=1.0.0 <2.0.0-0`, which is the same as `1.x`),
- `~0.2.3` (is equivalent to `>=0.2.3 <0.(2+1).0`, which is equivalent to `>=0.2.3 <0.3.0-0`),
- `~0.2` (is equivalent to `>=0.2.0 <0.(2+1).0`, which is equivalent to `>=0.2.0 <0.3.0-0`, which is the same as `0.2.x`),
- `~0` (is equivalent to `>=0.0.0 <(0+1).0.0`, which is equivalent to `>=0.0.0 <1.0.0-0`, which is the same as `0.x`),
- `~1.2.3-beta.2` (is equivalent to `>=1.2.3-beta.2 <1.3.0-0`: note that pre-releases in the `1.2.3` version will be allowed if they are greater than or equal to `beta.2`; so, `1.2.3-beta.4` would be allowed, but `1.2.4-beta.2` would not because it is a pre-release of a different `[major, minor, patch]` tuple).

##### Caret ranges (`^1.2.3`, `^0.2.5` and `^0.0.4`)

Allows changes which do not modify the left-most non-zero element in the `[major, minor, patch]` tuple. In other words, this allows patch and minor updates for versions `1.0.0` and above, patch updates for versions `0.X >=0.1.0` and *no- updates for versions `0.0.X`.

Examples:
- `^1.2.3` (is equivalent to `>=1.2.3 <2.0.0-0`),
- `^0.2.3` (is equivalent to `>=0.2.3 <0.3.0-0`),
- `^0.0.3` (is equivalent to `>=0.0.3 <0.0.4-0`),
- `^1.2.3-beta.2` (is equivalent to `>=1.2.3-beta.2 <2.0.0-0`: note that pre-releases in the `1.2.3` version will be allowed if they are greater than or equal to `beta.2`; so, `1.2.3-beta.4` would be allowed, but `1.2.4-beta.2` would not because it is a pre-release of a different `[major, minor, patch]` tuple),
- `^0.0.3-beta` (is equivalent to `>=0.0.3-beta <0.0.4-0`: note that pre-releases in the `0.0.3` version *only* will be allowed if they are greater than or equal to `beta`; so, `0.0.3-pr.2` would be allowed).

When parsing caret ranges, a missing `patch` value desugars to the number `0`, but will allow flexibility within that value, even though the major and minor versions are both `0`:
- `^1.2.x` (is equivalent to `>=1.2.0 <2.0.0-0`),
- `^0.0.x` (is equivalent to `>=0.0.0 <0.1.0-0`),
- `^0.0` (is equivalent to `>=0.0.0 <0.1.0-0`).

A missing `minor` and `patch` values will desugar to zero, but also allow flexibility within those values, even though the major version is zero:
- `^1.x` (is equivalent to `>=1.0.0 <2.0.0-0`),
- `^0.x` (is equivalent to `>=0.0.0 <1.0.0-0`).

### Functions

All functions take a final `options` object argument. All options in this object are `false` by default. The options supported are:
- `loose`: be more forgiving about not-quite-valid semantic versioning strings (any resulting output will always be 100% strictly compliant, of course);
- `includePrerelease`: set to suppress the [default behaviour](#pre-release-tags) of excluding pre-release tagged versions from ranges (unless they are explicitly opted into).

Strict-mode comparators and ranges will be strict about the semantic versioning strings they parse.

#### Basic functions

- `validate(version)`: returns the parsed version, or null if it is not valid;
- `increase(version, releaseType, prereleaseIdentifiers)`: returns the version increased by the release type (`major`, `premajor`, `minor`, `preminor`, `patch`, `prepatch`, `prerelease` or `release`) or `null` if it is not valid:
  - `premajor` in one call will bump the version up to the next major version and down to a pre-release of that major version (`preminor`, and `prepatch` work the same way);
  - if called from a non-pre-release version, `prerelease` will work the same as `prepatch`, increasing the patch version and then making a pre-release (if the input version is already a pre-release, it simply increments it);
  - `release` will remove any pre-release part of the version;
  - `identifier` can be used to prefix `premajor`, `preminor`, `prepatch` or `prerelease` version increments (`identifierBase` is the base to be used for the `prerelease` identifier).
- `getPrerelease(version)`: returns an array of pre-release components, or `null` if none exist (for example: `prerelease('1.2.3-alpha.1')` returns `['alpha', 1]`);
- `getMajor(version)`: returns the major version number;
- `getMinor(version)`: returns the minor version number;
- `getPatch(version)`: returns the patch version number;
- `parse(version)`: attempts to parse a string as a semantic version, returning either a `Semver` object or `null`.

#### Sorting

- `sort(versions)`: returns an array of versions sorted in ascending order, considering the builds;
- `reverseSort(versions)`: returns an array of versions sorted in descending order, considering the builds.

#### Comparisons

- `gt(version1, version2)`: `version1 > version2`;
- `gte(version1, version2)`: `version1 >= version2`;
- `lt(version1, version2)`: `version1 < version2`;
- `lte(version1, version2)`: `version1 <= version2`;
- `eq(version1, version2)`: `version1 == version2` (this is true if they are logically equivalent, even though they are not completely the same string);
- `neq(version1, version2)`: `version1 != version2` (the opposite of `eq`);
- `compareWithOperator(version1, operator, version2)`: passes in a comparison string and calls the corresponding function above (`"==="` and `"!=="` do simple string comparison), throwing if an invalid comparison string is provided;
- `compare(version1, version2)`: returns `0` if `version1 == version2`, `1` if `version1` is greater or `-1` if `version2` is greater;
- `reverseCompare(version1, version2)`: returns `0` if `version1 == version2`, `1` if `version2` is greater or `-1` if `version1` is greater (the reverse of `compare`);
- `compareBuild(version1, version2)` (the same as `compare`, but considers the builds when two versions are equal);
- `compareLoose(version1, version2)` (short for `compare(version1, version2, { loose: true })`);
- `getDifference(version1, version2)`: returns the difference between two versions by the release type (`major`, `minor`, `patch`, `premajor`, `preminor`, `prepatch` or `prerelease`) or `null` if both versions are the same.

#### Ranges

- `validateRange(range)`: returns the range if it is valid, `null` otherwise;
- `satisfies(version, range)`: returns `true` if the version satisfies the range, `false` otherwise.

Note that, since ranges may be non-contiguous, a version might not be greater than a range, less than a range *or* satisfy a range. For example, the range `1.2 <1.2.9 || >2.0.0` would have a hole from `1.2.9` until `2.0.0`, so version `1.2.10` would not be greater than the range (because `2.0.1` satisfies, which is higher) nor less than the range (since `1.2.8` satisfies, which is lower) and it also does not satisfy the range.

If you want to know whether a version satisfies a range or not, use the `satisfies` function.

#### Coercion

- `coerce(version, options)`: coerces a string to a semantic version if possible.

This aims to provide a very forgiving translation of a non-semver string to semantic versioning. It looks for the first digit in a string and consumes all remaining characters which satisfy at least a partial semver (e.g.: `1`, `1.2`, `1.2.3`). Longer versions are simply truncated (`4.6.3.9.2-alpha2` becomes `4.6.3`). All surrounding text is simply ignored (`v3.4 replaces v3.3.1` becomes `3.4.0`). Only text which lacks digits will fail coercion (`version one` is not valid). The maximum value for any semantic versioning component considered for coercion is `Number.MAX_SAFE_INTEGER` (or `2 ** 53 - 1`), components with higher values will be ignored (`10000000000000000.4.7.4` becomes `4.7.4`).

If the `options.rtl` flag is set, then `coerce` will return the right-most coercible tuple not sharing an ending index with a longer coercible tuple: for example, `1.2.3.4` will return `2.3.4` in `rtl` mode, not `4.0.0`, `1.2.3/4` will return `4.0.0` because the `4` is not a part of any other overlapping semantic versioning tuple.

If the `options.includePrerelease` flag is set, then the `coerce` result will contain pre-release and build parts of a version: for example, `1.2.3.4-rc.1+rev.2` will preserve pre-release `rc.1` and build `rev.2` in the result.

#### Cleaning

- `clean(version)`: cleans a string to be a valid semantic version, if possible.

This will return a cleaned and trimmed semantic version. If the provided version is not valid, `null` will be returned. This does not work for ranges.

Examples:
- `clean(" = v 2.1.5foo"); // null`,
- `clean(" = v 2.1.5foo', { loose: true }); // '2.1.5-foo'`,
- `clean(" = v 2.1.5-foo"); // null`,
- `clean(" = v 2.1.5-foo", { loose: true }); // '2.1.5-foo'`,
- `clean("=v2.1.5"); // '2.1.5'`,
- `clean(" =v2.1.5"); // '2.1.5'`,
- `clean(" 2.1.5 "); // '2.1.5'`,
- `clean("~1.0.0"); // null`.

## Get help

- [Stack Overflow](https://stackoverflow.com/questions/tagged/release-change-semver)

## Copyright & licence

© 2025 Victor Brito — Released under the [MIT licence](./LICENSE).
