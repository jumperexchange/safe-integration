import { Appearance, LiFiWidget, WidgetConfig } from "@lifi/widget";
import { usePrefersColorScheme } from "./hooks/usePrefersColorScheme";
import { useMemo } from "react";
import { darkTheme } from "./themes/dark";
import { lightTheme } from "./themes/light";
import { useQueryParams } from "./hooks/useQueryParams";

export function App() {
  const { isDarkMode } = usePrefersColorScheme();
  const queryParams = useQueryParams();
  const config = useMemo((): Partial<WidgetConfig> => {
    const themeQueryParam = queryParams.get("theme");
    const useDarkMode = themeQueryParam
      ? themeQueryParam === "dark"
      : isDarkMode;
    return {
      variant: "wide",
      sdkConfig: {
        routeOptions: {
          allowSwitchChain: false,
        },
      },
      ...(useDarkMode ? darkTheme : lightTheme),
      appearance: themeQueryParam ? (themeQueryParam as Appearance) : "auto",
    };
  }, [isDarkMode, queryParams]);
  return (
    <main className="main">
      <LiFiWidget integrator="safe-app" config={config} />
    </main>
  );
}
