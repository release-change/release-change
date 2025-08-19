import { Comparator, Range, Semver } from "./classes/index.js";
import { cmp } from "./cmp.js";
import { coerce } from "./coerce.js";
import { compare } from "./compare.js";
import { compareWithOperator } from "./compare-with-operator.js";
import { eq } from "./eq.js";
import { getPrerelease } from "./get-prerelease.js";
import { gt } from "./gt.js";
import { gte } from "./gte.js";
import { inc } from "./inc.js";
import { increase } from "./increase.js";
import { lt } from "./lt.js";
import { lte } from "./lte.js";
import { neq } from "./neq.js";
import { parse } from "./parse.js";
import { prerelease } from "./prerelease.js";
import { satisfies } from "./satisfies.js";
import { compareIdentifiers } from "./utils/compare-identifiers.js";
import { comparePrereleases } from "./utils/compare-prereleases.js";
import { compareVersionCores } from "./utils/compare-version-cores.js";
import { valid } from "./valid.js";
import { validate } from "./validate.js";

export {
  cmp,
  coerce,
  Comparator,
  compare,
  compareIdentifiers,
  comparePrereleases,
  compareVersionCores,
  compareWithOperator,
  eq,
  getPrerelease,
  gt,
  gte,
  inc,
  increase,
  lt,
  lte,
  neq,
  parse,
  prerelease,
  Range,
  satisfies,
  Semver,
  valid,
  validate
};

/**
 * The default export is set for compatibility with npm’s semver.
 */
export default {
  cmp,
  coerce,
  Comparator,
  compare,
  compareIdentifiers,
  comparePrereleases,
  compareVersionCores,
  compareWithOperator,
  eq,
  getPrerelease,
  gt,
  gte,
  inc,
  increase,
  lt,
  lte,
  neq,
  parse,
  prerelease,
  Range,
  satisfies,
  Semver,
  valid,
  validate
};
