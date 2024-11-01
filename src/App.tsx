import { LiFiWidget, WidgetConfig } from "@lifi/widget";
import { useColorScheme } from "./hooks/useColorScheme";
import { useMemo } from "react";
import { darkTheme } from "./themes/dark";
import { lightTheme } from "./themes/light";

export function App() {
  const colorScheme = useColorScheme();
  const config = useMemo((): Partial<WidgetConfig> => {
    return {
      variant: "wide",
      sdkConfig: {
        routeOptions: {
          allowSwitchChain: false,
        },
      },
      ...(colorScheme === "dark" ? darkTheme : lightTheme),
      appearance: colorScheme,
    };
  }, [colorScheme]);
  return (
    <main className="main">
      <LiFiWidget integrator="safe-app" config={config} />
    </main>
  );
}
