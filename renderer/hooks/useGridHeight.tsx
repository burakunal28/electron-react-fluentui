import { useGrid } from "@context/grid/GridContext";
import { useEffect } from "react";

export const useGridHeight = () => {
  const { registerGrid, unregisterGrid } = useGrid();

  useEffect(() => {
    registerGrid();
    return () => unregisterGrid();
  }, [registerGrid, unregisterGrid]);
};
