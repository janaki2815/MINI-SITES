import React from 'react';
import { DestinationId } from '../../types/destinations.ts';

interface DimensionalFallbackProps {
  destinationId: DestinationId;
  size?: number;
  className?: string;
}

/**
 * High-fidelity dimensional artwork inspired by 3Dicons.co
 * Layered gradients, isometric bevels, directional rim highlights, and soft shadows.
 * Not flat or generic outline icons.
 */
export const DimensionalFallback: React.FC<DimensionalFallbackProps> = ({
  destinationId,
  size = 180,
  className = '',
}) => {
  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      aria-label={`Dimensional 3D emblem for ${destinationId}`}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="grad-platinum" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#CBD5E1" />
            <stop offset="70%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>

          <linearGradient id="grad-electric" x1="40" y1="30" x2="160" y2="170" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="40%" stopColor="#0284C7" />
            <stop offset="85%" stopColor="#082F49" />
          </linearGradient>

          <linearGradient id="grad-violet" x1="30" y1="40" x2="170" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C4B5FD" />
            <stop offset="45%" stopColor="#6366F1" />
            <stop offset="90%" stopColor="#1E1B4B" />
          </linearGradient>

          <linearGradient id="grad-dark" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          {/* Radial ground shadow */}
          <radialGradient id="ground-shadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#000000" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Contact Shadow Grounding */}
        <ellipse cx="100" cy="176" rx="68" ry="14" fill="url(#ground-shadow)" />

        {/* 1. NEXUS — Dimensional Monolithic Core */}
        {destinationId === 'nexus' && (
          <g transform="translate(0, -6)">
            {/* Outer Orbital Bevel Ring */}
            <path
              d="M100 35 C145 35 178 62 178 95 C178 128 145 155 100 155 C55 155 22 128 22 95 C22 62 55 35 100 35 Z"
              stroke="url(#grad-electric)"
              strokeWidth="7"
              strokeDasharray="4 2"
              fill="none"
              opacity="0.85"
            />
            {/* Left Frame Pillar */}
            <path d="M64 62 L78 50 L78 140 L64 152 Z" fill="#334155" />
            <path d="M78 50 L90 58 L90 148 L78 140 Z" fill="#1E293B" />

            {/* Central Monolithic Block */}
            <path d="M90 40 L128 40 L128 145 L90 145 Z" fill="url(#grad-platinum)" />
            <path d="M128 40 L144 54 L144 135 L128 145 Z" fill="#475569" />
            <path d="M90 40 L106 28 L144 54 L128 40 Z" fill="#F8FAFC" opacity="0.9" />

            {/* Glowing Refractive Core Aperture */}
            <circle cx="109" cy="92" r="14" fill="url(#grad-electric)" />
            <circle cx="109" cy="92" r="9" fill="#E0F2FE" opacity="0.85" />
          </g>
        )}

        {/* 2. INTELLIGENCE LAB — Geodesic Polyhedron Lattice */}
        {destinationId === 'intelligence-lab' && (
          <g transform="translate(0, -4)">
            {/* Outer Geodesic Web */}
            <polygon points="100,28 152,58 152,118 100,148 48,118 48,58" fill="none" stroke="url(#grad-violet)" strokeWidth="3" opacity="0.4" />
            <polygon points="100,48 136,68 136,108 100,128 64,108 64,68" fill="url(#grad-dark)" stroke="url(#grad-violet)" strokeWidth="2" />
            {/* Faceted Nucleus */}
            <polygon points="100,60 125,76 100,92 75,76" fill="#A78BFA" opacity="0.9" />
            <polygon points="75,76 100,92 100,120 75,104" fill="#6366F1" />
            <polygon points="125,76 100,92 100,120 125,104" fill="#4338CA" />
            {/* Top Light Rim */}
            <polygon points="100,48 136,68 125,76 100,60" fill="#DDD6FE" opacity="0.8" />
            {/* Orbital Satellites */}
            <circle cx="48" cy="58" r="5" fill="#E0E7FF" />
            <circle cx="152" cy="118" r="5" fill="#E0E7FF" />
            <circle cx="100" cy="154" r="6" fill="#818CF8" />
          </g>
        )}

        {/* 3. DATA OBSERVATORY — Gyroscopic Astrolabe Rings */}
        {destinationId === 'data-observatory' && (
          <g transform="translate(0, -6)">
            {/* Primary Outer Ring */}
            <ellipse cx="100" cy="95" rx="72" ry="72" stroke="url(#grad-platinum)" strokeWidth="9" fill="none" />
            {/* Inclined Mid Ring */}
            <ellipse cx="100" cy="95" rx="60" ry="32" transform="rotate(-30 100 95)" stroke="url(#grad-electric)" strokeWidth="6" fill="none" />
            {/* Second Inclined Ring */}
            <ellipse cx="100" cy="95" rx="55" ry="24" transform="rotate(45 100 95)" stroke="#38BDF8" strokeWidth="4" fill="none" opacity="0.75" />
            {/* Polar Core Dial */}
            <circle cx="100" cy="95" r="22" fill="url(#grad-dark)" stroke="#94A3B8" strokeWidth="2" />
            {/* Core Lens */}
            <circle cx="100" cy="95" r="10" fill="#38BDF8" opacity="0.95" />
            {/* Coordinate Crosshairs */}
            <line x1="100" y1="23" x2="100" y2="167" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
          </g>
        )}

        {/* 4. ARCHIVE — Hypercube Dimensional Vault */}
        {destinationId === 'archive' && (
          <g transform="translate(0, -6)">
            {/* Lower Shadowed Base */}
            <polygon points="100,158 154,128 100,100 46,128" fill="#0F172A" />
            {/* Main Isometric Cube Left */}
            <polygon points="46,74 100,104 100,150 46,120" fill="#334155" />
            {/* Main Isometric Cube Right */}
            <polygon points="100,104 154,74 154,120 100,150" fill="#1E293B" />
            {/* Main Isometric Cube Top */}
            <polygon points="100,32 154,62 100,92 46,62" fill="url(#grad-platinum)" />
            {/* Segmented Core Chamber */}
            <polygon points="100,68 126,82 100,96 74,82" fill="url(#grad-violet)" opacity="0.9" />
            {/* Reinforcing Corner Pillars */}
            <line x1="46" y1="62" x2="46" y2="120" stroke="#818CF8" strokeWidth="4" />
            <line x1="154" y1="62" x2="154" y2="120" stroke="#818CF8" strokeWidth="4" />
            <line x1="100" y1="92" x2="100" y2="150" stroke="#CBD5E1" strokeWidth="3" />
          </g>
        )}

        {/* 5. HORIZON — Curved Planetary Arc & Rising Sun */}
        {destinationId === 'horizon' && (
          <g transform="translate(0, -4)">
            {/* Concentric Horizon Halos */}
            <path d="M26,140 A84,84 0 0,1 174,140" stroke="url(#grad-electric)" strokeWidth="4" fill="none" opacity="0.4" />
            <path d="M42,140 A66,66 0 0,1 158,140" stroke="#38BDF8" strokeWidth="2" fill="none" opacity="0.6" />
            {/* Rising Celestial Sphere */}
            <circle cx="100" cy="115" r="32" fill="url(#grad-platinum)" />
            <circle cx="100" cy="115" r="26" fill="url(#grad-electric)" opacity="0.85" />
            {/* Sweeping Horizon Edge */}
            <path d="M20,138 Q100,98 180,138 L180,148 Q100,108 20,148 Z" fill="#0F172A" stroke="url(#grad-platinum)" strokeWidth="2" />
            {/* Zenith Ray Marker */}
            <line x1="100" y1="36" x2="100" y2="82" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
            <circle cx="100" cy="34" r="4" fill="#38BDF8" />
          </g>
        )}
      </svg>
    </div>
  );
};
