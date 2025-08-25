export const regexPatterns = [
  {
    pattern: "my-app",
    regex: /my-app/
  },
  {
    pattern: "packages/*",
    regex: /packages\/[^/]*/
  },
  {
    pattern: "components/**",
    regex: /components\/.*/
  },
  {
    pattern: "**/test/**",
    regex: /.*\/test\/.*/
  }
];
