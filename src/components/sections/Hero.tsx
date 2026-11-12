import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowDown, Mail } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { SocialLinks } from "../ui/SocialLinks";
import { MagneticButton } from "../animation/MagneticButton";
import { animationConfig } from "../../utils/animationConfig";
import { useAccessibility } from "../../contexts/AccessibilityContext";

const words = ["Front-end", "Back-end", "Interfaces", "APIs", "Sistemas"];
const HeroScene = lazy(() => import("../ui/HeroScene"));

export function Hero() {
  const { shouldReduceMotion: reduced } = useAccessibility();
  const [word, setWord] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setWord((value) => (value + 1) % words.length), 2100);
    return () => window.clearInterval(id);
  }, [reduced]);

  const sequence = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : animationConfig.stagger.normal, delayChildren: reduced ? 0 : .12 } }
  };
  const item = {
    hidden: reduced ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 28, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: reduced ? 0 : .8, ease: animationConfig.ease.smooth } }
  };

  return (
    <section id="inicio" className="v2-hero">
      <div className="section-ambient hero-ambient" />
      <div className="hero-technical-label hero-label-left">SYSTEM / 01</div>
      <div className="hero-technical-label hero-label-right">FRANCA — SP / BR</div>

      <div className="container hero-layout">
        <motion.div className="hero-copy" variants={sequence} initial={reduced ? false : "hidden"} animate="visible">
          <motion.p variants={item} className="hero-eyebrow">Olá, eu sou</motion.p>

          <div className="hero-name-mask">
            <motion.h1
              initial={reduced ? false : { y: "110%", skewY: 4 }}
              animate={{ y: 0, skewY: 0 }}
              transition={{ duration: reduced ? 0 : 1.05, delay: reduced ? 0 : .18, ease: animationConfig.ease.smooth }}
            >
              Eduarda Borges
            </motion.h1>
          </div>

          <motion.div variants={item} className="hero-role-line">
            <h2>Desenvolvedora Full Stack</h2>
            <span className="hero-word-switch">
              <AnimatePresence mode="wait">
                <motion.b
                  key={words[word]}
                  initial={reduced ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduced ? undefined : { opacity: 0, y: -14, filter: "blur(6px)" }}
                  transition={{ duration: reduced ? 0 : .35 }}
                >
                  {words[word]}
                </motion.b>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.p variants={item} className="hero-description">
            Engenharia de software, interfaces, APIs e sistemas conectados em experiências digitais claras, eficientes e cuidadosamente construídas.
          </motion.p>

          <motion.div variants={item} className="hero-actions">
            <MagneticButton><a className="btn-primary premium-button" href="#projetos"><ArrowDown size={18}/>Explorar projetos</a></MagneticButton>
            <MagneticButton><a className="btn-secondary premium-button" href="#contato"><Mail size={18}/>Entrar em contato</a></MagneticButton>
          </motion.div>

          <motion.div variants={item} className="hero-social-row">
            <SocialLinks />
            <span className="hero-availability"><i /> Disponível para oportunidades</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-stage"
          initial={reduced ? false : { opacity: 0, scale: .9, filter: "blur(16px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: reduced ? 0 : 1.2, delay: reduced ? 0 : .28, ease: animationConfig.ease.smooth }}
        >
          <div className="hero-visual" aria-hidden="true">
            <Suspense fallback={null}><HeroScene /></Suspense>
            <div className="hero-visual-orbit hero-visual-orbit-one" />
            <div className="hero-visual-orbit hero-visual-orbit-two" />
            <div className="hero-visual-card">
              <span className="hero-visual-label">DIGITAL CRAFT</span>
              <strong>EB<span>.</span></strong>
              <div className="hero-code-line"><i /><i /><i /></div>
              <div className="hero-code-line short"><i /><i /></div>
              <div className="hero-visual-footer"><span>FRONT-END</span><span>BACK-END</span><span>API</span></div>
            </div>
            <span className="hero-float-chip hero-chip-one">&lt;/&gt;</span>
            <span className="hero-float-chip hero-chip-two">{"{ }"}</span>
            <span className="hero-float-chip hero-chip-three">SQL</span>
          </div>
          <div className="hero-stage-ring" />
          <div className="hero-stage-caption"><span>WORKSTATION</span><b>FULL STACK SYSTEM</b></div>
        </motion.div>
      </div>

      <a className="hero-scroll-indicator" href="#sobre">
        <span>Role para explorar</span><i />
      </a>
    </section>
  );
}
