import React, { useEffect } from 'react';
import { PROFILE } from '../../config/profile.ts';
import { InteractiveSkills } from './InteractiveSkills.tsx';
import { ExternalLink, GraduationCap, Code2, Sparkles, X } from 'lucide-react';

interface AboutSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutSheet: React.FC<AboutSheetProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-xl animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="About Boya Janaki Ramu (JAX)"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-3xl max-h-[90vh] bg-[#0e1017] border border-white/[0.14] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-top-6 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/[0.08] bg-[#12141e]/80">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <h2 className="text-lg font-bold text-white font-display">
              About & Skills · JAX
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/[0.08] transition-colors font-mono text-xs flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label="Close About panel"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Identity Lockup */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-baseline gap-3">
              <h3 className="text-3xl sm:text-4xl font-bold text-white font-display">
                {PROFILE.name}
              </h3>
              <span className="text-xl sm:text-2xl font-bold text-sky-400 font-mono">
                ({PROFILE.nickname})
              </span>
            </div>
            <p className="text-base text-slate-300 font-body leading-relaxed max-w-2xl">
              {PROFILE.headline} · {PROFILE.subline}
            </p>
          </div>

          {/* Education & Background (Verified) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#151722] border border-white/[0.08] space-y-2">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-mono">
                <GraduationCap className="w-4 h-4" />
                <span>EDUCATION</span>
              </div>
              <div className="text-sm font-semibold text-white">
                {PROFILE.education.degree}
              </div>
              <div className="text-xs text-slate-400 leading-relaxed">
                {PROFILE.education.institution}
              </div>
              <div className="pt-2 text-xs font-mono text-amber-300">
                Graduation Year: {PROFILE.education.gradYear}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#151722] border border-white/[0.08] space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono">
                <Sparkles className="w-4 h-4" />
                <span>CORE INTERESTS</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                {PROFILE.interests.map((interest, idx) => (
                  <li key={idx} className="leading-snug">{interest}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive Skills Cloud */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Code2 className="w-4 h-4 text-sky-400" />
              <span className="uppercase tracking-wider">TECHNOLOGIES & TOOLBOX</span>
            </div>
            <InteractiveSkills />
          </div>

          {/* Minimal Verified GitHub Link */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400">
              Open source & code exploration
            </span>
            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.06] hover:bg-white/[0.12] text-slate-100 text-xs font-mono font-semibold rounded-xl border border-white/[0.1] transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <span>github.com/janaki2815</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
