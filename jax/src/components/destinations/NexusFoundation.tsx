import React, { useState, useCallback } from 'react';
import { DESTINATIONS } from '../../config/destinations.ts';
import { PROFILE } from '../../config/profile.ts';
import { DestinationId } from '../../types/destinations.ts';
import { DimensionalGlyph } from '../dimensional/DimensionalGlyph.tsx';
import { ArrowUpRight, Copy, Check, ExternalLink } from 'lucide-react';

interface DestinationViewProps {
  forceFallback?: boolean;
  onNavigate: (id: DestinationId) => void;
}

type LightingPreset = 'electric_blue' | 'violet_eclipse' | 'studio';

export const NexusFoundation: React.FC<DestinationViewProps> = ({
  forceFallback,
  onNavigate,
}) => {
  const [activeLighting, setActiveLighting] = useState<LightingPreset>('electric_blue');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [selectedEthos, setSelectedEthos] = useState<number>(0);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText(PROFILE.channels.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  }, []);

  const ethosDetails = [
    {
      title: 'First-Principles Rigor',
      summary: 'Understanding systems from the silicon and mathematical foundations upward, avoiding shallow abstraction layers.',
      manifesto:
        'Every architecture begins with fundamental computational limits: memory bandwidth, latency budgets, cache locality, and algorithmic complexity. Rather than stacking speculative dependencies, systems are distilled to their leanest, most reliable invariants.',
      codeTag: 'SYSTEMS_RIGOR_01',
    },
    {
      title: 'Cinematic Craft',
      summary: 'Engineering interfaces with tactile depth, material honesty, and responsive physics that respect human attention.',
      manifesto:
        'Interfaces are spatial instruments. They demand intentional lighting, optical typographic compensation, zero frame-rate stutter, and micro-interactions that communicate tactile physical inertia without overwhelming the senses.',
      codeTag: 'CINEMATIC_DEPTH_02',
    },
    {
      title: 'Verifiable Integrity',
      summary: 'Refusing fabricated metrics, vanity scores, and mock stubs. Every benchmark, commit, and deliverable is rooted in verifiable execution.',
      manifesto:
        'Trust is an empirical property. We reject fake telemetry tickers, hallucinated AI scores, and simulated progress bars. Everything presented is backed by reproducible benchmarks, real models, and working code.',
      codeTag: 'VERIFIABLE_EXEC_03',
    },
  ];

  const portalDestinations: Array<{
    id: DestinationId;
    index: string;
    shape: 'neural_lattice' | 'astrolabe_rings' | 'cubic_vault' | 'horizon_arc';
    lighting: LightingPreset;
    highlight: string;
    tags: string[];
  }> = [
    {
      id: 'intelligence-lab',
      index: '02',
      shape: 'neural_lattice',
      lighting: 'violet_eclipse',
      highlight: 'Cognitive systems, agentic pipelines, and empirical model evaluation.',
      tags: ['Neural Architectures', 'Deterministic Grounding', 'LLM Telemetry'],
    },
    {
      id: 'data-observatory',
      index: '03',
      shape: 'astrolabe_rings',
      lighting: 'studio',
      highlight: 'High-dimensional synthesis, spatial analytics, and verifiable data pipelines.',
      tags: ['Spatial Analytics', 'Tabular Figures', 'Invariant Pipelines'],
    },
    {
      id: 'archive',
      index: '04',
      shape: 'cubic_vault',
      lighting: 'violet_eclipse',
      highlight: 'Production codebases, open-source repositories, and technical retrospectives.',
      tags: ['Production Codebases', 'System Architecture', 'Case Studies'],
    },
    {
      id: 'horizon',
      index: '05',
      shape: 'horizon_arc',
      lighting: 'electric_blue',
      highlight: 'Long-horizon frontiers, intellectual influences, and the pursuit of craft.',
      tags: ['Embodied 3D', 'Long-Horizon Thesis', 'Curated Chronology'],
    },
  ];

  return (
    <div className="space-y-20 lg:space-y-32 pb-24">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO COMPOSITION (Adrien Lamy Inspired)
          Oversized, expressive typography, high negative space,
          and a central tactile 3D interactive monolith.
      ───────────────────────────────────────────────────────────────── */}
      <section className="pt-6 sm:pt-10 lg:pt-16 space-y-12">
        {/* Meta Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-400 border-b border-white/[0.08] pb-4">
          <div className="flex items-center gap-2">
            <span className="text-sky-400 font-semibold">NEXUS · HUB 01</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span>{PROFILE.location}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>COORDINATES 37.7749° N, 122.4194° W</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-emerald-400 font-medium">AVAILABLE FOR AMBITIOUS WORK</span>
          </div>
        </div>

        {/* Oversized Typographic Statement */}
        <div className="space-y-6 max-w-5xl">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-white font-display uppercase leading-[0.92] select-none text-balance">
            <span className="text-gradient-silver">A World</span>{' '}
            <span className="italic font-light text-slate-400 font-body">of</span><br />
            <span className="text-gradient-electric">Your Own.</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 items-start">
            <div className="md:col-span-8 space-y-4">
              <p className="text-lg sm:text-xl text-slate-300 font-body leading-relaxed font-light">
                {PROFILE.bio[0]}
              </p>
              <p className="text-base text-slate-400 font-body leading-relaxed max-w-2xl">
                {PROFILE.bio[1]}
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col gap-3 font-mono text-xs text-slate-400 pt-2">
              <div className="text-slate-500 uppercase tracking-widest text-[10px]">Active Focus Areas</div>
              {PROFILE.focusDomains.map((domain, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-300">
                  <span className="text-sky-400 text-[10px]">0{i + 1}</span>
                  <span>{domain}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tactile Dimensional 3D Showcase Block */}
        <div className="relative w-full rounded-3xl glass-panel border border-white/[0.1] p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl">
          {/* Subtle Ambient Atmosphere */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-sky-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative & Interactive Rig Controls */}
            <div className="lg:col-span-5 space-y-6 z-10">
              <div className="space-y-2">
                <div className="font-mono text-xs text-sky-400 tracking-wider uppercase">
                  Volumetric Monolith Core
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                  Tactile Dimensional Artifact
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed font-body">
                  An interactive 3D centerpiece sculpted with beveled platinum wings, frosted optical glass, and a refractive focal jewel. Responds organically to cursor momentum and pointer tilt.
                </p>
              </div>

              {/* Lighting Profile Switcher */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Select Lighting Rig:
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'electric_blue', label: 'Electric Blue' },
                    { id: 'violet_eclipse', label: 'Violet Eclipse' },
                    { id: 'studio', label: 'Studio Neutral' },
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => setActiveLighting(preset.id as LightingPreset)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all border whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 ${
                        activeLighting === preset.id
                          ? 'bg-sky-500/20 text-sky-300 border-sky-400/40 shadow-sm'
                          : 'bg-white/[0.04] text-slate-400 hover:text-slate-200 border-white/[0.08]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interaction Hints */}
              <div className="pt-2 flex items-center gap-4 text-xs font-mono text-slate-400">
                <span>Drag or hover to rotate</span>
                <span>·</span>
                <span>RoomEnvironment PBR</span>
              </div>
            </div>

            {/* Right: Centerpiece 3D Canvas */}
            <div className="lg:col-span-7 flex items-center justify-center relative min-h-[360px] sm:min-h-[440px]">
              <DimensionalGlyph
                destinationId="nexus"
                shape="monolith_core"
                lightingProfile={activeLighting}
                size={380}
                forceFallback={forceFallback}
                className="transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. KINETIC MARQUEE RIBBON (Editorial Pacing & Personality)
      ───────────────────────────────────────────────────────────────── */}
      <section className="w-full overflow-hidden border-y border-white/[0.08] py-4 select-none relative bg-slate-950/40">
        <div className="animate-marquee items-center gap-8 text-xs sm:text-sm font-mono tracking-wider uppercase text-slate-400">
          <span>MATHEMATICAL RIGOR</span>
          <span className="text-sky-400">✦</span>
          <span>CINEMATIC CRAFT</span>
          <span className="text-indigo-400">✦</span>
          <span>DIMENSIONAL 3D COMPUTING</span>
          <span className="text-cyan-400">✦</span>
          <span>AUTONOMOUS COGNITIVE AGENTS</span>
          <span className="text-purple-400">✦</span>
          <span>VERIFIABLE INVARIANT TELEMETRY</span>
          <span className="text-sky-300">✦</span>
          <span>JAX — A WORLD OF YOUR OWN</span>
          <span className="text-sky-400">✦</span>
          {/* Loop repeat for seamless continuous animation */}
          <span>MATHEMATICAL RIGOR</span>
          <span className="text-sky-400">✦</span>
          <span>CINEMATIC CRAFT</span>
          <span className="text-indigo-400">✦</span>
          <span>DIMENSIONAL 3D COMPUTING</span>
          <span className="text-cyan-400">✦</span>
          <span>AUTONOMOUS COGNITIVE AGENTS</span>
          <span className="text-purple-400">✦</span>
          <span>VERIFIABLE INVARIANT TELEMETRY</span>
          <span className="text-sky-300">✦</span>
          <span>JAX — A WORLD OF YOUR OWN</span>
          <span className="text-sky-400">✦</span>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. CURATED DESTINATION GATEWAYS (The 4 Discovery Portals)
          Adrien Lamy-style prominent showcase cards that invite exploration
          into Intelligence Lab, Data Observatory, Archive, and Horizon.
      ───────────────────────────────────────────────────────────────── */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <div className="font-mono text-xs text-sky-400 uppercase tracking-wider mb-2">
              Architectural Portals
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display">
              Four Specialized Worlds
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md font-body">
            Explore dedicated spaces for frontier artificial intelligence, statistical observability, production repositories, and long-horizon ambitions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {portalDestinations.map((portal) => {
            const destMeta = DESTINATIONS[portal.id];
            return (
              <div
                key={portal.id}
                onClick={() => onNavigate(portal.id)}
                className="group relative rounded-3xl glass-panel p-6 sm:p-8 border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Glow Backdrop */}
                <div
                  className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none"
                  style={{ backgroundColor: destMeta.accentColor }}
                />

                <div className="space-y-6 z-10">
                  {/* Top Header Strip */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-slate-400 group-hover:text-white transition-colors">
                      PORTAL {portal.index}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-white/[0.12] transition-all">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Title and Summary */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-display group-hover:text-sky-300 transition-colors">
                      {destMeta.title}
                    </h3>
                    <div className="text-xs text-slate-400 font-mono mt-1">
                      {destMeta.subtitle}
                    </div>
                    <p className="text-sm text-slate-300 mt-3 leading-relaxed font-body">
                      {portal.highlight}
                    </p>
                  </div>

                  {/* Clean Unboxed Tags (Zero Pill Discipline) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono pt-2">
                    {portal.tags.map((tag, tIdx) => (
                      <React.Fragment key={tIdx}>
                        {tIdx > 0 && <span aria-hidden="true" className="text-slate-600">·</span>}
                        <span className="hover:text-slate-200 transition-colors">{tag}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Micro 3D Dimensional Preview Stage */}
                <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-xl bg-slate-900/60 border border-white/[0.08] flex items-center justify-center overflow-hidden">
                      <DimensionalGlyph
                        destinationId={portal.id}
                        shape={portal.shape}
                        lightingProfile={portal.lighting}
                        size={64}
                        interactive={false}
                        autoRotate={true}
                        forceFallback={forceFallback}
                      />
                    </div>
                    <div className="text-xs font-mono text-slate-400">
                      <div>Dimensional Key 0{destMeta.index}</div>
                      <div className="text-[11px] text-slate-500">Shortcut: Press [{destMeta.index}]</div>
                    </div>
                  </div>

                  <span className="text-xs font-semibold uppercase tracking-wider text-sky-400 group-hover:text-sky-300 font-mono flex items-center gap-1">
                    Enter Portal →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. THE THREE PILLARS OF CRAFT (Interactive Ethos / Manifesto)
          Editorial cards with interactive tabbed expansion.
      ───────────────────────────────────────────────────────────────── */}
      <section className="space-y-8">
        <div className="border-b border-white/[0.08] pb-6">
          <div className="font-mono text-xs text-sky-400 uppercase tracking-wider mb-2">
            Manifesto & Craft
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display">
            The Three Principles
          </h2>
          <p className="text-sm text-slate-400 max-w-xl font-body mt-2">
            Non-negotiable engineering values that distinguish JAX from disposable templates and hype-driven trends.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ethosDetails.map((item, idx) => {
            const isSelected = selectedEthos === idx;
            return (
              <div
                key={idx}
                onClick={() => setSelectedEthos(idx)}
                className={`p-6 sm:p-8 rounded-3xl transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 border ${
                  isSelected
                    ? 'bg-sky-950/20 border-sky-400/40 shadow-xl'
                    : 'glass-panel border-white/[0.08] hover:border-white/[0.18]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-sky-400 font-semibold">
                      0{idx + 1}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">
                      {item.codeTag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-display">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed font-body">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <p className="text-xs text-slate-400 leading-relaxed font-body">
                    {item.manifesto}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. DIRECT DISPATCH & INQUIRY STATION (Adrien Lamy Style)
          Bold, artistic conclusion inviting authentic collaboration.
      ───────────────────────────────────────────────────────────────── */}
      <section className="relative rounded-3xl glass-panel p-8 sm:p-12 lg:p-16 border border-white/[0.12] overflow-hidden shadow-2xl">
        {/* Ambient illumination */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-sky-600/15 via-indigo-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-8">
          <div className="space-y-3">
            <div className="font-mono text-xs text-sky-400 uppercase tracking-widest">
              Direct Communication Station
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white font-display tracking-tight leading-none">
              Let's build something extraordinary.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-body leading-relaxed max-w-2xl pt-2">
              Interested in collaborating on high-stakes cognitive architectures, spatial computing interfaces, or mathematical data systems? Direct channels are open.
            </p>
          </div>

          {/* Action Row: Copy Email + Mailto + Socials */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Copy Button */}
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-2.5 px-6 py-3.5 bg-sky-400 hover:bg-sky-300 text-slate-950 font-semibold text-xs uppercase tracking-wider rounded-xl transition-all whitespace-nowrap shadow-lg shadow-sky-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-slate-950" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-950" />
                  <span>Copy {PROFILE.channels.email}</span>
                </>
              )}
            </button>

            {/* Direct Mailto */}
            <a
              href={`mailto:${PROFILE.channels.email}?subject=Inquiry%20via%20JAX%20Nexus`}
              className="flex items-center gap-2 px-5 py-3.5 bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border border-white/[0.1] text-xs uppercase tracking-wider rounded-xl transition-all whitespace-nowrap font-semibold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
            >
              <span>Launch Mail Client</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* GitHub Verified Channel */}
            <a
              href={PROFILE.channels.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-3.5 text-xs text-slate-400 hover:text-white font-mono transition-colors whitespace-nowrap"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* X / Twitter Verified Channel */}
            {PROFILE.channels.x && (
              <a
                href={PROFILE.channels.x}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-3.5 text-xs text-slate-400 hover:text-white font-mono transition-colors whitespace-nowrap"
              >
                <span>X (Twitter)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <div className="text-xs font-mono text-slate-400 pt-2 border-t border-white/[0.06] flex flex-wrap items-center gap-6">
            <span>PGP Encrypted Inquiries Welcome</span>
            <span>·</span>
            <span>Response Window: ~24 Hours</span>
            <span>·</span>
            <span className="text-slate-400">No Automated Recruiters</span>
          </div>
        </div>
      </section>
    </div>
  );
};
