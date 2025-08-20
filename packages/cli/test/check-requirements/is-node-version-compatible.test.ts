import { expect, it } from "vitest";

import { isNodeVersionCompatible } from "../../src/check-requirements/is-node-version-compatible.js";

const mockedRequiredNodeVersions = "^18.20.5 || ^20.18.3 || ^22.12.0";

it("tests an outdated Node version", () => {
  expect(isNodeVersionCompatible("16.20.2", mockedRequiredNodeVersions)).toBe(false);
});
it("tests an odd Node version", () => {
  expect(isNodeVersionCompatible("23.7.0", mockedRequiredNodeVersions)).toBe(false);
});
it("tests a future even Node version not supported yet", () => {
  expect(isNodeVersionCompatible("24.0.0", mockedRequiredNodeVersions)).toBe(false);
});
it("tests a Node maintenance LTS version", () => {
  expect(isNodeVersionCompatible("18.20.6", mockedRequiredNodeVersions)).toBe(true);
});
it("tests a Node active LTS version", () => {
  expect(isNodeVersionCompatible("20.18.3", mockedRequiredNodeVersions)).toBe(true);
});
it("tests a Node current version (if even)", () => {
  expect(isNodeVersionCompatible("22.13.1", mockedRequiredNodeVersions)).toBe(true);
});
