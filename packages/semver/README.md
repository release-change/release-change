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
import semver from "@release-change/semver";

semver.valid("1.2.3"); // "1.2.3"
semver.valid("a.b.c"); // null
semver.satisfies("1.2.3", "1.x || >=2.5.0 || 5.0.0 - 7.2.3") // true
semver.gt("1.2.3", "9.8.7") // false
semver.lt("1.2.3", "9.8.7") // true
semver.valid(semver.coerce("v2")) // "2.0.0"
semver.valid(semver.coerce("42.6.7.9.3-alpha")) // "42.6.7"
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
- `=`: equal (if no operator is specified, equalities is assumed, so this operator is optional).

For example, the comparator `>=1.2.7` would match the versions `1.2.7`, `1.2.8`, `2.5.3` and `1.3.9`, but not the versions `1.2.6` or `1.1.0`. The comparator `>1` is equivalent to `>=2.0.0` and would match the versions `2.0.0` and `3.1.0`, but not the versions `1.0.1` or `1.1.0`.

Whitespace can join comparators to form a *comparator set*, which is satisfied by the **intersection** of all the comparators it includes.

A range is composed of one or more comparator sets, joined by `||`. A version matches a range if and only if every comparator in at least one of the `||`-separated comparator sets is satisfied by the version.

For example, the range `>=1.2.7 <1.3.0` would match the versions `1.2.7`, `1.2.8` and `1.2.99`, but not the versions `1.2.6`, `1.3.0` or `1.1.0`.

The range `1.2.7 || >=1.2.9 <2.0.0` would match the versions `1.2.7`, `1.2.9` and `1.4.6`, but not the versions `1.2.8` or `2.0.0`.

#### Prerelease tags

If a version has a prerelease tag (for example, `1.2.3-alpha.3`), then it will only be allowed to satisfy comparator sets if at least one comparator with the same `[major, minor, patch]` tuple also has a prerelease tag.

For example, the range `>1.2.3-alpha.3` would be allowed to match the version `1.2.3-alpha.7`, but it would *not* be satisfied by `3.4.5-alpha.9`, even though `3.4.5-alpha.9` is technically “greater than” `1.2.3-alpha.3` according to the Semantic Versioning sort rules. The version range only accepts prerelease tags on the `1.2.3` version. Version `3.4.5` *would* satisfy the range because it does not have a prerelease flag and `3.4.5` is greater than `1.2.3-alpha.7`.

The purpose of this behaviour is twofold.

First, prerelease versions frequently are updated very quickly and contain many breaking changes that are (by the author’s design) not fit for public consumption yet. Therefore, by default, they are excluded from range-matching semantics.

Second, a user who has opted into using a prerelease version has indicated the intent to use *that specific* set of `alpha`/`beta`/`rc` versions. By including a prerelease tag in the range, the user is indicating being aware of the risk. However, it is still not appropriate to assume that they have opted into taking a similar risk on the *next* set of prerelease versions.

<!--Note that this behaviour can be suppressed (treating all prerelease versions as if they were normal versions, for range-matching) by setting the `includePrerelease` flag on the options object to any [functions](https://github.com/npm/node-semver#functions) that do range matching.-->

##### Prerelease identifiers

The method `.inc` takes an additional `identifier` string argument which will append the value of the string as a prerelease identifier:

```js
semver.inc("1.2.3", "prerelease", "beta")
// "1.2.4-beta.0"
```

##### Prerelease identifier base

The method `.inc` takes an optional parameter “identifierBase” string which will let you let your prerelease number as zero-based or one-based. Set to `false` to omit the prerelease number altogether. If you do not specify this parameter, it will default to zero-based.

```js
semver.inc("1.2.3", "prerelease", "beta", "1")
// "1.2.4-beta.1"
```

```js
semver.inc("1.2.3", "prerelease", "beta", false)
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
- `*` (is equivalent to `>=0.0.0`: any non-prerelease version satisfies<!--, unless `includePrerelease` is specified, in which case any version at all satisfies-->),
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
- `~1.2.3-beta.2` (is equivalent to `>=1.2.3-beta.2 <1.3.0-0`: note that prereleases in the `1.2.3` version will be allowed if they are greater than or equal to `beta.2`; so, `1.2.3-beta.4` would be allowed, but `1.2.4-beta.2` would not because it is a prerelease of a different `[major, minor, patch]` tuple).

##### Caret ranges (`^1.2.3`, `^0.2.5` and `^0.0.4`)

Allows changes which do not modify the left-most non-zero element in the `[major, minor, patch]` tuple. In other words, this allows patch and minor updates for versions `1.0.0` and above, patch updates for versions `0.X >=0.1.0` and *no* updates for versions `0.0.X`.

Examples:
- `^1.2.3` (is equivalent to `>=1.2.3 <2.0.0-0`),
- `^0.2.3` (is equivalent to `>=0.2.3 <0.3.0-0`),
- `^0.0.3` (is equivalent to `>=0.0.3 <0.0.4-0`),
- `^1.2.3-beta.2` (is equivalent to `>=1.2.3-beta.2 <2.0.0-0`: note that prereleases in the `1.2.3` version will be allowed if they are greater than or equal to `beta.2`; so, `1.2.3-beta.4` would be allowed, but `1.2.4-beta.2` would not because it is a prerelease of a different `[major, minor, patch]` tuple),
- `^0.0.3-beta` (is equivalent to `>=0.0.3-beta <0.0.4-0`: note that prereleases in the `0.0.3` version *only* will be allowed if they are greater than or equal to `beta`; so, `0.0.3-pr.2` would be allowed).

When parsing caret ranges, a missing `patch` value desugars to the number `0`, but will allow flexibility within that value, even though the major and minor versions are both `0`:
- `^1.2.x` (is equivalent to `>=1.2.0 <2.0.0-0`),
- `^0.0.x` (is equivalent to `>=0.0.0 <0.1.0-0`),
- `^0.0` (is equivalent to `>=0.0.0 <0.1.0-0`).

A missing `minor` and `patch` values will desugar to zero, but also allow flexibility within those values, even though the major version is zero:
- `^1.x` (is equivalent to `>=1.0.0 <2.0.0-0`),
- `^0.x` (is equivalent to `>=0.0.0 <1.0.0-0`).

#### Range grammar

Putting all this together, here is a Backus-Naur grammar for ranges, for the benefit of parser authors:

```bnf
range-set  ::= range ( logical-or range ) *
logical-or ::= ( ' ' ) * '||' ( ' ' ) *
range      ::= hyphen | simple ( ' ' simple ) * | ''
hyphen     ::= partial ' - ' partial
simple     ::= primitive | partial | tilde | caret
primitive  ::= ( '<' | '>' | '>=' | '<=' | '=' ) partial
partial    ::= xr ( '.' xr ( '.' xr qualifier ? )? )?
xr         ::= 'x' | 'X' | '*' | nr
nr         ::= '0' | ['1'-'9'] ( ['0'-'9'] ) *
tilde      ::= '~' partial
caret      ::= '^' partial
qualifier  ::= ( '-' pre )? ( '+' build )?
pre        ::= parts
build      ::= parts
parts      ::= part ( '.' part ) *
part       ::= nr | [-0-9A-Za-z]+
```

## Get help

- [Stack Overflow](https://stackoverflow.com/questions/tagged/release-change-semver)

## Copyright & licence

© 2025 Victor Brito — Released under the [MIT licence](./LICENSE).
