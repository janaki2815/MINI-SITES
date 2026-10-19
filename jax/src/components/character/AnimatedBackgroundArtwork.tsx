import React, { useMemo } from 'react';

interface AnimatedBackgroundArtworkProps {
  pointerPos: { x: number; y: number };
  className?: string;
}

export const AnimatedBackgroundArtwork: React.FC<AnimatedBackgroundArtworkProps> = ({
  pointerPos,
  className = '',
}) => {
  // Parallax offsets based on cursor distance from center
  const parallax = useMemo(() => {
    if (typeof window === 'undefined') return { layer1: { x: 0, y: 0 }, layer2: { x: 0, y: 0 } };
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = pointerPos.x - cx;
    const dy = pointerPos.y - cy;

    return {
      layer1: { x: dx * 0.012, y: dy * 0.012 },
      layer2: { x: dx * 0.024, y: dy * 0.024 },
    };
  }, [pointerPos]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}>
      {/* ─────────────────────────────────────────────────────────────
          INTENTIONAL TYPOGRAPHIC FRAGMENTS
          Cleanly positioned around the periphery away from JAX title & character
      ───────────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${parallax.layer1.x}px, ${parallax.layer1.y}px, 0)`,
        }}
      >
        {/* Top Right: "FULL-STACK DEVELOPER" (Cleanly positioned to the left of the hand) */}
        <div className="absolute top-[18%] right-[16%] sm:right-[20%] rotate-[-4deg]">
          <span className="font-display font-black text-lg sm:text-2xl text-[#0c0d10] tracking-tight bg-[#fdfbf7] px-3 py-1 rounded border-2 border-[#0c0d10] ink-shadow-sm">
            FULL-STACK DEVELOPER
          </span>
        </div>

        {/* Mid-Left: "DATA & AI" (Well below JAX title and away from character) */}
        <div className="absolute top-[52%] left-[4%] sm:left-[8%] rotate-[6deg]">
          <span className="font-mono font-bold text-sm sm:text-base text-[#fdfbf7] bg-[#0c0d10] px-3 py-1 rounded border-2 border-black ink-shadow-sm">
            DATA & AI
          </span>
        </div>

        {/* Bottom Left: "LOGIC + ART" (Positioned above the bottom social links) */}
        <div className="absolute bottom-[20%] left-[6%] sm:left-[10%] rotate-[-3deg]">
          <span className="font-display font-black text-xl sm:text-3xl text-[#0c0d10] tracking-tight drop-shadow-[2px_2px_0px_#fdfbf7]">
            LOGIC + ART
          </span>
        </div>

        {/* Bottom Right: "RGMCET · 2026" (Positioned above footer, safely away from hand) */}
        <div className="absolute bottom-[18%] right-[16%] sm:right-[22%] rotate-[4deg]">
          <span className="font-mono text-xs sm:text-sm font-bold text-[#0c0d10] bg-[#fdfbf7] border-2 border-[#0c0d10] px-2.5 py-1 rounded ink-shadow-sm">
            RGMCET · 2026
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          HAND-DRAWN INK DOODLES
          Subtle and sparse so character remains the hero
      ───────────────────────────────────────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full transition-transform duration-200 ease-out opacity-40"
        style={{
          transform: `translate3d(${parallax.layer2.x}px, ${parallax.layer2.y}px, 0)`,
        }}
        viewBox="0 0 1000 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Subtle spiral in bottom-left */}
        <path
          d="M120,680 Q135,660 155,675 Q170,695 150,715 Q125,725 110,700 Q100,670 130,650 Q170,635 190,675"
          stroke="#0c0d10"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Delicate starbursts */}
        <g transform="translate(180, 420)">
          <path d="M0,-12 L0,12 M-12,0 L12,0 M-8,-8 L8,8 M-8,8 L8,-8" stroke="#0c0d10" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <g transform="translate(820, 280)">
          <path d="M0,-12 L0,12 M-12,0 L12,0 M-8,-8 L8,8 M-8,8 L8,-8" stroke="#fdfbf7" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Gentle curved directional line pointing inward */}
        <path
          d="M240,240 C270,220 300,240 310,270"
          stroke="#0c0d10"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="5 4"
        />
        <path d="M306,260 L310,270 L300,270" stroke="#0c0d10" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};
