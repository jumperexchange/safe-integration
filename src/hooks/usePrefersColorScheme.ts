import { useState, useEffect, useLayoutEffect } from "react";
import { useQueryParams } from "./useQueryParams";

export function usePrefersColorScheme() {
  const queryParams = useQueryParams();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const themeQueryParam = queryParams.get("theme");
    const isDarkPrefered =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return themeQueryParam ? themeQueryParam === "dark" : isDarkPrefered;
  });

  useLayoutEffect(() => {
    const theme = queryParams.get("theme");

    if (theme === "dark" || theme === "light") {
      document.body.classList.remove("dark", "light");
      document.body.classList.add(theme);
    } else {
      document.body.classList.remove("dark", "light");
    }
  }, [queryParams]);

  useEffect(() => {
    const themeQueryParam = queryParams.get("theme");
    if (themeQueryParam) {
      return;
    }
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event: MediaQueryListEvent) => {
      setIsDarkMode(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [queryParams]);

  return { isDarkMode };
}
