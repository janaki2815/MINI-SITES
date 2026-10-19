import React, { useState } from 'react';
import { PROFILE } from '../../config/profile.ts';
import { sound } from '../../lib/sound.ts';

interface InteractiveSocialLinksProps {
  className?: string;
  variant?: 'canvas' | 'drawer';
}

export const InteractiveSocialLinks: React.FC<InteractiveSocialLinksProps> = ({
  className = '',
  variant = 'canvas',
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const socials = [
    {
      id: 'github',
      name: 'GitHub',
      handle: 'janaki2815',
      url: PROFILE.links.github,
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
      // GitHub: slight 3D tilt and rotation on hover
      iconHoverStyle: {
        transform: 'perspective(400px) rotateY(-14deg) rotateX(10deg) rotate(-4deg) scale(1.12)',
        transition: 'transform 0.24s cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      linkHoverClass: 'hover:bg-amber-100/80',
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: 'boya-janakiramu',
      url: PROFILE.links.linkedin,
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      // LinkedIn: subtle upward lift with a clean highlight
      iconHoverStyle: {
        transform: 'translateY(-4px) scale(1.1)',
        transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      linkHoverClass: 'hover:bg-sky-100/90 hover:ring-2 hover:ring-sky-500/40',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      handle: 'jay__._28',
      url: PROFILE.links.instagram,
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      // Instagram: gentle tilt and accent-color transition
      iconHoverStyle: {
        transform: 'rotate(7deg) translateY(-2px) scale(1.1)',
        color: '#f43f5e',
        transition: 'transform 0.24s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.2s ease',
      },
      linkHoverClass: 'hover:bg-rose-100/80 hover:text-rose-600',
    },
  ];

  return (
    <div className={`flex flex-wrap items-center gap-2 sm:gap-3 select-none ${className}`}>
      {socials.map((social) => {
        const isHovered = hoveredId === social.id;
        return (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit Janaki Ramu on ${social.name}`}
            onMouseEnter={() => {
              setHoveredId(social.id);
              sound.hoverTick();
            }}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => sound.click()}
            className={`group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl font-mono text-xs font-bold border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black cursor-pointer ${
              variant === 'canvas'
                ? `bg-[#fdfbf7] text-[#0c0d10] border-[#0c0d10] ink-shadow-sm ${social.linkHoverClass}`
                : 'bg-[#181a20] text-[#fdfbf7] border-white/20 hover:border-white/50 hover:bg-[#22252e]'
            }`}
          >
            <span
              className="inline-flex items-center justify-center transition-all"
              style={isHovered ? social.iconHoverStyle : { transition: 'transform 0.2s ease, color 0.2s ease' }}
            >
              {social.icon}
            </span>
            <span className="font-mono text-xs tracking-tight">
              {social.name}
            </span>
          </a>
        );
      })}
    </div>
  );
};
