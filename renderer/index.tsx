import { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles.scss";
import type { BrandVariants, Theme } from "@fluentui/react-components";
import {
  createDarkTheme,
  createLightTheme,
  FluentProvider,
} from "@fluentui/react-components";

// Use contextBridge
if (
  window.electron?.ipcRenderer &&
  typeof window.electron.ipcRenderer.on === "function"
) {
  window.electron.ipcRenderer.on(
    "main-process-message",
    (_event: unknown, message: unknown) => {
      console.log(message);
    },
  );
}

const theme: BrandVariants = {
  10: "#031612",
  20: "#0A2926",
  30: "#0F3D39",
  40: "#14524C",
  50: "#1A675F",
  60: "#207D72",
  70: "#269285",
  80: "#2DA898",
  90: "#35BEAB",
  100: "#3DD4BE",
  110: "#46EAD1",
  120: "#5FEDE0",
  130: "#78F0E9",
  140: "#91F3F2",
  150: "#AAF6FB",
  160: "#C3F9FF",
};

const lightTheme: Theme = createLightTheme(theme);
const darkTheme: Theme = createDarkTheme(theme);

const forcedBorderRadius = "4px";

lightTheme.borderRadiusNone = forcedBorderRadius;
lightTheme.borderRadiusSmall = forcedBorderRadius;
lightTheme.borderRadiusMedium = forcedBorderRadius;
lightTheme.borderRadiusLarge = forcedBorderRadius;
lightTheme.borderRadiusXLarge = forcedBorderRadius;
lightTheme.borderRadiusCircular = forcedBorderRadius;

darkTheme.borderRadiusNone = forcedBorderRadius;
darkTheme.borderRadiusSmall = forcedBorderRadius;
darkTheme.borderRadiusMedium = forcedBorderRadius;
darkTheme.borderRadiusLarge = forcedBorderRadius;
darkTheme.borderRadiusXLarge = forcedBorderRadius;
darkTheme.borderRadiusCircular = forcedBorderRadius;

lightTheme.colorBrandForeground1 = theme[110];
lightTheme.colorBrandForeground2 = theme[120];

darkTheme.colorBrandForeground1 = theme[110];
darkTheme.colorBrandForeground2 = theme[120];

const getSystemTheme = (): Theme => {
  const isDarkMode = window.matchMedia?.(
    "(prefers-color-scheme: dark)",
  ).matches;
  return isDarkMode ? darkTheme : lightTheme;
};

const getSystemThemePreference = (): "light" | "dark" => {
  const isDarkMode = window.matchMedia?.(
    "(prefers-color-scheme: dark)",
  ).matches;
  return isDarkMode ? "dark" : "light";
};

export function Main() {
  const [themePreference] = useState<"light" | "dark">(getSystemThemePreference());
  const [currentTheme, setCurrentTheme] = useState(getSystemTheme());

  const setTheme = useCallback((theme: Theme) => {
    const bodyClassList = document.body.classList;
    bodyClassList.remove("light", "dark");

    let themeName: string;
    if (theme === lightTheme) {
      bodyClassList.add("light");
      themeName = "light";
    } else if (theme === darkTheme) {
      bodyClassList.add("dark");
      themeName = "dark";
    } else {
      themeName = "light";
    }

    document.documentElement.setAttribute("data-theme", themeName);
    setCurrentTheme(theme);
  }, []);

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? darkTheme : lightTheme;
      setTheme(newTheme);
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    // Set initial theme based on preference
    switch (themePreference) {
      case "light":
        setTheme(lightTheme);
        break;
      case "dark":
        setTheme(darkTheme);
        break;
    }

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, [themePreference, setTheme]);

  return (
    <FluentProvider theme={currentTheme}>
      <div
        className={
          currentTheme === darkTheme ? "app-root-dark" : "app-root-light"
        }
      >
        <App />
      </div>
    </FluentProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Main />,
);
