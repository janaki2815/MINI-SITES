import React, { useState, useEffect } from 'react';
import { JaxAnimatedWordmark } from './components/character/JaxAnimatedWordmark.tsx';
import { HandDrawnCharacter } from './components/character/HandDrawnCharacter.tsx';
import { DraggableHandTab } from './components/character/DraggableHandTab.tsx';
import { RevealedAboutDrawer } from './components/character/RevealedAboutDrawer.tsx';
import { AnimatedBackgroundArtwork } from './components/character/AnimatedBackgroundArtwork.tsx';
import { InteractiveSocialLinks } from './components/character/InteractiveSocialLinks.tsx';
import { PROFILE } from './config/profile.ts';
import { ErrorBoundary } from './components/common/ErrorBoundary.tsx';
import { sound } from './lib/sound.ts';

export default function App() {
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number }>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 400,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 300,
  });

  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isGrabbing, setIsGrabbing] = useState<boolean>(false);
  const [dragTension, setDragTension] = useState<number>(0);
  const [characterExpression, setCharacterExpression] = useState<number>(0);

  // Global Pointer Tracking across the red canvas for character eyes & background parallax
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setPointerPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // Keyboard accessibility ('A' to trigger tow reveal, 'Escape' to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === 'a' || e.key === 'A') {
        if (isAboutOpen) {
          sound.click();
          setIsAboutOpen(false);
        } else {
          window.dispatchEvent(new CustomEvent('trigger-tow-reveal'));
        }
      } else if (e.key === 'Escape' && isAboutOpen) {
        sound.click();
        setIsAboutOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAboutOpen]);

  // Handler for successful tow release
  const handleTowSuccess = () => {
    // Cycle the character to next playful visual style after tow finishes
    setCharacterExpression((prev) => (prev + 1) % 5);
  };

  const handleToggleAbout = () => {
    if (isAboutOpen) {
      sound.click();
      setIsAboutOpen(false);
    } else {
      window.dispatchEvent(new CustomEvent('trigger-tow-reveal'));
    }
  };

  return (
    <ErrorBoundary fallbackTitle="JAX Visual Experience Recovery">
      <div className="relative w-full min-h-screen bg-[#e11d24] text-black overflow-hidden flex flex-col justify-between p-4 sm:p-10 lg:p-12 select-none paper-noise">
        {/* ─────────────────────────────────────────────────────────────
            ANIMATED BACKGROUND ARTWORK (Layered strictly BEHIND character)
        ───────────────────────────────────────────────────────────────── */}
        <AnimatedBackgroundArtwork pointerPos={pointerPos} />

        {/* ─────────────────────────────────────────────────────────────
            1. TOP TYPOGRAPHY: JAX (ANIMATED WORDMARK) & ACCURATE IDENTITY
            No "COMPLETED", "DEGREE COMPLETED", or decorative full-stack banner
        ───────────────────────────────────────────────────────────────── */}
        <header className="z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
          <div className="space-y-1.5 max-w-xl">
            {/* Playful letter-by-letter animated JAX wordmark */}
            <JaxAnimatedWordmark />

            <div className="text-xl sm:text-2xl font-bold font-display tracking-tight text-[#0c0d10]">
              <span className="inline-block whitespace-nowrap">Boya Janaki</span>{' '}
              <span className="inline-block whitespace-nowrap">Ramu</span>
            </div>

            {/* Compact concise subtitle without claims of completed degree */}
            <p className="text-xs sm:text-sm font-mono font-medium text-[#0c0d10]/90 leading-snug">
              {PROFILE.subtitle}
            </p>
          </div>

          {/* Clean hand-drawn badge in top right (No "COMPLETED" wording) */}
          <div className="hidden sm:flex flex-col items-end gap-1 font-mono text-xs text-[#0c0d10] pr-28 lg:pr-36">
            <span className="bg-[#fdfbf7] px-3 py-1 rounded border-2 border-black ink-shadow-sm font-bold rotate-2">
              ✦ {PROFILE.graduationLabel}
            </span>
            <span className="text-[11px] text-[#0c0d10]/80">
              (pull hand to tow About)
            </span>
          </div>
        </header>

        {/* ─────────────────────────────────────────────────────────────
            2. CENTRAL HAND-DRAWN CARTOON CHARACTER
            Transforms into coordinated expressions after successful tow!
            Clickable to cycle variations interactively.
        ───────────────────────────────────────────────────────────────── */}
        <main className="flex-1 flex items-center justify-center my-3 relative z-10">
          <HandDrawnCharacter
            pointerPos={pointerPos}
            expressionIndex={characterExpression}
            onExpressionChange={setCharacterExpression}
            dragOffset={dragOffset}
            isDragging={isDragging}
            isGrabbing={isGrabbing}
            dragTension={dragTension}
          />
        </main>

        {/* ─────────────────────────────────────────────────────────────
            3. DRAGGABLE ILLUSTRATED HAND WITH CONNECTED TOW-ROPE TETHER
            Hand, yellow label, rope, and anchor share unified coordinate system
        ───────────────────────────────────────────────────────────────── */}
        <DraggableHandTab
          isOpen={isAboutOpen}
          onOpen={() => setIsAboutOpen(true)}
          onClose={() => setIsAboutOpen(false)}
          onTowSuccess={handleTowSuccess}
          onDragProgress={(offset, dragging, grabbing, tension) => {
            setDragOffset(offset);
            setIsDragging(dragging);
            setIsGrabbing(!!grabbing);
            setDragTension(tension ?? Math.min(1.3, offset / 85));
          }}
        />

        {/* ─────────────────────────────────────────────────────────────
            4. REVEALED EDITORIAL ABOUT PANEL
            Single-viewport desktop fit, animated entrance, verified profile
        ───────────────────────────────────────────────────────────────── */}
        <RevealedAboutDrawer
          isOpen={isAboutOpen}
          onClose={() => setIsAboutOpen(false)}
          dragOffset={dragOffset}
          isDragging={isDragging}
        />

        {/* ─────────────────────────────────────────────────────────────
            5. FOOTER: INTERACTIVE SOCIAL BADGES & ABOUT CONTROL
        ───────────────────────────────────────────────────────────────── */}
        <footer className="z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Real Interactive Social Links with custom 3D tilt and lift motion */}
          <div className="flex items-center gap-3">
            <InteractiveSocialLinks variant="canvas" />
          </div>

          {/* Right action & pull indicator */}
          <div className="flex items-center gap-4">
            <span className="hidden md:inline font-mono text-xs font-bold text-[#0c0d10] bg-[#fdfbf7] px-2.5 py-1 rounded border-2 border-black ink-shadow-sm">
              pull hand to tow About ➔
            </span>

            <button
              onClick={handleToggleAbout}
              className="bg-[#0c0d10] text-[#fdfbf7] hover:bg-[#fdfbf7] hover:text-[#0c0d10] px-4 py-2 rounded-xl font-mono text-xs font-bold border-2 border-black transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black cursor-pointer"
            >
              About [A]
            </button>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}
