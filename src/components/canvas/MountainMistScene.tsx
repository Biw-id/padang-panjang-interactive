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

    // 2. 3D EMBLEM LOGO RESMI KOTA PADANG PANJANG (Centerpiece)
    const logoGroup = new THREE.Group();
    logoGroup.position.set(0, 3.0, 0);

    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load(
      '/media_webp/08_branding_identitas/lambang_resmi_kota_padang_panjang.png'
    );
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    logoTexture.generateMipmaps = true;

    // A. Logo Face Plate (Front and Back Double-Sided)
    const logoWidth = 4.8;
    const logoHeight = 5.15;
    const logoGeo = new THREE.PlaneGeometry(logoWidth, logoHeight);
    const logoMat = new THREE.MeshStandardMaterial({
      map: logoTexture,
      transparent: true,
      alphaTest: 0.05,
      roughness: 0.25,
      metalness: 0.15,
      side: THREE.DoubleSide,
    });
    const logoMesh = new THREE.Mesh(logoGeo, logoMat);
    logoGroup.add(logoMesh);

    // B. Golden Circular Bezel Ring (Framing the Logo)
    const bezelGeo = new THREE.TorusGeometry(3.6, 0.09, 16, 72);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0xF59E0B : 0xD97706, // Marawa Gold
      roughness: 0.2,
      metalness: 0.85,
    });
    const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
    logoGroup.add(bezelMesh);

    // C. Outer Celestial Orbital Ring 1 (Marawa Gold)
    const outerRing1Geo = new THREE.TorusGeometry(4.7, 0.045, 16, 80);
    const outerRing1Mat = new THREE.MeshBasicMaterial({
      color: 0xF59E0B, // Marawa Gold
      transparent: true,
      opacity: isDark ? 0.65 : 0.45,
    });
    const outerRing1 = new THREE.Mesh(outerRing1Geo, outerRing1Mat);
    outerRing1.rotation.x = Math.PI / 3.8;
    outerRing1.rotation.y = Math.PI / 5;
    logoGroup.add(outerRing1);

    // D. Outer Celestial Orbital Ring 2 (Marawa Crimson)
    const outerRing2Geo = new THREE.TorusGeometry(5.4, 0.035, 16, 80);
    const outerRing2Mat = new THREE.MeshBasicMaterial({
      color: 0xDC2626, // Marawa Crimson
      transparent: true,
      opacity: isDark ? 0.55 : 0.35,
    });
    const outerRing2 = new THREE.Mesh(outerRing2Geo, outerRing2Mat);
    outerRing2.rotation.x = -Math.PI / 3.2;
    outerRing2.rotation.z = Math.PI / 4.5;
    logoGroup.add(outerRing2);

    // E. Glowing Halo Aura Disk behind the Logo
    const auraGeo = new THREE.CircleGeometry(3.6, 48);
    const auraMat = new THREE.MeshBasicMaterial({
      color: 0xF59E0B,
      transparent: true,
      opacity: isDark ? 0.12 : 0.06,
      side: THREE.DoubleSide,
    });
    const auraMesh = new THREE.Mesh(auraGeo, auraMat);
    auraMesh.position.z = -0.08;
    logoGroup.add(auraMesh);

    scene.add(logoGroup);

    // 3. Procedural Mountain Topography (Singgalang & Marapi ridges in background)
    const terrainGeo = new THREE.PlaneGeometry(100, 65, 60, 40);
    terrainGeo.rotateX(-Math.PI / 2.3);

    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      const dist1 = Math.hypot(vx - 14, vy - 10);
      const dist2 = Math.hypot(vx + 16, vy - 6);
      const elev1 = Math.max(0, 16 - dist1 * 0.7);
      const elev2 = Math.max(0, 13 - dist2 * 0.6);
      const noise = Math.sin(vx * 0.25) * Math.cos(vy * 0.25) * 1.5;
      pos.setZ(i, elev1 + elev2 + noise - 6);
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x223048 : 0x64748B,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.45 : 0.3,
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.position.set(0, -3.5, -8);
    scene.add(terrainMesh);

    // 4. Floating Cold Fog Particles (Mist of Padang Panjang 17°C)
    const particleCount = graphicQuality === 'high' ? 240 : 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 60;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 25 + 2;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 5;
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

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 1.6 : 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.2);
    keyLight.position.set(6, 12, 16);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xF59E0B, 1.4);
    rimLight.position.set(-8, -4, 6);
    scene.add(rimLight);

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

      // Gentle vertical floating breathing motion of the Logo
      logoGroup.position.y = 3.0 + Math.sin(elapsed * 0.8) * 0.35;

      // Slow majestic 3D rotation of the Padang Panjang emblem
      logoGroup.rotation.y += 0.003;

      // Counter-rotating celestial orbital rings
      outerRing1.rotation.z += 0.004;
      outerRing2.rotation.y += 0.003;

      // Animate floating cold fog particles
      const pPositions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pPositions[i * 3 + 1] += Math.sin(elapsed + i) * 0.006;
        pPositions[i * 3] += particleSpeeds[i];
        if (pPositions[i * 3] > 30) {
          pPositions[i * 3] = -30;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      logoTexture.dispose();
      logoGeo.dispose();
      logoMat.dispose();
      bezelGeo.dispose();
      bezelMat.dispose();
      outerRing1Geo.dispose();
      outerRing1Mat.dispose();
      outerRing2Geo.dispose();
      outerRing2Mat.dispose();
      auraGeo.dispose();
      auraMat.dispose();
      terrainGeo.dispose();
      terrainMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [theme, graphicQuality, onHover3DChange, onDragStateChange]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden select-none pointer-events-none"
    />
  );
};
