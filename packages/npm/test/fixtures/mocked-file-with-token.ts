export const mockedFileWithToken =
  // biome-ignore lint/suspicious/noTemplateCurlyInString: <literal `${}`>
  "someKey=value\nanotherKey=value\n//registry.npmjs.org/:_authToken=${NPM_TOKEN}";
