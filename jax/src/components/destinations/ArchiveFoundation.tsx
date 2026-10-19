import React from 'react';
import { DESTINATIONS } from '../../config/destinations.ts';
import { DimensionalGlyph } from '../dimensional/DimensionalGlyph.tsx';

interface DestinationViewProps {
  forceFallback?: boolean;
  onNavigate: (id: any) => void;
}

export const ArchiveFoundation: React.FC<DestinationViewProps> = ({ forceFallback, onNavigate }) => {
  const meta = DESTINATIONS.archive;

  return (
    <div className="space-y-12 pb-24">
      {/* Split-Screen Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-4 lg:pt-8">
        {/* Left: Typographic Anchor */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>Destination 04</span>
            <span aria-hidden="true">·</span>
            <span>Archive</span>
            <span aria-hidden="true">·</span>
            <span className="text-purple-400 font-mono">Codebases, Repositories & Systems</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display text-balance leading-none">
            Production codebases, open-source repositories, and verified engineering case studies.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-body max-w-2xl">
            {meta.editorialCharter}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('horizon')}
              className="px-5 py-2.5 text-xs font-semibold tracking-wide uppercase text-slate-950 bg-purple-400 hover:bg-purple-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-lg shadow-purple-500/20"
            >
              Explore Horizon
            </button>
            <button
              onClick={() => onNavigate('nexus')}
              className="px-5 py-2.5 text-xs font-semibold tracking-wide uppercase text-slate-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Back to Nexus
            </button>
          </div>
        </div>

        {/* Right: Dimensional Cubic Vault */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[340px] lg:min-h-[420px] rounded-3xl glass-panel p-6 border border-white/[0.08] glow-violet">
          <DimensionalGlyph
            destinationId="archive"
            shape="cubic_vault"
            lightingProfile="violet_eclipse"
            size={320}
            forceFallback={forceFallback}
          />
          <div className="mt-2 text-center text-xs text-slate-400 font-mono">
            <span>Hypercube Vault</span>
            <span className="mx-2 text-slate-600">·</span>
            <span className="text-purple-400">Chamfered PBR Enclosure</span>
          </div>
        </div>
      </section>

      {/* Repository Taxonomy Standards */}
      <section className="space-y-6 pt-6 border-t border-white/[0.08]">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-white font-display">
            01. Repository Taxonomy Standards
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Rules governing project entry verification, architecture retrospectives, and reproducible code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-3">
            <div className="font-mono text-xs text-purple-400">01</div>
            <h3 className="text-base font-semibold text-white">
              No Fabricated Stubs
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every card slated for Generation 2 links to real, verifiable GitHub repositories or active production deployments.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-3">
            <div className="font-mono text-xs text-purple-400">02</div>
            <h3 className="text-base font-semibold text-white">
              Architectural Retrospectives
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Case studies document constraints, architectural trade-offs, system bottlenecks, and post-mortem lessons rather than simple feature lists.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-3">
            <div className="font-mono text-xs text-purple-400">03</div>
            <h3 className="text-base font-semibold text-white">
              Zero-Pill Tag Discipline
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Stack categories, dates, and milestones are rendered as clean, unboxed typography with dot separators.
            </p>
          </div>
        </div>
      </section>

      {/* Planned Modules for Gen 2 */}
      <section className="space-y-6 pt-6 border-t border-white/[0.08]">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-white font-display">
            02. Archive Structural Modules
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Taxonomy and case study schema ready for verified project population in Generation 2.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {meta.plannedModules.map((mod) => (
            <div
              key={mod.id}
              className="p-5 rounded-xl border border-white/[0.06] bg-slate-900/40 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-mono text-[11px] text-slate-400">{mod.id}</span>
                  <span className="text-[11px] text-purple-400 font-medium">
                    {mod.readiness === 'foundation_ready' ? 'Foundation Active' : 'Gen 2 Staged'}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-slate-100">
                  {mod.name}
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {mod.scope}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
