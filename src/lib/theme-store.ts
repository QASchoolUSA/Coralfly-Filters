"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { safeLocalStorage } from "@/lib/safe-storage";

export type Theme = "light" | "dark" | "system";

type ThemeState = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initTheme: () => void;
};

export function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyThemeToDOM(resolved: "light" | "dark") {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (resolved === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
    root.setAttribute("data-theme", "dark");
  } else {
    root.classList.add("light");
    root.classList.remove("dark");
    root.setAttribute("data-theme", "light");
  }
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      resolvedTheme: "light",
      setTheme: (theme: Theme) => {
        const resolved = theme === "system" ? getSystemTheme() : theme;
        applyThemeToDOM(resolved);
        try {
          localStorage.setItem("coralfly-theme", theme);
        } catch {}
        set({ theme, resolvedTheme: resolved });
      },
      toggleTheme: () => {
        const current = get().resolvedTheme;
        const next: Theme = current === "dark" ? "light" : "dark";
        get().setTheme(next);
      },
      initTheme: () => {
        if (typeof window === "undefined") return;
        let savedTheme: Theme = "light";
        try {
          const raw = localStorage.getItem("coralfly-theme");
          if (raw === "dark" || raw === "light" || raw === "system") {
            savedTheme = raw;
          }
        } catch {}

        const resolved = savedTheme === "system" ? getSystemTheme() : savedTheme;
        applyThemeToDOM(resolved);
        set({ theme: savedTheme, resolvedTheme: resolved });

        // Listen for system theme changes if set to system
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = () => {
          if (get().theme === "system") {
            const nextResolved = getSystemTheme();
            applyThemeToDOM(nextResolved);
            set({ resolvedTheme: nextResolved });
          }
        };
        media.addEventListener("change", handler);
      },
    }),
    {
      name: "coralfly-theme-store",
      storage: safeLocalStorage,
    }
  )
);
