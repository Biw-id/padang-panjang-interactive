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
  const isDraggingRef = useRef(false);
  const previousPointerRef = useRef({ x: 0, y: 0 });
  const gonjongVelocityRef = useRef({ x: 0, y: 0.003 });

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
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const isDark = theme === 'dark';

    // 2. 3D GONJONG ARCHITECTURAL CENTERPIECE (Rumah Gadang Curved Spire Roof)
    const gonjongGroup = new THREE.Group();
    gonjongGroup.position.set(0, 2.5, 0);

    // Procedural Gonjong curved horn geometry
    const createGonjongPeak = (offsetX: number, heightScale: number, rotationZ: number) => {
      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(offsetX, -1.5, 0),
        new THREE.Vector3(offsetX * 1.1, 1.5, 0),
        new THREE.Vector3(offsetX * 1.35, 3.8 * heightScale, 0),
        new THREE.Vector3(offsetX * 1.6, 5.2 * heightScale, 0)
      );

      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.22, 12, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: isDark ? 0xF59E0B : 0xD97706, // Marawa Gold
        wireframe: true,
        transparent: true,
        opacity: isDark ? 0.85 : 0.65,
      });
      const mesh = new THREE.Mesh(tubeGeo, tubeMat);
      mesh.rotation.z = rotationZ;
      return mesh;
    };

    // 4 Symmetrical Swept Gonjong Horns
    gonjongGroup.add(createGonjongPeak(-4.5, 1.15, 0.05));
    gonjongGroup.add(createGonjongPeak(-1.8, 0.95, 0.02));
    gonjongGroup.add(createGonjongPeak(1.8, 0.95, -0.02));
    gonjongGroup.add(createGonjongPeak(4.5, 1.15, -0.05));

    // Base horizontal beam & Rangkiang structure
    const baseGeo = new THREE.BoxGeometry(11, 0.6, 2.5);
    const baseMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0xDC2626 : 0xB91C1C, // Marawa Crimson
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.7 : 0.5,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.set(0, -1.8, 0);
    gonjongGroup.add(baseMesh);

    // Pillar posts
    for (let x = -4.5; x <= 4.5; x += 2.25) {
      const pillarGeo = new THREE.CylinderGeometry(0.12, 0.12, 2.2, 8);
      const pillarMat = new THREE.MeshBasicMaterial({
        color: isDark ? 0x9047FF : 0x7114FF,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(x, -3.0, 0);
      gonjongGroup.add(pillar);
    }

    // Sacred center halo ring (Ornamen Ukiran Spirit)
    const ringGeo = new THREE.RingGeometry(3.5, 3.65, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xF59E0B,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isDark ? 0.35 : 0.2,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.set(0, -0.5, 0);
    gonjongGroup.add(ringMesh);

    scene.add(gonjongGroup);

    // 3. Procedural Mountain Topography (Singgalang & Marapi ridges in background)
    const terrainGeo = new THREE.PlaneGeometry(90, 60, 60, 40);
    terrainGeo.rotateX(-Math.PI / 2.3);

    const pos = terrainGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      const dist1 = Math.hypot(vx - 14, vy - 10);
      const dist2 = Math.hypot(vx + 16, vy - 6);
      const elev1 = Math.max(0, 15 - dist1 * 0.7);
      const elev2 = Math.max(0, 12 - dist2 * 0.6);
      const noise = Math.sin(vx * 0.25) * Math.cos(vy * 0.25) * 1.5;
      pos.setZ(i, elev1 + elev2 + noise - 6);
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x1E293B : 0x64748B,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.12 : 0.08,
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.position.set(0, -10, -14);
    scene.add(terrainMesh);

    // 4. Floating Mist & Spores Particle Cloud
    const particleCount = graphicQuality === 'high' ? 1200 : 500;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 60;
      particlePositions[i * 3 + 1] = Math.random() * 24 - 4;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 35;
      particleSpeeds[i] = 0.006 + Math.random() * 0.012;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: graphicQuality === 'high' ? 0.35 : 0.5,
      color: isDark ? 0xF8FAFC : 0x2A1647,
      transparent: true,
      opacity: isDark ? 0.4 : 0.2,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. 360° DRAG & ORBIT GESTURE INTERACTION
    const dom = renderer.domElement;

    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      previousPointerRef.current = { x: e.clientX, y: e.clientY };
      onDragStateChange?.(true);
      dom.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - previousPointerRef.current.x;
      const deltaY = e.clientY - previousPointerRef.current.y;

      // Rotate Gonjong directly
      gonjongGroup.rotation.y += deltaX * 0.008;
      gonjongGroup.rotation.x += deltaY * 0.004;

      // Store velocity for inertia momentum
      gonjongVelocityRef.current = {
        x: deltaY * 0.0008,
        y: deltaX * 0.0015,
      };

      previousPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e: PointerEvent) => {
      isDraggingRef.current = false;
      onDragStateChange?.(false);
      try {
        dom.releasePointerCapture(e.pointerId);
      } catch (_) {}
    };

    const onPointerEnter = () => onHover3DChange?.(true);
    const onPointerLeave = () => {
      isDraggingRef.current = false;
      onHover3DChange?.(false);
      onDragStateChange?.(false);
    };

    dom.addEventListener('pointerdown', onPointerDown);
    dom.addEventListener('pointermove', onPointerMove);
    dom.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('pointerenter', onPointerEnter);
    dom.addEventListener('pointerleave', onPointerLeave);

    // 6. Resize Handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 7. Render Loop with Inertia Damping
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Apply drag inertia with smooth decay when user releases
      if (!isDraggingRef.current) {
        gonjongGroup.rotation.y += gonjongVelocityRef.current.y;
        gonjongGroup.rotation.x += gonjongVelocityRef.current.x;

        // Friction decay towards baseline rotation speed
        gonjongVelocityRef.current.y = THREE.MathUtils.lerp(gonjongVelocityRef.current.y, 0.002, 0.05);
        gonjongVelocityRef.current.x = THREE.MathUtils.lerp(gonjongVelocityRef.current.x, 0, 0.05);
      }

      // Gentle vertical floating breathing motion
      gonjongGroup.position.y = 2.5 + Math.sin(clock.getElapsedTime() * 0.8) * 0.25;

      // Subtle pulse on halo ring
      ringMesh.rotation.z += 0.005;

      // Animate floating mist particles
      const pPositions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        pPositions[i * 3 + 1] += Math.sin(clock.getElapsedTime() + i) * 0.005;
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
      dom.removeEventListener('pointerdown', onPointerDown);
      dom.removeEventListener('pointermove', onPointerMove);
      dom.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('pointerenter', onPointerEnter);
      dom.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      terrainGeo.dispose();
      terrainMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [theme, graphicQuality, onHover3DChange, onDragStateChange]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden cursor-grab active:cursor-grabbing select-none"
      title="Klik dan seret untuk memutar 3D Gonjong 360°"
    />
  );
};
