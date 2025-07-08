/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    DIST: string;
    VITE_PUBLIC: string;
  }
}

// Global Window interface extension for Electron APIs
// This extends the DOM Window interface to include electron-specific properties
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
  };
}
