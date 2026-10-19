import React from 'react';

interface LoadingTransitionProps {
  label?: string;
  sublabel?: string;
}

export const LoadingTransition: React.FC<LoadingTransitionProps> = ({
  label = 'Calibrating Foundation Stage',
  sublabel = 'Mounting destination state and lighting rigs',
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[380px] w-full p-8 text-center" aria-busy="true" aria-live="polite">
      {/* Subtle non-pulsing geometric spinner */}
      <div className="relative w-12 h-12 mb-6">
        <div className="absolute inset-0 rounded-full border border-white/10" />
        <div className="absolute inset-0 rounded-full border-t border-sky-400 animate-spin" style={{ animationDuration: '1.2s' }} />
        <div className="absolute inset-2 rounded-full border-r border-indigo-400 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
      </div>

      <p className="text-sm font-medium text-slate-200 tracking-wide mb-1">
        {label}
      </p>
      <p className="text-xs text-slate-400 max-w-sm">
        {sublabel}
      </p>
    </div>
  );
};
