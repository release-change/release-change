export const mockedYarnrcFilesWithToken = [
  `someKey: "value"
anotherKey: "value"
npmAuthToken: "\${NPM_TOKEN}"`,
  `someKey: "value"
anotherKey: "value"
npmScopes:
  my-scope:
    npmPublishRegistry: "https://registry.npmjs.org"
    npmAuthToken: "\${NPM_TOKEN}"`,
  `someKey: "value"
anotherKey: "value"
npmRegistries:
  "//registry.npmjs.org":
    npmAuthToken: "\${NPM_TOKEN}"`
];
