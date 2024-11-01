import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useQueryParams() {
  const location = useLocation();
  const [queryParams, setQueryParams] = useState(
    () => new URLSearchParams(location.search)
  );

  useEffect(() => {
    setQueryParams(new URLSearchParams(location.search));
  }, [location.search]);

  return queryParams;
}
