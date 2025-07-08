import { routes } from "@routes/routes";
import type React from "react";
import { createContext, useEffect, useState } from "react";
import { useLocation as useReactRouterLocation } from "react-router-dom";
import type { LocationContextProps } from "@/types/context/location";

export const LocationContext = createContext<LocationContextProps | undefined>(
  undefined,
);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useReactRouterLocation();
  const [contextValue, setContextValue] = useState<LocationContextProps>({
    pathname: location.pathname,
    title:
      routes.find((route) => route.path === location.pathname)?.title ?? "Home",
  });

  useEffect(() => {
    const currentRoute = routes.find(
      (route) => route.path === location.pathname,
    );
    setContextValue({
      pathname: location.pathname,
      title: currentRoute?.title ?? "Home",
    });
  }, [location]);

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};
