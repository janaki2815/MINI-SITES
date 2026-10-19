import React, { useState, useEffect } from 'react';
import { PROFILE } from '../../config/profile.ts';
import { EyeTrackerCharacter } from './EyeTrackerCharacter.tsx';
import { InteractiveSkills } from './InteractiveSkills.tsx';

interface TypographicHeroProps {
  pointerPos: { x: number; y: number };
  onStartDragReveal: (e: React.PointerEvent) => void;
  onOpenAbout: () => void;
  className?: string;
}

const MORPHING_ROLES = [
  'Creative developer in progress',
  'Data science & AI tinkerer',
  'Java & backend builder',
  'Pixel & logic crafter',
];

export const TypographicHero: React.FC<TypographicHeroProps> = ({
  pointerPos,
  onStartDragReveal,
  onOpenAbout,
  className = '',
}) => {
  const [roleIndex, setRoleIndex] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);

  // Periodic word morphing
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % MORPHING_ROLES.length);
        setIsFlipping(false);
      }, 250);
    }, 3600);

    return () => clearInterval(interval);
  }, []);

  const handleNextRole = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setRoleIndex((prev) => (prev + 1) % MORPHING_ROLES.length);
      setIsFlipping(false);
    }, 200);
  };

  // Split name for interactive bouncing letters
  const renderInteractiveLetters = (text: string, baseClass = '') => {
    return text.split('').map((char, index) => {
      if (char === ' ') {
        return <span key={index} className="inline-block w-3">&nbsp;</span>;
      }
      return (
        <span
          key={index}
          className={`interactive-letter ${baseClass}`}
          style={{ transition: `transform 0.2s ease ${index * 15}ms, color 0.15s ease ${index * 15}ms` }}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div
      onPointerDown={onStartDragReveal}
      className={`relative w-full flex flex-col justify-between select-none ${className}`}
    >
      {/* ─────────────────────────────────────────────────────────────
          1. TOP STATUS TICKER (Adrien Lamy Style Clean Organic Bar)
      ───────────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-400 pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-200 font-semibold">Boya Janaki Ramu</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>RGMCET Nandyal (2026)</span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <span className="hidden md:inline">Click + drag to unmask hidden art ✦</span>
          <button
            onClick={onOpenAbout}
            className="text-sky-400 hover:text-sky-300 transition-colors font-semibold"
          >
            [About & Bio]
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. THE MAIN TYPOGRAPHIC MONOLITH: "J A X"
          Massive, sculptural, with the playful eye-tracking mascot!
      ───────────────────────────────────────────────────────────────── */}
      <div className="py-6 sm:py-10 lg:py-14 relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Huge JAX wordmark */}
          <div className="relative">
            <h1 className="text-7xl sm:text-9xl md:text-[11rem] lg:text-[13rem] font-black tracking-tighter text-white font-display leading-[0.85] flex items-baseline">
              <span className="interactive-letter hover:text-sky-400">J</span>
              <span className="interactive-letter hover:text-indigo-400">A</span>
              <span className="interactive-letter hover:text-amber-400">X</span>
              <span className="text-sky-400 text-4xl sm:text-6xl lg:text-7xl ml-1 font-mono font-light select-none">
                *
              </span>
            </h1>

            {/* Subtitle Name */}
            <div className="mt-2 text-xl sm:text-2xl lg:text-3xl font-bold font-display tracking-tight text-slate-300">
              {renderInteractiveLetters('Boya Janaki Ramu', 'hover:text-sky-300')}
            </div>
          </div>

          {/* Quirky Eye-Tracking Mascot */}
          <div className="flex flex-col items-center lg:items-end justify-center">
            <EyeTrackerCharacter pointerPos={pointerPos} />
            <div className="text-[11px] font-mono text-slate-400 mt-2 text-center lg:text-right">
              Mascot tracks cursor ✦ Poke him!
            </div>
          </div>
        </div>

        {/* Morphing Role Phrase */}
        <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-sky-400 uppercase tracking-widest">
              Role:
            </span>
            <button
              onClick={handleNextRole}
              title="Click to swap phrase!"
              className="text-lg sm:text-2xl font-semibold text-white font-display hover:text-sky-300 transition-colors flex items-center gap-2 group text-left"
            >
              <span
                className={`inline-block transition-all duration-200 ${
                  isFlipping ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
                }`}
              >
                {MORPHING_ROLES[roleIndex]}
              </span>
              <span className="font-mono text-xs text-slate-500 group-hover:text-sky-400">
                ↺
              </span>
            </button>
          </div>

          <div className="text-xs font-mono text-slate-400">
            Computer Science & Data Science
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. SKILLS COMPOSITION (Directly in main interface)
          Interactive tactile floating tokens
      ───────────────────────────────────────────────────────────────── */}
      <div className="pt-8 pb-12 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <span>✦ Interactive Toolbox</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">Hover, toss, or filter</span>
          </h2>
          <button
            onClick={onOpenAbout}
            className="text-xs font-mono text-sky-400 hover:text-sky-300 underline underline-offset-4"
          >
            Read Full Bio & College Details →
          </button>
        </div>

        <InteractiveSkills />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. MINIMAL FOOTER
      ───────────────────────────────────────────────────────────────── */}
      <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div>
          <span>Boya Janaki Ramu (JAX)</span>
          <span className="mx-2 text-slate-600">·</span>
          <span>RGMCET 2026</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={PROFILE.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-slate-300 hover:text-white transition-colors underline underline-offset-2"
          >
            GitHub: janaki2815 ↗
          </a>
          <button
            onClick={onOpenAbout}
            className="px-3 py-1 bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 rounded-lg border border-white/[0.1] transition-all"
          >
            Open About [A]
          </button>
        </div>
      </div>
    </div>
  );
};
