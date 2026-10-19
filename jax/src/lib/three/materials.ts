import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * Procedural Studio Environment & PBR Material Library
 * Pure procedural materials with zero external texture dependencies.
 */

export function setupStudioEnvironment(renderer: THREE.WebGLRenderer, scene: THREE.Scene): () => void {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  
  const roomEnv = new RoomEnvironment();
  const envTexture = pmremGenerator.fromScene(roomEnv, 0.04).texture;
  scene.environment = envTexture;

  pmremGenerator.dispose();
  roomEnv.dispose();

  return () => {
    envTexture.dispose();
  };
}

export interface MaterialPalette {
  platinum: THREE.MeshStandardMaterial;
  deepNavyMetal: THREE.MeshStandardMaterial;
  electricBlueMetal: THREE.MeshStandardMaterial;
  violetMetal: THREE.MeshStandardMaterial;
  cyanMetal: THREE.MeshStandardMaterial;
  frostedGlass: THREE.MeshPhysicalMaterial;
  glowAccent: THREE.MeshBasicMaterial;
}

export function createProceduralMaterials(): MaterialPalette {
  const platinum = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xdde5ed),
    metalness: 0.95,
    roughness: 0.18,
    envMapIntensity: 1.2,
  });

  const deepNavyMetal = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x0a1226),
    metalness: 0.85,
    roughness: 0.28,
    envMapIntensity: 0.9,
  });

  const electricBlueMetal = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x0284c7),
    metalness: 0.9,
    roughness: 0.2,
    envMapIntensity: 1.4,
  });

  const violetMetal = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x6366f1),
    metalness: 0.88,
    roughness: 0.22,
    envMapIntensity: 1.3,
  });

  const cyanMetal = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x06b6d4),
    metalness: 0.92,
    roughness: 0.16,
    envMapIntensity: 1.5,
  });

  const frostedGlass = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xedf2f7),
    metalness: 0.1,
    roughness: 0.15,
    transmission: 0.88,
    ior: 1.52,
    thickness: 1.2,
    transparent: true,
    opacity: 0.9,
  });

  const glowAccent = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0x38bdf8),
  });

  return {
    platinum,
    deepNavyMetal,
    electricBlueMetal,
    violetMetal,
    cyanMetal,
    frostedGlass,
    glowAccent,
  };
}
