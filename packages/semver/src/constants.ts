/**
 * @see https://semver.org/#backusnaur-form-grammar-for-valid-semver-versions
 */
const DIGITS_PATTERN = /\d+/;
const NUMERIC_IDENTIFIER_PATTERN = /0|[1-9]\d*/;
const ALPHANUMERIC_IDENTIFIER_PATTERN = /[0-9a-zA-Z-]+/;
const BUILD_IDENTIFIER_PATTERN = new RegExp(
  `(?:${ALPHANUMERIC_IDENTIFIER_PATTERN.source}|${DIGITS_PATTERN.source})`
);
const PRERELEASE_IDENTIFIER_PATTERN = new RegExp(
  `(?:${ALPHANUMERIC_IDENTIFIER_PATTERN.source}|${NUMERIC_IDENTIFIER_PATTERN.source})`
);
const PRERELEASE_IDENTIFIER_PATTERN_LOOSE = new RegExp(
  `(?:${ALPHANUMERIC_IDENTIFIER_PATTERN.source}|${DIGITS_PATTERN.source})`
);
const BUILD_PATTERN = new RegExp(
  `(?:\\+(?<build>${BUILD_IDENTIFIER_PATTERN.source}(?:\\.${BUILD_IDENTIFIER_PATTERN.source})*))?`
);
export const PRERELEASE_PATTERN = new RegExp(
  `(?:-(?<prerelease>${PRERELEASE_IDENTIFIER_PATTERN.source}(?:\\.${PRERELEASE_IDENTIFIER_PATTERN.source})*))?`
);
export const PRERELEASE_PATTERN_LOOSE = new RegExp(
  `(?:-?(?<prerelease>${PRERELEASE_IDENTIFIER_PATTERN_LOOSE.source}(?:\\.${PRERELEASE_IDENTIFIER_PATTERN_LOOSE.source})*))?`
);
const VERSION_CORE_PATTERN = new RegExp(
  `(?<versionCore>(?<major>${NUMERIC_IDENTIFIER_PATTERN.source})\\.(?<minor>${NUMERIC_IDENTIFIER_PATTERN.source})\\.(?<patch>${NUMERIC_IDENTIFIER_PATTERN.source}))`
);
const VERSION_CORE_PATTERN_LOOSE = new RegExp(
  `(?<versionCore>(?<major>${DIGITS_PATTERN.source})\\.(?<minor>${DIGITS_PATTERN.source})\\.(?<patch>${DIGITS_PATTERN.source}))`
);
export const VALID_SEMVER_PATTERN = new RegExp(
  `^(?:${VERSION_CORE_PATTERN.source}${PRERELEASE_PATTERN.source}${BUILD_PATTERN.source})$`
);
export const VALID_SEMVER_PATTERN_LOOSE = new RegExp(
  `^\\s*[v=]?\\s*(?:${VERSION_CORE_PATTERN_LOOSE.source}${PRERELEASE_PATTERN_LOOSE.source}${BUILD_PATTERN.source})$`
);
export const COERCE = /(?<firstIdentifier>\d+)(?<restIdentifiers>(?:\.\d+)*)/;
export const COERCE_INCLUDING_PRERELEASE = new RegExp(
  `${COERCE.source}${PRERELEASE_PATTERN.source}${BUILD_PATTERN.source}`
);
export const COERCE_RTL = new RegExp(`${COERCE.source}`, "g");
export const COERCE_INCLUDING_PRERELEASE_RTL = new RegExp(
  `${COERCE_RTL.source}${PRERELEASE_PATTERN.source}${BUILD_PATTERN.source}`,
  "g"
);
export const RANGE_OPERATORS_PATTERN = /=|[<>]=?/;
export const TILDE_COMPARATOR_PATTERN = /~>?/;
export const CARET_COMPARATOR_PATTERN = /\^/;
export const STAR_COMPARATOR_PATTERN = /[<>]?=?\s*\*/;
export const SPACE_FOLLOWED_COMPARATORS_PATTERN = new RegExp(
  `(${RANGE_OPERATORS_PATTERN.source}|${TILDE_COMPARATOR_PATTERN.source}|${CARET_COMPARATOR_PATTERN.source})\\s*`,
  "g"
);
const V_IDENTIFIER_PATTERN = /\s*[v=]?\s*/;
const STAR_IDENTIFIER_PATTERN = /\*/;
const X_IDENTIFIER_PATTERN = /[xX]/;
const X_RANGE_PATTERN = new RegExp(
  `(?:${STAR_IDENTIFIER_PATTERN.source}|${X_IDENTIFIER_PATTERN.source}|${NUMERIC_IDENTIFIER_PATTERN.source})`
);
const X_RANGE_PATTERN_LOOSE = new RegExp(
  `(?:${STAR_IDENTIFIER_PATTERN.source}|${X_IDENTIFIER_PATTERN.source}|${DIGITS_PATTERN.source})`
);
export const PARTIAL_PATTERN = new RegExp(
  `(?:(?<major>${X_RANGE_PATTERN.source})(?:\\.(?<minor>${X_RANGE_PATTERN.source})(?:\\.(?<patch>${X_RANGE_PATTERN.source}))?${PRERELEASE_PATTERN.source}${BUILD_PATTERN.source})?)`
);
export const PARTIAL_PATTERN_LOOSE = new RegExp(
  `(?:(?:${V_IDENTIFIER_PATTERN.source})(?<major>${X_RANGE_PATTERN_LOOSE.source})(?:\\.(?<minor>${X_RANGE_PATTERN_LOOSE.source})(?:\\.(?<patch>${X_RANGE_PATTERN_LOOSE.source}))?${PRERELEASE_PATTERN_LOOSE.source}${BUILD_PATTERN.source})?)`
);
export const TILDE_PATTERN = new RegExp(
  `(?:${TILDE_COMPARATOR_PATTERN.source})${PARTIAL_PATTERN.source}`
);
export const TILDE_PATTERN_LOOSE = new RegExp(
  `(?:${TILDE_COMPARATOR_PATTERN.source})${PARTIAL_PATTERN_LOOSE.source}`
);
export const CARET_PATTERN = new RegExp(
  `(?:${CARET_COMPARATOR_PATTERN.source})${PARTIAL_PATTERN.source}`
);
export const CARET_PATTERN_LOOSE = new RegExp(
  `(?:${CARET_COMPARATOR_PATTERN.source})${PARTIAL_PATTERN_LOOSE.source}`
);
const COMPARATOR_SEMVER_PATTERN = new RegExp(
  `(?:${VERSION_CORE_PATTERN.source}${PRERELEASE_PATTERN.source}${BUILD_PATTERN.source})`
);
const COMPARATOR_SEMVER_PATTERN_LOOSE = new RegExp(
  `\\s*[v=]?\\s*(?:${VERSION_CORE_PATTERN_LOOSE.source}${PRERELEASE_PATTERN_LOOSE.source}${BUILD_PATTERN.source})`
);
export const COMPARATOR_PATTERN = new RegExp(
  `^(?<operator>${RANGE_OPERATORS_PATTERN.source})?${COMPARATOR_SEMVER_PATTERN.source}$`
);
export const COMPARATOR_PATTERN_LOOSE = new RegExp(
  `^(?<operator>${RANGE_OPERATORS_PATTERN.source})?${COMPARATOR_SEMVER_PATTERN_LOOSE.source}$`
);
export const PARTIAL_COMPARATOR_PATTERN = new RegExp(
  `^(?<operator>${RANGE_OPERATORS_PATTERN.source})?${PARTIAL_PATTERN.source}$`
);
export const PARTIAL_COMPARATOR_PATTERN_LOOSE = new RegExp(
  `^(?<operator>${RANGE_OPERATORS_PATTERN.source})?${PARTIAL_PATTERN_LOOSE.source}$`
);
