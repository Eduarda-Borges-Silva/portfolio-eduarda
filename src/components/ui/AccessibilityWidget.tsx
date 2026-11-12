import { useEffect, useRef, useState } from "react";
import { Accessibility, Minus, Plus, RotateCcw, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAccessibility } from "../../contexts/AccessibilityContext";

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const {
    preferences,
    systemReducedMotion,
    shouldReduceMotion,
    updatePreference,
    setFontScale,
    resetPreferences
  } = useAccessibility();

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  function closePanel() {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }

  function togglePreference(key: "highContrast" | "increasedSpacing" | "underlineLinks" | "pauseAnimations" | "emphasizeFocus" | "readableFont") {
    updatePreference(key, !preferences[key]);
  }

  return (
    <div className="accessibility-widget">
      <button
        ref={triggerRef}
        type="button"
        className="accessibility-trigger"
        aria-label={open ? "Fechar recursos de acessibilidade" : "Abrir recursos de acessibilidade"}
        aria-expanded={open}
        aria-controls="accessibility-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <Accessibility size={19} aria-hidden="true" />
        <span>Acessibilidade</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.section
            id="accessibility-panel"
            className="accessibility-panel"
            role="dialog"
            aria-modal="false"
            aria-labelledby="accessibility-title"
            tabIndex={-1}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12, scale: .98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: 8, scale: .98 }}
            transition={{ duration: shouldReduceMotion ? 0 : .18 }}
            onKeyDown={(event) => {
              if (event.key === "Escape") closePanel();
            }}
          >
            <header className="accessibility-panel-header">
              <div>
                <span>Preferências</span>
                <h2 id="accessibility-title">Acessibilidade</h2>
              </div>
              <button ref={closeRef} type="button" className="accessibility-close" aria-label="Fechar painel" onClick={closePanel}>
                <X size={18} />
              </button>
            </header>

            <fieldset className="accessibility-font-size">
              <legend>Tamanho do texto</legend>
              <div className="accessibility-font-controls">
                <button
                  type="button"
                  aria-label="Diminuir tamanho do texto"
                  disabled={preferences.fontScale <= .9}
                  onClick={() => setFontScale(preferences.fontScale - .1)}
                >
                  <Minus size={17} />
                </button>
                <output aria-live="polite">{Math.round(preferences.fontScale * 100)}%</output>
                <button
                  type="button"
                  aria-label="Aumentar tamanho do texto"
                  disabled={preferences.fontScale >= 1.4}
                  onClick={() => setFontScale(preferences.fontScale + .1)}
                >
                  <Plus size={17} />
                </button>
              </div>
            </fieldset>

            <div className="accessibility-options">
              <ToggleOption label="Alto contraste" checked={preferences.highContrast} onClick={() => togglePreference("highContrast")} />
              <ToggleOption label="Espaçamento do texto" checked={preferences.increasedSpacing} onClick={() => togglePreference("increasedSpacing")} />
              <ToggleOption label="Sublinhar links" checked={preferences.underlineLinks} onClick={() => togglePreference("underlineLinks")} />
              <ToggleOption label="Destaque de foco" checked={preferences.emphasizeFocus} onClick={() => togglePreference("emphasizeFocus")} />
              <ToggleOption label="Fonte sem serifa" checked={preferences.readableFont} onClick={() => togglePreference("readableFont")} />
              <ToggleOption
                label="Reduzir animações"
                checked={shouldReduceMotion}
                disabled={systemReducedMotion && !preferences.pauseAnimations}
                description={systemReducedMotion ? "Ativado pela preferência do sistema." : undefined}
                onClick={() => togglePreference("pauseAnimations")}
              />
            </div>

            <button type="button" className="accessibility-reset" onClick={resetPreferences}>
              <RotateCcw size={15} />
              Restaurar padrão
            </button>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

function ToggleOption({
  label,
  checked,
  disabled = false,
  description,
  onClick
}: {
  label: string;
  checked: boolean;
  disabled?: boolean;
  description?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="accessibility-option"
      aria-pressed={checked}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="accessibility-option-copy">
        <span>{label}</span>
        {description && <small>{description}</small>}
      </span>
      <span className={`accessibility-switch ${checked ? "is-on" : ""}`} aria-hidden="true" />
    </button>
  );
}
