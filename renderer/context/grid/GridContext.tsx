import { createContext, useCallback, useContext, useMemo, useRef } from "react";
import type { GridContextType, GridProviderProps } from "@/types/context/grid";

const GridContext = createContext<GridContextType | undefined>(undefined);

export const useGrid = () => {
  const context = useContext(GridContext);
  if (!context) {
    throw new Error("useGrid must be used within a GridProvider");
  }
  return context;
};

export const GridProvider = ({ children }: GridProviderProps) => {
  const gridCountRef = useRef(0);

  const registerGrid = useCallback(() => {
    gridCountRef.current++;
  }, []);

  const unregisterGrid = useCallback(() => {
    gridCountRef.current--;
  }, []);

  const contextValue = useMemo(
    () => ({
      registerGrid,
      unregisterGrid,
    }),
    [registerGrid, unregisterGrid],
  );

  return (
    <GridContext.Provider value={contextValue}>{children}</GridContext.Provider>
  );
};
