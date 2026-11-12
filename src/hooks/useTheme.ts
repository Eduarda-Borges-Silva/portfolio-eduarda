import { useEffect, useState } from "react";
type Theme = "dark" | "light";
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const initial = saved ?? (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.classList.toggle("dark", initial === "dark");
    return initial;
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#080b14" : "#f7f8fc");
  }, [theme]);
  return { theme, toggleTheme: () => setTheme(v => v === "dark" ? "light" : "dark") };
}
