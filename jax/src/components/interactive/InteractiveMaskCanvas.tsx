import React from 'react';

interface InteractiveMaskCanvasProps {
  maskPos: { x: number; y: number };
  isRevealing: boolean;
  className?: string;
}

export const InteractiveMaskCanvas: React.FC<InteractiveMaskCanvasProps> = ({
  maskPos,
  isRevealing,
  className = '',
}) => {
  if (!isRevealing) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-20 overflow-hidden transition-opacity duration-150 ${className}`}
      style={{
        clipPath: `circle(120px at ${maskPos.x}px ${maskPos.y}px)`,
        WebkitClipPath: `circle(120px at ${maskPos.x}px ${maskPos.y}px)`,
      }}
    >
      {/* Secret Layer Unmasked Beneath */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#0f172a] text-white flex flex-col justify-between p-12 select-none">
        {/* Playful Doodles and Handwritten Art */}
        <div className="flex items-center justify-between text-xs font-mono text-amber-300">
          <span>✦ UNMASKED CREATIVE LAYER ✦</span>
          <span>JAVA · ML · CREATIVE DEV</span>
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="text-4xl sm:text-6xl font-black tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-sky-300">
            CODE + IMAGINATION
          </div>
          <p className="text-base text-sky-200 font-mono">
            "Software shouldn't just run; it should make you smile."
          </p>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-emerald-300">
          <span>BOYA JANAKI RAMU</span>
          <span>RGMCET 2026</span>
        </div>

        {/* Ambient Ring Glow around mask border */}
        <div
          className="absolute w-[240px] h-[240px] rounded-full border-2 border-dashed border-amber-300 pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${maskPos.x}px`,
            top: `${maskPos.y}px`,
          }}
        />
      </div>
    </div>
  );
};
