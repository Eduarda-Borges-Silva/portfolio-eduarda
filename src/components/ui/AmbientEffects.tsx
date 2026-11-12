import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function AmbientEffects() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  const [position, setPosition] = useState({ x: -300, y: -300 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    if (!media.matches) return;

    const move = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <motion.div
        className="cursor-aura"
        animate={{ x: position.x - 220, y: position.y - 220 }}
        transition={{ type: "spring", stiffness: 55, damping: 20, mass: 0.7 }}
        aria-hidden="true"
      />
      <div className="global-grid" aria-hidden="true" />
      <div className="noise-layer" aria-hidden="true" />
      <div className="ambient-blob ambient-blob-one" aria-hidden="true" />
      <div className="ambient-blob ambient-blob-two" aria-hidden="true" />
    </>
  );
}
