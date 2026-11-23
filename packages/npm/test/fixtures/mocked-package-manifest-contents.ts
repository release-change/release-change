export const mockedPackageManifestContents = [
  {
    content: {
      name: "foo",
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/owner/repo.git"
      }
    },
    expectedProvenanceState: true
  },
  {
    content: {
      name: "foo",
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/owner/repo.git"
      },
      publishConfig: {
        provenance: true
      }
    },
    expectedProvenanceState: true
  },
  {
    content: {
      name: "foo",
      version: "0.0.0",
      repository: {
        type: "git",
        url: "git+https://github.com/owner/repo.git"
      },
      publishConfig: {
        provenance: false
      }
    },
    expectedProvenanceState: false
  }
];
