import { type MouseEvent, type ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouchDevice } from "../../hooks/useIsTouchDevice";
import { useAccessibility } from "../../contexts/AccessibilityContext";

export function MagneticButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  const touch = useIsTouchDevice();
  const { shouldReduceMotion } = useAccessibility();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20 });
  const sy = useSpring(y, { stiffness: 260, damping: 20 });

  function move(event: MouseEvent<HTMLDivElement>) {
    if (touch || shouldReduceMotion) return;
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    x.set((event.clientX - box.left - box.width / 2) * 0.16);
    y.set((event.clientY - box.top - box.height / 2) * 0.16);
  }

  return <motion.div ref={ref} className={className} style={shouldReduceMotion ? undefined : { x: sx, y: sy }} onMouseMove={shouldReduceMotion ? undefined : move} onMouseLeave={shouldReduceMotion ? undefined : () => { x.set(0); y.set(0); }}>{children}</motion.div>;
}
