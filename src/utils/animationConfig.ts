export const animationConfig = {
  duration: { fast: 0.25, normal: 0.55, slow: 0.9, cinematic: 1.4 },
  ease: {
    standard: [0.22, 1, 0.36, 1] as const,
    smooth: [0.16, 1, 0.3, 1] as const
  },
  stagger: { fast: 0.04, normal: 0.08, slow: 0.14 },
  distance: { short: 18, normal: 42, long: 86 }
};
