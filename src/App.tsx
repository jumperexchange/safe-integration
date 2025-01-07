import { ChainId, HiddenUI, LiFiWidget, WidgetConfig } from "@lifi/widget";
import { useColorScheme } from "./hooks/useColorScheme";
import { useAllowDenyLists } from "./hooks/useAllowDenyLists";
import { useMemo } from "react";
import { darkTheme } from "./themes/dark";
import { lightTheme } from "./themes/light";

export function App() {
  const colorScheme = useColorScheme();
  const allowDenyLists = useAllowDenyLists();

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
      hiddenUI: [HiddenUI.WalletMenu],
      chains: {
        deny: allowDenyLists.chains?.deny,
        allow: allowDenyLists.chains?.allow,
        from: {
          deny: [ChainId.SOL, ChainId.BTC],
        },
      },
      bridges: allowDenyLists.bridges ?? {
        deny: [
          "cbridge",
          "celerim",
          "stargateV2",
          "stargateV2Bus",
          "mayan",
          "mayanWH",
          "mayanMCTP",
        ],
      },
      exchanges: allowDenyLists.exchanges,
    };
  }, [colorScheme, allowDenyLists]);

  return (
    <main className="main">
      <LiFiWidget integrator="safe-app" config={config} />
    </main>
  );
}
