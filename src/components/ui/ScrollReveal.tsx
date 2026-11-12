import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { useAccessibility } from "../../contexts/AccessibilityContext";

type Direction = "left" | "right" | "up" | "scale";

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
  viewportAmount = .18,
  duration = .9
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  viewportAmount?: number;
  duration?: number;
}) {
  const { shouldReduceMotion: reduced } = useAccessibility();

  const initial = {
    left: { opacity: 0, x: -90, rotateY: 10, filter: "blur(12px)" },
    right: { opacity: 0, x: 90, rotateY: -10, filter: "blur(12px)" },
    up: { opacity: 0, y: 70, filter: "blur(12px)" },
    scale: { opacity: 0, scale: 0.88, y: 30, filter: "blur(10px)" }
  }[direction];

  return (
    <motion.div
      className={className}
      initial={reduced ? false : initial}
      whileInView={{ opacity: 1, x: 0, y: 0, rotateY: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: viewportAmount, margin: "0px 0px -8% 0px" }}
      transition={{ duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
