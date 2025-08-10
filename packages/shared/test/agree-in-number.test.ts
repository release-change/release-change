import { describe, expect, it } from "vitest";

import { agreeInNumber } from "../src/index.js";

describe("agree in number", () => {
  const mockedWordForms: [string, string] = ["commit", "commits"];

  it("should return the word in singular", () => {
    expect(agreeInNumber(1, mockedWordForms)).toBe("commit");
  });
  it("should return the word in plural", () => {
    expect(agreeInNumber(2, mockedWordForms)).toBe("commits");
  });
  it("should return the word in plural when occurrences are set to 0", () => {
    expect(agreeInNumber(0, mockedWordForms)).toBe("commits");
  });
});
