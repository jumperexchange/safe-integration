import { WidgetConfig, WidgetThemeComponents } from "@lifi/widget";

export const lightTheme: Partial<WidgetConfig> = {
  theme: {
    palette: {
      primary: { main: "#121312" },
      secondary: { main: "#12FF80" },
      text: {
        primary: "#121312",
        secondary: "#696969",
      },
      background: {
        default: "#FFFFFF",
        paper: "#F4F4F4",
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
      // info: {
      //   main: "#5FDDFF",
      // },
      common: {
        black: "#121312",
        white: "#ffffff",
      },
    },
    container: {
      border: "1px solid #dcdee0",
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
