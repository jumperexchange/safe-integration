import { WidgetConfig, WidgetThemeComponents } from "@lifi/widget";

export const darkTheme: Partial<WidgetConfig> = {
  theme: {
    palette: {
      primary: { main: "#12FF80" },
      secondary: { main: "#A1A3A7" },
      text: {
        primary: "#FFFFFF",
        secondary: "#A1A3A7",
      },
      background: {
        default: "#121312",
        paper: "#1C1C1C",
      },
      success: {
        main: "#00B460",
      },
      warning: {
        main: "#FF8061",
      },
      error: {
        main: "#FF5F72",
      },
      info: {
        main: "#5FDDFF",
      },
      common: {
        black: "#121312",
        white: "#ffffff",
      },
    },
    container: {
      border: "1px solid rgba(255, 255, 255, 0.12)",
      borderRadius: "6px",
      maxHeight: 720,
    },
    shape: {
      borderRadius: 6,
      borderRadiusSecondary: 6,
    },
    typography: {
      fontFamily: '"DM Sans", Inter, system-ui, Helvetica, Arial, sans-serif',
    },
    components: {
      MuiCard: {
        defaultProps: { variant: "filled" },
      },
    } as unknown as WidgetThemeComponents,
  },
};
