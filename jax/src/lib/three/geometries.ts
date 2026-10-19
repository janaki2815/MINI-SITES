import * as THREE from 'three';
import { MaterialPalette } from './materials.ts';

/**
 * Composite Multi-Part Procedural 3D Models for JAX Destinations
 * Built according to Three.js guidelines: 3–12 distinct parts per hero subject,
 * varied roughness/metalness, grounded pivots, and zero external asset dependencies.
 */

export function createDestination3DModel(
  shape: 'monolith_core' | 'neural_lattice' | 'astrolabe_rings' | 'cubic_vault' | 'horizon_arc',
  materials: MaterialPalette
): THREE.Group {
  const group = new THREE.Group();

  switch (shape) {
    case 'monolith_core': {
      // 1. Central Monolithic Core
      const coreGeo = new THREE.BoxGeometry(1.2, 2.0, 0.45);
      const coreMesh = new THREE.Mesh(coreGeo, materials.platinum);
      coreMesh.castShadow = true;
      group.add(coreMesh);

      // 2. Beveled Dark Frame Wings
      const wingGeo = new THREE.BoxGeometry(0.12, 1.8, 0.5);
      const leftWing = new THREE.Mesh(wingGeo, materials.deepNavyMetal);
      leftWing.position.set(-0.7, 0, 0);
      const rightWing = leftWing.clone();
      rightWing.position.set(0.7, 0, 0);
      group.add(leftWing, rightWing);

      // 3. Floating Orbital Torus Halo
      const haloGeo = new THREE.TorusGeometry(1.5, 0.035, 24, 64);
      const haloMesh = new THREE.Mesh(haloGeo, materials.electricBlueMetal);
      haloMesh.rotation.x = Math.PI / 3;
      group.add(haloMesh);

      // 4. Central Refractive Glass Core
      const lensGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.5, 32);
      const lensMesh = new THREE.Mesh(lensGeo, materials.frostedGlass);
      lensMesh.rotation.x = Math.PI / 2;
      group.add(lensMesh);

      // 5. Focal Jewel
      const jewelGeo = new THREE.OctahedronGeometry(0.18, 0);
      const jewelMesh = new THREE.Mesh(jewelGeo, materials.glowAccent);
      group.add(jewelMesh);
      break;
    }

    case 'neural_lattice': {
      // 1. Geodesic Cage Outer
      const cageGeo = new THREE.IcosahedronGeometry(1.4, 1);
      const cageWire = new THREE.WireframeGeometry(cageGeo);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x818cf8,
        linewidth: 1.5,
        transparent: true,
        opacity: 0.6,
      });
      const wireMesh = new THREE.LineSegments(cageWire, lineMat);
      group.add(wireMesh);

      // 2. Inner Faceted Nucleus
      const nucleusGeo = new THREE.DodecahedronGeometry(0.75, 0);
      const nucleusMesh = new THREE.Mesh(nucleusGeo, materials.violetMetal);
      group.add(nucleusMesh);

      // 3. Refractive Outer Shield
      const shieldGeo = new THREE.IcosahedronGeometry(1.1, 0);
      const shieldMesh = new THREE.Mesh(shieldGeo, materials.frostedGlass);
      group.add(shieldMesh);

      // 4. Satellite Nodes (4 points)
      const nodeGeo = new THREE.SphereGeometry(0.09, 16, 16);
      const positions = [
        [1.3, 0.4, 0.2],
        [-1.2, -0.5, 0.3],
        [0.3, 1.3, -0.4],
        [-0.4, -1.2, -0.5],
      ];
      positions.forEach(([x, y, z]) => {
        const node = new THREE.Mesh(nodeGeo, materials.platinum);
        node.position.set(x, y, z);
        group.add(node);
      });
      break;
    }

    case 'astrolabe_rings': {
      // 1. Outer Gimbal Ring
      const outerRingGeo = new THREE.TorusGeometry(1.4, 0.05, 24, 72);
      const outerRing = new THREE.Mesh(outerRingGeo, materials.platinum);
      group.add(outerRing);

      // 2. Intermediate Inclined Ring
      const midRingGeo = new THREE.TorusGeometry(1.15, 0.045, 24, 64);
      const midRing = new THREE.Mesh(midRingGeo, materials.cyanMetal);
      midRing.rotation.x = Math.PI / 4;
      midRing.rotation.y = Math.PI / 6;
      group.add(midRing);

      // 3. Inner Dial Disc
      const dialGeo = new THREE.CylinderGeometry(0.85, 0.85, 0.04, 48);
      const dialMesh = new THREE.Mesh(dialGeo, materials.deepNavyMetal);
      dialMesh.rotation.x = Math.PI / 2;
      group.add(dialMesh);

      // 4. Center Polar Axis Needle
      const needleGeo = new THREE.ConeGeometry(0.08, 1.6, 16);
      const needleMesh = new THREE.Mesh(needleGeo, materials.platinum);
      needleMesh.position.y = 0.2;
      group.add(needleMesh);

      // 5. Central Sapphire Core
      const coreSphereGeo = new THREE.SphereGeometry(0.28, 24, 24);
      const coreSphere = new THREE.Mesh(coreSphereGeo, materials.frostedGlass);
      group.add(coreSphere);
      break;
    }

    case 'cubic_vault': {
      // 1. Primary Chamfered Cube
      const cubeGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
      const cubeMesh = new THREE.Mesh(cubeGeo, materials.deepNavyMetal);
      group.add(cubeMesh);

      // 2. Outer Protective Frame Brackets
      const bracketGeo = new THREE.BoxGeometry(1.35, 0.08, 1.35);
      const topBracket = new THREE.Mesh(bracketGeo, materials.platinum);
      topBracket.position.y = 0.65;
      const bottomBracket = topBracket.clone();
      bottomBracket.position.y = -0.65;
      group.add(topBracket, bottomBracket);

      // 3. Vertical Accent Pillars
      const pillarGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.4, 16);
      const pillarOffsets = [
        [0.65, 0, 0.65],
        [-0.65, 0, 0.65],
        [0.65, 0, -0.65],
        [-0.65, 0, -0.65],
      ];
      pillarOffsets.forEach(([x, y, z]) => {
        const pillar = new THREE.Mesh(pillarGeo, materials.violetMetal);
        pillar.position.set(x, y, z);
        group.add(pillar);
      });

      // 4. Center Core Vault Window
      const vaultGeo = new THREE.OctahedronGeometry(0.4, 0);
      const vaultCore = new THREE.Mesh(vaultGeo, materials.frostedGlass);
      group.add(vaultCore);
      break;
    }

    case 'horizon_arc': {
      // 1. Sweeping Curved Horizon Arc (Half Torus)
      const arcGeo = new THREE.TorusGeometry(1.5, 0.07, 24, 64, Math.PI * 1.15);
      const arcMesh = new THREE.Mesh(arcGeo, materials.platinum);
      arcMesh.rotation.z = -Math.PI * 0.58;
      group.add(arcMesh);

      // 2. Concentric Radiance Ring
      const ringGeo = new THREE.RingGeometry(0.85, 1.05, 48);
      const ringMesh = new THREE.Mesh(ringGeo, materials.frostedGlass);
      ringMesh.rotation.x = -Math.PI / 3;
      group.add(ringMesh);

      // 3. Horizon Orb / Celestial Core
      const orbGeo = new THREE.SphereGeometry(0.65, 32, 32);
      const orbMesh = new THREE.Mesh(orbGeo, materials.electricBlueMetal);
      orbMesh.position.set(0, -0.15, 0);
      group.add(orbMesh);

      // 4. Ambient Zenith Needle
      const needleGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.8, 16);
      const needleMesh = new THREE.Mesh(needleGeo, materials.cyanMetal);
      needleMesh.position.set(0, 0.3, 0);
      group.add(needleMesh);
      break;
    }
  }

  return group;
}
