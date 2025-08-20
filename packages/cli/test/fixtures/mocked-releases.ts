export const mockedReleases: {
  currentVersion: string;
  branches: {
    [branch: string]: {
      [release: string]: string;
    };
  };
}[] = [
  {
    currentVersion: "0.0.0",
    branches: {
      main: {
        major: "1.0.0",
        minor: "0.1.0",
        patch: "0.0.1"
      },
      alpha: {
        major: "1.0.0-alpha.1",
        minor: "0.1.0-alpha.1",
        patch: "0.0.1-alpha.1"
      },
      beta: {
        major: "1.0.0-beta.1",
        minor: "0.1.0-beta.1",
        patch: "0.0.1-beta.1"
      },
      next: {
        major: "1.0.0-rc.1",
        minor: "0.1.0-rc.1",
        patch: "0.0.1-rc.1"
      }
    }
  },
  {
    currentVersion: "1.0.0-alpha.1",
    branches: {
      main: {
        major: "1.0.0",
        minor: "1.0.0",
        patch: "1.0.0"
      },
      alpha: {
        major: "1.0.0-alpha.2",
        minor: "1.0.0-alpha.2",
        patch: "1.0.0-alpha.2"
      },
      beta: {
        major: "1.0.0-beta.1",
        minor: "1.0.0-beta.1",
        patch: "1.0.0-beta.1"
      },
      next: {
        major: "1.0.0-rc.1",
        minor: "1.0.0-rc.1",
        patch: "1.0.0-rc.1"
      }
    }
  },
  {
    currentVersion: "1.0.0-beta.1",
    branches: {
      main: {
        major: "1.0.0",
        minor: "1.0.0",
        patch: "1.0.0"
      },
      alpha: {
        major: "1.0.0-alpha.1",
        minor: "1.0.0-alpha.1",
        patch: "1.0.0-alpha.1"
      },
      beta: {
        major: "1.0.0-beta.2",
        minor: "1.0.0-beta.2",
        patch: "1.0.0-beta.2"
      },
      next: {
        major: "1.0.0-rc.1",
        minor: "1.0.0-rc.1",
        patch: "1.0.0-rc.1"
      }
    }
  },
  {
    currentVersion: "1.0.0-rc.1",
    branches: {
      main: {
        major: "1.0.0",
        minor: "1.0.0",
        patch: "1.0.0"
      },
      alpha: {
        major: "1.0.0-alpha.1",
        minor: "1.0.0-alpha.1",
        patch: "1.0.0-alpha.1"
      },
      beta: {
        major: "1.0.0-beta.1",
        minor: "1.0.0-beta.1",
        patch: "1.0.0-beta.1"
      },
      next: {
        major: "1.0.0-rc.2",
        minor: "1.0.0-rc.2",
        patch: "1.0.0-rc.2"
      }
    }
  },
  {
    currentVersion: "1.0.0",
    branches: {
      main: {
        major: "2.0.0",
        minor: "1.1.0",
        patch: "1.0.1"
      },
      alpha: {
        major: "2.0.0-alpha.1",
        minor: "1.1.0-alpha.1",
        patch: "1.0.1-alpha.1"
      },
      beta: {
        major: "2.0.0-beta.1",
        minor: "1.1.0-beta.1",
        patch: "1.0.1-beta.1"
      },
      next: {
        major: "2.0.0-rc.1",
        minor: "1.1.0-rc.1",
        patch: "1.0.1-rc.1"
      }
    }
  },
  {
    currentVersion: "1.0.1-alpha.1",
    branches: {
      main: {
        major: "1.0.1",
        minor: "1.0.1",
        patch: "1.0.1"
      },
      alpha: {
        major: "1.0.1-alpha.2",
        minor: "1.0.1-alpha.2",
        patch: "1.0.1-alpha.2"
      },
      beta: {
        major: "1.0.1-beta.1",
        minor: "1.0.1-beta.1",
        patch: "1.0.1-beta.1"
      },
      next: {
        major: "1.0.1-rc.1",
        minor: "1.0.1-rc.1",
        patch: "1.0.1-rc.1"
      }
    }
  },
  {
    currentVersion: "1.0.1-beta.1",
    branches: {
      main: {
        major: "1.0.1",
        minor: "1.0.1",
        patch: "1.0.1"
      },
      alpha: {
        major: "1.0.1-alpha.1",
        minor: "1.0.1-alpha.1",
        patch: "1.0.1-alpha.1"
      },
      beta: {
        major: "1.0.1-beta.2",
        minor: "1.0.1-beta.2",
        patch: "1.0.1-beta.2"
      },
      next: {
        major: "1.0.1-rc.1",
        minor: "1.0.1-rc.1",
        patch: "1.0.1-rc.1"
      }
    }
  },
  {
    currentVersion: "1.0.1-rc.1",
    branches: {
      main: {
        major: "1.0.1",
        minor: "1.0.1",
        patch: "1.0.1"
      },
      alpha: {
        major: "1.0.1-alpha.1",
        minor: "1.0.1-alpha.1",
        patch: "1.0.1-alpha.1"
      },
      beta: {
        major: "1.0.1-beta.1",
        minor: "1.0.1-beta.1",
        patch: "1.0.1-beta.1"
      },
      next: {
        major: "1.0.1-rc.2",
        minor: "1.0.1-rc.2",
        patch: "1.0.1-rc.2"
      }
    }
  },
  {
    currentVersion: "1.0.1",
    branches: {
      main: {
        major: "2.0.0",
        minor: "1.1.0",
        patch: "1.0.2"
      },
      alpha: {
        major: "2.0.0-alpha.1",
        minor: "1.1.0-alpha.1",
        patch: "1.0.2-alpha.1"
      },
      beta: {
        major: "2.0.0-beta.1",
        minor: "1.1.0-beta.1",
        patch: "1.0.2-beta.1"
      },
      next: {
        major: "2.0.0-rc.1",
        minor: "1.1.0-rc.1",
        patch: "1.0.2-rc.1"
      }
    }
  },
  {
    currentVersion: "1.1.0-alpha.1",
    branches: {
      main: {
        major: "1.1.0",
        minor: "1.1.0",
        patch: "1.1.0"
      },
      alpha: {
        major: "1.1.0-alpha.2",
        minor: "1.1.0-alpha.2",
        patch: "1.1.0-alpha.2"
      },
      beta: {
        major: "1.1.0-beta.1",
        minor: "1.1.0-beta.1",
        patch: "1.1.0-beta.1"
      },
      next: {
        major: "1.1.0-rc.1",
        minor: "1.1.0-rc.1",
        patch: "1.1.0-rc.1"
      }
    }
  },
  {
    currentVersion: "1.1.0-beta.1",
    branches: {
      main: {
        major: "1.1.0",
        minor: "1.1.0",
        patch: "1.1.0"
      },
      alpha: {
        major: "1.1.0-alpha.1",
        minor: "1.1.0-alpha.1",
        patch: "1.1.0-alpha.1"
      },
      beta: {
        major: "1.1.0-beta.2",
        minor: "1.1.0-beta.2",
        patch: "1.1.0-beta.2"
      },
      next: {
        major: "1.1.0-rc.1",
        minor: "1.1.0-rc.1",
        patch: "1.1.0-rc.1"
      }
    }
  },
  {
    currentVersion: "1.1.0-rc.1",
    branches: {
      main: {
        major: "1.1.0",
        minor: "1.1.0",
        patch: "1.1.0"
      },
      alpha: {
        major: "1.1.0-alpha.1",
        minor: "1.1.0-alpha.1",
        patch: "1.1.0-alpha.1"
      },
      beta: {
        major: "1.1.0-beta.1",
        minor: "1.1.0-beta.1",
        patch: "1.1.0-beta.1"
      },
      next: {
        major: "1.1.0-rc.2",
        minor: "1.1.0-rc.2",
        patch: "1.1.0-rc.2"
      }
    }
  },
  {
    currentVersion: "1.1.0",
    branches: {
      main: {
        major: "2.0.0",
        minor: "1.2.0",
        patch: "1.1.1"
      },
      alpha: {
        major: "2.0.0-alpha.1",
        minor: "1.2.0-alpha.1",
        patch: "1.1.1-alpha.1"
      },
      beta: {
        major: "2.0.0-beta.1",
        minor: "1.2.0-beta.1",
        patch: "1.1.1-beta.1"
      },
      next: {
        major: "2.0.0-rc.1",
        minor: "1.2.0-rc.1",
        patch: "1.1.1-rc.1"
      }
    }
  }
];
