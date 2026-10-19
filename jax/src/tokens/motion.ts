/**
 * JAX Design System — Motion & Animation Tokens
 * Micro-interactions <= 200ms, smooth cubic-bezier easing curves, compositor-only properties.
 */

export const motion = {
  duration: {
    instant: '100ms',
    fast: '180ms',
    normal: '280ms',
    slow: '450ms',
    cinematic: '700ms',
  },
  easing: {
    // Elegant physical deceleration curve
    easeOutQuint: 'cubic-bezier(0.22, 1, 0.36, 1)',
    easeOutExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
    easeInOutCubic: 'cubic-bezier(0.65, 0, 0.35, 1)',
    spring: {
      type: 'spring',
      stiffness: 260,
      damping: 24,
    },
  },
} as const;

export type MotionTokens = typeof motion;
