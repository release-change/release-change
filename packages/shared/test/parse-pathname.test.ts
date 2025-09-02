import { assert, expect, it } from "vitest";

import { parsePathname } from "../src/index.js";

const pathnameWithoutOwner = "/";
const pathnameWithoutRepository = "/github-username";
const pathnameWithoutExtension = "/github-username/repository-name";
const expectedPathname = "/github-username/repository-name.git";

it("should return `null` if the pathname does not contain the owner", () => {
  expect(parsePathname(pathnameWithoutOwner)).toBe(null);
});
it("should return `null` if the pathname does not contain the repository", () => {
  expect(parsePathname(pathnameWithoutRepository)).toBe(null);
});
it("should return `null` if the pathname does not contain the extension", () => {
  expect(parsePathname(pathnameWithoutExtension)).toBe(null);
});
it("should return an object with the groups specified by the regexp", () => {
  const expectedResult = {
    owner: "github-username",
    repository: "repository-name"
  };
  assert.deepEqual(parsePathname(expectedPathname), expectedResult);
});
