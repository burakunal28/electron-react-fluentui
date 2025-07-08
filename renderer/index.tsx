import { useCallback, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles.scss";
import { ThemePreferenceContext } from "@context/theme/ThemePreferenceContext";
import type { BrandVariants, Theme } from "@fluentui/react-components";
import {
  createDarkTheme,
  createLightTheme,
  FluentProvider,
} from "@fluentui/react-components";

// Use contextBridge
if (window.ipcRenderer && typeof window.ipcRenderer.on === "function") {
  window.ipcRenderer.on("main-process-message", (_event, message) => {
    console.log(message);
  });
}

const userTheme: BrandVariants = {
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

const adminTheme: BrandVariants = {
  10: "#060200",
  20: "#251200",
  30: "#411900",
  40: "#591C00",
  50: "#731C00",
  60: "#911400",
  70: "#AE0004",
  80: "#C60014",
  90: "#DF0023",
  100: "#F22136",
  110: "#FF414E",
  120: "#FF676C",
  130: "#FF8387",
  140: "#FF9CA0",
  150: "#FFB3B8",
  160: "#FFC9CE",
};

const userLightTheme: Theme = createLightTheme(userTheme);
const userDarkTheme: Theme = createDarkTheme(userTheme);
const adminLightTheme: Theme = createLightTheme(adminTheme);
const adminDarkTheme: Theme = createDarkTheme(adminTheme);

const forcedBorderRadius = "4px";

userLightTheme.borderRadiusNone = forcedBorderRadius;
userLightTheme.borderRadiusSmall = forcedBorderRadius;
userLightTheme.borderRadiusMedium = forcedBorderRadius;
userLightTheme.borderRadiusLarge = forcedBorderRadius;
userLightTheme.borderRadiusXLarge = forcedBorderRadius;
userLightTheme.borderRadiusCircular = forcedBorderRadius;

userDarkTheme.borderRadiusNone = forcedBorderRadius;
userDarkTheme.borderRadiusSmall = forcedBorderRadius;
userDarkTheme.borderRadiusMedium = forcedBorderRadius;
userDarkTheme.borderRadiusLarge = forcedBorderRadius;
userDarkTheme.borderRadiusXLarge = forcedBorderRadius;
userDarkTheme.borderRadiusCircular = forcedBorderRadius;

adminLightTheme.borderRadiusNone = forcedBorderRadius;
adminLightTheme.borderRadiusSmall = forcedBorderRadius;
adminLightTheme.borderRadiusMedium = forcedBorderRadius;
adminLightTheme.borderRadiusLarge = forcedBorderRadius;
adminLightTheme.borderRadiusXLarge = forcedBorderRadius;
adminLightTheme.borderRadiusCircular = forcedBorderRadius;

adminDarkTheme.borderRadiusNone = forcedBorderRadius;
adminDarkTheme.borderRadiusSmall = forcedBorderRadius;
adminDarkTheme.borderRadiusMedium = forcedBorderRadius;
adminDarkTheme.borderRadiusLarge = forcedBorderRadius;
adminDarkTheme.borderRadiusXLarge = forcedBorderRadius;
adminDarkTheme.borderRadiusCircular = forcedBorderRadius;

userLightTheme.colorBrandForeground1 = userTheme[110];
userLightTheme.colorBrandForeground2 = userTheme[120];

adminDarkTheme.colorBrandForeground1 = adminTheme[110];
adminDarkTheme.colorBrandForeground2 = adminTheme[120];

const getSystemTheme = (): Theme => {
  const isDarkMode = window.matchMedia?.(
    "(prefers-color-scheme: dark)",
  ).matches;
  return isDarkMode ? userDarkTheme : userLightTheme;
};

export function Main() {
  const [themePreference, setThemePreference] = useState("system");
  const [currentTheme, setCurrentTheme] = useState(getSystemTheme());

  const contextValue = useMemo(
    () => ({
      themePreference,
      setThemePreference,
    }),
    [themePreference],
  );

  const setTheme = useCallback((theme: Theme) => {
    const bodyClassList = document.body.classList;
    bodyClassList.remove(
      "user-light",
      "user-dark",
      "admin-light",
      "admin-dark",
    );

    let themeName = "system"; // Default
    if (theme === userLightTheme) {
      bodyClassList.add("user-light");
      themeName = "user-light";
    } else if (theme === userDarkTheme) {
      bodyClassList.add("user-dark");
      themeName = "user-dark";
    } else if (theme === adminLightTheme) {
      bodyClassList.add("admin-light");
      themeName = "admin-light";
    } else if (theme === adminDarkTheme) {
      bodyClassList.add("admin-dark");
      themeName = "admin-dark";
    }

    document.documentElement.setAttribute("data-theme", themeName);
    setCurrentTheme(theme);
  }, []);

  useEffect(() => {
    let mq: MediaQueryList | undefined;
    let handleChange: ((e: MediaQueryListEvent) => void) | undefined;

    // Update theme based on selected theme preference
    switch (themePreference) {
      case "user-light":
        setTheme(userLightTheme);
        break;
      case "user-dark":
        setTheme(userDarkTheme);
        break;
      case "admin-light":
        setTheme(adminLightTheme);
        break;
      case "admin-dark":
        setTheme(adminDarkTheme);
        break;
      default: {
        // Get and apply system theme
        const systemTheme = getSystemTheme();
        setTheme(systemTheme);

        // Set up system theme listener
        mq = window.matchMedia("(prefers-color-scheme: dark)");
        handleChange = (e: MediaQueryListEvent) => {
          // Only update when 'system' is selected
          if (themePreference === "system") {
            setTheme(e.matches ? userDarkTheme : userLightTheme);
          }
        };

        mq.addEventListener("change", handleChange);
        break;
      }
    }

    // Cleanup function: runs when component unmounts or themePreference changes
    return () => {
      if (mq && handleChange) {
        mq.removeEventListener("change", handleChange);
      }
    };
  }, [themePreference, setTheme]);

  return (
    <FluentProvider theme={currentTheme}>
      <ThemePreferenceContext.Provider value={contextValue}>
        <div
          className={
            currentTheme === userDarkTheme || currentTheme === adminDarkTheme
              ? "app-root-dark"
              : "app-root-light"
          }
        >
          <App />
        </div>
      </ThemePreferenceContext.Provider>
    </FluentProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Main />,
);
