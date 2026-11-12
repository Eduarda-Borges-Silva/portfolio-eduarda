import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "../../hooks/useActiveSection";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useAccessibility } from "../../contexts/AccessibilityContext";

const nav = [["inicio","Início"],["sobre","Sobre"],["tecnologias","Tecnologias"],["projetos","Projetos"],["experiencia","Experiência"],["formacao","Formação"],["contato","Contato"]] as const;

export function Header({ theme, onToggle, isProjectsPage }: { theme: "dark" | "light"; onToggle: () => void; isProjectsPage: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { shouldReduceMotion: reduced } = useAccessibility();
  const ids = useMemo(() => nav.map((item) => item[0]), []);
  const activeSection = useActiveSection(ids);
  const active = isProjectsPage ? "projetos" : activeSection;

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 30);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <motion.header
      initial={reduced ? false : { y: -90 }}
      animate={{ y: 0 }}
      transition={{ duration: reduced ? 0 : .8, delay: reduced ? 0 : .25 }}
      className={`v2-header ${scrolled ? "is-scrolled" : ""}`}
    >
      <div className="container v2-header-inner">
        <a href={isProjectsPage ? "/#inicio" : "#inicio"} className="brand-mark" aria-label="Ir para o início"><span>EB</span><i /></a>

        <nav className="hidden gap-1 lg:flex" aria-label="Navegação principal">
          {nav.map(([id, label]) => (
            <a
              key={id}
              href={id === "projetos" ? "/projetos" : isProjectsPage ? `/#${id}` : `#${id}`}
              className={`premium-nav-link ${active === id ? "is-active" : ""}`}
              aria-current={isProjectsPage && id === "projetos" ? "page" : undefined}
            >
              {active === id && (reduced ? <span className="nav-active-pill" /> : <motion.span layoutId="active-nav" className="nav-active-pill" />)}
              <span>{label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggle} />
          <button type="button" className="icon-btn lg:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="v2-mobile-overlay" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduced ? undefined : { opacity: 0 }}>
            <motion.nav
              initial={reduced ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={reduced ? undefined : { x: "100%" }}
              transition={{ duration: reduced ? 0 : .55, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Menu móvel"
              id="mobile-navigation"
            >
              <div className="mobile-menu-grid" aria-hidden="true" />
              {nav.map(([id, label], index) => (
                <motion.a
                  key={id}
                  href={id === "projetos" ? "/projetos" : isProjectsPage ? `/#${id}` : `#${id}`}
                  onClick={() => setOpen(false)}
                  initial={reduced ? false : { opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduced ? 0 : .15 + index * .055, duration: reduced ? 0 : undefined }}
                >
                  <span>0{index + 1}</span>{label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
