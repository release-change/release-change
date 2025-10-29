export const invalidDetailedErrors = [
  null,
  undefined,
  1,
  "error",
  {},
  [],
  true,
  false,
  { message: "Error message" }
];
export const validDetailedErrors = [
  {
    title: "Error title",
    message: "Error message",
    details: { output: "Output error" }
  },
  {
    title: "Error title",
    message: "Error message",
    details: { output: "Output error", command: "git --version" }
  }
];
