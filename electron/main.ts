import * as path from "node:path";
import { config } from "dotenv";
import {
  app,
  BrowserWindow,
  ipcMain,
  nativeTheme,
  screen,
  shell,
} from "electron";

// Load environment variables from .env file
config({ path: path.join(__dirname, "../.env") });

// IPC Channel definitions for type safety
enum IPCChannels {
  MAXIMIZE_WINDOW = "maximize-window",
  MINIMIZE_WINDOW = "minimize-window",
  CLOSE_WINDOW = "close-window",
  TOGGLE_MAXIMIZE_WINDOW = "toggle-maximize-window",
  QUIT_APP = "quit-app",
  OPEN_EXTERNAL = "open-external",
  SYSTEM_ERROR = "system-error",
  WINDOW_MAXIMIZED = "window-maximized",
  WINDOW_UNMAXIMIZED = "window-unmaximized",
  MAIN_PROCESS_MESSAGE = "main-process-message",
}

// System error types
export interface SystemError {
  type:
    | "uncaughtException"
    | "unhandledRejection"
    | "gpu-process-crashed"
    | "render-process-gone";
  message: string;
  stack?: string;
  killed?: boolean;
  details?: unknown;
}

// Environment-based configuration
const ENABLE_DEVTOOLS = process.env.NODE_ENV === "development";
const LOG_LEVEL = process.env.LOG_LEVEL ?? "error";

// Logging utility with proper types
const log = {
  error: (message: string, data?: unknown) => {
    console.error(
      `[${new Date().toISOString()}] ERROR: ${message}`,
      data ?? "",
    );
  },
  warn: (message: string, data?: unknown) => {
    if (LOG_LEVEL === "warn" || LOG_LEVEL === "info") {
      console.warn(
        `[${new Date().toISOString()}] WARN: ${message}`,
        data ?? "",
      );
    }
  },
  info: (message: string, data?: unknown) => {
    if (LOG_LEVEL === "info") {
      console.info(
        `[${new Date().toISOString()}] INFO: ${message}`,
        data ?? "",
      );
    }
  },
};

let win: BrowserWindow | null;
const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;
const DIST = path.join(__dirname, "../dist-electron");

let reloadTimeout: NodeJS.Timeout | null = null;

// Set the APP_ROOT environment variable
process.env.APP_ROOT = path.join(__dirname, "..");

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
  process.exit();
}

app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized()) win.restore();
  }
});

app.whenReady().then(() => {
  process.env.VITE_PUBLIC = app.isPackaged
    ? DIST
    : path.join(DIST, "../public");

  // Helper function for sending system errors to renderer
  const sendSystemError = (error: SystemError) => {
    try {
      if (
        win &&
        !win.isDestroyed() &&
        win.webContents &&
        !win.webContents.isDestroyed()
      ) {
        win.webContents.send(IPCChannels.SYSTEM_ERROR, error);
      }
    } catch (sendError) {
      log.error("Failed to send system error to renderer:", sendError);
    }
  };

  // Global error handling for uncaught exceptions
  process.on("uncaughtException", (error) => {
    log.error("Uncaught Exception:", error);
    sendSystemError({
      type: "uncaughtException",
      message: error.message,
      stack: error.stack,
    });
  });

  // Global error handling for unhandled promise rejections
  process.on("unhandledRejection", (reason, promise) => {
    log.error("Unhandled Rejection at:", promise);
    sendSystemError({
      type: "unhandledRejection",
      message: reason instanceof Error ? reason.message : String(reason),
      stack: reason instanceof Error ? reason.stack : undefined,
    });
  });

  // Type-safe IPC handlers
  ipcMain.handle(IPCChannels.MAXIMIZE_WINDOW, async () => {
    if (win) {
      win.maximize();
      log.info("Window maximized via IPC");
    }
  });

  ipcMain.handle(IPCChannels.MINIMIZE_WINDOW, async () => {
    if (win) {
      win.minimize();
      log.info("Window minimized via IPC");
    }
  });

  ipcMain.handle(IPCChannels.CLOSE_WINDOW, async () => {
    if (win) {
      win.close();
      log.info("Window closed via IPC");
    }
  });

  ipcMain.handle(IPCChannels.TOGGLE_MAXIMIZE_WINDOW, async () => {
    if (win) {
      if (win.isMaximized()) {
        win.unmaximize();
        log.info("Window unmaximized via IPC");
      } else {
        win.maximize();
        log.info("Window maximized via IPC");
      }
    }
  });

  ipcMain.handle(IPCChannels.QUIT_APP, async () => {
    try {
      log.info("App quit requested via IPC");

      // Clear any pending timeouts
      if (reloadTimeout) {
        clearTimeout(reloadTimeout);
        reloadTimeout = null;
      }

      // Close window gracefully
      if (win && !win.isDestroyed()) {
        win.close();
        // Use a shorter timeout and handle the process more gracefully
        setTimeout(() => {
          app.quit();
        }, 50);
      } else {
        // If no window exists, quit immediately
        app.quit();
      }
    } catch (error) {
      log.error("Error during quit process:", error);
      // Force quit if there's an error
      app.quit();
    }
  });

  ipcMain.handle(IPCChannels.OPEN_EXTERNAL, async (_, url: string) => {
    try {
      await shell.openExternal(url);
      log.info(`Opened external URL: ${url}`);
    } catch (error) {
      log.error(`Failed to open external URL: ${url}`, error);
      throw error;
    }
  });

  createWindow();

  screen.on("display-metrics-changed", () => {
    try {
      if (win && !win.isDestroyed()) {
        const { width, height } = screen.getPrimaryDisplay().workAreaSize;
        const minWidth = Math.round(width * 0.6);
        const minHeight = Math.round(height * 0.8);
        win.setMinimumSize(minWidth, minHeight);

        // Clear any existing reload timeout
        if (reloadTimeout) {
          clearTimeout(reloadTimeout);
          reloadTimeout = null;
        }

        // Set a new reload timeout with better error handling
        reloadTimeout = setTimeout(() => {
          try {
            if (win && !win.isDestroyed()) {
              if (VITE_DEV_SERVER_URL) {
                win.loadURL(VITE_DEV_SERVER_URL);
              } else {
                win.loadFile(path.join(DIST, "index.html"));
              }
            }
          } catch (error) {
            log.error("Error reloading window after display change:", error);
          }
          reloadTimeout = null;
        }, 1000);
      }
    } catch (error) {
      log.error("Error handling display metrics change:", error);
    }
  });
});

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const minWidth = Math.round(width * 0.6);
  const minHeight = Math.round(height * 0.8);

  win = new BrowserWindow({
    titleBarStyle: "hidden",
    minWidth: minWidth,
    minHeight: minHeight,
    backgroundColor: nativeTheme.shouldUseDarkColors ? "#202020" : "#F3F3F3",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true,
      allowRunningInsecureContent: false,
      sandbox: true,
      experimentalFeatures: false,
      plugins: false,
      backgroundThrottling: false,
      devTools: ENABLE_DEVTOOLS,
    },
  });

  win.maximize();

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
    // DevTools control via environment variable
    if (ENABLE_DEVTOOLS) {
      win.webContents.openDevTools();
      log.info("DevTools opened in development mode");
    } else {
      log.info("DevTools disabled to reduce console noise");
    }
  } else {
    // No dev tools in production build
    win.loadFile(path.join(DIST, "index.html"));
    log.info("Production mode: DevTools disabled");
  }

  // Performance monitoring - Only in development
  if (ENABLE_DEVTOOLS) {
    const startTime = process.hrtime.bigint();
    win.webContents.on("did-finish-load", () => {
      const endTime = process.hrtime.bigint();
      const loadTime = Number(endTime - startTime) / 1000000; // ms cinsinden
      log.info(`Window loaded in ${loadTime.toFixed(2)}ms`);

      // CPU kullanımını izle
      const cpuUsage = process.cpuUsage();
      log.info("CPU usage:", {
        user: cpuUsage.user,
        system: cpuUsage.system,
      });
    });
  }

  // Type-safe window event handlers
  win.on("maximize", () => {
    win?.webContents.send(IPCChannels.WINDOW_MAXIMIZED);
    log.info("Window maximized event sent to renderer");
  });

  win.on("unmaximize", () => {
    win?.webContents.send(IPCChannels.WINDOW_UNMAXIMIZED);
    log.info("Window unmaximized event sent to renderer");
  });

  // Test active push message to Renderer-process with type safety
  win.webContents.on("did-finish-load", () => {
    try {
      win?.webContents.send(
        IPCChannels.MAIN_PROCESS_MESSAGE,
        new Date().toLocaleString(),
      );
      log.info("Main process message sent to renderer");
    } catch (generalError) {
      log.error("Error in did-finish-load handler:", generalError);
    }
  });
}

// Memory leak prevention and cleanup
app.on("before-quit", () => {
  log.info("App is quitting, cleaning up resources");

  // Clear timeouts safely
  if (reloadTimeout) {
    clearTimeout(reloadTimeout);
    reloadTimeout = null;
    log.info("Reload timeout cleared");
  }

  // Remove event listeners to prevent memory leaks
  try {
    if (win && !win.isDestroyed()) {
      win.removeAllListeners();
      if (win.webContents && !win.webContents.isDestroyed()) {
        win.webContents.removeAllListeners();
      }
      log.info("Window event listeners removed");
    }
  } catch (error) {
    log.error("Error during cleanup:", error);
  }

  // Remove process listeners to prevent issues during shutdown
  try {
    process.removeAllListeners("uncaughtException");
    process.removeAllListeners("unhandledRejection");
    log.info("Process event handlers removed");
  } catch (error) {
    log.error("Error removing process listeners:", error);
  }
});

// Graceful shutdown handling to prevent process management errors
process.on("SIGINT", () => {
  log.info("Received SIGINT, shutting down gracefully");
  if (reloadTimeout) {
    clearTimeout(reloadTimeout);
    reloadTimeout = null;
  }
  app.quit();
});

process.on("SIGTERM", () => {
  log.info("Received SIGTERM, shutting down gracefully");
  if (reloadTimeout) {
    clearTimeout(reloadTimeout);
    reloadTimeout = null;
  }
  app.quit();
});

// Prevent the app from exiting unexpectedly
process.on("exit", (code) => {
  log.info(`Process exiting with code: ${code}`);
});

app.on("window-all-closed", () => {
  log.info("All windows closed");

  // Cleanup timeouts and resources
  if (reloadTimeout) {
    clearTimeout(reloadTimeout);
    reloadTimeout = null;
  }

  // Force quit on non-macOS platforms
  if (process.platform !== "darwin") {
    log.info("Quitting app (non-macOS)");
    // Use setImmediate to ensure cleanup completes before quit
    setImmediate(() => {
      app.quit();
    });
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
