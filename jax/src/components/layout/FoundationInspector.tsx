import React, { useState } from 'react';
import { DESTINATION_LIST } from '../../config/destinations.ts';
import { colors } from '../../tokens/colors.ts';
import { typography } from '../../tokens/typography.ts';
import { FUTURE_ASSET_REGISTRY } from '../../config/futureAssets.ts';
import { PROFILE } from '../../config/profile.ts';

interface FoundationInspectorProps {
  isOpen: boolean;
  onClose: () => void;
  isFallbackForced: boolean;
  onToggleFallback: () => void;
}

type TabKey = 'destinations' | 'tokens' | 'dimensional' | 'roadmap' | 'identity';

export const FoundationInspector: React.FC<FoundationInspectorProps> = ({
  isOpen,
  onClose,
  isFallbackForced,
  onToggleFallback,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('destinations');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-5xl max-h-[88vh] bg-[#050814] border border-white/[0.12] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Foundation Architecture System Deck"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#030712]/60">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tracking-tight text-white font-display">
              JAX FOUNDATION SYSTEM DECK
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Generation 1 Architecture
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 font-mono text-sm"
            aria-label="Close Inspector"
          >
            ✕ ESC
          </button>
        </div>

        {/* Tab Strip */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-white/[0.08] bg-[#050814] overflow-x-auto">
          {[
            { id: 'destinations', label: '5 Destinations' },
            { id: 'tokens', label: 'Design Tokens' },
            { id: 'dimensional', label: '3D Artwork Engine' },
            { id: 'roadmap', label: 'Gen 1 vs Gen 2 Staging' },
            { id: 'identity', label: 'Verified Identity' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabKey)}
              className={`px-3.5 py-2 text-xs font-medium tracking-tight rounded-t-lg transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeTab === tab.id
                  ? 'text-sky-400 border-sky-400 bg-sky-500/10'
                  : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-300">
          {/* TAB 1: DESTINATIONS */}
          {activeTab === 'destinations' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Five Architectural Destinations
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Structured boundaries separating personal narrative, intelligence research, data telemetry, production archives, and forward ambitions.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DESTINATION_LIST.map((dest) => (
                  <div
                    key={dest.id}
                    className="p-5 rounded-2xl bg-slate-900/40 border border-white/[0.08] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-sky-400">
                        0{dest.index} · Key [{dest.index}]
                      </span>
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: dest.accentColor }}
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white">
                        {dest.title}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {dest.subtitle}
                      </p>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {dest.editorialCharter}
                    </p>
                    <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>3D Shape: {dest.dimensionalAsset.glyphShape}</span>
                      <span>{dest.plannedModules.length} Modules</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: DESIGN TOKENS */}
          {activeTab === 'tokens' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-white">
                  Design System Tokens
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Deep black & midnight navy canvas (60%), structural glass surfaces (30%), restrained electric blue/violet action budget (10%).
                </p>
              </div>

              {/* Color Palette Matrix */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Canvas & Structural Neutrals (60% / 30%)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl border border-white/[0.08] bg-[#030712]">
                    <div className="text-xs font-mono text-slate-200">#030712</div>
                    <div className="text-[11px] text-slate-400">Canvas Black (60%)</div>
                  </div>
                  <div className="p-3 rounded-xl border border-white/[0.08] bg-[#050814]">
                    <div className="text-xs font-mono text-slate-200">#050814</div>
                    <div className="text-[11px] text-slate-400">Midnight Viewport</div>
                  </div>
                  <div className="p-3 rounded-xl border border-white/[0.08] bg-[#0a1024]">
                    <div className="text-xs font-mono text-slate-200">#0a1024</div>
                    <div className="text-[11px] text-slate-400">Structural Surface (30%)</div>
                  </div>
                  <div className="p-3 rounded-xl border border-white/[0.08] bg-[#0f172e]">
                    <div className="text-xs font-mono text-slate-200">#0f172e</div>
                    <div className="text-[11px] text-slate-400">Elevated Glass Dock</div>
                  </div>
                </div>
              </div>

              {/* Accents */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Restrained High-Intent Accents (10% Budget)
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl border border-sky-500/20 bg-sky-950/20">
                    <div className="text-xs font-mono text-sky-400">{colors.accent.blue.light}</div>
                    <div className="text-[11px] text-slate-400">Electric Blue Primary</div>
                  </div>
                  <div className="p-3 rounded-xl border border-indigo-500/20 bg-indigo-950/20">
                    <div className="text-xs font-mono text-indigo-400">{colors.accent.violet.light}</div>
                    <div className="text-[11px] text-slate-400">Violet Secondary</div>
                  </div>
                  <div className="p-3 rounded-xl border border-cyan-500/20 bg-cyan-950/20">
                    <div className="text-xs font-mono text-cyan-400">{colors.accent.cyan.light}</div>
                    <div className="text-[11px] text-slate-400">Observatory Cyan</div>
                  </div>
                  <div className="p-3 rounded-xl border border-purple-500/20 bg-purple-950/20">
                    <div className="text-xs font-mono text-purple-400">#A78BFA</div>
                    <div className="text-[11px] text-slate-400">Archive Lavender</div>
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Strict 2+1 Font Family Pairing
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl border border-white/[0.08] bg-slate-900/30">
                    <div className="text-xs text-sky-400 font-mono">Display Face</div>
                    <div className="text-lg font-bold text-white font-display mt-1">Outfit</div>
                    <p className="text-xs text-slate-400 mt-1">Hero headlines, brand wordmark, destination titles.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/[0.08] bg-slate-900/30">
                    <div className="text-xs text-sky-400 font-mono">Body Prose</div>
                    <div className="text-lg font-semibold text-white font-body mt-1">Plus Jakarta Sans</div>
                    <p className="text-xs text-slate-400 mt-1">Charters, descriptions, and UI controls.</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/[0.08] bg-slate-900/30">
                    <div className="text-xs text-sky-400 font-mono">Telemetry & Tabular</div>
                    <div className="text-lg font-medium text-white font-mono mt-1">JetBrains Mono</div>
                    <p className="text-xs text-slate-400 mt-1">Numbers, timestamps, and architectural IDs.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DIMENSIONAL 3D ENGINE */}
          {activeTab === 'dimensional' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Dimensional 3D Artwork System
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Volumetric models inspired by 3Dicons.co with procedural PBR materials, RoomEnvironment reflections, and seamless SVG fallback.
                  </p>
                </div>

                <button
                  onClick={onToggleFallback}
                  className={`px-4 py-2 text-xs font-mono rounded-xl border transition-colors shrink-0 ${
                    isFallbackForced
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                      : 'bg-sky-500/20 text-sky-300 border-sky-400/40'
                  }`}
                >
                  {isFallbackForced ? 'Active: Forced SVG Fallback' : 'Active: WebGL Three.js PBR Engine'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/[0.08] space-y-3">
                  <h4 className="text-sm font-semibold text-white">Three.js PBR Engine Features</h4>
                  <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                    <li>3–12 part procedural geometry assemblies (<code className="text-sky-300">THREE.Group</code>).</li>
                    <li>Procedural <code className="text-sky-300">RoomEnvironment</code> PMREM reflections (zero 404 textures).</li>
                    <li>Directional key light with soft shadow mapping (<code className="text-sky-300">PCFSoftShadowMap</code>).</li>
                    <li>Electric blue and violet rim backlights with exponential damping.</li>
                    <li>Subtle pointer inertia tilt and ambient sinusoidal levitation.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/[0.08] space-y-3">
                  <h4 className="text-sm font-semibold text-white">Zero-Broken-Image Fallback Policy</h4>
                  <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                    <li>High-fidelity layered isometric SVG art inspired by 3Dicons.co.</li>
                    <li>Automatic fallback trigger if WebGL context is lost or unsupported.</li>
                    <li>Directional gradient bevels, radial contact shadow, and ambient depth.</li>
                    <li>100% resilient across hermetic sandboxes and headless test runners.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ROADMAP & STAGING */}
          {activeTab === 'roadmap' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-white">
                  Generation 1 vs. Generation 2 Staging
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Strict boundary preserving architectural integrity without premature or fabricated implementations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-sky-950/20 border border-sky-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-sky-300">
                      Generation 1: Complete Foundation
                    </h4>
                    <span className="text-[11px] font-mono text-sky-400 font-semibold">DELIVERED</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                    <li>Clean React + TypeScript + Vite architecture from zero.</li>
                    <li>Full 5-destination route and state manager.</li>
                    <li>Design system tokens (colors, typography, spacing, motion).</li>
                    <li>Dimensional 3D WebGL engine & handcrafted SVG fallbacks.</li>
                    <li>Top Bar Contract (3 zones) + Ergonomic Collapsible Bottom Dock.</li>
                    <li>Error boundaries, loading states, and keyboard shortcut system (1–5, H, I).</li>
                    <li>Separated configuration for verified identity and future assets.</li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-indigo-300">
                      Generation 2: Content & Asset Integration
                    </h4>
                    <span className="text-[11px] font-mono text-indigo-400">PLANNED</span>
                  </div>
                  <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                    <li>Verified project repositories & technical case study entries.</li>
                    <li>Live model evaluation telemetry in Intelligence Lab.</li>
                    <li>Spatial data visualization and tabular datasets in Data Observatory.</li>
                    <li>Curated reading list and monograph chronology in Horizon.</li>
                    <li>High-resolution GLTF models and custom WebGL shaders.</li>
                    <li>Direct contact inquiry dispatch integration.</li>
                  </ul>
                </div>
              </div>

              {/* Asset Slots Staged */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Future Asset Integration Registry ({FUTURE_ASSET_REGISTRY.length} Slots Defined)
                </h4>
                <div className="space-y-2">
                  {FUTURE_ASSET_REGISTRY.map((slot) => (
                    <div
                      key={slot.id}
                      className="p-3 rounded-xl bg-slate-900/40 border border-white/[0.06] flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-mono text-slate-200">{slot.id}</span>
                        <span className="mx-2 text-slate-600">·</span>
                        <span className="text-slate-400">{slot.description}</span>
                      </div>
                      <span className="font-mono text-[11px] text-sky-400 shrink-0">
                        {slot.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: IDENTITY & CHANNELS */}
          {activeTab === 'identity' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-white">
                  Verified Identity Baseline
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Authentic professional identity config free of vanity metrics, fabricated scoreboards, or fake testimonials.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/[0.08] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-4">
                  <div>
                    <h4 className="text-lg font-bold text-white font-display">
                      {PROFILE.name}
                    </h4>
                    <p className="text-xs text-sky-400 font-mono mt-0.5">
                      {PROFILE.moniker}
                    </p>
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    {PROFILE.location} · {PROFILE.status}
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {PROFILE.tagline}
                </p>

                <div className="pt-2">
                  <div className="text-xs font-mono text-slate-400 mb-2">Focus Domains:</div>
                  <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                    {PROFILE.focusDomains.map((domain, i) => (
                      <span key={i} className="px-3 py-1 bg-white/[0.04] border border-white/[0.08] rounded-md">
                        {domain}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center gap-6 text-xs font-mono text-slate-400">
                  <a
                    href={PROFILE.channels.github}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    GitHub ↗
                  </a>
                  <a
                    href={`mailto:${PROFILE.channels.email}`}
                    className="hover:text-sky-400 transition-colors"
                  >
                    {PROFILE.channels.email}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="px-6 py-3 border-t border-white/[0.08] bg-[#030712]/60 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Keyboard shortcuts: [1-5] Destinations · [H] Zen Mode · [I] System Deck</span>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white font-semibold"
          >
            Close Deck
          </button>
        </div>
      </div>
    </div>
  );
};
