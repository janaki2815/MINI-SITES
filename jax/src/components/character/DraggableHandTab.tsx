import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { sound } from '../../lib/sound.ts';

interface DraggableHandTabProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onTowSuccess?: () => void;
  onDragProgress?: (offset: number, isDragging: boolean, isGrabbing?: boolean, tension?: number) => void;
  className?: string;
}

type DragState = 'idle' | 'pointer_down' | 'dragging' | 'completing';

export const DraggableHandTab: React.FC<DraggableHandTabProps> = ({
  isOpen,
  onOpen,
  onClose,
  onTowSuccess,
  onDragProgress,
  className = '',
}) => {
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isThresholdReached, setIsThresholdReached] = useState<boolean>(false);

  // Explicit state machine refs
  const dragStateRef = useRef<DragState>('idle');
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const activePointerIdRef = useRef<number | null>(null);
  const hasCrossedDeadzoneRef = useRef<boolean>(false);
  const currentOffsetRef = useRef<number>(0);
  const springProxyRef = useRef<{ offset: number }>({ offset: 0 });
  const hasSnappedRef = useRef<boolean>(false);
  const isTowCompletingRef = useRef<boolean>(false);

  // Drag physics constants
  const THRESHOLD = 85; // 85px leftward pull threshold to trigger reveal
  const DEADZONE = 10;  // 10px minimum movement required to recognize genuine drag
  const MAX_PULL = 220; // 220px max elastic limit

  // Broadcast drag progress to parent / About drawer peek
  const updateOffset = useCallback(
    (offset: number, dragging: boolean, grabbing?: boolean, tension?: number) => {
      setDragOffset(offset);
      currentOffsetRef.current = offset;
      const isGrab = grabbing !== undefined ? grabbing : (dragging || offset > 0);
      const t = tension !== undefined ? tension : Math.min(1.3, offset / THRESHOLD);
      if (onDragProgress) onDragProgress(offset, dragging, isGrab, t);
    },
    [onDragProgress]
  );

  // Trigger tactile & audio SNAP when tow threshold is reached
  const triggerSnap = useCallback(() => {
    sound.towSnap();

    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([20, 30, 40]);
      } catch {
        // Safe fallback
      }
    }
  }, []);

  // ──────────────────────────────────────────────────────────────────────────
  // POINTER EVENT DRAG STATE MACHINE
  // 1. Idle: Hand is at rest. Nothing opens on click.
  // 2. Pointer down: Record initial pointer coordinates. Potential drag state.
  // 3. Drag recognition: Start genuine drag only after crossing 10px movement deadzone.
  // 4. Dragging: Move hand and update rope continuously.
  // 5. Release: Check drag distance. Open About ONLY if genuine drag >= 85px in intended direction.
  // 6. Insufficient pull: Return to rest with elastic recoil. About stays CLOSED.
  // ──────────────────────────────────────────────────────────────────────────

  const handlePointerDown = (e: React.PointerEvent<SVGGElement>) => {
    // Only primary button (left click or touch or pen)
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if (isTowCompletingRef.current) return;

    gsap.killTweensOf(springProxyRef.current);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Safe fallback
    }

    activePointerIdRef.current = e.pointerId;
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    currentOffsetRef.current = 0;
    springProxyRef.current.offset = 0;
    dragStateRef.current = 'pointer_down';
    hasCrossedDeadzoneRef.current = false;
    hasSnappedRef.current = false;
    setIsThresholdReached(false);
    // Explicitly notify grab start (tension 0, grabbing true) so character reacts with subtle surprise
    updateOffset(0, false, true, 0);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGGElement>) => {
    if (isTowCompletingRef.current) return;
    if (activePointerIdRef.current !== null && e.pointerId !== activePointerIdRef.current) return;
    if (dragStateRef.current !== 'pointer_down' && dragStateRef.current !== 'dragging') return;

    const rawDeltaX = startXRef.current - e.clientX; // Positive when pulling LEFT (intended direction)
    const rawDeltaY = e.clientY - startYRef.current;
    const totalDisplacement = Math.hypot(rawDeltaX, rawDeltaY);

    // Step 3: Drag recognition threshold (10px deadzone)
    // Clicks, taps, and tiny accidental movements (3-5px) are completely ignored!
    if (!hasCrossedDeadzoneRef.current) {
      if (totalDisplacement < DEADZONE) {
        return;
      }
      // Genuine drag recognized
      hasCrossedDeadzoneRef.current = true;
      dragStateRef.current = 'dragging';
      setIsDragging(true);
      sound.hoverTick();
    }

    // Step 4: Dragging active
    // Intended direction is pulling LEFT (rawDeltaX > 0)
    // If pulling in wrong direction (rightward), clamp to 0
    const pullDelta = Math.max(0, rawDeltaX);
    const clamped = Math.min(pullDelta, MAX_PULL);

    // Elastic mechanical resistance curve
    const elastic =
      clamped > 60
        ? 60 + Math.pow(clamped - 60, 0.76) * 2.6
        : clamped;

    springProxyRef.current.offset = elastic;
    updateOffset(elastic, true);

    // Dynamic tension stretch audio
    sound.towStretch(Math.min(1, elastic / THRESHOLD));

    // Threshold detection
    if (elastic >= THRESHOLD) {
      if (!hasSnappedRef.current) {
        hasSnappedRef.current = true;
        setIsThresholdReached(true);
        triggerSnap();
      }
    } else {
      if (hasSnappedRef.current) {
        hasSnappedRef.current = false;
        setIsThresholdReached(false);
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<SVGGElement>) => {
    if (activePointerIdRef.current !== null && e.pointerId !== activePointerIdRef.current) return;
    if (isTowCompletingRef.current) return;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Safe fallback
    }

    const wasDragging = dragStateRef.current === 'dragging' && hasCrossedDeadzoneRef.current;
    const finalOffset = currentOffsetRef.current;
    const rawDeltaX = startXRef.current - e.clientX;
    const pulledInIntendedDirection = rawDeltaX > 0;

    // Reset tracking state
    activePointerIdRef.current = null;
    dragStateRef.current = 'idle';
    setIsDragging(false);

    // ─── CASE 1: SUCCESSFUL PULL -> Dragged beyond threshold in intended direction ───
    if (wasDragging && pulledInIntendedDirection && finalOffset >= THRESHOLD) {
      isTowCompletingRef.current = true;
      dragStateRef.current = 'completing';
      sound.towSnap();

      // Smooth mechanical tow forward stroke
      gsap.to(springProxyRef.current, {
        offset: finalOffset + 35,
        duration: 0.2,
        ease: 'power2.in',
        onUpdate: () => {
          updateOffset(springProxyRef.current.offset, false);
        },
        onComplete: () => {
          if (onTowSuccess) onTowSuccess();
          onOpen();

          // Return tow assembly back to rest after reveal triggers
          gsap.to(springProxyRef.current, {
            offset: 0,
            duration: 0.45,
            ease: 'power2.out',
            onUpdate: () => {
              updateOffset(springProxyRef.current.offset, false);
            },
            onComplete: () => {
              updateOffset(0, false);
              springProxyRef.current.offset = 0;
              setIsThresholdReached(false);
              hasSnappedRef.current = false;
              isTowCompletingRef.current = false;
              dragStateRef.current = 'idle';
            },
          });
        },
      });
      return;
    }

    // ─── CASE 2: INSUFFICIENT PULL -> Dragged, but < THRESHOLD or pulled in wrong direction ───
    if (wasDragging && finalOffset > 0) {
      sound.springRebound();
      springProxyRef.current.offset = finalOffset;
      gsap.killTweensOf(springProxyRef.current);

      gsap.to(springProxyRef.current, {
        offset: 0,
        duration: 0.85,
        ease: 'elastic.out(1.4, 0.32)', // Distinct bouncy elastic spring recoil
        onUpdate: () => {
          updateOffset(springProxyRef.current.offset, false);
        },
        onComplete: () => {
          updateOffset(0, false);
          springProxyRef.current.offset = 0;
          setIsThresholdReached(false);
          hasSnappedRef.current = false;
          dragStateRef.current = 'idle';
        },
      });
      return;
    }

    // ─── CASE 3: CLICK / TAP / TINY MOVEMENT (< DEADZONE) ───
    // RULE: A click or tiny movement MUST NEVER OPEN ABOUT!
    // Hand remains at original rest position. About stays closed.
    updateOffset(0, false);
    springProxyRef.current.offset = 0;
    setIsThresholdReached(false);
    hasSnappedRef.current = false;
    dragStateRef.current = 'idle';
  };

  const handlePointerCancel = (e: React.PointerEvent<SVGGElement>) => {
    if (activePointerIdRef.current !== null && e.pointerId !== activePointerIdRef.current) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Safe fallback
    }

    activePointerIdRef.current = null;
    dragStateRef.current = 'idle';
    setIsDragging(false);

    if (currentOffsetRef.current > 0) {
      sound.springRebound();
      gsap.killTweensOf(springProxyRef.current);
      gsap.to(springProxyRef.current, {
        offset: 0,
        duration: 0.5,
        ease: 'power2.out',
        onUpdate: () => updateOffset(springProxyRef.current.offset, false),
        onComplete: () => {
          updateOffset(0, false);
          springProxyRef.current.offset = 0;
          setIsThresholdReached(false);
          hasSnappedRef.current = false;
        },
      });
    } else {
      updateOffset(0, false);
      springProxyRef.current.offset = 0;
      setIsThresholdReached(false);
      hasSnappedRef.current = false;
    }
  };

  // ──────────────────────────────────────────────────────────────────────────
  // KEYBOARD ACCESSIBILITY
  // Requires a deliberate equivalent of the pull-and-release action:
  // - ArrowLeft: Pulls tension incrementally (25px per press)
  // - ArrowRight: Releases tension back
  // - Enter / Space:
  //     If threshold reached -> releases tension & tows!
  //     If at rest -> executes deliberate 2-stage physical pull-and-release sequence
  // ──────────────────────────────────────────────────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent<SVGGElement>) => {
    if (isTowCompletingRef.current) return;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      gsap.killTweensOf(springProxyRef.current);
      const newOffset = Math.min(130, currentOffsetRef.current + 25);
      springProxyRef.current.offset = newOffset;
      updateOffset(newOffset, true);
      sound.towStretch(Math.min(1, newOffset / THRESHOLD));

      if (newOffset >= THRESHOLD) {
        if (!hasSnappedRef.current) {
          hasSnappedRef.current = true;
          setIsThresholdReached(true);
          triggerSnap();
        }
      }
      return;
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      gsap.killTweensOf(springProxyRef.current);
      const newOffset = Math.max(0, currentOffsetRef.current - 25);
      springProxyRef.current.offset = newOffset;
      updateOffset(newOffset, newOffset > 0);
      if (newOffset < THRESHOLD) {
        hasSnappedRef.current = false;
        setIsThresholdReached(false);
      }
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();

      // If user has already pulled past threshold via keyboard arrows: release and tow
      if (currentOffsetRef.current >= THRESHOLD) {
        isTowCompletingRef.current = true;
        sound.towSnap();
        gsap.to(springProxyRef.current, {
          offset: currentOffsetRef.current + 35,
          duration: 0.2,
          ease: 'power2.in',
          onUpdate: () => updateOffset(springProxyRef.current.offset, false),
          onComplete: () => {
            if (onTowSuccess) onTowSuccess();
            onOpen();
            gsap.to(springProxyRef.current, {
              offset: 0,
              duration: 0.45,
              ease: 'power2.out',
              onUpdate: () => updateOffset(springProxyRef.current.offset, false),
              onComplete: () => {
                updateOffset(0, false);
                springProxyRef.current.offset = 0;
                setIsThresholdReached(false);
                hasSnappedRef.current = false;
                isTowCompletingRef.current = false;
              },
            });
          },
        });
        return;
      }

      // Deliberate keyboard equivalent: animated pull tension and snap release
      isTowCompletingRef.current = true;
      sound.towStretch(0.85);

      gsap.to(springProxyRef.current, {
        offset: 95,
        duration: 0.32,
        ease: 'power2.out',
        onUpdate: () => {
          updateOffset(springProxyRef.current.offset, true);
        },
        onComplete: () => {
          sound.towSnap();
          setIsThresholdReached(true);

          gsap.to(springProxyRef.current, {
            offset: 125,
            duration: 0.16,
            ease: 'power2.in',
            onUpdate: () => updateOffset(springProxyRef.current.offset, false),
            onComplete: () => {
              if (onTowSuccess) onTowSuccess();
              onOpen();

              gsap.to(springProxyRef.current, {
                offset: 0,
                duration: 0.4,
                ease: 'power2.out',
                onUpdate: () => updateOffset(springProxyRef.current.offset, false),
                onComplete: () => {
                  updateOffset(0, false);
                  springProxyRef.current.offset = 0;
                  setIsThresholdReached(false);
                  hasSnappedRef.current = false;
                  isTowCompletingRef.current = false;
                },
              });
            },
          });
        },
      });
      return;
    }

    if (e.key === 'Escape' && currentOffsetRef.current > 0) {
      e.preventDefault();
      sound.springRebound();
      gsap.to(springProxyRef.current, {
        offset: 0,
        duration: 0.4,
        ease: 'power2.out',
        onUpdate: () => updateOffset(springProxyRef.current.offset, false),
        onComplete: () => {
          updateOffset(0, false);
          springProxyRef.current.offset = 0;
          setIsThresholdReached(false);
          hasSnappedRef.current = false;
        },
      });
    }
  };

  // Programmatic tow animation (triggered strictly by the dedicated "About [A]" button)
  useEffect(() => {
    const handleTriggerTow = () => {
      if (isTowCompletingRef.current) return;
      isTowCompletingRef.current = true;
      sound.towStretch(0.85);

      gsap.to(springProxyRef.current, {
        offset: 85,
        duration: 0.22,
        ease: 'power2.inOut',
        onUpdate: () => {
          updateOffset(springProxyRef.current.offset, true);
        },
        onComplete: () => {
          sound.towSnap();
          if (onTowSuccess) onTowSuccess();
          onOpen();

          gsap.to(springProxyRef.current, {
            offset: 0,
            duration: 0.35,
            ease: 'power2.out',
            onUpdate: () => {
              updateOffset(springProxyRef.current.offset, false);
            },
            onComplete: () => {
              updateOffset(0, false);
              springProxyRef.current.offset = 0;
              isTowCompletingRef.current = false;
            },
          });
        },
      });
    };

    window.addEventListener('trigger-tow-reveal', handleTriggerTow);
    return () => window.removeEventListener('trigger-tow-reveal', handleTriggerTow);
  }, [onOpen, onTowSuccess, updateOffset]);

  // Clean up GSAP tweens on unmount
  useEffect(() => {
    return () => {
      gsap.killTweensOf(springProxyRef.current);
    };
  }, []);

  // ──────────────────────────────────────────────────────────────────────────
  // SHARED PHYSICAL TOW COORDINATE SYSTEM
  // Fixed Anchor on right edge -> Tow Rope Curve -> Hand Wrist Shackle
  // Hand, yellow label, and rope endpoints are mathematically bound together!
  // ──────────────────────────────────────────────────────────────────────────
  const ANCHOR_X = 490;
  const ANCHOR_Y = 100;
  const REST_WRIST_X = 360;
  const REST_WRIST_Y = 100;

  // Actual wrist position computed strictly from dragOffset
  const wristX = REST_WRIST_X - dragOffset;
  const wristY = REST_WRIST_Y;

  // Realistic catenary rope sag:
  // At rest: sags gently downward (20px). Under tension: tightens into a taut line.
  const sag = Math.max(1.5, 20 * (1 - Math.min(1, dragOffset / THRESHOLD)));
  const midX = (ANCHOR_X + wristX) / 2;
  const midY = ANCHOR_Y + sag;
  const ropePath = `M ${ANCHOR_X},${ANCHOR_Y} Q ${midX},${midY} ${wristX},${wristY}`;

  const isTriggered = isThresholdReached || dragOffset >= THRESHOLD;
  const progressPercent = Math.min(100, Math.round((dragOffset / THRESHOLD) * 100));

  // Hand group tilt under tension
  const handRotation = -Math.min(8, dragOffset * 0.06);

  return (
    <div
      className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 select-none overflow-visible pointer-events-none ${className}`}
      style={{ touchAction: 'none' }}
    >
      <svg
        width="520"
        height="200"
        viewBox="0 0 520 200"
        className="overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="towHighlight" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#fde047" floodOpacity="0.75" />
          </filter>
        </defs>

        {/* ─────────────────────────────────────────────────────────────
            1. TOW ROPE (Layered strictly behind the hand and label)
            Continuously connected from ANCHOR to WRIST at every single frame
        ───────────────────────────────────────────────────────────────── */}
        <g>
          {/* Outer Heavy Ink Line */}
          <path
            d={ropePath}
            fill="none"
            stroke="#0c0d10"
            strokeWidth={isTriggered ? '7.5' : '6'}
            strokeLinecap="round"
          />

          {/* Braided Core Fiber */}
          <path
            d={ropePath}
            fill="none"
            stroke={isTriggered ? '#fde047' : '#fdfbf7'}
            strokeWidth={isTriggered ? '4.5' : '3.4'}
            strokeLinecap="round"
            filter={isTriggered ? 'url(#towHighlight)' : undefined}
          />

          {/* Braided Rope Twist Intermittent Marks */}
          <path
            d={ropePath}
            fill="none"
            stroke="#0c0d10"
            strokeWidth="1.8"
            strokeDasharray="5 6"
            strokeLinecap="round"
            opacity="0.65"
          />
        </g>

        {/* ─────────────────────────────────────────────────────────────
            2. FIXED ANCHOR CLEAT (Mounted to right edge of viewport)
        ───────────────────────────────────────────────────────────────── */}
        <g transform={`translate(${ANCHOR_X}, ${ANCHOR_Y})`}>
          {/* Wall bracket flange */}
          <rect
            x="-4"
            y="-18"
            width="16"
            height="36"
            rx="3"
            fill="#22252e"
            stroke="#0c0d10"
            strokeWidth="2.5"
          />
          {/* Mounting bolts */}
          <circle cx="4" cy="-10" r="2.5" fill="#fdfbf7" stroke="#0c0d10" strokeWidth="1.5" />
          <circle cx="4" cy="10" r="2.5" fill="#fdfbf7" stroke="#0c0d10" strokeWidth="1.5" />
          {/* Heavy Steel Eyelet */}
          <circle
            cx="0"
            cy="0"
            r="6"
            fill="#22252e"
            stroke="#0c0d10"
            strokeWidth="2.5"
          />
          <circle cx="0" cy="0" r="2.5" fill="#e11d24" />
        </g>

        {/* ─────────────────────────────────────────────────────────────
            3. DRAGGABLE ASSEMBLY: HAND + YELLOW TOW LABEL + WRIST SHACKLE
            Group origin is locked to (wristX, wristY) so connection NEVER separates
            Clicks explicitly intercepted and prevented from opening About.
        ───────────────────────────────────────────────────────────────── */}
        <g
          transform={`translate(${wristX}, ${wristY}) rotate(${handRotation})`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onClick={(e) => {
            // CRITICAL: Stop click propagation and prevent default
            // A click on the tow hand must NEVER open About!
            e.preventDefault();
            e.stopPropagation();
          }}
          className="pointer-events-auto cursor-grab active:cursor-grabbing focus:outline-none"
          role="slider"
          tabIndex={0}
          aria-label="Tow rope hand. Drag left past threshold and release to reveal About, or use Left Arrow key to pull."
          aria-valuenow={Math.round(dragOffset)}
          aria-valuemin={0}
          aria-valuemax={THRESHOLD}
          onKeyDown={handleKeyDown}
        >
          {/* Wrist Clevis Shackle Ring (Sits exactly where the rope enters the hand) */}
          <circle
            cx="0"
            cy="0"
            r={isTriggered ? '6.5' : '5'}
            fill={isTriggered ? '#fde047' : '#fdfbf7'}
            stroke="#0c0d10"
            strokeWidth="2.5"
          />

          {/* ─── YELLOW TOW INSTRUCTION BADGE (Bound rigidly to the hand) ─── */}
          <g transform="translate(-105, 0)">
            {/* Label Background Pill */}
            <rect
              x={isTriggered ? '-120' : '-96'}
              y="-16"
              width={isTriggered ? '132' : '108'}
              height="32"
              rx="8"
              fill={
                isTriggered
                  ? '#fde047'
                  : isDragging
                  ? '#fef08a'
                  : '#fdfbf7'
              }
              stroke="#0c0d10"
              strokeWidth="2.5"
              className="drop-shadow-[3px_3px_0px_#0c0d10]"
            />

            {/* Label Text */}
            <text
              x={isTriggered ? '-54' : '-42'}
              y="5"
              textAnchor="middle"
              fontFamily="monospace"
              fontSize={isTriggered ? '10' : '11'}
              fontWeight="900"
              fill="#0c0d10"
              className="tracking-tight select-none pointer-events-none"
            >
              {isDragging
                ? isTriggered
                  ? '✦ TOW READY! RELEASE ✦'
                  : `TOW ${progressPercent}% ➔`
                : 'PULL TO TOW ➔'}
            </text>
          </g>

          {/* ─── HAND-DRAWN POINTING HAND ILLUSTRATION (Pointing Left) ─── */}
          {/* Wrist is at (0, 0), fingers point leftward toward (-85, 0) */}
          <g transform="translate(-10, -28)">
            {/* Palm & Wrist coming from (0, 0) */}
            <path
              d="M10,22 L10,38 C-5,42 -22,40 -32,36 C-38,33 -44,28 -44,20 C-44,12 -38,7 -30,4 C-20,1 -5,3 10,22 Z"
              fill={isTriggered ? '#fffbeb' : '#fdfbf7'}
              stroke="#0c0d10"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />

            {/* Pointing Index Finger pulling left toward About drawer */}
            <path
              d="M-36,15 L-66,15 C-72,15 -72,25 -66,25 L-36,25"
              fill={isTriggered ? '#fffbeb' : '#fdfbf7'}
              stroke="#0c0d10"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Curled Middle, Ring, Pinky fingers */}
            <path
              d="M-38,25 C-46,27 -46,33 -38,35 L-24,35"
              fill={isTriggered ? '#fffbeb' : '#fdfbf7'}
              stroke="#0c0d10"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M-34,35 C-41,37 -41,42 -34,44 L-20,44"
              fill={isTriggered ? '#fffbeb' : '#fdfbf7'}
              stroke="#0c0d10"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Thumb on top */}
            <path
              d="M-30,7 C-38,4 -40,-3 -32,-3 C-24,-3 -22,3 -24,9"
              fill={isTriggered ? '#fffbeb' : '#fdfbf7'}
              stroke="#0c0d10"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>

          {/* Visual Spark Particles on Tow Ready */}
          {isTriggered && (
            <g transform="translate(-40, -25)">
              <text x="0" y="0" fontSize="12" fill="#0c0d10" fontWeight="bold">✦</text>
              <text x="-30" y="45" fontSize="10" fill="#fde047" fontWeight="bold">✦</text>
              <text x="35" y="10" fontSize="11" fill="#fdfbf7" fontWeight="bold">✧</text>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};
