import { expect, it } from "vitest";

import { gtr } from "../src/index.js";
import { versionsGtRange } from "./fixtures/versions-gt-range.js";
import { versionsNotGtRange } from "./fixtures/versions-not-gt-range.js";

it.each(versionsGtRange)(
  "should return `true` with version $1 and range $0",
  (range, version, options) => {
    expect(gtr(version, range, options)).toBe(true);
  }
);
it.each(versionsNotGtRange)(
  "should return `false` with version $1 and range $0",
  (range, version, options) => {
    expect(gtr(version, range, options)).toBe(false);
  }
);
