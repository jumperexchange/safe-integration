import { ChainId, HiddenUI, LiFiWidget, WidgetConfig } from "@lifi/widget";
import { useColorScheme } from "./hooks/useColorScheme";
import { useAllowDenyLists } from "./hooks/useAllowDenyLists";
import { useMemo } from "react";
import { darkTheme } from "./themes/dark";
import { lightTheme } from "./themes/light";
import { useQueryParams } from "./hooks/useQueryParams";
import { useDefaultChain } from "./hooks/useDefaultChain";
export function App() {
  const searchParams = useQueryParams();
  const colorScheme = useColorScheme(searchParams);
  const allowDenyLists = useAllowDenyLists(searchParams);
  const defaultFromChain = useDefaultChain(searchParams);

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
          deny: [ChainId.SOL, ChainId.BTC, ChainId.SUI],
          ...(defaultFromChain ? { allow: [defaultFromChain] } : {}),
        },
        to: {
          ...(defaultFromChain ? { deny: [defaultFromChain] } : {}),
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
      languageResources: {
        en: {
          button: {
            exchange: "Bridge",
          },
          header: {
            exchange: "Bridge",
            from: "Bridge from",
            to: "Bridge to",
          },
        },
      },
    };
  }, [colorScheme, allowDenyLists, defaultFromChain]);

  return (
    <main className="main">
      <LiFiWidget integrator="safe-app" config={config} />
    </main>
  );
}
