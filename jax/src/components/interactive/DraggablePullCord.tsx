import React, { useState, useRef, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

interface DraggablePullCordProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export const DraggablePullCord: React.FC<DraggablePullCordProps> = ({
  isOpen,
  onToggle,
  className = '',
}) => {
  const [dragY, setDragY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const startYRef = useRef<number>(0);
  const currentDragYRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  const THRESHOLD = 85; // Pixels needed to trigger open

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startYRef.current = e.clientY;
    currentDragYRef.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging) return;
    const delta = Math.max(0, Math.min(e.clientY - startYRef.current, 140));
    currentDragYRef.current = delta;
    setDragY(delta);
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    if (currentDragYRef.current >= THRESHOLD) {
      // Trigger toggle!
      onToggle();
      try {
        confetti({
          particleCount: 28,
          spread: 60,
          origin: { y: 0.15, x: 0.85 },
          colors: ['#38bdf8', '#818cf8', '#facc15', '#f43f5e'],
        });
      } catch {
        // Safe fallback
      }
    }

    // Spring release back to 0
    let velocity = 0;
    let pos = currentDragYRef.current;
    const spring = () => {
      const force = -0.22 * pos;
      velocity = velocity * 0.72 + force;
      pos += velocity;
      if (Math.abs(pos) < 0.5 && Math.abs(velocity) < 0.5) {
        setDragY(0);
        currentDragYRef.current = 0;
      } else {
        setDragY(pos);
        animationFrameRef.current = requestAnimationFrame(spring);
      }
    };
    animationFrameRef.current = requestAnimationFrame(spring);
  }, [isDragging, onToggle]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('pointercancel', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isDragging, handlePointerMove, handlePointerUp]);

  const isTriggered = dragY >= THRESHOLD;

  return (
    <div className={`fixed top-0 right-6 sm:right-12 z-40 select-none flex flex-col items-center pointer-events-auto ${className}`}>
      {/* Elastic cord SVG */}
      <svg
        width="24"
        height={60 + dragY}
        className="overflow-visible pointer-events-none transition-none"
      >
        <line
          x1="12"
          y1="0"
          x2="12"
          y2={50 + dragY}
          stroke={isTriggered ? '#38bdf8' : '#94a3b8'}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="4 2"
        />
        {/* Top anchor bead */}
        <circle cx="12" cy="4" r="5" fill="#facc15" stroke="#0f172a" strokeWidth="2" />
      </svg>

      {/* Draggable Illustrated Hand & Pull-Tab */}
      <div
        onPointerDown={handlePointerDown}
        onClick={(e) => {
          // If simply clicked without dragging, toggle directly
          if (dragY < 10) {
            onToggle();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Pull to open About and Skills panel"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        style={{
          transform: `translateY(${dragY}px)`,
        }}
        className={`-mt-3 flex flex-col items-center cursor-grab active:cursor-grabbing transition-shadow duration-150 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-2xl ${
          isDragging ? 'scale-105' : 'hover:scale-105'
        }`}
      >
        {/* Illustrated Pull Hand SVG */}
        <svg
          viewBox="0 0 72 72"
          className="w-14 h-14 drop-shadow-xl transition-transform"
        >
          {/* Hand Palm & Fingers gripping cord */}
          <g transform="translate(6, 6)">
            {/* Grip ring */}
            <circle cx="30" cy="14" r="12" fill="none" stroke="#facc15" strokeWidth="4" />

            {/* Hand Base */}
            <path
              d="M16,28 C16,20 22,14 30,14 C38,14 44,20 44,28 L44,48 C44,55 38,60 30,60 C22,60 16,55 16,48 Z"
              fill="#FDE047"
              stroke="#0F172A"
              strokeWidth="3"
            />
            {/* Finger segmentation lines */}
            <line x1="22" y1="26" x2="38" y2="26" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="22" y1="34" x2="38" y2="34" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="22" y1="42" x2="38" y2="42" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            {/* Cute Thumb */}
            <path
              d="M16,36 C10,36 8,44 14,48 L18,48"
              fill="#FDE047"
              stroke="#0F172A"
              strokeWidth="2.5"
            />
          </g>
        </svg>

        {/* Tactile Tag Label */}
        <div
          className={`px-3 py-1 -mt-1 rounded-full text-[11px] font-mono tracking-tight transition-all duration-150 border shadow-lg flex items-center gap-1.5 whitespace-nowrap ${
            isTriggered
              ? 'bg-sky-400 text-slate-950 font-bold border-sky-300 scale-110'
              : isOpen
              ? 'bg-slate-900 text-slate-200 border-white/20'
              : 'bg-[#181a24] text-slate-200 border-white/10 group-hover:border-sky-400/50'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>
            {isDragging
              ? isTriggered
                ? 'Release to Open! ✦'
                : `Pull ${Math.round((dragY / THRESHOLD) * 100)}%`
              : isOpen
              ? 'Close About [A]'
              : 'Pull for About [A]'}
          </span>
        </div>
      </div>
    </div>
  );
};
