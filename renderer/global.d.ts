export {};

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        invoke(channel: string, ...args: unknown[]): Promise<unknown>;
        on(channel: string, func: (...args: unknown[]) => void): void;
        removeAllListeners(channel: string): void;
      };
      toggleMaximizeWindow(): Promise<void>;
      quitApp(): Promise<void>;
      openExternal(url: string): Promise<void>;
    };
  }
}
