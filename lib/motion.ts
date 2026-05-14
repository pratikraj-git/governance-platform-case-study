import type { Variants, Transition } from 'framer-motion';

/**
 * Motion primitives — restrained, architectural.
 * Two easing curves, three reveals. Nothing else. Avoid bespoke
 * keyframes in section components; compose these instead.
 */

export const ease = {
  standard: [0.16, 1, 0.3, 1] as const,  // Confident reveal
  quiet:    [0.4, 0, 0.2, 1] as const,   // Crossfades, hover
} as const;

const baseDuration = 0.6;

const inViewTransition: Transition = {
  duration: baseDuration,
  ease: ease.standard,
};

/** Single-element reveal: 8px translateY → 0, fade-in. */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0, transition: inViewTransition },
};

/** Container that staggers child `revealUp` reveals. */
export const revealStagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

/** Plain crossfade. Use for hover overlays / state changes, not page reveals. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.35, ease: ease.quiet } },
};

/**
 * Default in-view trigger — fires once when 20 % of element enters viewport.
 * Use as: `whileInView="show" viewport={IN_VIEW}`
 */
export const IN_VIEW = { once: true, amount: 0.2 } as const;
