import { LiFiWidget, WidgetConfig } from "@lifi/widget";
import { usePrefersColorScheme } from "./hooks/usePrefersColorScheme";
import { useMemo } from "react";
import { darkTheme } from "./themes/dark";
import { lightTheme } from "./themes/light";

export function App() {
  const { isDarkMode } = usePrefersColorScheme();
  const config = useMemo(
    (): Partial<WidgetConfig> => ({
      variant: "wide",
      sdkConfig: {
        routeOptions: {
          allowSwitchChain: false,
        },
      },
      ...(isDarkMode ? darkTheme : lightTheme),
    }),
    [isDarkMode]
  );
  return (
    <main className="main">
      <LiFiWidget integrator="safe-app" config={config} />
    </main>
  );
}
