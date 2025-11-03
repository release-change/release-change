import { cmp } from "./cmp.js";
import { coerce } from "./coerce.js";
import { compare } from "./compare.js";
import { compareWithOperator } from "./compare-with-operator.js";
import { eq } from "./eq.js";
import { getMajor } from "./get-major.js";
import { getMinor } from "./get-minor.js";
import { getPatch } from "./get-patch.js";
import { getPrerelease } from "./get-prerelease.js";
import { gt } from "./gt.js";
import { gte } from "./gte.js";
import { inc } from "./inc.js";
import { increase } from "./increase.js";
import { lt } from "./lt.js";
import { lte } from "./lte.js";
import { major } from "./major.js";
import { minor } from "./minor.js";
import { neq } from "./neq.js";
import { parse } from "./parse.js";
import { patch } from "./patch.js";
import { prerelease } from "./prerelease.js";
import { rcompare } from "./rcompare.js";
import { reverseCompare } from "./reverse-compare.js";
import { satisfies } from "./satisfies.js";
import { valid } from "./valid.js";
import { validate } from "./validate.js";

export {
  cmp,
  coerce,
  compare,
  compareWithOperator,
  eq,
  getMajor,
  getMinor,
  getPatch,
  getPrerelease,
  gt,
  gte,
  inc,
  increase,
  lt,
  lte,
  major,
  minor,
  neq,
  parse,
  patch,
  prerelease,
  rcompare,
  reverseCompare,
  satisfies,
  valid,
  validate
};

/**
 * The default export is set for compatibility with npm’s semver.
 */
export default {
  cmp,
  coerce,
  compare,
  compareWithOperator,
  eq,
  getMajor,
  getMinor,
  getPatch,
  getPrerelease,
  gt,
  gte,
  inc,
  increase,
  lt,
  lte,
  major,
  minor,
  neq,
  parse,
  patch,
  prerelease,
  rcompare,
  reverseCompare,
  satisfies,
  valid,
  validate
};
