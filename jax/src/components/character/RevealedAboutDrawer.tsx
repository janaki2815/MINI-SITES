import React, { useState, useEffect, useRef } from 'react';
import { PROFILE, PROJECTS, ProjectItem, SKILL_GROUPS } from '../../config/profile.ts';
import { InteractiveSocialLinks } from './InteractiveSocialLinks.tsx';
import { sound } from '../../lib/sound.ts';
import {
  ExternalLink,
  X,
  Code2,
  Terminal,
  Layers,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronRight,
  Cpu,
  Workflow,
  GraduationCap,
  Compass,
  ArrowRight,
  Play,
} from 'lucide-react';
import gsap from 'gsap';

interface RevealedAboutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  dragOffset?: number;
  isDragging?: boolean;
}

type TabMode = 'manifesto' | 'projects' | 'terminal';

export const RevealedAboutDrawer: React.FC<RevealedAboutDrawerProps> = ({
  isOpen,
  onClose,
  dragOffset = 0,
  isDragging = false,
}) => {
  // Required Section Order: 1. About Me / Manifesto, 2. Projects, 3. Terminal
  // Default is 'manifesto' (About Me) as requested
  const [activeTab, setActiveTab] = useState<TabMode>('manifesto');
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(sound.getIsMuted());
  const [copiedCloneId, setCopiedCloneId] = useState<string | null>(null);

  // Terminal state
  const [terminalProject, setTerminalProject] = useState<string>('sales-predict');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '⚡ JAX* SYSTEM SIMULATOR v2.9 initialized.',
    'Pure client-side simulation of system workflows, Prophet/XGBoost forecasting, DuckDB queries & CNN inference pipelines.',
    'Select a preset test below or type: "sales", "sql-agent", "pneumonia", "meal-map", or "help"',
  ]);
  const [terminalInput, setTerminalInput] = useState<string>('');
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const activeProject = PROJECTS[activeProjectIndex] || PROJECTS[0];

  // Auto-scroll terminal output
  useEffect(() => {
    if (activeTab === 'terminal' && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs, activeTab]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      // Ignore when typing inside input or textarea
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        if (e.key === 'Escape') {
          (document.activeElement as HTMLElement).blur();
        }
        return;
      }

      if (e.key === 'Escape') {
        if (selectedProject) {
          sound.click();
          setSelectedProject(null);
        } else {
          sound.click();
          onClose();
        }
      } else if (e.key === '1' && !selectedProject) {
        sound.click();
        setActiveTab('manifesto');
      } else if (e.key === '2' && !selectedProject) {
        sound.click();
        setActiveTab('projects');
      } else if (e.key === '3' && !selectedProject) {
        sound.click();
        setActiveTab('terminal');
      } else if ((e.key === 'j' || e.key === 'J') && activeTab === 'projects' && !selectedProject) {
        sound.click();
        setActiveProjectIndex((prev) => (prev + 1) % PROJECTS.length);
      } else if ((e.key === 'k' || e.key === 'K') && activeTab === 'projects' && !selectedProject) {
        sound.click();
        setActiveProjectIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
      } else if (e.key === 'm' || e.key === 'M') {
        const muted = sound.toggleMute();
        setIsMuted(muted);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedProject, activeTab, onClose]);

  // Coordinated entrance animation
  useEffect(() => {
    if (isOpen && panelRef.current) {
      sound.drawerDock();

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          panelRef.current,
          { x: 30, opacity: 0.95 },
          { x: 0, opacity: 1, duration: 0.35, ease: 'power3.out' }
        );

        if (contentRef.current) {
          const blocks = contentRef.current.querySelectorAll('.editorial-seq');
          gsap.fromTo(
            blocks,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 0.28,
              stagger: 0.04,
              ease: 'power2.out',
              delay: 0.05,
            }
          );
        }
      }, panelRef);

      return () => ctx.revert();
    }
  }, [isOpen, activeTab]);

  // Don't render anything if closed and not dragging
  if (!isOpen && (!isDragging || dragOffset < 8)) return null;

  // During tow dragging, panel peeks into view based on rope tension
  const peekDistance = Math.min(65, (dragOffset - 8) * 0.45);
  const transformStyle = isOpen
    ? 'translateX(0%)'
    : `translateX(calc(100% - ${peekDistance}px))`;

  // Words split to prevent single-character wrapping (guarantees Boya Janaki Ramu displays cleanly)
  const nameWords = PROFILE.name.split(' ');

  const handleCopyClone = (project: ProjectItem) => {
    sound.click();
    navigator.clipboard?.writeText(project.cloneCmd);
    setCopiedCloneId(project.id);
    setTimeout(() => {
      setCopiedCloneId(null);
    }, 2200);
  };

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!muted) sound.click();
  };

  // Run simulated commands in interactive terminal
  const executeTerminalCmd = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    sound.click();

    const newLogs = [...terminalLogs, `$ ${rawCmd}`];

    if (!cmd) return;

    if (cmd === 'clear') {
      setTerminalLogs(['⚡ JAX* SYSTEM SIMULATOR ready.']);
      setTerminalInput('');
      return;
    }

    if (cmd === 'help') {
      newLogs.push(
        'Available commands & simulators:',
        '  sales       - Run Sales Predict Prophet + XGBoost demand forecasting inference',
        '  sql-agent   - Test natural language question to DuckDB SQL compilation',
        '  pneumonia   - Run synthetic radiograph tensor through EfficientNetB0',
        '  meal-map    - Query TheMealDB mock API & compile weekly meal planner cache',
        '  clone       - Copy active project git clone command to clipboard',
        '  projects    - List all 4 repositories by Boya Janaki Ramu',
        '  clear       - Clear terminal output'
      );
    } else if (cmd === 'projects') {
      PROJECTS.forEach((p) => {
        newLogs.push(`  [${p.index}] ${p.title} ➔ ${p.githubUrl}`);
      });
    } else if (cmd.includes('sales') || cmd.includes('predict') || cmd.includes('forecast') || cmd.includes('devos')) {
      const isLegacyDevos = cmd.includes('devos');
      newLogs.push(
        isLegacyDevos
          ? '▶ Redirecting legacy test to Sales Predict demand forecasting engine...'
          : '▶ Initializing Sales Predict demand forecasting service (Flask API)...',
        '▶ Ingesting category: "Outerwear & Apparel" | Forecast Horizon: 14 days',
        '▶ Decomposing time-series seasonality with Facebook Prophet (weekly + holiday)...',
        '✔ Prophet baseline trajectory modeled with 95% confidence intervals',
        '▶ Passing non-linear inventory features to XGBoost regressor (xgb_all.pkl)...',
        '✔ Gradient boosted prediction: 1,420 units demand projected (MAE: 3.84 units)',
        '✔ Inventory Insight: Projected reorder trigger at Day 8 (safe stock buffer +350 units)',
        '✔ SQLite transaction logged to sales.db in 14ms (REST endpoint /predict 200 OK)'
      );
      setTerminalProject('sales-predict');
    } else if (cmd.includes('sql') || cmd.includes('agent')) {
      newLogs.push(
        '▶ Initializing AGNO Data Analyst Agent...',
        '▶ Query: "SELECT category, SUM(revenue) FROM sales_db GROUP BY category ORDER BY revenue DESC LIMIT 5;"',
        '✔ DuckDB in-memory engine parsed 124,500 rows in 3.4ms',
        '✔ LLM inference (Groq Llama-3.3-70B): 0.18s latency',
        '✔ Results aggregated into tabular preview & dynamic chart payload.'
      );
      setTerminalProject('data-analyst-agent');
    } else if (cmd.includes('pneumonia') || cmd.includes('vision') || cmd.includes('xray')) {
      newLogs.push(
        '▶ Ingesting chest radiograph sample (224x224x3 tensor)...',
        '▶ Passing through EfficientNetB0 feature extraction blocks...',
        '✔ Dense Softmax activation: P(Normal)=0.038, P(Pneumonia)=0.962',
        '✔ Classification: BACTERIAL PNEUMONIA DETECTED (Confidence: 96.2%)',
        '✔ Compiling archival clinical PDF report via ReportLab engine...',
        '✔ Diagnostic summary PDF generated with embedded radiograph telemetry.'
      );
      setTerminalProject('pneumonia-detection');
    } else if (cmd.includes('meal') || cmd.includes('recipe')) {
      newLogs.push(
        '▶ Querying TheMealDB endpoint: /api/json/v1/1/filter.php?c=Seafood',
        '✔ Cached 32 curated recipes in client LocalStorage',
        '✔ Hash router activated: #planner',
        '✔ Weekly planner updated: 7 dinners scheduled with consolidated ingredient matrix (42 items).'
      );
      setTerminalProject('meal-map');
    } else if (cmd.includes('clone')) {
      const target = PROJECTS.find((p) => p.id === terminalProject) || activeProject;
      navigator.clipboard?.writeText(target.cloneCmd);
      setCopiedCloneId(target.id);
      newLogs.push(
        `✔ Copied to clipboard: ${target.cloneCmd}`,
        `➔ Repository: ${target.githubUrl}`
      );
    } else {
      newLogs.push(`Command not recognized: "${rawCmd}". Type "help" for valid commands.`);
    }

    setTerminalLogs(newLogs);
    setTerminalInput('');
  };

  // Jump from project to simulator
  const handleTestInTerminal = (project: ProjectItem) => {
    setActiveTab('terminal');
    const cmdKey =
      project.id === 'sales-predict'
        ? 'sales'
        : project.id === 'data-analyst-agent'
        ? 'sql-agent'
        : project.id === 'pneumonia-detection'
        ? 'pneumonia'
        : 'meal-map';
    executeTerminalCmd(cmdKey);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end select-none ${
        isOpen ? 'bg-black/80 backdrop-blur-sm pointer-events-auto' : 'pointer-events-none'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget && isOpen) {
          if (selectedProject) {
            sound.click();
            setSelectedProject(null);
          } else {
            sound.click();
            onClose();
          }
        }
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          JAX* INFORMATION EXPERIENCE
          Section Order:
          1. About Me / Manifesto
          2. Projects (4 Real Repositories)
          3. Terminal Simulator
      ───────────────────────────────────────────────────────────────── */}
      <div
        ref={panelRef}
        style={{
          transform: transformStyle,
          transition: isDragging ? 'none' : 'transform 0.38s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="w-full max-w-6xl h-full bg-[#0c0d10] text-[#fdfbf7] p-4 sm:p-7 lg:p-9 flex flex-col justify-between border-l-[3.5px] border-[#181a20] shadow-[0_0_80px_rgba(0,0,0,0.95)] overflow-y-auto select-none pointer-events-auto relative font-sans"
        role="dialog"
        aria-modal="true"
        aria-label={`JAX* Portfolio — ${PROFILE.name}`}
      >
        {/* Tow Anchor Cleat on leading edge */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-1 hidden lg:flex items-center">
          <div className="w-2.5 h-12 bg-[#181a20] rounded-l border-y border-l border-white/20 flex flex-col items-center justify-center gap-1.5 shadow-md">
            <div className="w-1 h-1 rounded-full bg-[#e11d24]" />
            <div className="w-1 h-1 rounded-full bg-white/40" />
            <div className="w-1 h-1 rounded-full bg-[#e11d24]" />
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            TOP CONTROLS BAR: Brand, Nav Switcher (1. About Me, 2. Projects, 3. Terminal), Audio, Close
        ───────────────────────────────────────────────────────────────── */}
        <div className="shrink-0 pb-4 sm:pb-5 mb-5 border-b border-[#21242d] flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          {/* Brand & Persona */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.click();
                setActiveTab('manifesto');
              }}
              className="text-left group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black font-display tracking-tight text-[#fdfbf7] group-hover:text-[#e11d24] transition-colors">
                  {PROFILE.brand}
                </span>
                <span className="text-xs text-[#a1a1aa] font-mono tracking-wide">
                  / {PROFILE.name}
                </span>
              </div>
              <p className="text-[11px] text-[#71717a] font-mono tracking-wider">
                {PROFILE.role}
              </p>
            </button>
          </div>

          {/* Interactive Navigation Switcher (Order: 1. About Me, 2. Projects, 3. Terminal) */}
          <div className="flex items-center gap-1 bg-[#14161c] p-1 border border-[#21242d] rounded-lg">
            <button
              onClick={() => {
                sound.click();
                setActiveTab('manifesto');
              }}
              className={`px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-mono font-medium rounded transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                activeTab === 'manifesto'
                  ? 'bg-[#e11d24] text-white shadow-sm'
                  : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'
              }`}
              title="About Me / Manifesto (Key: 1)"
            >
              <Workflow className="w-3.5 h-3.5 shrink-0" />
              <span><span className="hidden sm:inline">[01] </span>About Me</span>
            </button>

            <button
              onClick={() => {
                sound.click();
                setActiveTab('projects');
              }}
              className={`px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-mono font-medium rounded transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                activeTab === 'projects'
                  ? 'bg-[#e11d24] text-white shadow-sm'
                  : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'
              }`}
              title="Projects (Key: 2)"
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span><span className="hidden sm:inline">[02] </span>Projects ({PROJECTS.length})</span>
            </button>

            <button
              onClick={() => {
                sound.click();
                setActiveTab('terminal');
              }}
              className={`px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-mono font-medium rounded transition-all cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                activeTab === 'terminal'
                  ? 'bg-[#e11d24] text-white shadow-sm'
                  : 'text-[#a1a1aa] hover:text-white hover:bg-white/5'
              }`}
              title="Interactive Terminal (Key: 3)"
            >
              <Terminal className="w-3.5 h-3.5 shrink-0" />
              <span><span className="hidden sm:inline">[03] </span>Terminal</span>
            </button>
          </div>

          {/* Utilities: Audio Mute & Close */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleMute}
              className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center gap-1 text-xs font-mono ${
                isMuted
                  ? 'border-[#27272a] text-[#71717a] hover:text-white hover:border-[#3f3f46]'
                  : 'border-[#e11d24]/40 text-[#e11d24] hover:bg-[#e11d24]/10'
              }`}
              title="Toggle tactile audio (Key: M)"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline text-[11px]">{isMuted ? 'Muted' : 'Sound'}</span>
            </button>

            <button
              onClick={() => {
                sound.click();
                onClose();
              }}
              className="p-2 bg-[#181a20] hover:bg-[#e11d24] text-[#a1a1aa] hover:text-white border border-[#27272a] hover:border-[#e11d24] rounded-lg transition-all cursor-pointer flex items-center gap-1"
              aria-label="Return to Canvas (Escape)"
              title="Close drawer (Escape)"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline font-mono text-[11px] pr-0.5">ESC</span>
            </button>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            MAIN EDITORIAL STAGE (Scrollable content)
        ───────────────────────────────────────────────────────────────── */}
        <div ref={contentRef} className="grow pb-8">
          {/* =========================================================
              SECTION 1 (FIRST PRIORITY): ABOUT ME / MANIFESTO
          ============================================================ */}
          {activeTab === 'manifesto' && (
            <div className="editorial-seq space-y-8">
              {/* Personal Introduction Header */}
              <div className="space-y-4 border-b border-[#21242d] pb-6">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#a1a1aa]">
                  <span className="text-[#e11d24] font-bold">ABOUT ME</span>
                  <span>·</span>
                  <span>{PROFILE.brand}</span>
                  <span>·</span>
                  <span>{PROFILE.role.toUpperCase()}</span>
                  <span>·</span>
                  <span>RGMCET NANDYAL ('26)</span>
                </div>

                {/* Name Heading with Protected Word Wrapping */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-[#fdfbf7] leading-tight">
                  {nameWords.map((word, index) => (
                    <span key={index} className="inline-block whitespace-nowrap">
                      {word}
                      {index < nameWords.length - 1 && <span className="inline-block">&nbsp;</span>}
                    </span>
                  ))}
                  <span className="text-[#e11d24] ml-1.5">*</span>
                </h1>

                {/* Role and Verified Baseline Introduction */}
                <p className="text-base sm:text-lg text-[#d4d4d8] max-w-3xl leading-relaxed font-sans">
                  {PROFILE.introduction}
                </p>
              </div>

              {/* Engineering Philosophy: Editorial Grid */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between border-b border-[#21242d] pb-2">
                  <div className="text-xs font-mono text-[#e11d24] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Engineering Philosophy</span>
                  </div>
                  <span className="text-xs font-mono text-[#71717a]">6 Core Principles</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {PROFILE.philosophy.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-[#12141a] border border-[#1e222c] hover:border-[#2d3240] rounded-xl space-y-1.5 transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#e11d24] font-bold">0{idx + 1}.</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#e11d24]" />
                      </div>
                      <div className="text-sm font-bold font-display text-[#fdfbf7] leading-snug">
                        {item.title}
                      </div>
                      <p className="text-xs text-[#a1a1aa] leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Academic Background & Technical Focus */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Academic Background Card (5 cols) */}
                <div className="lg:col-span-5 p-4 bg-[#14161e] border border-[#232733] rounded-xl space-y-3">
                  <div className="text-xs font-mono text-[#e11d24] uppercase tracking-wider flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-[#e11d24]" />
                      Academic Background
                    </span>
                    <span className="text-white/80 font-bold bg-[#1e222e] px-2 py-0.5 rounded text-[11px]">
                      {PROFILE.education.gradBadge}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm sm:text-base font-bold font-display text-[#fdfbf7] leading-snug">
                      {PROFILE.education.degree}
                    </div>
                    <div className="text-xs text-[#a1a1aa] leading-relaxed">
                      {PROFILE.education.institution}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#232733] flex items-center justify-between text-xs font-mono text-[#71717a]">
                    <span>Graduation: {PROFILE.education.gradYear}</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Class of 2026
                    </span>
                  </div>
                </div>

                {/* Technical Focus Areas (7 cols) */}
                <div className="lg:col-span-7 space-y-2.5">
                  <div className="text-xs font-mono text-[#e11d24] uppercase tracking-wider flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#e11d24]" />
                    <span>Technical Focus Areas</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-3 bg-[#12141a] border border-[#1e222c] rounded-lg space-y-1">
                      <div className="text-[10px] text-[#71717a] font-bold tracking-wider">
                        PRIMARY FOCUS
                      </div>
                      <div className="text-[#fdfbf7] font-semibold text-xs">
                        {PROFILE.direction.primaryFocus}
                      </div>
                    </div>

                    <div className="p-3 bg-[#12141a] border border-[#1e222c] rounded-lg space-y-1">
                      <div className="text-[10px] text-[#71717a] font-bold tracking-wider">
                        EXPLORING
                      </div>
                      <div className="text-[#fdfbf7] font-semibold text-xs">
                        {PROFILE.direction.exploring}
                      </div>
                    </div>

                    <div className="p-3 bg-[#12141a] border border-[#1e222c] rounded-lg space-y-1">
                      <div className="text-[10px] text-[#71717a] font-bold tracking-wider">
                        DATA FOCUS
                      </div>
                      <div className="text-[#fdfbf7] font-semibold text-xs">
                        {PROFILE.direction.developingKnowledge}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Competencies: 4 Verified Categories with Zero-Pill Discipline */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#21242d] pb-2">
                  <div className="text-xs font-mono text-[#e11d24] uppercase tracking-wider flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Technical Competencies</span>
                  </div>
                  <div className="text-xs font-mono text-[#a1a1aa]">
                    {PROFILE.totalSkillsCount} Verified Tools
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SKILL_GROUPS.map((group) => (
                    <div
                      key={group.id}
                      className="p-4 bg-[#111319] border border-[#1e212b] rounded-xl space-y-2"
                    >
                      <div className="flex items-baseline justify-between text-xs font-mono">
                        <span className="font-bold text-[#fdfbf7]">
                          {group.index}. {group.title}
                        </span>
                        <span className="text-[#71717a] text-[11px]">{group.skills.length} skills</span>
                      </div>
                      <p className="text-[11px] text-[#a1a1aa] font-mono leading-relaxed">
                        {group.description}
                      </p>
                      {/* Zero-Pill: Clean unboxed typography with typographic separator dots */}
                      <div className="text-xs text-[#d4d4d8] font-mono flex flex-wrap items-center gap-x-2 gap-y-1 pt-1">
                        {group.skills.map((skill, sIdx) => (
                          <React.Fragment key={skill}>
                            <span className="hover:text-[#e11d24] transition-colors">{skill}</span>
                            {sIdx < group.skills.length - 1 && (
                              <span className="text-[#3f3f46]">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Channels & Explore Projects Action */}
              <div className="border-t border-[#21242d] pt-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono uppercase text-[#71717a] mb-1.5">
                    Connect & Verification Channels
                  </div>
                  <InteractiveSocialLinks variant="drawer" />
                </div>

                <button
                  onClick={() => {
                    sound.click();
                    setActiveTab('projects');
                  }}
                  className="px-4 py-2.5 bg-[#e11d24] hover:bg-[#c9181f] text-white text-xs font-mono font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                >
                  <span>Explore Projects (04)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* =========================================================
              SECTION 2 (SECOND PRIORITY): PROJECTS (4 REAL REPOSITORIES)
          ============================================================ */}
          {activeTab === 'projects' && (
            <div className="editorial-seq space-y-6">
              {/* Header ribbon */}
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#21242d] pb-4">
                <div>
                  <div className="text-xs font-mono text-[#e11d24] tracking-widest uppercase mb-1">
                    Projects · Boya Janaki Ramu
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-[#fdfbf7]">
                    Crafted Systems & Repositories
                  </h3>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-[#a1a1aa]">
                  <span className="hidden md:inline">Shortcuts: [J] Next · [K] Prev</span>
                  <a
                    href="https://github.com/janaki2815"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.click()}
                    className="flex items-center gap-1.5 text-[#fdfbf7] hover:text-[#e11d24] transition-colors"
                  >
                    <span>github.com/janaki2815</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Asymmetric Split Layout: Left Project Selector Rail, Right Detail Stage */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Project Selector Rail (4 cols on large screens) */}
                <div className="lg:col-span-5 space-y-2.5">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[#71717a] mb-2 flex items-center justify-between">
                    <span>Repository Index ({PROJECTS.length})</span>
                    <span className="text-[#a1a1aa]">Switch with J / K</span>
                  </div>

                  {PROJECTS.map((project, idx) => {
                    const isCurrent = idx === activeProjectIndex;
                    return (
                      <button
                        key={project.id}
                        onClick={() => {
                          sound.click();
                          setActiveProjectIndex(idx);
                        }}
                        onMouseEnter={() => sound.hoverTick()}
                        className={`w-full text-left p-3.5 rounded-lg border transition-all cursor-pointer relative group flex flex-col gap-1.5 ${
                          isCurrent
                            ? 'bg-[#15171e] border-[#e11d24] shadow-[0_4px_20px_rgba(225,29,36,0.18)]'
                            : 'bg-[#101217] border-[#1d2028] hover:border-[#2d313d] hover:bg-[#13151b]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span
                            className={`font-bold ${
                              isCurrent ? 'text-[#e11d24]' : 'text-[#71717a] group-hover:text-white'
                            }`}
                          >
                            {project.index} //
                          </span>
                          <span className="text-[11px] text-[#a1a1aa]">
                            {project.category.split('&')[0].trim()}
                          </span>
                        </div>

                        <div className="text-base font-bold font-display tracking-tight text-[#fdfbf7] group-hover:text-[#e11d24] transition-colors flex items-center justify-between">
                          <span>{project.title}</span>
                          {isCurrent && (
                            <ChevronRight className="w-4 h-4 text-[#e11d24] shrink-0" />
                          )}
                        </div>

                        <p className="text-xs text-[#a1a1aa] line-clamp-1 leading-relaxed">
                          {project.subtitle}
                        </p>
                      </button>
                    );
                  })}

                  {/* Quick terminal launch card */}
                  <div className="p-3.5 bg-[#12141a] border border-[#21242d] rounded-lg mt-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#fdfbf7]">Interactive Playground</div>
                      <div className="text-[11px] text-[#71717a] font-mono">
                        Simulate query engines & CNN inference
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        sound.click();
                        setActiveTab('terminal');
                      }}
                      className="px-2.5 py-1.5 text-xs font-mono bg-[#1c1f28] hover:bg-[#e11d24] text-white border border-[#2e323f] hover:border-[#e11d24] rounded transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Terminal [3]</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Active Project Detail Stage (7 cols on large screens) */}
                <div className="lg:col-span-7 bg-[#12141a] border border-[#21242d] rounded-xl p-5 sm:p-6 space-y-5">
                  {/* Title, Badge & Role */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <div className="text-xs font-mono text-[#e11d24] tracking-widest uppercase">
                        Project {activeProject.index} of 04 · {activeProject.badge}
                      </div>
                      <div className="text-xs font-mono text-[#a1a1aa]">
                        {activeProject.role}
                      </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-[#fdfbf7]">
                      {activeProject.title}
                    </h2>
                    <p className="text-sm font-mono text-[#a1a1aa] mt-0.5">
                      {activeProject.subtitle}
                    </p>
                  </div>

                  {/* Summary Narrative */}
                  <p className="text-sm text-[#d4d4d8] leading-relaxed font-sans">
                    {activeProject.summary}
                  </p>

                  {/* ASCII Architecture Flow Wireframe */}
                  <div className="bg-[#0c0d10] border border-[#232630] rounded-lg p-3 font-mono text-[11px] sm:text-xs text-[#a1a1aa] overflow-x-auto">
                    <div className="text-[10px] text-[#71717a] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Cpu className="w-3 h-3 text-[#e11d24]" />
                      <span>Dataflow & Architecture Pipeline</span>
                    </div>
                    <pre className="text-[#38bdf8] leading-relaxed whitespace-pre font-mono">
                      {activeProject.asciiFlow.join('\n')}
                    </pre>
                  </div>

                  {/* Engineering Highlights */}
                  <div className="space-y-2">
                    <div className="text-xs font-mono uppercase text-[#71717a] tracking-wider">
                      Engineering Highlights
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#d4d4d8] leading-relaxed">
                      {activeProject.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <span className="text-[#e11d24] font-bold mt-0.5 shrink-0">✦</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Verified Tech Stack List (Zero-Pill Discipline: Unboxed clean text) */}
                  <div className="border-t border-[#21242d] pt-3.5">
                    <div className="text-[11px] font-mono text-[#71717a] uppercase tracking-wider mb-1.5">
                      Core Technologies
                    </div>
                    <div className="text-xs text-[#fdfbf7] font-mono flex flex-wrap items-center gap-x-2 gap-y-1">
                      {activeProject.techStack.map((tech, tIdx) => (
                        <React.Fragment key={tech}>
                          <span className="hover:text-[#e11d24] transition-colors">{tech}</span>
                          {tIdx < activeProject.techStack.length - 1 && (
                            <span className="text-[#3f3f46]">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Actions: Inspect Modal, Live App, GitHub Link, Test in Terminal, Clone Command */}
                  <div className="border-t border-[#21242d] pt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => {
                          sound.click();
                          setSelectedProject(activeProject);
                        }}
                        className="px-3.5 py-2 text-xs font-mono font-semibold bg-[#e11d24] hover:bg-[#c9181f] text-white rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                      >
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Inspect Architecture</span>
                      </button>

                      {activeProject.liveUrl && (
                        <a
                          href={activeProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.click()}
                          className="px-3 py-2 text-xs font-mono bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Live App</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.click()}
                        className="px-3 py-2 text-xs font-mono bg-[#181a22] hover:bg-[#20232c] text-[#fdfbf7] hover:text-[#e11d24] border border-[#272b38] rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        <span>GitHub Repository</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => handleTestInTerminal(activeProject)}
                        className="px-3 py-2 text-xs font-mono bg-[#181a22] hover:bg-[#20232c] text-[#38bdf8] border border-[#272b38] rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
                        title="Simulate this project in Terminal"
                      >
                        <Play className="w-3 h-3 text-[#38bdf8]" />
                        <span>Test Simulator</span>
                      </button>
                    </div>

                    {/* Quick Clone copy button */}
                    <button
                      onClick={() => handleCopyClone(activeProject)}
                      className="px-2.5 py-1.5 text-xs font-mono bg-[#14161d] hover:bg-[#1a1d26] text-[#a1a1aa] hover:text-white border border-[#272a36] rounded transition-all cursor-pointer flex items-center gap-1.5"
                      title={activeProject.cloneCmd}
                    >
                      {copiedCloneId === activeProject.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Clone Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>git clone</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              SECTION 3: LIVE SYSTEM TERMINAL & SIMULATOR
          ============================================================ */}
          {activeTab === 'terminal' && (
            <div className="editorial-seq space-y-5">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#21242d] pb-3">
                <div>
                  <div className="text-xs font-mono text-[#e11d24] uppercase tracking-wider mb-0.5">
                    Terminal & Interactive Playground
                  </div>
                  <h3 className="text-2xl font-display font-black tracking-tight text-[#fdfbf7]">
                    Project Logic & Diagnostics Simulator
                  </h3>
                </div>
                <div className="text-xs font-mono text-[#a1a1aa]">
                  Simulates backend logic, DuckDB queries & CNN inference
                </div>
              </div>

              {/* Simulator Action Quick-Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-xs font-mono text-[#71717a] pr-1">Preset Tests:</span>
                <button
                  onClick={() => executeTerminalCmd('sales')}
                  className="px-2.5 py-1.5 text-xs font-mono bg-[#14161e] hover:bg-[#e11d24] text-white border border-[#252836] rounded cursor-pointer transition-all flex items-center gap-1"
                >
                  <span>📈 Test Sales Demand Forecast</span>
                </button>
                <button
                  onClick={() => executeTerminalCmd('sql-agent')}
                  className="px-2.5 py-1.5 text-xs font-mono bg-[#14161e] hover:bg-[#e11d24] text-white border border-[#252836] rounded cursor-pointer transition-all flex items-center gap-1"
                >
                  <span>📊 Test SQL AI Agent</span>
                </button>
                <button
                  onClick={() => executeTerminalCmd('pneumonia')}
                  className="px-2.5 py-1.5 text-xs font-mono bg-[#14161e] hover:bg-[#e11d24] text-white border border-[#252836] rounded cursor-pointer transition-all flex items-center gap-1"
                >
                  <span>🔬 Test EfficientNetB0 Radiograph</span>
                </button>
                <button
                  onClick={() => executeTerminalCmd('meal-map')}
                  className="px-2.5 py-1.5 text-xs font-mono bg-[#14161e] hover:bg-[#e11d24] text-white border border-[#252836] rounded cursor-pointer transition-all flex items-center gap-1"
                >
                  <span>🍳 Test MealMap Cache</span>
                </button>
                <button
                  onClick={() => executeTerminalCmd('help')}
                  className="px-2.5 py-1.5 text-xs font-mono bg-[#14161e] hover:bg-white/10 text-[#a1a1aa] border border-[#252836] rounded cursor-pointer transition-all"
                >
                  Help
                </button>
                <button
                  onClick={() => executeTerminalCmd('clear')}
                  className="px-2.5 py-1.5 text-xs font-mono bg-[#14161e] hover:bg-white/10 text-[#a1a1aa] border border-[#252836] rounded cursor-pointer transition-all"
                >
                  Clear
                </button>
              </div>

              {/* Terminal Window Box */}
              <div className="bg-[#090a0d] border border-[#21242e] rounded-xl overflow-hidden shadow-xl flex flex-col h-[360px] sm:h-[420px]">
                {/* Console Title Bar */}
                <div className="bg-[#13151b] px-3.5 sm:px-4 py-2 border-b border-[#21242e] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#fde047]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#4ade80]" />
                    <span className="ml-2 text-[#d4d4d8] text-[11px] sm:text-xs">jax@workstation: ~/projects</span>
                  </div>
                  <span className="hidden sm:inline text-[11px] text-[#71717a]">Tactile Keystrokes Active</span>
                </div>

                {/* Console Output Area */}
                <div className="p-3.5 sm:p-4 grow overflow-y-auto font-mono text-[11px] sm:text-xs text-[#a1a1aa] space-y-1.5 select-text">
                  {terminalLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={
                        log.startsWith('$')
                          ? 'text-[#fdfbf7] font-semibold'
                          : log.startsWith('✔')
                          ? 'text-emerald-400'
                          : log.startsWith('▶')
                          ? 'text-[#38bdf8]'
                          : log.startsWith('⚡')
                          ? 'text-[#fde047]'
                          : 'text-[#a1a1aa]'
                      }
                    >
                      {log}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>

                {/* Console Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    executeTerminalCmd(terminalInput);
                  }}
                  className="bg-[#0e1015] border-t border-[#21242e] px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center gap-2"
                >
                  <span className="text-[#e11d24] font-mono font-bold">$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => {
                      sound.terminalKey();
                      setTerminalInput(e.target.value);
                    }}
                    placeholder="Type command ('help', 'sales', 'sql-agent', 'pneumonia', 'meal-map', 'clone')..."
                    className="grow bg-transparent text-xs font-mono text-[#fdfbf7] focus:outline-none placeholder:text-[#52525b]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 text-xs font-mono bg-[#e11d24] text-white rounded hover:bg-[#c9181f] transition-all cursor-pointer"
                  >
                    Run
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            FOOTER: Navigation status & Keyboard shortcuts guide
        ───────────────────────────────────────────────────────────────── */}
        <div className="shrink-0 pt-4 border-t border-[#21242d] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#71717a]">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span>[1] About Me</span>
            <span>·</span>
            <span>[2] Projects</span>
            <span>·</span>
            <span>[3] Terminal</span>
            <span>·</span>
            <span>[J/K] Next/Prev</span>
            <span>·</span>
            <span>[M] Mute</span>
            <span>·</span>
            <span>[ESC] Return to Canvas</span>
          </div>

          <div>
            <span>Boya Janaki Ramu · RGMCET '26</span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            PROJECT DEEP-DIVE ARCHITECTURE MODAL
        ───────────────────────────────────────────────────────────────── */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-60 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                sound.click();
                setSelectedProject(null);
              }
            }}
          >
            <div
              className="bg-[#0e1015] border border-[#272b38] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8 space-y-6 shadow-2xl relative text-[#fdfbf7]"
              role="dialog"
              aria-modal="true"
              aria-label={`Detailed Architecture — ${selectedProject.title}`}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  sound.click();
                  setSelectedProject(null);
                }}
                className="absolute right-5 top-5 p-2 rounded-lg bg-[#181a22] hover:bg-[#e11d24] text-[#a1a1aa] hover:text-white border border-[#272a36] hover:border-[#e11d24] transition-all cursor-pointer"
                title="Close modal (ESC)"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="space-y-1.5 border-b border-[#21242d] pb-4 pr-12">
                <div className="text-xs font-mono text-[#e11d24] uppercase tracking-wider">
                  Deep Architectural Inspection · {selectedProject.index}
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-black tracking-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-xs font-mono text-[#a1a1aa]">{selectedProject.subtitle}</p>
              </div>

              {/* System Overview */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#71717a] uppercase tracking-wider">
                  System Context & Technical Purpose
                </div>
                <p className="text-sm text-[#d4d4d8] leading-relaxed font-sans">
                  {selectedProject.description}
                </p>
              </div>

              {/* Technical Architecture Dataflow */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#71717a] uppercase tracking-wider">
                  Data Pipeline & Component Architecture
                </div>
                <div className="p-3.5 bg-[#08090c] border border-[#21242e] rounded-xl font-mono text-xs text-[#38bdf8] overflow-x-auto leading-relaxed">
                  <pre>{selectedProject.asciiFlow.join('\n')}</pre>
                </div>
                <p className="text-xs font-mono text-[#a1a1aa] pt-1">
                  {selectedProject.architecture}
                </p>
              </div>

              {/* Engineering Highlights */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-[#71717a] uppercase tracking-wider">
                  Key Engineering Challenges Solved
                </div>
                <ul className="space-y-2 text-xs text-[#d4d4d8]">
                  {selectedProject.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#e11d24] font-bold mt-0.5">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verified Stack (Unboxed Clean Typography) */}
              <div className="border-t border-[#21242d] pt-4 space-y-2">
                <div className="text-xs font-mono text-[#71717a] uppercase tracking-wider">
                  Full Technology Stack
                </div>
                <div className="text-xs font-mono text-[#fdfbf7] flex flex-wrap items-center gap-x-2 gap-y-1">
                  {selectedProject.techStack.map((tech, idx) => (
                    <React.Fragment key={tech}>
                      <span>{tech}</span>
                      {idx < selectedProject.techStack.length - 1 && (
                        <span className="text-[#3f3f46]">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="border-t border-[#21242d] pt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.click()}
                      className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Live App</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.click()}
                    className="px-4 py-2 bg-[#e11d24] hover:bg-[#c9181f] text-white text-xs font-mono font-semibold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Open GitHub Repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      handleTestInTerminal(selectedProject);
                    }}
                    className="px-3.5 py-2 bg-[#181a22] hover:bg-[#20232c] text-[#38bdf8] border border-[#272a36] text-xs font-mono rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Play className="w-3 h-3 text-[#38bdf8]" />
                    <span>Run in Simulator</span>
                  </button>
                </div>

                <button
                  onClick={() => handleCopyClone(selectedProject)}
                  className="px-3.5 py-2 bg-[#181a22] hover:bg-[#20232c] text-[#fdfbf7] border border-[#272a36] text-xs font-mono rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
                >
                  {copiedCloneId === selectedProject.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Clone Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{selectedProject.cloneCmd}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
