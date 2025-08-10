import { describe, expect, it } from "vitest";

import { addLeadingZero } from "../src/add-leading-zero.js";

describe("format number with leading zero", () => {
  it("should return a one-digit number with a leading zero", () => {
    expect(addLeadingZero(5)).toBe("05");
  });
  it("should return a two-digit number as is", () => {
    expect(addLeadingZero(42)).toBe("42");
  });
});
