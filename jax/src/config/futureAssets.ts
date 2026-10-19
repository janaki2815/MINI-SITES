/**
 * Future Asset Integration Registry
 * Defines planned asset slots, formats, and fallback policies for Generation 2.
 */

export interface AssetSlot {
  id: string;
  destinationId: string;
  assetType: '3d_model_gltf' | 'hdr_environment' | 'dataset_json' | 'photography_editorial' | 'audio_soundscape';
  status: 'foundation_placeholder' | 'procedural_active' | 'awaiting_production_asset';
  description: string;
  fallbackStrategy: 'procedural_threejs' | 'styled_svg_container' | 'silent_ambient';
}

export const FUTURE_ASSET_REGISTRY: AssetSlot[] = [
  {
    id: 'nexus-hero-volumetric',
    destinationId: 'nexus',
    assetType: '3d_model_gltf',
    status: 'procedural_active',
    description: 'High-poly beveled monolithic core with brushed platinum materials and blue rim highlights.',
    fallbackStrategy: 'procedural_threejs',
  },
  {
    id: 'intel-neural-core-3d',
    destinationId: 'intelligence-lab',
    assetType: '3d_model_gltf',
    status: 'procedural_active',
    description: 'Dodecahedral neural lattice with animated refractive inner core and violet lighting.',
    fallbackStrategy: 'procedural_threejs',
  },
  {
    id: 'observatory-astrolabe-3d',
    destinationId: 'data-observatory',
    assetType: '3d_model_gltf',
    status: 'procedural_active',
    description: 'Concentric gyroscope gimbal rings with tabular coordinate indicators.',
    fallbackStrategy: 'procedural_threejs',
  },
  {
    id: 'archive-vault-3d',
    destinationId: 'archive',
    assetType: '3d_model_gltf',
    status: 'procedural_active',
    description: 'Modular beveled hypercube vault with chamfered slots.',
    fallbackStrategy: 'procedural_threejs',
  },
  {
    id: 'horizon-arc-3d',
    destinationId: 'horizon',
    assetType: '3d_model_gltf',
    status: 'procedural_active',
    description: 'Curved planetary horizon arc with refractive light scatter.',
    fallbackStrategy: 'procedural_threejs',
  },
  {
    id: 'studio-hdr-lighting',
    destinationId: 'all',
    assetType: 'hdr_environment',
    status: 'procedural_active',
    description: 'Procedural RoomEnvironment PMREM generator for physically accurate PBR reflections.',
    fallbackStrategy: 'procedural_threejs',
  },
];
