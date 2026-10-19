import React from 'react';
import { DestinationId } from '../../types/destinations.ts';
import { DESTINATION_LIST } from '../../config/destinations.ts';

interface DestinationDockProps {
  currentDestination: DestinationId;
  onSelectDestination: (id: DestinationId) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onToggleFallback: () => void;
  isFallbackForced: boolean;
}

export const DestinationDock: React.FC<DestinationDockProps> = ({
  currentDestination,
  onSelectDestination,
  isCollapsed,
  onToggleCollapse,
  onToggleFallback,
  isFallbackForced,
}) => {
  return (
    <div
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 transition-transform duration-300 ease-out flex flex-col items-center"
      style={{
        maxWidth: 'min(940px, 94vw)',
        transform: isCollapsed ? 'translate(-50%, calc(100% - 24px))' : 'translate(-50%, 0)',
      }}
    >
      {/* Collapse / Zen Mode Handle */}
      <button
        onClick={onToggleCollapse}
        className="px-3 py-1 mb-1 text-[11px] font-medium tracking-wide uppercase text-slate-400 hover:text-slate-200 bg-slate-950/80 border border-white/[0.08] rounded-t-lg backdrop-blur-md transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400"
        title="Toggle Cinema / Zen Mode (Press 'H')"
        aria-label={isCollapsed ? 'Show Destination Controls' : 'Hide Destination Controls'}
      >
        <span>{isCollapsed ? '▴ Expand Dock' : '▾ Cinema Mode'}</span>
        <span className="font-mono text-[9px] text-slate-500 border border-slate-700/60 px-1 py-0.2 rounded">H</span>
      </button>

      {/* Main Glass Dock */}
      <div className="w-full glass-panel rounded-2xl p-2 px-3 shadow-2xl flex flex-wrap md:flex-nowrap items-center justify-between gap-3 border border-white/[0.1]">
        {/* Destination Buttons (1-5) */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none w-full md:w-auto">
          {DESTINATION_LIST.map((dest) => {
            const isActive = currentDestination === dest.id;
            return (
              <button
                key={dest.id}
                onClick={() => onSelectDestination(dest.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 ${
                  isActive
                    ? 'bg-sky-500/15 text-sky-300 border border-sky-400/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] border border-transparent'
                }`}
              >
                <span className="font-mono text-[10px] text-slate-500">
                  0{dest.index}
                </span>
                <span className="font-medium tracking-tight">
                  {dest.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Aux Controls: 3D Render Engine / SVG Toggle */}
        <div className="hidden lg:flex items-center gap-2 shrink-0 border-l border-white/[0.08] pl-3 text-xs text-slate-400">
          <button
            onClick={onToggleFallback}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-mono tracking-tight transition-colors border ${
              isFallbackForced
                ? 'bg-amber-500/15 text-amber-300 border-amber-400/30'
                : 'bg-white/[0.04] text-slate-400 hover:text-slate-200 border-white/[0.08]'
            }`}
            title="Switch between WebGL Three.js PBR Engine and Isometric SVG Artwork"
          >
            {isFallbackForced ? 'Render: 2D Isometric' : 'Render: 3D WebGL PBR'}
          </button>
        </div>
      </div>
    </div>
  );
};
