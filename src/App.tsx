import { LiFiWidget, WidgetConfig } from "@lifi/widget";
import { usePrefersColorScheme } from "./hooks/usePrefersColorScheme";
import { useMemo } from "react";
import { darkTheme } from "./themes/dark";
import { lightTheme } from "./themes/light";

export function App() {
  const { isDarkMode } = usePrefersColorScheme();
  // const {
  //   shouldBatchTransactions,
  //   sendBatchTransaction,
  //   getMultisigTransactionDetails,
  // } = useSafeMultisig();
  const config = useMemo(
    (): Partial<WidgetConfig> => ({
      variant: "wide",
      requiredUI: ["toAddress"],
      sdkConfig: {
        // providers: [
        //   EVM({
        //     multisig: {
        //       isMultisigWalletClient: true,
        //       shouldBatchTransactions,
        //       sendBatchTransaction,
        //       getMultisigTransactionDetails,
        //     },
        //   }),
        // ],
      },
      ...(isDarkMode ? darkTheme : lightTheme),
    }),
    [
      // getMultisigTransactionDetails,
      // isDarkMode,
      // sendBatchTransaction,
      // shouldBatchTransactions,
    ]
  );
  return (
    <main className="main">
      <LiFiWidget integrator="fee-demo" config={config} />
    </main>
  );
}
