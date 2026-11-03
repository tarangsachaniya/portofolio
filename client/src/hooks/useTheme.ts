import { useCallback, useState } from "react";

export type Theme = "dark" | "light";
const STORAGE_KEY = "theme";

/**
 * Light ("paper") is the default; `.dark` on <html> opts into night shift.
 * The initial class is set by an inline script in index.html (no flash).
 */
function current(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(current);
  const toggle = useCallback(() => {
    const next: Theme = current() === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage disabled: class still applies */
    }
    setTheme(next);
  }, []);
  return { theme, toggle };
}
