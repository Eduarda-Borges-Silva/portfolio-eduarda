import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MotionConfig } from "framer-motion";

const storageKey = "portfolio-accessibility";
const defaultPreferences = {
  fontScale: 1,
  highContrast: false,
  increasedSpacing: false,
  underlineLinks: false,
  pauseAnimations: false,
  emphasizeFocus: false,
  readableFont: false
};

export type AccessibilityPreferences = typeof defaultPreferences;
type TogglePreference = Exclude<keyof AccessibilityPreferences, "fontScale">;

interface AccessibilityContextValue {
  preferences: AccessibilityPreferences;
  systemReducedMotion: boolean;
  shouldReduceMotion: boolean;
  updatePreference: (key: TogglePreference, value: boolean) => void;
  setFontScale: (value: number) => void;
  resetPreferences: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

function getStoredPreferences(): AccessibilityPreferences {
  const stored = localStorage.getItem(storageKey);
  if (!stored) return { ...defaultPreferences };

  try {
    const parsed: unknown = JSON.parse(stored);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      localStorage.removeItem(storageKey);
      console.warn("Invalid accessibility preferences were reset.");
      return { ...defaultPreferences };
    }
    const saved = parsed as Partial<AccessibilityPreferences>;
    return {
      fontScale: typeof saved.fontScale === "number" && Number.isFinite(saved.fontScale)
        ? Math.min(1.4, Math.max(.9, saved.fontScale))
        : defaultPreferences.fontScale,
      highContrast: typeof saved.highContrast === "boolean" ? saved.highContrast : false,
      increasedSpacing: typeof saved.increasedSpacing === "boolean" ? saved.increasedSpacing : false,
      underlineLinks: typeof saved.underlineLinks === "boolean" ? saved.underlineLinks : false,
      pauseAnimations: typeof saved.pauseAnimations === "boolean" ? saved.pauseAnimations : false,
      emphasizeFocus: typeof saved.emphasizeFocus === "boolean" ? saved.emphasizeFocus : false,
      readableFont: typeof saved.readableFont === "boolean" ? saved.readableFont : false
    };
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
    localStorage.removeItem(storageKey);
    return { ...defaultPreferences };
  }
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState(getStoredPreferences);
  const [systemReducedMotion, setSystemReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const shouldReduceMotion = systemReducedMotion || preferences.pauseAnimations;

  const updatePreference = useCallback((key: TogglePreference, value: boolean) => {
    setPreferences((current) => ({ ...current, [key]: value }));
  }, []);

  const setFontScale = useCallback((value: number) => {
    const scale = Math.min(1.4, Math.max(.9, Math.round(value * 10) / 10));
    setPreferences((current) => ({ ...current, fontScale: scale }));
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferences({ ...defaultPreferences });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateSystemPreference = () => setSystemReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", updateSystemPreference);
    return () => mediaQuery.removeEventListener("change", updateSystemPreference);
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(preferences));
    const root = document.documentElement;
    root.style.setProperty("--a11y-font-scale", String(preferences.fontScale));
    root.classList.toggle("a11y-high-contrast", preferences.highContrast);
    root.classList.toggle("a11y-increased-spacing", preferences.increasedSpacing);
    root.classList.toggle("a11y-underline-links", preferences.underlineLinks);
    root.classList.toggle("a11y-reduce-motion", shouldReduceMotion);
    root.classList.toggle("a11y-emphasize-focus", preferences.emphasizeFocus);
    root.classList.toggle("a11y-readable-font", preferences.readableFont);
  }, [preferences, shouldReduceMotion]);

  const contextValue = useMemo(() => ({
    preferences,
    systemReducedMotion,
    shouldReduceMotion,
    updatePreference,
    setFontScale,
    resetPreferences
  }), [preferences, systemReducedMotion, shouldReduceMotion, updatePreference, setFontScale, resetPreferences]);

  return (
    <AccessibilityContext.Provider value={contextValue}>
      <MotionConfig
        reducedMotion={shouldReduceMotion ? "always" : "never"}
        transition={shouldReduceMotion ? { duration: 0 } : undefined}
      >
        {children}
      </MotionConfig>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error("useAccessibility must be used within AccessibilityProvider.");
  return context;
}
