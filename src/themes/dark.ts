import { WidgetConfig } from "@lifi/widget";

export const darkTheme: Partial<WidgetConfig> = {
  theme: {
    palette: {
      primary: { main: "#12ff80" },
      secondary: { main: "#00B460" },
    },
    container: {
      border: "1px solid rgba(255, 255, 255, 0.12)",
      borderRadius: "6px",
    },
    shape: {
      borderRadius: 6,
      borderRadiusSecondary: 6,
    },
    typography: {
      fontFamily: '"DM Sans", Inter, system-ui, Helvetica, Arial, sans-serif',
    },
  },
};
