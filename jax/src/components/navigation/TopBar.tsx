import React from 'react';
import { DestinationId } from '../../types/destinations.ts';
import { DESTINATION_LIST } from '../../config/destinations.ts';

interface TopBarProps {
  currentDestination: DestinationId;
  onSelectDestination: (id: DestinationId) => void;
  onOpenInspector: () => void;
  isInspectorOpen: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentDestination,
  onSelectDestination,
  onOpenInspector,
  isInspectorOpen,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#030712]/80 backdrop-blur-md border-b border-white/[0.08] transition-colors">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-8 px-6 lg:px-12 h-16">
        {/* Zone 1: Single text element Brand Wordmark */}
        <button
          onClick={() => onSelectDestination('nexus')}
          className="text-lg lg:text-xl font-bold tracking-tight text-slate-100 hover:text-sky-300 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 font-display text-left"
        >
          JAX — A WORLD OF YOUR OWN
        </button>

        {/* Zone 2: 5 Concise Single-Line Text Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-400"
          aria-label="Destination navigation"
        >
          {DESTINATION_LIST.map((dest) => {
            const isActive = currentDestination === dest.id;
            return (
              <button
                key={dest.id}
                onClick={() => onSelectDestination(dest.id)}
                className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 ${
                  isActive
                    ? 'text-sky-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{dest.title}</span>
                {isActive && (
                  <span
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-sky-400 rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenInspector}
            className={`px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-all whitespace-nowrap shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
              isInspectorOpen
                ? 'bg-sky-400 text-slate-950 font-bold'
                : 'bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border border-white/[0.1]'
            }`}
          >
            {isInspectorOpen ? 'Close System Deck' : 'Foundation System Deck'}
          </button>
        </div>
      </div>
    </header>
  );
};
