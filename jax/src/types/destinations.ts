/**
 * Destination Architecture Types for JAX
 * Defines the five core destinations and their Generation 1 foundation specification.
 */

export type DestinationId =
  | 'nexus'
  | 'intelligence-lab'
  | 'data-observatory'
  | 'archive'
  | 'horizon';

export interface DestinationModulePlan {
  id: string;
  name: string;
  scope: string;
  readiness: 'foundation_ready' | 'planned_gen_2' | 'architecture_defined';
}

export interface DimensionalAssetSpec {
  glyphShape: 'monolith_core' | 'neural_lattice' | 'astrolabe_rings' | 'cubic_vault' | 'horizon_arc';
  primaryLighting: string; // e.g. 'electric-blue' | 'violet-eclipse' | 'cool-studio'
  accentGlow: string;
  roughness: number;
  metalness: number;
  transmission?: number;
}

export interface DestinationMeta {
  id: DestinationId;
  index: number;
  title: string;
  subtitle: string;
  editorialCharter: string;
  accentColor: string;
  accentBorder: string;
  accentGradient: string;
  dimensionalAsset: DimensionalAssetSpec;
  plannedModules: DestinationModulePlan[];
  verificationCriteria: string[];
}
