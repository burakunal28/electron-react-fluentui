// Module augmentation to extend Electron's WebContents interface
declare module "electron" {
  namespace Electron {
    interface WebContents {
      on(
        event: "gpu-process-crashed",
        listener: (event: Event, details: { killed: boolean }) => void,
      ): this;

      on(
        event: "render-process-gone",
        listener: (event: Event, details: RenderProcessGoneDetails) => void,
      ): this;

      off(
        event: "gpu-process-crashed",
        listener: (event: Event, details: { killed: boolean }) => void,
      ): this;
    }
  }
}

// GPU crash event details interface
export interface GPUProcessCrashedDetails {
  killed: boolean;
}

// Extended WebContents type for better type safety
export interface ExtendedWebContents
  extends Omit<Electron.WebContents, "on" | "off"> {
  on(
    event: "gpu-process-crashed",
    listener: (event: Event, details: GPUProcessCrashedDetails) => void,
  ): this;
  on(
    event: "render-process-gone",
    listener: (
      event: Event,
      details: Electron.RenderProcessGoneDetails,
    ) => void,
  ): this;
  on(event: string, listener: (...args: unknown[]) => void): this;

  off(
    event: "gpu-process-crashed",
    listener: (event: Event, details: GPUProcessCrashedDetails) => void,
  ): this;
  off(event: string, listener: (...args: unknown[]) => void): this;
}
