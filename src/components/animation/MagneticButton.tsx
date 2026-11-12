import { type MouseEvent, type ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsTouchDevice } from "../../hooks/useIsTouchDevice";

export function MagneticButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  const touch = useIsTouchDevice();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20 });
  const sy = useSpring(y, { stiffness: 260, damping: 20 });

  function move(event: MouseEvent<HTMLDivElement>) {
    if (touch) return;
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    x.set((event.clientX - box.left - box.width / 2) * 0.16);
    y.set((event.clientY - box.top - box.height / 2) * 0.16);
  }

  return <motion.div ref={ref} className={className} style={{ x: sx, y: sy }} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }}>{children}</motion.div>;
}
