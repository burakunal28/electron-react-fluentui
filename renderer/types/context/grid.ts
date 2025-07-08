import type { ReactNode } from "react";

export interface GridContextType {
  registerGrid: () => void;
  unregisterGrid: () => void;
}

export interface GridProviderProps {
  children: ReactNode;
}
