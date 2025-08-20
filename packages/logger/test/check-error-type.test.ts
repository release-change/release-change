import { expect, it } from "vitest";

import { checkErrorType } from "../src/index.js";

const errorAsErrorInstanceMessage = "This is an error sent as an instance of `Error`.";
const errorAsErrorInstance = new Error(errorAsErrorInstanceMessage);
const errorAsOfUnknownTypeMessage = "This is an error of unknown type.";
const errorAsOfUnknownType = errorAsOfUnknownTypeMessage;

it("should return the error message from the `message` property of `Error`", () => {
  expect(checkErrorType(errorAsErrorInstance)).toBe(errorAsErrorInstanceMessage);
});
it("should stringify the error and return it if its type is not an instance of `Error`", () => {
  expect(checkErrorType(errorAsOfUnknownType)).toBe(
    `Unknown error: ${errorAsOfUnknownTypeMessage}`
  );
});
