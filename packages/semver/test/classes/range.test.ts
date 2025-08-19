import { assert, it } from "vitest";

import { Range } from "../../src/index.js";
import { invalidRanges } from "../fixtures/invalid-ranges.js";
import { validRanges } from "../fixtures/valid-ranges.js";
import { validRangesInLooseMode } from "../fixtures/valid-ranges-in-loose-mode.js";

it.each(invalidRanges)(
  "should throw an error if the range $raw is invalid",
  ({ raw, error, options }) => {
    assert.throws(() => new Range(raw, options), error);
  }
);
it.each(validRangesInLooseMode)(
  "should throw an error if the range $raw is parsed in strict mode",
  ({ raw, includePrerelease }) => {
    assert.throws(() => new Range(raw, { includePrerelease }));
  }
);
it.each(validRangesInLooseMode)(
  "should create a `Range` object from the range $raw in loose mode",
  ({ raw, expected, includePrerelease }) => {
    const { range } = expected;
    const result = new Range(raw, { loose: true, includePrerelease });
    assert.strictEqual(result.raw, raw);
    assert.strictEqual(result.range, range);
    assert.strictEqual(result.includePrerelease, Boolean(includePrerelease));
  }
);
it.each(validRanges)(
  "should create a `Range` object from the valid range $raw",
  ({ raw, expected, includePrerelease }) => {
    const { range } = expected;
    const result = new Range(raw, { includePrerelease });
    assert.strictEqual(result.raw, raw);
    assert.strictEqual(result.range, range);
    assert.strictEqual(result.includePrerelease, Boolean(includePrerelease));
  }
);
