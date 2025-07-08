import { LocationContext } from "@context/location/locationContext";
import { useContext } from "react";
import type { LocationContextProps } from "@/types/context/location";

export const useLocation = (): LocationContextProps => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
