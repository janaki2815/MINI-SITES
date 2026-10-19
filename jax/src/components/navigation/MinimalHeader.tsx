import React from 'react';
import { PROFILE } from '../../config/profile.ts';

interface MinimalHeaderProps {
  onOpenAbout: () => void;
  isAboutOpen: boolean;
}

export const MinimalHeader: React.FC<MinimalHeaderProps> = ({
  onOpenAbout,
  isAboutOpen,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#0a0b10]/80 backdrop-blur-md border-b border-white/[0.08] transition-colors">
      <div className="max-w-[1340px] mx-auto flex items-center justify-between px-6 sm:px-10 h-16">
        {/* Wordmark */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-black tracking-tighter text-white font-display">
            JAX
          </span>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            / {PROFILE.name}
          </span>
        </div>

        {/* Center Tagline */}
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>{PROFILE.headline}</span>
          <span className="text-slate-600">·</span>
          <span className="text-sky-400">{PROFILE.subline}</span>
        </div>

        {/* Right Action */}
        <div className="flex items-center gap-3 pr-28 sm:pr-36">
          <button
            onClick={onOpenAbout}
            className={`px-3.5 py-1.5 text-xs font-mono font-medium rounded-xl border transition-all ${
              isAboutOpen
                ? 'bg-amber-400 text-slate-950 font-bold border-amber-300'
                : 'bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 border-white/[0.1]'
            }`}
          >
            {isAboutOpen ? 'Close About [A]' : 'About & Skills [A]'}
          </button>
        </div>
      </div>
    </header>
  );
};
