import React from 'react';
import { DESTINATIONS } from '../../config/destinations.ts';
import { DimensionalGlyph } from '../dimensional/DimensionalGlyph.tsx';

interface DestinationViewProps {
  forceFallback?: boolean;
  onNavigate: (id: any) => void;
}

export const HorizonFoundation: React.FC<DestinationViewProps> = ({ forceFallback, onNavigate }) => {
  const meta = DESTINATIONS.horizon;

  return (
    <div className="space-y-12 pb-24">
      {/* Split-Screen Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-4 lg:pt-8">
        {/* Left: Typographic Anchor */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>Destination 05</span>
            <span aria-hidden="true">·</span>
            <span>Horizon</span>
            <span aria-hidden="true">·</span>
            <span className="text-sky-300 font-mono">Personal Journey, Interests & Ambitions</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display text-balance leading-none">
            Long-horizon frontiers, intellectual influences, and the pursuit of craft.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-body max-w-2xl">
            {meta.editorialCharter}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('nexus')}
              className="px-5 py-2.5 text-xs font-semibold tracking-wide uppercase text-slate-950 bg-sky-300 hover:bg-sky-200 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-lg shadow-sky-400/20"
            >
              Return to Core Nexus
            </button>
            <button
              onClick={() => onNavigate('archive')}
              className="px-5 py-2.5 text-xs font-semibold tracking-wide uppercase text-slate-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Inspect Archive
            </button>
          </div>
        </div>

        {/* Right: Dimensional Horizon Arc */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[340px] lg:min-h-[420px] rounded-3xl glass-panel p-6 border border-white/[0.08] glow-blue">
          <DimensionalGlyph
            destinationId="horizon"
            shape="horizon_arc"
            lightingProfile="electric_blue"
            size={320}
            forceFallback={forceFallback}
          />
          <div className="mt-2 text-center text-xs text-slate-400 font-mono">
            <span>Celestial Horizon Arc</span>
            <span className="mx-2 text-slate-600">·</span>
            <span className="text-sky-300">Curved Specular Glint</span>
          </div>
        </div>
      </section>

      {/* Five-Year Research Frontier */}
      <section className="space-y-6 pt-6 border-t border-white/[0.08]">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-white font-display">
            01. Long-Horizon Frontiers
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Active domains of study, technical inquiry, and future building ambitions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-3">
            <div className="font-mono text-xs text-sky-400">01</div>
            <h3 className="text-base font-semibold text-white">
              Embodied Spatial Interfaces
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Investigating the convergence of volumetric 3D scenes, WebGL shaders, and tactile physical feedback in next-generation user environments.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-3">
            <div className="font-mono text-xs text-sky-400">02</div>
            <h3 className="text-base font-semibold text-white">
              Deterministic Autonomous Agents
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Designing runtime environments where autonomous AI systems operate with formal contract guarantees, bounded memory, and zero uninspected hallucinations.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-3">
            <div className="font-mono text-xs text-sky-400">03</div>
            <h3 className="text-base font-semibold text-white">
              Enduring Software Craft
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Creating tools and systems built to remain fast, maintainable, and aesthetically compelling across decades of computational evolution.
            </p>
          </div>
        </div>
      </section>

      {/* Planned Modules for Gen 2 */}
      <section className="space-y-6 pt-6 border-t border-white/[0.08]">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-white font-display">
            02. Horizon Monograph Roadmap
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Personal chronology and curated reading list structured for Generation 2 release.
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
                  <span className="text-[11px] text-sky-300 font-medium">
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
