import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GraphicQuality, Theme } from '../../hooks/useTheme';

interface MountainMistSceneProps {
  theme: Theme;
  graphicQuality: GraphicQuality;
  onHover3DChange?: (isHovering: boolean) => void;
  onDragStateChange?: (isDragging: boolean) => void;
}

export const MountainMistScene: React.FC<MountainMistSceneProps> = ({
  theme,
  graphicQuality,
  onHover3DChange,
  onDragStateChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 3, 24);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: graphicQuality === 'high',
      powerPreference: 'high-performance',
    });

    const dpr = graphicQuality === 'high' ? Math.min(window.devicePixelRatio, 2) : 1;
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const isDark = theme === 'dark';

    // 2. Procedural Mountain Topography (Singgalang & Marapi ridges in background)
    // Bersih, luas, dan atmosferik sebagai backdrop tanpa objek tengah yang mengganggu Hero
    const terrainGeo = new THREE.PlaneGeometry(110, 75, 64, 44);
    terrainGeo.rotateX(-Math.PI / 2.3);

    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      const dist1 = Math.hypot(vx - 16, vy - 10);
      const dist2 = Math.hypot(vx + 18, vy - 6);
      const dist3 = Math.hypot(vx, vy - 14);
      const elev1 = Math.max(0, 18 - dist1 * 0.7);
      const elev2 = Math.max(0, 14 - dist2 * 0.6);
      const elev3 = Math.max(0, 12 - dist3 * 0.5);
      const noise = Math.sin(vx * 0.22) * Math.cos(vy * 0.22) * 1.6;
      pos.setZ(i, elev1 + elev2 + elev3 + noise - 6);
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x1E293B : 0x64748B,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.45 : 0.25,
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.position.set(0, -3.5, -8);
    scene.add(terrainMesh);

    // 3. Floating Cold Fog Particles (Mist of Padang Panjang 17°C)
    const particleCount = graphicQuality === 'high' ? 260 : 130;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 65;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 28 + 2;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 45 - 5;
      particleSpeeds.push(0.015 + Math.random() * 0.025);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: isDark ? 0xE2E8F0 : 0x94A3B8,
      size: graphicQuality === 'high' ? 0.35 : 0.25,
      transparent: true,
      opacity: isDark ? 0.55 : 0.35,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Subtle Distant Stars Background
    const starCount = 180;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 80;
      starPositions[i * 3 + 1] = Math.random() * 30 + 5;
      starPositions[i * 3 + 2] = -25 + Math.random() * 10;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starMat = new THREE.PointsMaterial({
      color: 0xF59E0B, // Subtle Marawa Gold stars
      size: 0.2,
      transparent: true,
      opacity: isDark ? 0.5 : 0.3,
    });

    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 1.4 : 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 1.8);
    keyLight.position.set(6, 12, 16);
    scene.add(keyLight);

    // 6. Resize Handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 7. Render Loop with Smooth Ambient Animation
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow majestic parallax wave on mountains
      terrainMesh.position.y = -3.5 + Math.sin(elapsed * 0.4) * 0.15;

      // Animate floating cold fog particles
      const pPositions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pPositions[i * 3 + 1] += Math.sin(elapsed + i) * 0.005;
        pPositions[i * 3] += particleSpeeds[i];
        if (pPositions[i * 3] > 32) {
          pPositions[i * 3] = -32;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Subtle twinkling on distant stars
      starMat.opacity = isDark ? 0.35 + Math.sin(elapsed * 1.5) * 0.15 : 0.2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      terrainGeo.dispose();
      terrainMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      starGeo.dispose();
      starMat.dispose();
    };
  }, [theme, graphicQuality, onHover3DChange, onDragStateChange]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden select-none pointer-events-none"
    />
  );
};
