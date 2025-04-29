import { HiddenUI, LiFiWidget, WidgetConfig } from "@lifi/widget";
import { useColorScheme } from "../hooks/useColorScheme";
import { useAllowDenyLists } from "../hooks/useAllowDenyLists";
import { useMemo } from "react";
import { darkTheme } from "../themes/dark";
import { lightTheme } from "../themes/light";
import { useQueryParams } from "../hooks/useQueryParams";
import { useDefaultChain } from "../hooks/useDefaultChain";
import { calculateFee } from "../utils/fee";

export function Swap() {
  const searchParams = useQueryParams();
  const colorScheme = useColorScheme(searchParams);
  const allowDenyLists = useAllowDenyLists(searchParams);
  const defaultFromChain = useDefaultChain(searchParams);

  const config = useMemo((): Partial<WidgetConfig> => {
    return {
      variant: "compact",
      sdkConfig: {
        routeOptions: {
          allowSwitchChain: false,
        },
      },
      ...(colorScheme === "dark" ? darkTheme : lightTheme),
      appearance: colorScheme,
      hiddenUI: [
        HiddenUI.WalletMenu,
        HiddenUI.Appearance,
        HiddenUI.ChainSelect,
      ],
      chains: {
        deny: allowDenyLists.chains?.deny,
        allow: allowDenyLists.chains?.allow,
        from: {
          ...(defaultFromChain ? { allow: [defaultFromChain] } : {}),
        },
        to: {
          ...(defaultFromChain ? { allow: [defaultFromChain] } : {}),
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
            exchange: "Swap",
          },
          header: {
            exchange: "Swap",
            from: "Swap from",
            to: "Swap to",
          },
        },
      },
      feeConfig: {
        calculateFee: calculateFee,
        name: "Widget",
        showFeePercentage: true,
      } as never,
    };
  }, [colorScheme, allowDenyLists, defaultFromChain]);

  return (
    <main className="main">
      <LiFiWidget integrator="safe-swap" config={config} />
    </main>
  );
}
