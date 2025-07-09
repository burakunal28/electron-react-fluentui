import { LocationContext } from "@context/location/locationContext";
import { useContext } from "react";
import type { LocationContextProps } from "@/types/context/location";

export const useLocationContext = (): LocationContextProps => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error(
      "useLocationContext must be used within a LocationProvider",
    );
  }
  return context;
};
