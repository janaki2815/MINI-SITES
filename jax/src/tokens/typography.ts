/**
 * JAX Design System — Typography Tokens
 * Pair: Outfit (expressive display) + Plus Jakarta Sans (clean readable body) + JetBrains Mono (data/telemetry)
 */

export const typography = {
  fonts: {
    display: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    body: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  },
  sizes: {
    hero: 'clamp(2.5rem, 5vw, 4.5rem)',
    h1: 'clamp(2rem, 3.5vw, 3rem)',
    h2: 'clamp(1.5rem, 2.5vw, 2.25rem)',
    h3: 'clamp(1.25rem, 1.8vw, 1.5rem)',
    bodyLarge: '1.125rem', // 18px
    body: '1rem',          // 16px
    bodySmall: '0.875rem',  // 14px
    caption: '0.75rem',     // 12px
    micro: '0.6875rem',    // 11px
  },
  tracking: {
    tighter: '-0.04em',
    tight: '-0.02em',
    normal: '0',
    wide: '0.04em',
    widest: '0.08em',
  },
  leading: {
    none: '1',
    tight: '1.15',
    snug: '1.3',
    relaxed: '1.6',
    loose: '1.8',
  },
} as const;

export type TypographyTokens = typeof typography;
