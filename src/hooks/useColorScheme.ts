import { useState, useEffect, useLayoutEffect } from "react";
import { useQueryParams } from "./useQueryParams";
import { Appearance } from "@lifi/widget";

export function useColorScheme(): Appearance {
  const queryParams = useQueryParams();
  const [colorScheme, setColorScheme] = useState<Appearance>(() => {
    const themeQueryParam = queryParams.get("theme");
    if (themeQueryParam === "dark" || themeQueryParam === "light") {
      return themeQueryParam;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useLayoutEffect(() => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(colorScheme);
  }, [colorScheme]);

  useEffect(() => {
    const themeQueryParam = queryParams.get("theme");

    if (themeQueryParam === "dark" || themeQueryParam === "light") {
      setColorScheme(themeQueryParam);
    }

    const handleMessage = (event: {
      data: { data: { darkMode: boolean } };
    }) => {
      if (event.data?.data && "darkMode" in event.data.data) {
        setColorScheme(event.data.data.darkMode ? "dark" : "light");
      }
    };
    window.addEventListener("message", handleMessage);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMediaChange = (event: MediaQueryListEvent) => {
      if (!themeQueryParam) {
        setColorScheme(event.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("message", handleMessage);
    };
  }, [queryParams]);

  return colorScheme;
}
