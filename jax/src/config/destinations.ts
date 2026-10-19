import { DestinationId, DestinationMeta } from '../types/destinations.ts';

export const DESTINATIONS: Record<DestinationId, DestinationMeta> = {
  nexus: {
    id: 'nexus',
    index: 1,
    title: 'Nexus',
    subtitle: 'Main Hub & Personal Identity',
    editorialCharter:
      'The central gravitational core of the portfolio. Establishes creative philosophy, multi-disciplinary worldview, dimensional anchor artwork, and direct navigation paths into the four specialized domains.',
    accentColor: '#38bdf8', // electric blue
    accentBorder: 'rgba(56, 189, 248, 0.3)',
    accentGradient: 'from-sky-500/20 via-blue-600/10 to-transparent',
    dimensionalAsset: {
      glyphShape: 'monolith_core',
      primaryLighting: 'electric-blue',
      accentGlow: 'rgba(56, 189, 248, 0.25)',
      roughness: 0.18,
      metalness: 0.92,
      transmission: 0.2,
    },
    plannedModules: [
      {
        id: 'identity-manifesto',
        name: 'Personal Manifesto & Philosophy',
        scope: 'Core engineering and design principles, focus areas, and creative identity.',
        readiness: 'foundation_ready',
      },
      {
        id: 'dimensional-hero-monolith',
        name: 'Hero Volumetric Monolith',
        scope: 'Interactive 3D centerpiece responding to pointer inertia and ambient lighting.',
        readiness: 'foundation_ready',
      },
      {
        id: 'curated-highlights',
        name: 'Cross-Domain Showcase Reel',
        scope: 'Integrated previews linking to Intelligence Lab, Data Observatory, and Archive.',
        readiness: 'planned_gen_2',
      },
      {
        id: 'direct-inquiry',
        name: 'Inquiry & Dispatch Gateway',
        scope: 'Verified contact channels and encrypted direct communication dispatch.',
        readiness: 'foundation_ready',
      },
    ],
    verificationCriteria: [
      'Top-level narrative anchored without fabricated claims or fake metrics',
      'Smooth integration with dimensional 3D artifact rendering',
      'Rapid keyboard shortcut access (Key: 1)',
    ],
  },

  'intelligence-lab': {
    id: 'intelligence-lab',
    index: 2,
    title: 'Intelligence Lab',
    subtitle: 'AI & Machine Learning',
    editorialCharter:
      'Dedicated laboratory for cognitive computing, neural architecture, multi-agent orchestrations, and frontier AI research prototypes. Focuses on systems engineering, latency benchmarks, and verifiable model evaluation.',
    accentColor: '#818cf8', // violet
    accentBorder: 'rgba(129, 140, 248, 0.3)',
    accentGradient: 'from-indigo-500/20 via-purple-600/10 to-transparent',
    dimensionalAsset: {
      glyphShape: 'neural_lattice',
      primaryLighting: 'violet-eclipse',
      accentGlow: 'rgba(129, 140, 248, 0.25)',
      roughness: 0.24,
      metalness: 0.85,
    },
    plannedModules: [
      {
        id: 'ml-architecture-blueprints',
        name: 'Neural Architecture Blueprints',
        scope: 'Detailed technical walk-throughs of generative pipelines and LLM systems.',
        readiness: 'foundation_ready',
      },
      {
        id: 'agentic-systems',
        name: 'Autonomous Agent Frameworks',
        scope: 'Multi-turn orchestration, tool grounding, and memory architectures.',
        readiness: 'planned_gen_2',
      },
      {
        id: 'research-notes',
        name: 'Applied Machine Learning Papers & Experiments',
        scope: 'Empirical benchmark logs, parameter studies, and technical writeups.',
        readiness: 'planned_gen_2',
      },
    ],
    verificationCriteria: [
      'No hallucinatory benchmark scores or fabricated model metrics',
      'Architectural blueprint schemas prepared for real model telemetry in Gen 2',
      'Keyboard shortcut access (Key: 2)',
    ],
  },

  'data-observatory': {
    id: 'data-observatory',
    index: 3,
    title: 'Data Observatory',
    subtitle: 'Data Science & Analytics',
    editorialCharter:
      'An observatory for statistical rigor, spatial data modeling, real-time analytics engines, and high-dimensional visualization. Prioritizes honest telemetry, reproducible methodologies, and clear visual synthesis.',
    accentColor: '#22d3ee', // cyan
    accentBorder: 'rgba(34, 211, 238, 0.3)',
    accentGradient: 'from-cyan-500/20 via-teal-600/10 to-transparent',
    dimensionalAsset: {
      glyphShape: 'astrolabe_rings',
      primaryLighting: 'cool-studio',
      accentGlow: 'rgba(34, 211, 238, 0.25)',
      roughness: 0.15,
      metalness: 0.95,
    },
    plannedModules: [
      {
        id: 'observatory-telemetry-engine',
        name: 'Statistical Framework & Pipelines',
        scope: 'Mathematical modeling methodologies, normalization engines, and tabular datasets.',
        readiness: 'foundation_ready',
      },
      {
        id: 'spatial-analytics',
        name: 'Geospatial & Multidimensional Clustering',
        scope: 'Interactive topological views and dataset exploration canvases.',
        readiness: 'planned_gen_2',
      },
      {
        id: 'data-pipelines',
        name: 'Streaming ETL & Verification Invariants',
        scope: 'Reproducibility protocols and data validation guarantees.',
        readiness: 'planned_gen_2',
      },
    ],
    verificationCriteria: [
      'Tabular figures adhere strictly to font-variant-numeric: tabular-nums',
      'Zero arbitrary scoreboard numbers without verified backing telemetry',
      'Keyboard shortcut access (Key: 3)',
    ],
  },

  archive: {
    id: 'archive',
    index: 4,
    title: 'Archive',
    subtitle: 'Projects, Repositories & Skills',
    editorialCharter:
      'The permanent repository of built systems, open-source repositories, technical proficiencies, and production codebases. Categorized by stack, domain, and verified delivery milestone.',
    accentColor: '#a78bfa', // soft purple
    accentBorder: 'rgba(167, 139, 250, 0.3)',
    accentGradient: 'from-purple-500/20 via-indigo-600/10 to-transparent',
    dimensionalAsset: {
      glyphShape: 'cubic_vault',
      primaryLighting: 'violet-eclipse',
      accentGlow: 'rgba(167, 139, 250, 0.25)',
      roughness: 0.3,
      metalness: 0.88,
    },
    plannedModules: [
      {
        id: 'repository-taxonomy',
        name: 'Codebase Registry & Stack Index',
        scope: 'Classified repositories, architectural notes, and verification states.',
        readiness: 'foundation_ready',
      },
      {
        id: 'production-case-studies',
        name: 'In-Depth Case Studies',
        scope: 'Problem statement, technical constraints, solution architecture, and verified outcomes.',
        readiness: 'planned_gen_2',
      },
      {
        id: 'technical-arsenal',
        name: 'Language & Framework Capabilities',
        scope: 'Granular breakdown of production systems engineering competencies.',
        readiness: 'planned_gen_2',
      },
    ],
    verificationCriteria: [
      'Zero dummy placeholder cards with lorem ipsum or broken links',
      'Clean unboxed metadata tags with dot separators',
      'Keyboard shortcut access (Key: 4)',
    ],
  },

  horizon: {
    id: 'horizon',
    index: 5,
    title: 'Horizon',
    subtitle: 'Personal Journey, Interests & Ambitions',
    editorialCharter:
      'The forward-looking vista. Documents personal evolution, ongoing experiments, intellectual influences, reading lists, and technological frontiers under exploration.',
    accentColor: '#60a5fa', // radiant blue
    accentBorder: 'rgba(96, 165, 250, 0.3)',
    accentGradient: 'from-blue-500/20 via-sky-600/10 to-transparent',
    dimensionalAsset: {
      glyphShape: 'horizon_arc',
      primaryLighting: 'electric-blue',
      accentGlow: 'rgba(96, 165, 250, 0.25)',
      roughness: 0.2,
      metalness: 0.9,
    },
    plannedModules: [
      {
        id: 'journey-chronology',
        name: 'Chronological Milestones',
        scope: 'Verifiable career progression, research shifts, and key inflection points.',
        readiness: 'foundation_ready',
      },
      {
        id: 'intellectual-curiosities',
        name: 'Explorations & Reading Monograph',
        scope: 'Curated papers, books, and architectural musings.',
        readiness: 'planned_gen_2',
      },
      {
        id: 'future-ambitions',
        name: 'Long-Horizon Thesis',
        scope: 'Five-year technological outlook and areas of deep research interest.',
        readiness: 'foundation_ready',
      },
    ],
    verificationCriteria: [
      'Authentic personal voice without generic marketing puffery',
      'Editorial narrative pacing adhering to portfolio design constitution',
      'Keyboard shortcut access (Key: 5)',
    ],
  },
};

export const DESTINATION_LIST = Object.values(DESTINATIONS).sort(
  (a, b) => a.index - b.index
);
