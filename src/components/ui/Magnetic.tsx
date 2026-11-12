import { type MouseEvent, type ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useAccessibility } from "../../contexts/AccessibilityContext";

export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { shouldReduceMotion } = useAccessibility();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18 });
  const springY = useSpring(y, { stiffness: 220, damping: 18 });

  function move(event: MouseEvent<HTMLDivElement>) {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    x.set((event.clientX - (bounds.left + bounds.width / 2)) * 0.16);
    y.set((event.clientY - (bounds.top + bounds.height / 2)) * 0.16);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={shouldReduceMotion ? undefined : { x: springX, y: springY }}
      onMouseMove={shouldReduceMotion ? undefined : move}
      onMouseLeave={shouldReduceMotion ? undefined : () => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.div>
  );
}
