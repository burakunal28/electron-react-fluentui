# Types Directory

This directory contains all centralized TypeScript type definitions for the project.

## Structure

- `vite-env.d.ts` - Vite client type definitions
- `electron-env.d.ts` - Electron and Node.js environment type definitions
- `index.d.ts` - Main entry point that references all type files

## Usage

All type definitions are automatically included in the TypeScript compilation through:
- `tsconfig.json` includes this directory in `typeRoots`
- `vite.config.ts` has path alias `@types` pointing to this directory
