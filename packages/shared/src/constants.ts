import rootPackageManifest from "../../../package.json" with { type: "json" };

export const ROOT_PACKAGE_MANIFEST = rootPackageManifest;
export const WORKSPACE_NAME = "release-change";
export const WORKSPACE_VERSION = ROOT_PACKAGE_MANIFEST.version;
