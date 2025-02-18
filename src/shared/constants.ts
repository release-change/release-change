import packageManager from "../../package.json" with { type: "json" };

export const PACKAGE_FILE = packageManager;
export const PACKAGE_NAME = PACKAGE_FILE.name;
export const PACKAGE_VERSION = PACKAGE_FILE.version;
