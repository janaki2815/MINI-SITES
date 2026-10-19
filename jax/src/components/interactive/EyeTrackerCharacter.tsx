import React, { useState, useEffect, useRef, useMemo } from 'react';

interface EyeTrackerCharacterProps {
  pointerPos: { x: number; y: number };
  onPoke?: () => void;
  className?: string;
}

export const EyeTrackerCharacter: React.FC<EyeTrackerCharacterProps> = ({
  pointerPos,
  onPoke,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBlinking, setIsBlinking] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [speechBubble, setSpeechBubble] = useState<string>('Drag & explore!');

  // Calculate eye pupil offsets based on container position & pointer coordinates
  const pupilOffsets = useMemo(() => {
    if (!containerRef.current) return { leftX: 0, leftY: 0, rightX: 0, rightY: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = pointerPos.x - centerX;
    const dy = pointerPos.y - centerY;
    const angle = Math.atan2(dy, dx);
    const distance = Math.min(Math.hypot(dx, dy) / 45, 1);

    const maxEyeRadius = 7.5; // Max offset within eye
    const offsetX = Math.cos(angle) * maxEyeRadius * distance;
    const offsetY = Math.sin(angle) * maxEyeRadius * distance;

    return {
      leftX: offsetX,
      leftY: offsetY,
      rightX: offsetX,
      rightY: offsetY,
    };
  }, [pointerPos]);

  // Periodic natural blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3800 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  const handleClick = () => {
    setIsClicked(true);
    const phrases = [
      'Pull the hand cord! ↓',
      'Click & drag to reveal!',
      'Java + ML + Code Craft',
      'JAX in progress ✦',
      'Boya Janaki Ramu!',
    ];
    setSpeechBubble(phrases[Math.floor(Math.random() * phrases.length)]);
    if (onPoke) onPoke();
    setTimeout(() => setIsClicked(false), 600);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className={`relative cursor-pointer select-none group ${className}`}
      title="Click me!"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      {/* Speech Bubble */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-slate-900 font-mono text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-lg border border-slate-200 pointer-events-none transition-all duration-200 scale-95 group-hover:scale-105 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />
        <span>{speechBubble}</span>
        {/* Little bubble beak */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-slate-200" />
      </div>

      {/* Illustrated Mascot SVG (Quirky Character with expressive Eyes) */}
      <svg
        viewBox="0 0 160 160"
        className={`w-32 h-32 sm:w-36 sm:h-36 drop-shadow-2xl transition-transform duration-300 ease-out ${
          isClicked ? 'scale-90 rotate-6' : 'group-hover:scale-105 group-hover:-rotate-3'
        }`}
      >
        <defs>
          <linearGradient id="char-body" x1="20" y1="20" x2="140" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="60%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          <linearGradient id="char-blush" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F43F5E" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="80" cy="148" rx="46" ry="7" fill="#000000" opacity="0.35" />

        {/* Mascot Body (Soft squarish fluid blob) */}
        <path
          d="M42,32 C68,26 92,26 118,32 C134,42 142,65 140,94 C138,124 122,142 80,142 C38,142 22,124 20,94 C18,65 26,42 42,32 Z"
          fill="url(#char-body)"
          stroke="#0F172A"
          strokeWidth="3.5"
        />

        {/* Playful Antenna / Sprout on top */}
        <path
          d="M80,27 Q75,12 88,8"
          stroke="#0F172A"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="89" cy="8" r="4.5" fill="#FACC15" stroke="#0F172A" strokeWidth="2" />

        {/* Blush Cheeks */}
        <circle cx="44" cy="98" r="8" fill="url(#char-blush)" />
        <circle cx="116" cy="98" r="8" fill="url(#char-blush)" />

        {/* LEFT EYE */}
        <g transform="translate(56, 74)">
          {/* Sclera (White) */}
          <ellipse cx="0" cy="0" rx="16" ry="19" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
          {/* Pupil */}
          {!isBlinking && (
            <g transform={`translate(${pupilOffsets.leftX}, ${pupilOffsets.leftY})`}>
              <circle cx="0" cy="0" r="7" fill="#0F172A" />
              {/* Eye Catchlight */}
              <circle cx="-2.5" cy="-2.5" r="2.2" fill="#FFFFFF" />
            </g>
          )}
          {/* Eyelid when blinking */}
          {isBlinking && (
            <line x1="-15" y1="0" x2="15" y2="0" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
          )}
        </g>

        {/* RIGHT EYE */}
        <g transform="translate(104, 74)">
          {/* Sclera (White) */}
          <ellipse cx="0" cy="0" rx="16" ry="19" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
          {/* Pupil */}
          {!isBlinking && (
            <g transform={`translate(${pupilOffsets.rightX}, ${pupilOffsets.rightY})`}>
              <circle cx="0" cy="0" r="7" fill="#0F172A" />
              {/* Eye Catchlight */}
              <circle cx="-2.5" cy="-2.5" r="2.2" fill="#FFFFFF" />
            </g>
          )}
          {/* Eyelid when blinking */}
          {isBlinking && (
            <line x1="-15" y1="0" x2="15" y2="0" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
          )}
        </g>

        {/* Reactive Mouth */}
        {isClicked ? (
          // Big O mouth on click
          <ellipse cx="80" cy="112" rx="7" ry="10" fill="#0F172A" />
        ) : (
          // Contented playful curve
          <path
            d="M71,110 Q80,119 89,110"
            stroke="#0F172A"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        )}
      </svg>
    </div>
  );
};
