import { expect, it } from "vitest";

import { ltRange } from "../src/index.js";
import { versionsLtRange } from "./fixtures/versions-lt-range.js";
import { versionsNotLtRange } from "./fixtures/versions-not-lt-range.js";

it.each(versionsLtRange)(
  "should return `true` with version $1 and range $0",
  (range, version, options) => {
    expect(ltRange(version, range, options)).toBe(true);
  }
);
it.each(versionsNotLtRange)(
  "should return `false` with version $1 and range $0",
  (range, version, options) => {
    expect(ltRange(version, range, options)).toBe(false);
  }
);
