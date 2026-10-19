import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { DestinationId } from '../../types/destinations.ts';
import { createDestination3DModel } from '../../lib/three/geometries.ts';
import { createProceduralMaterials, setupStudioEnvironment } from '../../lib/three/materials.ts';
import { expDamp } from '../../lib/animation.ts';
import { DimensionalFallback } from './DimensionalFallback.tsx';

interface DimensionalGlyphProps {
  destinationId: DestinationId;
  shape: 'monolith_core' | 'neural_lattice' | 'astrolabe_rings' | 'cubic_vault' | 'horizon_arc';
  lightingProfile?: 'studio' | 'electric_blue' | 'violet_eclipse';
  size?: number;
  autoRotate?: boolean;
  interactive?: boolean;
  className?: string;
  forceFallback?: boolean;
}

export const DimensionalGlyph: React.FC<DimensionalGlyphProps> = ({
  destinationId,
  shape,
  lightingProfile = 'studio',
  size = 280,
  autoRotate = true,
  interactive = true,
  className = '',
  forceFallback = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGLFailed, setWebGLFailed] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Pointer tracking for smooth inertial tilt
  const targetRotation = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentRotation = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (forceFallback) return;

    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability safely
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
      if (!gl) {
        setWebGLFailed(true);
        return;
      }
    } catch {
      setWebGLFailed(true);
      return;
    }

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent canvas

    const width = container.clientWidth || size;
    const height = container.clientHeight || size;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0.4, 5.2);
    camera.lookAt(0, 0, 0);

    // 2. WebGL Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL initialization failed, switching to high-fidelity dimensional SVG fallback:', e);
      setWebGLFailed(true);
      return;
    }

    // 3. Studio Environment Map (PMREM)
    let disposeEnv: (() => void) | null = null;
    try {
      disposeEnv = setupStudioEnvironment(renderer, scene);
    } catch (e) {
      console.warn('RoomEnvironment compilation fallback:', e);
    }

    // 4. Lighting Rig
    // Warm key light
    const keyLight = new THREE.DirectionalLight(0xfff8f0, 2.2);
    keyLight.position.set(3.5, 4.5, 3.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0004;
    scene.add(keyLight);

    // Cool hemisphere fill
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x050814, 0.8);
    scene.add(hemiLight);

    // Rim / Backlight depending on profile
    const rimColor =
      lightingProfile === 'violet_eclipse'
        ? 0x818cf8
        : lightingProfile === 'electric_blue'
        ? 0x38bdf8
        : 0x93c5fd;
    const rimLight = new THREE.DirectionalLight(rimColor, 3.5);
    rimLight.position.set(-3.5, -2, -3.5);
    scene.add(rimLight);

    // 5. Materials & Multi-Part Model Group
    const materials = createProceduralMaterials();
    const modelGroup = createDestination3DModel(shape, materials);
    scene.add(modelGroup);

    // 6. Contact Shadow Disc beneath model
    const shadowGeo = new THREE.PlaneGeometry(3.2, 3.2);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const ctx = shadowCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 60);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.6)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.2)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.7,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.6;
    scene.add(shadowPlane);

    // Pre-warm pipeline
    renderer.compile(scene, camera);

    // 7. Interactive Pointer Handlers
    const handlePointerMove = (e: PointerEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotation.current.x = y * 0.45;
      targetRotation.current.y = x * 0.75;
    };

    const handlePointerLeave = () => {
      targetRotation.current.x = 0;
      targetRotation.current.y = 0;
      setIsHovered(false);
    };

    const handlePointerEnter = () => {
      setIsHovered(true);
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);
    container.addEventListener('pointerenter', handlePointerEnter);

    // 8. Animation Render Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const dt = clock.getDelta();

      // Gentle continuous ambient levitation
      const elapsed = clock.getElapsedTime();
      modelGroup.position.y = Math.sin(elapsed * 1.5) * 0.08;

      // Base auto rotation when not hovered
      if (autoRotate && !isHovered) {
        modelGroup.rotation.y += 0.008;
      }

      // Exponential damping toward pointer target
      currentRotation.current.x = expDamp(currentRotation.current.x, targetRotation.current.x, 8, dt);
      currentRotation.current.y = expDamp(currentRotation.current.y, targetRotation.current.y, 8, dt);

      modelGroup.rotation.x = currentRotation.current.x;
      if (isHovered) {
        modelGroup.rotation.y = currentRotation.current.y;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // 10. Clean Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      container.removeEventListener('pointerenter', handlePointerEnter);

      if (disposeEnv) disposeEnv();
      renderer.dispose();
      shadowTex.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [shape, lightingProfile, autoRotate, interactive, size, forceFallback]);

  if (forceFallback || webGLFailed) {
    return <DimensionalFallback destinationId={destinationId} size={size} className={className} />;
  }

  return (
    <div
      ref={mountRef}
      className={`relative cursor-grab active:cursor-grabbing flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-label={`Interactive 3D dimensional artifact for ${destinationId}`}
    />
  );
};
