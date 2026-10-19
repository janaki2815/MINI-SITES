import React from 'react';
import { DestinationId } from '../../types/destinations.ts';
import { TopBar } from '../navigation/TopBar.tsx';
import { DestinationDock } from '../navigation/DestinationDock.tsx';
import { FoundationInspector } from './FoundationInspector.tsx';

interface ShellProps {
  currentDestination: DestinationId;
  onSelectDestination: (id: DestinationId) => void;
  isDockCollapsed: boolean;
  onToggleDockCollapse: () => void;
  isInspectorOpen: boolean;
  onToggleInspector: () => void;
  isFallbackForced: boolean;
  onToggleFallback: () => void;
  children: React.ReactNode;
}

export const Shell: React.FC<ShellProps> = ({
  currentDestination,
  onSelectDestination,
  isDockCollapsed,
  onToggleDockCollapse,
  isInspectorOpen,
  onToggleInspector,
  isFallbackForced,
  onToggleFallback,
  children,
}) => {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col relative selection:bg-sky-500/30 selection:text-sky-200">
      {/* Background Atmosphere: Deep Black & Midnight Navy Gradient */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle radial midnight illumination behind hero */}
        <div className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-gradient-to-b from-sky-950/25 via-indigo-950/15 to-transparent rounded-full blur-3xl opacity-70" />
        {/* Hairline subtle geometric grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      {/* Top Bar (adheres to 3-zone contract) */}
      <TopBar
        currentDestination={currentDestination}
        onSelectDestination={onSelectDestination}
        onOpenInspector={onToggleInspector}
        isInspectorOpen={isInspectorOpen}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 lg:px-12 pt-6 pb-28 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          {children}
        </div>
      </main>

      {/* Ergonomic Collapsible Bottom Destination Dock */}
      <DestinationDock
        currentDestination={currentDestination}
        onSelectDestination={onSelectDestination}
        isCollapsed={isDockCollapsed}
        onToggleCollapse={onToggleDockCollapse}
        onToggleFallback={onToggleFallback}
        isFallbackForced={isFallbackForced}
      />

      {/* Foundation System Deck Modal */}
      <FoundationInspector
        isOpen={isInspectorOpen}
        onClose={onToggleInspector}
        isFallbackForced={isFallbackForced}
        onToggleFallback={onToggleFallback}
      />

      {/* Quiet Footer */}
      <footer className="w-full border-t border-white/[0.06] bg-[#030712]/90 py-6 px-6 lg:px-12 text-xs text-slate-500 z-10">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">JAX — A World of Your Own</span>
            <span>·</span>
            <span>Generation 1 Foundation</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
            <span>React 19</span>
            <span>·</span>
            <span>Three.js PBR</span>
            <span>·</span>
            <span>Tailwind v4</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
