// Electron environment type definitions
// Contains Node.js process environment and Window interface extensions

declare namespace NodeJS {
  interface ProcessEnv {
    DIST: string;
    VITE_PUBLIC: string;
    VITE_DEV_SERVER_URL: string;
    NODE_ENV: "development" | "production";
    LOG_LEVEL: "error" | "warn" | "info";
    ENABLE_DEVTOOLS: string;
  }
}

// Global Window interface extension for Electron APIs
// This extends the DOM Window interface to include electron-specific properties
declare global {
  interface Window {
    ipcRenderer: import("electron").IpcRenderer;
    electron: {
      ipcRenderer: {
        invoke: (channel: string, ...args: unknown[]) => Promise<unknown>;
        on: (
          channel: string,
          listener: (event: unknown, ...args: unknown[]) => void,
        ) => void;
        removeAllListeners: (channel: string) => void;
      };
      toggleMaximizeWindow: () => Promise<void>;
      quitApp: () => Promise<void>;
      openExternal: (url: string) => Promise<void>;
    };
  }
}
