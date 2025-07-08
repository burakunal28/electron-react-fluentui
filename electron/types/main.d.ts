declare module "electron" {
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

export interface WebContentsWithGPUEvents extends Electron.WebContents {
  on(
    event: "gpu-process-crashed",
    listener: (event: Event, details: { killed: boolean }) => void,
  ): this;
  off(
    event: "gpu-process-crashed",
    listener: (event: Event, details: { killed: boolean }) => void,
  ): this;
}

export interface WebContentsWithRenderEvents extends Electron.WebContents {
  on(
    event: "render-process-gone",
    listener: (
      event: Event,
      details: Electron.RenderProcessGoneDetails,
    ) => void,
  ): this;
}
