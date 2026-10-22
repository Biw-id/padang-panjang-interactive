import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface StoryCube3DProps {
  stage: number; // 1, 2, 3, 4
  className?: string;
}

export const StoryCube3D: React.FC<StoryCube3DProps> = ({ stage, className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const targetRotationRef = useRef({ x: 0, y: 0, z: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const prevPointerRef = useRef({ x: 0, y: 0 });
  const userRotationRef = useRef({ x: 0, y: 0 });

  // Update target rotation when stage changes
  useEffect(() => {
    switch (stage) {
      case 1:
        targetRotationRef.current = { x: 0.1, y: 0.2, z: 0 };
        break;
      case 2:
        // 90 deg Y rotation to side face
        targetRotationRef.current = { x: -0.1, y: Math.PI / 2 + 0.15, z: 0.05 };
        break;
      case 3:
        // Vertical flip to top face
        targetRotationRef.current = { x: -Math.PI / 2 + 0.2, y: Math.PI / 4, z: 0 };
        break;
      case 4:
        // 180 deg rotation to back face
        targetRotationRef.current = { x: 0.2, y: Math.PI + 0.25, z: -0.1 };
        break;
      default:
        targetRotationRef.current = { x: 0, y: 0, z: 0 };
    }
  }, [stage]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 450;
    const height = mount.clientHeight || 450;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    // 2. Texture Loader for the 4 Story Images
    const loader = new THREE.TextureLoader();
    const textures = [
      loader.load('/media_webp/01_hero_landscape/hero_singgalang_tandikat_panorama.webp'),
      loader.load('/media_webp/01_hero_landscape/hero_pdikm_lanskap_hutan.webp'),
      loader.load('/media_webp/01_hero_landscape/hero_gerbang_perbatasan_padang_panjang.webp'),
      loader.load('/media_webp/01_hero_landscape/hero_jembatan_kembar_padang_panjang.webp'),
      loader.load('/media_webp/01_hero_landscape/hero_singgalang_tandikat_panorama.webp'),
      loader.load('/media_webp/01_hero_landscape/hero_pdikm_lanskap_hutan.webp'),
    ];

    textures.forEach((tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
    });

    // Materials for the 6 faces (Right, Left, Top, Bottom, Front, Back)
    const materials = textures.map(
      (tex) =>
        new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.25,
          metalness: 0.1,
        })
    );

    // 3. Cube Geometry & Group
    const cubeGroup = new THREE.Group();
    const cubeSize = 3.6;
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMesh = new THREE.Mesh(geometry, materials);
    cubeGroup.add(cubeMesh);

    // 4. Glowing Neon Edges (Marawa Gold & Crimson)
    const edges = new THREE.EdgesGeometry(geometry);
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0xF59E0B, // Marawa Gold
      linewidth: 2,
    });
    const edgeLines = new THREE.LineSegments(edges, edgeMat);
    cubeGroup.add(edgeLines);

    // 5. Outer Ambient Glowing Cage
    const cageGeo = new THREE.BoxGeometry(cubeSize * 1.08, cubeSize * 1.08, cubeSize * 1.08);
    const cageEdges = new THREE.EdgesGeometry(cageGeo);
    const cageMat = new THREE.LineBasicMaterial({
      color: 0xDC2626, // Marawa Crimson
      transparent: true,
      opacity: 0.4,
    });
    const cageLines = new THREE.LineSegments(cageEdges, cageMat);
    cubeGroup.add(cageLines);

    scene.add(cubeGroup);

    // 6. Dramatic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff5e6, 2.2);
    dirLight1.position.set(5, 8, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xDC2626, 1.2);
    dirLight2.position.set(-6, -4, -5);
    scene.add(dirLight2);

    // 7. Cursor Move & Drag Gestures
    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current = { x: x * 0.4, y: y * 0.3 };
    };

    const dom = renderer.domElement;
    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      prevPointerRef.current = { x: e.clientX, y: e.clientY };
      dom.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - prevPointerRef.current.x;
      const deltaY = e.clientY - prevPointerRef.current.y;

      userRotationRef.current.y += deltaX * 0.01;
      userRotationRef.current.x += deltaY * 0.01;

      prevPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e: PointerEvent) => {
      isDraggingRef.current = false;
      try {
        dom.releasePointerCapture(e.pointerId);
      } catch (_) {}
    };

    window.addEventListener('mousemove', onMouseMove);
    dom.addEventListener('pointerdown', onPointerDown);
    dom.addEventListener('pointermove', onPointerMove);
    dom.addEventListener('pointerup', onPointerUp);

    // 8. Resize Handler
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop with Lerp Smoothing
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Desired rotation = stage target + cursor parallax tilt + user manual drag
      const desiredX =
        targetRotationRef.current.x + mouseRef.current.y + userRotationRef.current.x;
      const desiredY =
        targetRotationRef.current.y + mouseRef.current.x + userRotationRef.current.y;
      const desiredZ = targetRotationRef.current.z;

      // Smooth interpolation
      cubeGroup.rotation.x = THREE.MathUtils.lerp(cubeGroup.rotation.x, desiredX, 0.08);
      cubeGroup.rotation.y = THREE.MathUtils.lerp(cubeGroup.rotation.y, desiredY, 0.08);
      cubeGroup.rotation.z = THREE.MathUtils.lerp(cubeGroup.rotation.z, desiredZ, 0.08);

      // Gentle floating levitation
      cubeGroup.position.y = Math.sin(elapsed * 1.5) * 0.15;

      // Subtle pulse on outer cage lines
      cageLines.rotation.y = -elapsed * 0.1;
      cageLines.rotation.x = Math.sin(elapsed * 0.5) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      dom.removeEventListener('pointerdown', onPointerDown);
      dom.removeEventListener('pointermove', onPointerMove);
      dom.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      geometry.dispose();
      edges.dispose();
      edgeMat.dispose();
      cageGeo.dispose();
      cageEdges.dispose();
      cageMat.dispose();
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative cursor-grab active:cursor-grabbing select-none ${className}`}
      title="Putar kubus 3D untuk melihat seluruh sisi lanskap"
    />
  );
};
