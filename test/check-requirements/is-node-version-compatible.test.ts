import { describe, expect, it } from "vitest";

import { isNodeVersionCompatible } from "../../src/check-requirements/is-node-version-compatible.js";

import { REQUIRED_NODE_VERSIONS } from "../../src/check-requirements/constants.js";

describe("incompatible Node version", () => {
  it("tests an outdated Node version", () => {
    expect(isNodeVersionCompatible("v16.20.2", REQUIRED_NODE_VERSIONS)).toBe(false);
  });
  it("tests an odd Node version", () => {
    expect(isNodeVersionCompatible("v23.7.0", REQUIRED_NODE_VERSIONS)).toBe(false);
  });
});

describe("compatible Node version", () => {
  it("tests a Node maintenance LTS version", () => {
    expect(isNodeVersionCompatible("v18.20.6", REQUIRED_NODE_VERSIONS)).toBe(true);
  });
  it("tests a Node active LTS version", () => {
    expect(isNodeVersionCompatible("v20.18.2", REQUIRED_NODE_VERSIONS)).toBe(true);
  });
  it("tests a Node current version (if even)", () => {
    expect(isNodeVersionCompatible("v22.13.1", REQUIRED_NODE_VERSIONS)).toBe(true);
  });
});
