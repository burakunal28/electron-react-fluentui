import { useTab } from "@context/tabs/TabContext";
import { routes } from "@routes/routes";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { UseRouteTabsReturn } from "@/types/hooks/routeTabs";

/**
 * Hook that returns tab information of the current route
 */
export const useRouteTabs = (): UseRouteTabsReturn => {
  const location = useLocation();
  const { setSelectedTab } = useTab();

  // Find current route
  const currentRoute = routes.find((route) => route.path === location.pathname);

  // Set tab information and select first tab
  useEffect(() => {
    if (currentRoute?.tabs && Object.keys(currentRoute.tabs).length > 0) {
      // Select first tab
      const firstTabKey = Object.keys(currentRoute.tabs)[0];
      setSelectedTab(currentRoute.tabs[firstTabKey].label);
    } else {
      // Clear selectedTab if no tabs exist
      setSelectedTab(null);
    }
  }, [currentRoute, setSelectedTab]);

  // Create tabKeys and tabLabels
  const tabKeys = currentRoute?.tabs ? Object.keys(currentRoute.tabs) : [];
  const tabLabels: Record<string, string> = {};

  if (currentRoute?.tabs) {
    for (const [key, { label }] of Object.entries(currentRoute.tabs)) {
      tabLabels[key] = label;
    }
  }

  return {
    hasTabs: tabKeys.length > 0,
    tabKeys,
    tabLabels,
  };
};
