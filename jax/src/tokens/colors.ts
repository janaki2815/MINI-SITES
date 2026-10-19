/**
 * JAX Design System — Color Tokens
 * Deep black and midnight navy backgrounds with restrained electric-blue and violet accents.
 */

export const colors = {
  canvas: {
    black: '#030712',      // Deepest background (canvas 60%)
    midnight: '#050814',   // Midnight tone for viewports and section base
    surface: '#0a1024',    // Structural card/panel surface (30%)
    elevated: '#0f172e',   // Floating dock and modal surface
    highlight: '#16203c',  // Active state / hover surface
  },
  border: {
    subtle: 'rgba(255, 255, 255, 0.08)',
    medium: 'rgba(255, 255, 255, 0.14)',
    active: 'rgba(56, 189, 248, 0.4)',
    violet: 'rgba(129, 140, 248, 0.4)',
  },
  accent: {
    // 10% high-intent action budget
    blue: {
      light: '#38bdf8',
      primary: '#0284c7',
      dim: 'rgba(56, 189, 248, 0.15)',
      glow: 'rgba(56, 189, 248, 0.25)',
    },
    violet: {
      light: '#818cf8',
      primary: '#6366f1',
      dim: 'rgba(129, 140, 248, 0.15)',
      glow: 'rgba(129, 140, 248, 0.25)',
    },
    cyan: {
      light: '#22d3ee',
      dim: 'rgba(34, 211, 238, 0.15)',
    },
    amber: {
      light: '#fbbf24',
      dim: 'rgba(251, 191, 36, 0.15)',
    },
    emerald: {
      light: '#34d399',
      dim: 'rgba(52, 211, 153, 0.15)',
    },
  },
  text: {
    primary: '#f8fafc',
    secondary: '#94a3b8',
    muted: '#64748b',
    subtle: '#475569',
    inverse: '#030712',
  },
} as const;

export type ColorTokens = typeof colors;
