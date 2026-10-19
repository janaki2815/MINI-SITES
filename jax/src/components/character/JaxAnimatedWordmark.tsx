import React, { useState, useEffect, useRef } from 'react';

interface JaxAnimatedWordmarkProps {
  className?: string;
}

// Curated playful color palettes for each letter that pop against the #e11d24 red canvas
const J_COLORS = ['#fdfbf7', '#fde047', '#38bdf8', '#4ade80', '#fb923c', '#f472b6'];
const A_COLORS = ['#fbbf24', '#fdfbf7', '#f472b6', '#38bdf8', '#facc15', '#86efac'];
const X_COLORS = ['#38bdf8', '#4ade80', '#fdfbf7', '#fb923c', '#facc15', '#c084fc'];

export const JaxAnimatedWordmark: React.FC<JaxAnimatedWordmarkProps> = ({ className = '' }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);

  // Independent color indices for J, A, and X
  const [colorIndices, setColorIndices] = useState<{ j: number; a: number; x: number }>({
    j: 0,
    a: 0,
    x: 0,
  });

  // Bobbing step for playful bouncing animation while hovered
  const [bobStep, setBobStep] = useState<number>(0);

  const cycleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Initial Page Load: Sequential letter entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  // 2. Continuous Playful Color & Bobbing Animation on Hover
  useEffect(() => {
    if (!isHovered) {
      if (cycleTimerRef.current) {
        clearInterval(cycleTimerRef.current);
        cycleTimerRef.current = null;
      }
      return;
    }

    // Set immediate first random vibrant colors when hover starts
    setColorIndices({
      j: Math.floor(Math.random() * J_COLORS.length),
      a: Math.floor(Math.random() * A_COLORS.length),
      x: Math.floor(Math.random() * X_COLORS.length),
    });
    setBobStep((prev) => (prev + 1) % 4);

    // Continuous staggered color cycle every 280ms
    cycleTimerRef.current = setInterval(() => {
      setColorIndices((prev) => ({
        j: (prev.j + 1) % J_COLORS.length,
        a: (prev.a + 1 + Math.floor(Math.random() * 2)) % A_COLORS.length,
        x: (prev.x + 1) % X_COLORS.length,
      }));
      setBobStep((prev) => (prev + 1) % 4);
    }, 280);

    return () => {
      if (cycleTimerRef.current) {
        clearInterval(cycleTimerRef.current);
        cycleTimerRef.current = null;
      }
    };
  }, [isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setClickCount((c) => c + 1);
    setColorIndices({
      j: Math.floor(Math.random() * J_COLORS.length),
      a: Math.floor(Math.random() * A_COLORS.length),
      x: Math.floor(Math.random() * X_COLORS.length),
    });
  };

  // Letters configuration with staggered entrances, rotations, and bobbing offsets
  const letterConfigs = [
    {
      char: 'J',
      loadDelay: 0,
      enterTranslateY: 32,
      enterRotate: '-5deg',
      hoverColor: J_COLORS[colorIndices.j],
      hoverTransform:
        bobStep % 2 === 0
          ? 'translateY(-12px) rotate(-4deg) scale(1.06)'
          : 'translateY(-8px) rotate(-2deg) scale(1.03)',
    },
    {
      char: 'A',
      loadDelay: 130,
      enterTranslateY: 38,
      enterRotate: '4deg',
      hoverColor: A_COLORS[colorIndices.a],
      hoverTransform:
        bobStep % 2 === 0
          ? 'translateY(-7px) rotate(3deg) scale(1.03)'
          : 'translateY(-14px) rotate(5deg) scale(1.07)',
    },
    {
      char: 'X',
      loadDelay: 260,
      enterTranslateY: 34,
      enterRotate: '-3deg',
      hoverColor: X_COLORS[colorIndices.x],
      hoverTransform:
        bobStep % 2 === 0
          ? 'translateY(-14px) rotate(-5deg) scale(1.07)'
          : 'translateY(-6px) rotate(-2deg) scale(1.03)',
    },
  ];

  const asteriskDelayMs = isLoaded ? 0 : 380;
  const asteriskTransition = isHovered
    ? 'transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1) 0ms'
    : `transform 0.38s cubic-bezier(0.34, 1.56, 0.64, 1) ${asteriskDelayMs}ms, opacity 0.35s ease ${asteriskDelayMs}ms`;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="JAX portfolio brand"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`inline-flex items-baseline cursor-pointer select-none group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black rounded-2xl p-1.5 -m-1.5 transition-transform ${className}`}
    >
      <div className="text-6xl sm:text-8xl md:text-9xl font-black font-display tracking-tighter leading-[0.82] flex items-baseline filter drop-shadow-[4px_4px_0px_rgba(12,13,16,0.35)]">
        {letterConfigs.map((item, index) => {
          // Default color is ink black #0c0d10. When hovered, shifts to independent lively colors.
          const currentColor = isHovered ? item.hoverColor : '#0c0d10';

          const currentTransform = !isLoaded
            ? `translateY(${item.enterTranslateY}px) rotate(${item.enterRotate}) scale(0.9)`
            : isHovered
            ? item.hoverTransform
            : 'translateY(0px) rotate(0deg) scale(1)';

          // Delay is combined directly into the transition shorthand to prevent React shorthand conflicts
          const delayMs = isLoaded ? 0 : item.loadDelay;
          const letterTransition = isHovered
            ? 'color 0.22s ease 0ms, transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) 0ms'
            : `color 0.42s ease 0ms, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${delayMs}ms, opacity 0.35s ease ${delayMs}ms`;

          return (
            <span
              key={`${item.char}-${index}-${clickCount}`}
              style={{
                display: 'inline-block',
                color: currentColor,
                transform: currentTransform,
                opacity: isLoaded ? 1 : 0,
                transition: letterTransition,
                textShadow: isHovered && currentColor !== '#0c0d10' ? '3px 3px 0px #0c0d10' : 'none',
              }}
              className="inline-block"
            >
              {item.char}
            </span>
          );
        })}

        {/* ─────────────────────────────────────────────────────────────
            PLAYFUL WHITE ASTERISK: Strictly stays white throughout
            Sequential entrance on load, playful spin & scale on hover
        ───────────────────────────────────────────────────────────────── */}
        <span
          style={{
            display: 'inline-block',
            color: '#fdfbf7', // ALWAYS WHITE
            opacity: isLoaded ? 1 : 0,
            transform: !isLoaded
              ? 'scale(0) rotate(-60deg)'
              : isHovered
              ? 'rotate(45deg) scale(1.18)'
              : 'rotate(0deg) scale(1)',
            transition: asteriskTransition,
          }}
          className="text-4xl sm:text-6xl md:text-7xl ml-1 font-mono font-bold select-none inline-block drop-shadow-[3px_3px_0px_#0c0d10]"
        >
          *
        </span>
      </div>
    </div>
  );
};
