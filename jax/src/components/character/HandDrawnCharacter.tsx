import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../lib/sound.ts';
import gsap from 'gsap';

interface HandDrawnCharacterProps {
  pointerPos: { x: number; y: number };
  expressionIndex?: number;
  onExpressionChange?: (nextIndex: number) => void;
  className?: string;
  dragOffset?: number;
  isDragging?: boolean;
  isGrabbing?: boolean;
  dragTension?: number;
}

export const HandDrawnCharacter: React.FC<HandDrawnCharacterProps> = ({
  pointerPos,
  expressionIndex = 0,
  onExpressionChange,
  className = '',
  dragOffset = 0,
  isDragging = false,
  isGrabbing = false,
  dragTension = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const characterGroupRef = useRef<SVGGElement>(null);

  // SVG Layer Refs for Direct rAF Updates (Zero React re-renders on mousemove & drag!)
  const leftPupilRef = useRef<SVGGElement | null>(null);
  const rightPupilRef = useRef<SVGGElement | null>(null);
  const leftEyeEllipseRef = useRef<SVGEllipseElement | null>(null);
  const rightEyeEllipseRef = useRef<SVGEllipseElement | null>(null);
  const leftBrowRef = useRef<SVGGElement | null>(null);
  const rightBrowRef = useRef<SVGGElement | null>(null);
  const furrowCreaseRef = useRef<SVGGElement | null>(null);
  const idleMouthGroupRef = useRef<SVGGElement | null>(null);
  const grabMouthGroupRef = useRef<SVGGElement | null>(null);
  const strainMouthGroupRef = useRef<SVGGElement | null>(null);
  const sweatDropRef = useRef<SVGGElement | null>(null);
  const annotationBadgeRef = useRef<HTMLSpanElement | null>(null);
  const leftBlinkLineRef = useRef<SVGPathElement | null>(null);
  const rightBlinkLineRef = useRef<SVGPathElement | null>(null);

  // Active expression index (0: Friendly, 1: Surprised, 2: Creative/Confident, 3: Curious, 4: Chic/Artisanal)
  const [activeExp, setActiveExp] = useState<number>(expressionIndex);

  // Synchronize when parent triggers a new expression (e.g., after successful tow)
  useEffect(() => {
    setActiveExp(expressionIndex);
    // Subtle bounce settling when transformed
    if (characterGroupRef.current) {
      gsap.fromTo(
        characterGroupRef.current,
        { scale: 0.96, y: -6 },
        { scale: 1, y: 0, duration: 0.45, ease: 'back.out(2)' }
      );
    }
  }, [expressionIndex]);

  // Maintain latest drag parameters in ref for 60fps rAF interpolation loop
  const dragDataRef = useRef({
    dragOffset,
    isDragging,
    isGrabbing,
    dragTension,
  });
  dragDataRef.current = {
    dragOffset,
    isDragging,
    isGrabbing,
    dragTension,
  };

  // Motion physics ref stored outside React state to avoid triggering render cycles
  const physicsRef = useRef({
    currentX: 0,
    currentY: 0,
    targetX: 0,
    targetY: 0,
    browTilt: 0,
    targetBrowTilt: 0,
    isClose: false,
    isBlinking: false,
    // Rope-drag reactive physics:
    dragTension: 0,
    targetTension: 0,
    grabIntensity: 0,
    targetGrab: 0,
    leanAngle: 0,
    targetLeanAngle: 0,
    leanX: 0,
    targetLeanX: 0,
    leanY: 0,
    targetLeanY: 0,
  });

  const targetPosRef = useRef(pointerPos);
  targetPosRef.current = pointerPos;

  // ──────────────────────────────────────────────────────────────────────────
  // SINGLE MEMOIZED REQUEST ANIMATION FRAME LOOP
  // Handles:
  // 1. Natural eye tracking with cursor parallax
  // 2. Continuous drag tension interpolation & reactive facial expressions:
  //    - Idle: neutral with natural blinking & tracking
  //    - Grab: subtle surprise, widened eyes, slightly raised eyebrows
  //    - Pull tension: progressively strained & determined squint, furrowed brow,
  //      tightened mouth grit, sweat droplet, and subtle head/body lean
  //    - Release/cancel: smoothly returns to idle via elastic recoil
  // ──────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    let animId: number;

    const tick = () => {
      const p = physicsRef.current;
      const { isGrabbing: isGrab, isDragging: isDrag, dragTension: rawTension } = dragDataRef.current;

      // ─── 1. Tension & Grab Smooth Interpolation ───
      p.targetGrab = isGrab ? 1 : 0;
      p.targetTension = Math.max(0, rawTension);

      // Damped spring lerp for physical weight
      p.grabIntensity += (p.targetGrab - p.grabIntensity) * 0.22;
      p.dragTension += (p.targetTension - p.dragTension) * 0.18;

      // ─── 2. Head / Body Lean Against Pull Tension ───
      // When rope is pulled towards left (with anchor on the right),
      // the character braces backward and downward with the strain
      p.targetLeanAngle = -p.dragTension * 3.8; // negative degrees leans head backward
      p.targetLeanX = -p.dragTension * 6.5;     // shifts back
      p.targetLeanY = p.dragTension * 2.5 - p.grabIntensity * 2.0; // slight perk up on grab, dips on strain
      p.leanAngle += (p.targetLeanAngle - p.leanAngle) * 0.15;
      p.leanX += (p.targetLeanX - p.leanX) * 0.15;
      p.leanY += (p.targetLeanY - p.leanY) * 0.15;

      if (characterGroupRef.current) {
        const baseRot = activeExp === 3 ? 3 : 0;
        characterGroupRef.current.style.transform = `rotate(${(baseRot + p.leanAngle).toFixed(2)}deg) translate(${p.leanX.toFixed(2)}px, ${p.leanY.toFixed(2)}px)`;
      }

      // ─── 3. Eye & Pupil Tracking + Tension Focus ───
      let centerX = window.innerWidth / 2;
      let centerY = window.innerHeight / 2;

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
      }

      const dx = targetPosRef.current.x - centerX;
      const dy = targetPosRef.current.y - centerY;
      const distance = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);

      const maxRadius = 13;
      const intensity = Math.min(distance / 120, 1);

      // When pulling rope, pupils intensely bias toward the rope tension pulling on the right
      const tensionPupilOffset = p.dragTension * 6.5;
      p.targetX = Math.cos(angle) * maxRadius * intensity + tensionPupilOffset;
      p.targetY = Math.sin(angle) * maxRadius * intensity;
      p.targetBrowTilt = Math.max(-10, Math.min(10, (dx / 260) * 12));

      // Damped spring lerp
      p.currentX += (p.targetX - p.currentX) * 0.16;
      p.currentY += (p.targetY - p.currentY) * 0.16;
      p.browTilt += (p.targetBrowTilt - p.browTilt) * 0.16;

      // Update Pupil transforms directly
      const pupilTransform = `translate(${p.currentX.toFixed(2)}, ${p.currentY.toFixed(2)})`;
      if (leftPupilRef.current) leftPupilRef.current.setAttribute('transform', pupilTransform);
      if (rightPupilRef.current) rightPupilRef.current.setAttribute('transform', pupilTransform);

      // ─── 4. Dynamic Eye Dimensions (Widened on Grab, Narrowed Squint on Tension) ───
      // Grab surprise factor fades as pull tension rises
      const surpriseFactor = p.grabIntensity * Math.max(0, 1 - p.dragTension * 1.6);
      const strainFactor = Math.min(1.2, p.dragTension);

      const baseRy = activeExp === 1 ? 38 : 36;
      const baseRx = 32;

      // Smoothly widen eyes during grab (up to ~41.5px), squint down on strain (to ~21px)
      const dynamicRy = Math.max(19, (baseRy + surpriseFactor * 5.5) * (1 - strainFactor * 0.42));
      const dynamicRx = baseRx + surpriseFactor * 1.5 + strainFactor * 1.2;

      if (leftEyeEllipseRef.current) {
        leftEyeEllipseRef.current.setAttribute('ry', dynamicRy.toFixed(2));
        leftEyeEllipseRef.current.setAttribute('rx', dynamicRx.toFixed(2));
      }
      if (rightEyeEllipseRef.current) {
        rightEyeEllipseRef.current.setAttribute('ry', dynamicRy.toFixed(2));
        rightEyeEllipseRef.current.setAttribute('rx', dynamicRx.toFixed(2));
      }

      // ─── 5. Eyebrow Reactivity (Raised on Grab, Slanted Determined Grit on Tension) ───
      // Brow lift on grab surprise (negative Y is up)
      const browLift = -surpriseFactor * 7.5;
      // Slanted inward grit angle on tension
      const strainBrowAngle = strainFactor * 14.5;
      const strainBrowY = strainFactor * 3.5;

      const leftBrowAngle = p.browTilt + surpriseFactor * 4 + strainBrowAngle;
      const rightBrowAngle = -p.browTilt - surpriseFactor * 4 - strainBrowAngle;
      const leftBrowY = browLift + strainBrowY;
      const rightBrowY = browLift + strainBrowY;

      if (leftBrowRef.current) {
        leftBrowRef.current.setAttribute(
          'transform',
          `translate(0, ${leftBrowY.toFixed(2)}) rotate(${leftBrowAngle.toFixed(2)} 125 110)`
        );
      }
      if (rightBrowRef.current) {
        rightBrowRef.current.setAttribute(
          'transform',
          `translate(0, ${rightBrowY.toFixed(2)}) rotate(${rightBrowAngle.toFixed(2)} 215 110)`
        );
      }

      // ─── 6. Between-Brow Furrow Crease ───
      if (furrowCreaseRef.current) {
        const furrowOpacity = Math.max(0, Math.min(1, (p.dragTension - 0.22) / 0.45));
        furrowCreaseRef.current.style.opacity = furrowOpacity.toFixed(2);
      }

      // ─── 7. Smooth Mouth Transition (Idle -> Grab Surprise -> Strained Grimace) ───
      let idleOpacity = 1;
      let grabOpacity = 0;
      let strainOpacity = 0;

      if (p.dragTension >= 0.25) {
        strainOpacity = Math.min(1, (p.dragTension - 0.25) / 0.4);
        grabOpacity = Math.max(0, (1 - p.dragTension * 2) * p.grabIntensity);
        idleOpacity = Math.max(0, 1 - strainOpacity - grabOpacity);
      } else if (p.grabIntensity > 0.05) {
        grabOpacity = surpriseFactor;
        idleOpacity = Math.max(0, 1 - grabOpacity);
      }

      if (idleMouthGroupRef.current) idleMouthGroupRef.current.style.opacity = idleOpacity.toFixed(2);
      if (grabMouthGroupRef.current) grabMouthGroupRef.current.style.opacity = grabOpacity.toFixed(2);
      if (strainMouthGroupRef.current) strainMouthGroupRef.current.style.opacity = strainOpacity.toFixed(2);

      // ─── 8. Sweat Droplet on High Effort ───
      if (sweatDropRef.current) {
        if (p.dragTension > 0.42) {
          const sweatProgress = Math.min(1, (p.dragTension - 0.42) / 0.35);
          sweatDropRef.current.style.opacity = sweatProgress.toFixed(2);
          sweatDropRef.current.style.transform = `scale(${sweatProgress.toFixed(2)})`;
        } else {
          sweatDropRef.current.style.opacity = '0';
          sweatDropRef.current.style.transform = 'scale(0)';
        }
      }

      // ─── 9. Proximity & Tow Status Annotation Check ───
      const wasClose = p.isClose;
      p.isClose = distance < 170;

      if (annotationBadgeRef.current) {
        if (p.dragTension >= 0.95) {
          annotationBadgeRef.current.textContent = 'HEAAAVE! PULL! 💥';
        } else if (p.dragTension >= 0.5) {
          annotationBadgeRef.current.textContent = 'straining... heave! ᕦ(ò_ó)ᕤ';
        } else if (p.dragTension >= 0.18) {
          annotationBadgeRef.current.textContent = 'pulling rope! ⚡';
        } else if (p.grabIntensity > 0.25) {
          annotationBadgeRef.current.textContent = 'whoa, grabbed! ✦';
        } else if (wasClose !== p.isClose || (!p.grabIntensity && p.dragTension < 0.1)) {
          const badges = [
            p.isClose ? 'too close! 👀' : 'hey there! ✎',
            p.isClose ? 'towed into view! ✦' : 'whoa! towed ✦',
            p.isClose ? 'sketching ideas ✏️' : 'maker mode ✏️',
            p.isClose ? 'curious mind 🤔' : 'pondering... ✎',
            p.isClose ? 'sharp focus 👓' : 'specs on 👓',
          ];
          annotationBadgeRef.current.textContent = badges[activeExp % badges.length];
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [activeExp]);

  // Natural periodic blinking loop
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    let blinkEndTimeout: NodeJS.Timeout;

    const scheduleNextBlink = () => {
      const delay = 3600 + Math.random() * 2600;
      blinkTimeout = setTimeout(() => {
        // Suppress mid-strain blinking if user is actively pulling with high effort
        if (physicsRef.current.dragTension > 0.4) {
          scheduleNextBlink();
          return;
        }

        physicsRef.current.isBlinking = true;
        if (leftPupilRef.current) leftPupilRef.current.style.display = 'none';
        if (rightPupilRef.current) rightPupilRef.current.style.display = 'none';
        if (leftBlinkLineRef.current) leftBlinkLineRef.current.style.display = 'block';
        if (rightBlinkLineRef.current) rightBlinkLineRef.current.style.display = 'block';

        blinkEndTimeout = setTimeout(() => {
          physicsRef.current.isBlinking = false;
          if (leftPupilRef.current) leftPupilRef.current.style.display = 'block';
          if (rightPupilRef.current) rightPupilRef.current.style.display = 'block';
          if (leftBlinkLineRef.current) leftBlinkLineRef.current.style.display = 'none';
          if (rightBlinkLineRef.current) rightBlinkLineRef.current.style.display = 'none';
          scheduleNextBlink();
        }, 120);
      }, delay);
    };

    scheduleNextBlink();
    return () => {
      clearTimeout(blinkTimeout);
      clearTimeout(blinkEndTimeout);
    };
  }, []);

  // Character Click / Poke: cycle through expressions interactively
  const handleCharacterClick = () => {
    sound.hoverTick();
    const next = (activeExp + 1) % 5;
    setActiveExp(next);
    if (onExpressionChange) onExpressionChange(next);

    if (characterGroupRef.current) {
      gsap.fromTo(
        characterGroupRef.current,
        { scale: 1.05, rotation: (Math.random() - 0.5) * 6 },
        { scale: 1, rotation: 0, duration: 0.4, ease: 'elastic.out(1.2, 0.3)' }
      );
    }
  };

  // Expression names & annotations
  const expressionTitles = [
    'Friendly',
    'Surprised',
    'Creative & Confident',
    'Curious',
    'Artisanal / Chic',
  ];
  const expressionBadges = [
    'hey there! ✎',
    'whoa! towed ✦',
    'maker mode ✏️',
    'pondering... ✎',
    'specs on 👓',
  ];

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* ─── Hand-Drawn Annotation Bubble Above Character ─── */}
      <div className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none whitespace-nowrap">
        <span
          ref={annotationBadgeRef}
          className="inline-block bg-[#fdfbf7] text-[#0c0d10] text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md border-2 border-black ink-shadow-sm rotate-[-2deg] transition-all duration-300"
        >
          {expressionBadges[activeExp % expressionBadges.length]}
        </span>
      </div>

      {/* ─── The Character SVG Canvas (Clickable to cycle expression) ─── */}
      <svg
        viewBox="0 0 340 340"
        className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 overflow-visible cursor-pointer drop-shadow-[8px_8px_0px_#0c0d10]"
        onClick={handleCharacterClick}
        role="img"
        aria-label={`Cartoon character JAX (${expressionTitles[activeExp % expressionTitles.length]} expression)`}
      >
        <defs>
          {/* Subtle Hand-Drawn Hatch Pattern for shading */}
          <pattern id="ink-hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#0c0d10" strokeWidth="1.2" opacity="0.3" />
          </pattern>
        </defs>

        <g
          ref={characterGroupRef}
          style={{
            transformOrigin: '170px 200px',
            transform: activeExp === 3 ? 'rotate(3deg)' : 'rotate(0deg)',
          }}
        >
          {/* Ground shadow blob */}
          <ellipse cx="170" cy="318" rx="100" ry="16" fill="#0c0d10" opacity="0.9" />

          {/* 1. Large Hand-Drawn Head Silhouette */}
          <path
            d="M75,90 C60,130 52,185 62,235 C72,280 115,305 170,305 C225,305 270,280 278,235 C288,185 280,130 265,90 C250,50 205,38 170,38 C135,38 90,50 75,90 Z"
            fill="#fdfbf7"
            stroke="#0c0d10"
            strokeWidth="7"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Crosshatch shading on jawline */}
          <path
            d="M80,240 C110,290 230,290 260,240 C270,270 230,300 170,300 C110,300 70,270 80,240 Z"
            fill="url(#ink-hatch)"
          />

          {/* 2. Wild Hand-Drawn Hair Tufts on top */}
          <path
            d="M130,42 C120,18 105,10 95,20 C105,30 115,40 125,48"
            fill="none"
            stroke="#0c0d10"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M165,38 C168,12 178,4 188,14 C184,24 176,34 172,42"
            fill="none"
            stroke="#0c0d10"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          <path
            d="M200,42 C215,16 232,15 238,28 C228,34 218,40 210,48"
            fill="none"
            stroke="#0c0d10"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* 3. Quirky Big Ears */}
          <path
            d="M62,155 C35,150 28,185 54,200"
            fill="#fdfbf7"
            stroke="#0c0d10"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path d="M48,168 C40,172 42,185 50,188" stroke="#0c0d10" strokeWidth="4" strokeLinecap="round" fill="none" />

          <path
            d="M278,155 C305,150 312,185 286,200"
            fill="#fdfbf7"
            stroke="#0c0d10"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path d="M292,168 C300,172 298,185 290,188" stroke="#0c0d10" strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* ─── ACCESSORY LAYER: Yellow Pencil behind Ear (Expression 2) ─── */}
          <g
            style={{
              opacity: activeExp === 2 ? 1 : 0,
              transform: activeExp === 2 ? 'translate(0, 0)' : 'translate(0, 10px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
          >
            <rect
              x="276"
              y="126"
              width="8"
              height="36"
              rx="2"
              transform="rotate(28 280 144)"
              fill="#fde047"
              stroke="#0c0d10"
              strokeWidth="3.5"
            />
            {/* Pencil tip & graphite */}
            <polygon
              points="292,120 300,128 296,114"
              fill="#fdfbf7"
              stroke="#0c0d10"
              strokeWidth="2.5"
            />
            <polygon points="295,116 297,118 296,114" fill="#0c0d10" />
          </g>

          {/* 4. Expressive Eyebrows (Dynamic tracking + Expression variations + Drag reactivity) */}
          <g ref={leftBrowRef} transform="rotate(0 125 110)">
            {/* Expression 1: Surprised (High arch) */}
            {activeExp === 1 ? (
              <path
                d="M94,104 C115,90 145,96 154,106"
                stroke="#0c0d10"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
            ) : activeExp === 3 ? (
              /* Expression 3: Curious (Left brow raised quizzically high) */
              <path
                d="M92,100 C114,88 144,95 153,105"
                stroke="#0c0d10"
                strokeWidth="7.5"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              /* Friendly, Confident, Chic Default Eyebrow */
              <path
                d="M95,115 C115,102 145,108 152,118"
                stroke="#0c0d10"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
            )}
          </g>

          <g ref={rightBrowRef} transform="rotate(0 215 110)">
            {activeExp === 1 ? (
              /* Expression 1: Surprised (High arch) */
              <path
                d="M186,106 C195,96 225,90 246,104"
                stroke="#0c0d10"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
            ) : activeExp === 2 ? (
              /* Expression 2: Confident (Cocked playful angle) */
              <path
                d="M188,112 C200,102 228,102 248,118"
                stroke="#0c0d10"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
            ) : (
              /* Default right eyebrow */
              <path
                d="M188,118 C195,108 225,102 245,115"
                stroke="#0c0d10"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
            )}
          </g>

          {/* Forehead Tension Creases (appears between eyebrows during high pull tension) */}
          <g ref={furrowCreaseRef} style={{ opacity: 0 }}>
            <path d="M165,108 L167,118" stroke="#0c0d10" strokeWidth="3" strokeLinecap="round" />
            <path d="M175,108 L173,118" stroke="#0c0d10" strokeWidth="3" strokeLinecap="round" />
            <path d="M170,105 L170,113" stroke="#0c0d10" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* 5. Cartoon Eyes */}
          {/* LEFT EYE */}
          <g transform="translate(126, 160)">
            <ellipse
              ref={leftEyeEllipseRef}
              cx="0"
              cy="0"
              rx="32"
              ry={activeExp === 1 ? '38' : '36'}
              fill="#ffffff"
              stroke="#0c0d10"
              strokeWidth="6.5"
            />
            {/* Pupil tracking cursor */}
            <g ref={leftPupilRef} transform="translate(0, 0)">
              <circle cx="0" cy="0" r={activeExp === 1 ? '14' : '13'} fill="#0c0d10" />
              <circle cx="-4" cy="-4" r="4.5" fill="#ffffff" />
              <circle cx="4" cy="4" r="2" fill="#ffffff" />
            </g>
            {/* Blink line */}
            <path
              ref={leftBlinkLineRef}
              d="M-30,0 Q0,10 30,0"
              stroke="#0c0d10"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
              style={{ display: 'none' }}
            />
          </g>

          {/* RIGHT EYE */}
          <g transform="translate(214, 160)">
            {/* If Expression 2 (Creative & Confident), right eye has playful winking crescent */}
            {activeExp === 2 ? (
              <g>
                <path
                  d="M-26,4 Q0,-14 26,4"
                  stroke="#0c0d10"
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Winking spark accent */}
                <text x="18" y="-12" fontSize="14" fill="#0c0d10" fontWeight="bold">✦</text>
              </g>
            ) : (
              <g>
                <ellipse
                  ref={rightEyeEllipseRef}
                  cx="0"
                  cy="0"
                  rx="32"
                  ry={activeExp === 1 ? '38' : '36'}
                  fill="#ffffff"
                  stroke="#0c0d10"
                  strokeWidth="6.5"
                />
                {/* Pupil tracking cursor */}
                <g ref={rightPupilRef} transform="translate(0, 0)">
                  <circle cx="0" cy="0" r={activeExp === 1 ? '14' : '13'} fill="#0c0d10" />
                  <circle cx="-4" cy="-4" r="4.5" fill="#ffffff" />
                  <circle cx="4" cy="4" r="2" fill="#ffffff" />
                </g>
                {/* Blink line */}
                <path
                  ref={rightBlinkLineRef}
                  d="M-28,4 Q0,-12 28,4"
                  stroke="#0c0d10"
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="none"
                  style={{ display: 'none' }}
                />
              </g>
            )}
          </g>

          {/* Dynamic Effort Sweat Droplet on High Tension */}
          <g
            ref={sweatDropRef}
            transform="translate(254, 120)"
            style={{ opacity: 0, transformOrigin: '0px 0px' }}
          >
            <path
              d="M0,-14 C-4,-8 -7,-2 -7,3 C-7,7 -3,11 0,11 C3,11 7,7 7,3 C7,-2 4,-8 0,-14 Z"
              fill="#38bdf8"
              stroke="#0c0d10"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <circle cx="-2" cy="3" r="1.5" fill="#ffffff" />
          </g>

          {/* ─── ACCESSORY LAYER: Round Wireframe Spectacles (Expression 4) ─── */}
          <g
            style={{
              opacity: activeExp === 4 ? 1 : 0,
              transform: activeExp === 4 ? 'scale(1)' : 'scale(0.85)',
              transformOrigin: '170px 160px',
              transition: 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Left spectacle rim */}
            <circle cx="126" cy="160" r="30" fill="none" stroke="#0c0d10" strokeWidth="4.5" />
            {/* Right spectacle rim */}
            <circle cx="214" cy="160" r="30" fill="none" stroke="#0c0d10" strokeWidth="4.5" />
            {/* Bridge */}
            <path d="M156,160 Q170,152 184,160" fill="none" stroke="#0c0d10" strokeWidth="4" strokeLinecap="round" />
            {/* Left ear piece */}
            <path d="M96,160 L68,154" fill="none" stroke="#0c0d10" strokeWidth="3.5" strokeLinecap="round" />
            {/* Right ear piece */}
            <path d="M244,160 L272,154" fill="none" stroke="#0c0d10" strokeWidth="3.5" strokeLinecap="round" />
            {/* Glint on glass */}
            <path d="M110,144 L118,152" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
            <path d="M198,144 L206,152" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* 6. Hand-Drawn Nose */}
          <path
            d="M170,165 C162,185 158,202 172,204 C180,205 184,198 180,192"
            fill="none"
            stroke="#0c0d10"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 7. Rosy Cheeks */}
          <path
            d="M86,204 C82,198 94,195 98,202 C102,210 88,216 82,208"
            stroke="#0c0d10"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M254,204 C250,198 262,195 266,202 C270,210 256,216 250,208"
            stroke="#0c0d10"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* 8. Mouth Variations according to Expression & Drag Tension */}
          {/* 8A. Idle Expression Mouth Group */}
          <g ref={idleMouthGroupRef}>
            {activeExp === 1 ? (
              /* Expression 1: Surprised "O" mouth */
              <g>
                <ellipse cx="170" cy="242" rx="14" ry="16" fill="#0c0d10" stroke="#0c0d10" strokeWidth="4" />
                <ellipse cx="170" cy="244" rx="8" ry="10" fill="#e11d24" />
                {/* Little surprise spark near temple */}
                <text x="245" y="90" fontSize="18" fill="#0c0d10" fontWeight="bold">✦</text>
              </g>
            ) : activeExp === 2 ? (
              /* Expression 2: Creative & Confident Smirk */
              <g>
                <path
                  d="M136,242 C162,244 186,252 216,232"
                  fill="none"
                  stroke="#0c0d10"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path d="M214,228 L220,236" stroke="#0c0d10" strokeWidth="4" strokeLinecap="round" />
              </g>
            ) : activeExp === 3 ? (
              /* Expression 3: Curious sideways quirk */
              <g>
                <path
                  d="M136,244 C158,248 182,244 206,238"
                  fill="none"
                  stroke="#0c0d10"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <circle cx="214" cy="236" r="3" fill="#0c0d10" />
              </g>
            ) : activeExp === 4 ? (
              /* Expression 4: Warm Beaming Grin (Chic / Maker) */
              <g>
                <path
                  d="M128,234 Q170,268 212,234 Z"
                  fill="#fdfbf7"
                  stroke="#0c0d10"
                  strokeWidth="6"
                />
                <line x1="128" y1="234" x2="212" y2="234" stroke="#0c0d10" strokeWidth="5" />
              </g>
            ) : (
              /* Expression 0: Default friendly warm smile */
              <path
                d="M130,238 C150,258 190,258 210,238 M212,234 L218,242 M128,234 L122,242"
                fill="none"
                stroke="#0c0d10"
                strokeWidth="6"
                strokeLinecap="round"
              />
            )}
          </g>

          {/* 8B. Grab / Start Dragging: Subtle surprised parted mouth */}
          <g ref={grabMouthGroupRef} style={{ opacity: 0 }}>
            <ellipse cx="170" cy="242" rx="9" ry="11" fill="#0c0d10" stroke="#0c0d10" strokeWidth="3" />
            <ellipse cx="170" cy="243" rx="5" ry="7" fill="#e11d24" />
          </g>

          {/* 8C. Progressively Strained & Determined Clenched Grit Grimace */}
          <g ref={strainMouthGroupRef} style={{ opacity: 0 }}>
            {/* Clenched teeth background */}
            <path
              d="M136,242 C152,238 188,238 204,242 C206,249 198,256 170,256 C142,256 134,249 136,242 Z"
              fill="#ffffff"
              stroke="#0c0d10"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            {/* Center clenched bite line */}
            <line x1="138" y1="247" x2="202" y2="247" stroke="#0c0d10" strokeWidth="4" strokeLinecap="round" />
            {/* Teeth vertical separation marks */}
            <line x1="152" y1="241" x2="152" y2="253" stroke="#0c0d10" strokeWidth="2.5" />
            <line x1="164" y1="239" x2="164" y2="255" stroke="#0c0d10" strokeWidth="2.5" />
            <line x1="176" y1="239" x2="176" y2="255" stroke="#0c0d10" strokeWidth="2.5" />
            <line x1="188" y1="241" x2="188" y2="253" stroke="#0c0d10" strokeWidth="2.5" />
            {/* Strained corner tuck marks */}
            <path d="M133,238 L137,248" stroke="#0c0d10" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M207,238 L203,248" stroke="#0c0d10" strokeWidth="3.5" strokeLinecap="round" />
          </g>

          {/* 9. Hand-drawn freckles */}
          <circle cx="120" cy="208" r="2.5" fill="#0c0d10" />
          <circle cx="130" cy="214" r="2.5" fill="#0c0d10" />
          <circle cx="210" cy="214" r="2.5" fill="#0c0d10" />
          <circle cx="220" cy="208" r="2.5" fill="#0c0d10" />
        </g>
      </svg>
    </div>
  );
};
