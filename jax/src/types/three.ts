/**
 * Dimensional 3D Art & WebGL Types
 */

export interface DimensionalSceneConfig {
  shape: 'monolith_core' | 'neural_lattice' | 'astrolabe_rings' | 'cubic_vault' | 'horizon_arc';
  lightingProfile: 'studio' | 'electric_blue' | 'violet_eclipse';
  interactive: boolean;
  autoRotateSpeed?: number;
  scale?: number;
}

export type WebGLSupportStatus = 'supported' | 'fallback_active' | 'evaluating';
