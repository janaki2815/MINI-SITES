/**
 * JAX Design System — Spacing, Elevation & Radius Tokens
 * Strict spatial math: outer padding >= inner gap, single elevation level.
 */

export const spacing = {
  // Base scale
  none: '0',
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
  '3xl': '4rem',  // 64px
  '4xl': '6rem',  // 96px

  // Viewport baseline
  containerMax: '1440px',
  contentWidth: '1200px',
  heroMeasure: '68ch',
} as const;

export const radii = {
  sm: '0.375rem', // 6px
  md: '0.5rem',   // 8px
  lg: '0.75rem',  // 12px
  xl: '1rem',     // 16px
  '2xl': '1.5rem',// 24px
  full: '9999px',
} as const;

export const shadows = {
  subtle: '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
  elevation1: '0 10px 30px -5px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255, 255, 255, 0.08)',
  glowBlue: '0 0 40px -8px rgba(56, 189, 248, 0.22)',
  glowViolet: '0 0 40px -8px rgba(129, 140, 248, 0.22)',
} as const;
