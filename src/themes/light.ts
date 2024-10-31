import { WidgetConfig } from "@lifi/widget";

export const lightTheme: Partial<WidgetConfig> = {
  theme: {
    palette: {
      primary: { main: "#121312" },
      secondary: { main: "#00B460" },
    },
    container: {
      border: "1px solid rgb(234, 234, 234)",
      borderRadius: "16px",
    },
    typography: {
      fontFamily: '"DM Sans", Inter, system-ui, Helvetica, Arial, sans-serif',
    },
  },
};
