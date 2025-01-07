import { useState, useEffect } from "react";

export function useQueryParams() {
  const [queryParams, setQueryParams] = useState(
    () => new URLSearchParams(window.location.search)
  );

  useEffect(() => {
    const handleUrlChange = () => {
      setQueryParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener("popstate", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);

  return queryParams;
}
