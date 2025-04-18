export const INDENTED_BLANK_LINE_SEPARATOR = /\n\s*\n/g;
export const BLANK_LINE_SEPARATOR = "\n".repeat(2);
export const COMMIT_FOOTER_KEY = /^[-a-z]+:\s(\w|#)+/i;
export const BREAKING_CHANGE = /^BREAKING(\s|-)CHANGE:\s\w+/;
export const COMMIT_PREFIX_MAJOR = /^[a-z]+(\([^)]+\))?!:\s\w+/i;
export const COMMIT_PREFIX_MINOR = /^feat(\([^)]+\))?:\s\w+/i;
export const COMMIT_PREFIX_PATCH = /^fix(\([^)]+\))?:\s\w+/i;
