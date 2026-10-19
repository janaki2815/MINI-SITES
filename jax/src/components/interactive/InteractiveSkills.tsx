import React, { useState } from 'react';
import { PROFILE, SkillItem } from '../../config/profile.ts';
import confetti from 'canvas-confetti';

interface InteractiveSkillsProps {
  className?: string;
}

export const InteractiveSkills: React.FC<InteractiveSkillsProps> = ({ className = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Craft' },
    { id: 'core', label: 'Languages' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'data_ml', label: 'Data & AI' },
    { id: 'database', label: 'Databases' },
    { id: 'tools', label: 'Tools' },
  ];

  const filteredSkills = selectedCategory === 'all'
    ? PROFILE.skills
    : PROFILE.skills.filter((s) => s.category === selectedCategory);

  const handleSkillClick = (skill: SkillItem, e: React.MouseEvent) => {
    setActiveSkill(skill.name);

    // Subtle micro burst from click point
    try {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 16,
        spread: 45,
        origin: { x, y },
        colors: [skill.color, '#ffffff', '#38bdf8'],
        disableForReducedMotion: true,
      });
    } catch {
      // Safe fallback
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Category Filter Selector (Playful Segmented Tabs) */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-150 border whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 ${
              selectedCategory === cat.id
                ? 'bg-sky-400 text-slate-950 font-bold border-sky-300 shadow-md scale-105'
                : 'bg-white/[0.04] text-slate-400 hover:text-slate-200 hover:bg-white/[0.08] border-white/[0.08]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Interactive Floating Skill Cloud */}
      <div className="flex flex-wrap items-center gap-3 py-2">
        {filteredSkills.map((skill, index) => {
          const isHighlighted = activeSkill === skill.name;
          return (
            <button
              key={skill.name}
              onClick={(e) => handleSkillClick(skill, e)}
              className={`group relative px-4 py-2 rounded-2xl text-sm font-mono font-medium transition-all duration-200 border cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 hover:-translate-y-1 hover:shadow-xl active:scale-95 ${
                isHighlighted
                  ? 'bg-sky-950/80 text-sky-200 border-sky-400 scale-105 shadow-lg'
                  : 'bg-[#151722]/80 hover:bg-[#1c1f2e] text-slate-200 border-white/[0.1] hover:border-white/[0.25]'
              }`}
              style={{
                // Subtle organic rotation offset
                transform: isHighlighted
                  ? 'scale(1.08)'
                  : `rotate(${(index % 5) * 1.5 - 3}deg)`,
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full transition-transform group-hover:scale-125"
                  style={{ backgroundColor: skill.color }}
                />
                <span className="font-semibold tracking-tight">{skill.name}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2 pt-1">
        <span>✦ Click any skill to pop micro-feedback</span>
        <span aria-hidden="true" className="text-slate-600">·</span>
        <span>{filteredSkills.length} tools in active stack</span>
      </div>
    </div>
  );
};
