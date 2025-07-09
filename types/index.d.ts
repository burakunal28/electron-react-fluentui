// Global type definitions index file
// This file serves as the central hub for all TypeScript declarations

/// <reference path="./vite-env.d.ts" />
/// <reference path="./electron-env.d.ts" />

// Re-export all electron types
export * from "../electron/types";

// Re-export all renderer types
export * from "../renderer/types";

// Re-export common types
export * from "./common";
