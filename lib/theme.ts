export type ThemeId = "minimal" | "colorful";

export const THEME_STORAGE_KEY = "cadmus-theme";

export function readStoredTheme(): ThemeId | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(THEME_STORAGE_KEY);
  if (v === "minimal" || v === "colorful") return v;
  return null;
}

export function writeStoredTheme(theme: ThemeId): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  document.documentElement.setAttribute("data-theme", theme);
}

export function applyThemeToDocument(theme: ThemeId): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
}
