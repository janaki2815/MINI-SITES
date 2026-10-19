import React from 'react';
import { DESTINATIONS } from '../../config/destinations.ts';
import { DimensionalGlyph } from '../dimensional/DimensionalGlyph.tsx';

interface DestinationViewProps {
  forceFallback?: boolean;
  onNavigate: (id: any) => void;
}

export const IntelligenceLabFoundation: React.FC<DestinationViewProps> = ({ forceFallback, onNavigate }) => {
  const meta = DESTINATIONS['intelligence-lab'];

  return (
    <div className="space-y-12 pb-24">
      {/* Split-Screen Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-4 lg:pt-8">
        {/* Left: Typographic Anchor */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>Destination 02</span>
            <span aria-hidden="true">·</span>
            <span>Intelligence Lab</span>
            <span aria-hidden="true">·</span>
            <span className="text-indigo-400 font-mono">Cognitive & Machine Learning Systems</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display text-balance leading-none">
            Neural architectures, agentic pipelines, and empirical model evaluation.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-body max-w-2xl">
            {meta.editorialCharter}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('data-observatory')}
              className="px-5 py-2.5 text-xs font-semibold tracking-wide uppercase text-slate-950 bg-indigo-400 hover:bg-indigo-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-lg shadow-indigo-500/20"
            >
              Examine Data Observatory
            </button>
            <button
              onClick={() => onNavigate('nexus')}
              className="px-5 py-2.5 text-xs font-semibold tracking-wide uppercase text-slate-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Return to Nexus
            </button>
          </div>
        </div>

        {/* Right: Dimensional Geodesic Lattice */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative min-h-[340px] lg:min-h-[420px] rounded-3xl glass-panel p-6 border border-white/[0.08] glow-violet">
          <DimensionalGlyph
            destinationId="intelligence-lab"
            shape="neural_lattice"
            lightingProfile="violet_eclipse"
            size={320}
            forceFallback={forceFallback}
          />
          <div className="mt-2 text-center text-xs text-slate-400 font-mono">
            <span>Geodesic Neural Lattice</span>
            <span className="mx-2 text-slate-600">·</span>
            <span className="text-indigo-400">Violet Eclipse Shading</span>
          </div>
        </div>
      </section>

      {/* Research Methodology Tenets */}
      <section className="space-y-6 pt-6 border-t border-white/[0.08]">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-white font-display">
            01. Laboratory Research Principles
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Methodological safeguards ensuring reproducible AI engineering over speculative hype.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-3">
            <div className="font-mono text-xs text-indigo-400">01</div>
            <h3 className="text-base font-semibold text-white">
              Deterministic Verification
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Enforcing structural constraints, schema validators, and programmatic tool grounding on probabilistic model outputs.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-3">
            <div className="font-mono text-xs text-indigo-400">02</div>
            <h3 className="text-base font-semibold text-white">
              Latency & Memory Budgets
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Profiling time-to-first-token (TTFT), KV cache memory limits, and streaming throughput with production telemetry.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] space-y-3">
            <div className="font-mono text-xs text-indigo-400">03</div>
            <h3 className="text-base font-semibold text-white">
              Zero Vanity Benchmarks
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Rejecting hallucinated cockpit scores in favor of observable error distributions, real datasets, and human evaluation.
            </p>
          </div>
        </div>
      </section>

      {/* Planned Modules for Gen 2 */}
      <section className="space-y-6 pt-6 border-t border-white/[0.08]">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-white font-display">
            02. Intelligence Systems Blueprint
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Interactive AI modules specified for the Generation 2 deployment.
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
                  <span className="text-[11px] text-indigo-400 font-medium">
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
