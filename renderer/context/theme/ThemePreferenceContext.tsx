import React from "react";
import type { ThemePreferenceContextType } from "@/types/context/theme";

export const ThemePreferenceContext =
  React.createContext<ThemePreferenceContextType>({
    themePreference: "system",
    setThemePreference: (_theme: string) => {},
  });
