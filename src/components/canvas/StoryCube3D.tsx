import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import gsap from 'gsap';

interface StoryCube3DProps {
  stage: number; // 1, 2, 3, 4
  className?: string;
}

export const StoryCube3D: React.FC<StoryCube3DProps> = ({ stage, className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const spinYRef = useRef({ val: 0 });
  const frontMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const texturesRef = useRef<THREE.Texture[]>([]);
  const currentStageRef = useRef(stage);

  // When stage changes: Spin 360 degrees and swap front image halfway through the spin
  useEffect(() => {
    if (stage === currentStageRef.current) return;
    const prev = currentStageRef.current;
    currentStageRef.current = stage;

    const direction = stage > prev ? 1 : -1;
    const startVal = spinYRef.current.val;
    const targetVal = startVal + Math.PI * 2 * direction;

    let swapped = false;
    gsap.killTweensOf(spinYRef.current);
    gsap.to(spinYRef.current, {
      val: targetVal,
      duration: 1.15,
      ease: 'power2.inOut',
      onUpdate: () => {
        // Swap texture at halfway (180 deg) when front face is turned away from camera
        const progress = Math.abs((spinYRef.current.val - startVal) / (targetVal - startVal));
        if (!swapped && progress >= 0.5) {
          if (frontMatRef.current && texturesRef.current[stage - 1]) {
            frontMatRef.current.map = texturesRef.current[stage - 1];
            frontMatRef.current.needsUpdate = true;
          }
          swapped = true;
        }
      },
      onComplete: () => {
        // Guarantee correct texture assignment upon completion
        if (frontMatRef.current && texturesRef.current[stage - 1]) {
          frontMatRef.current.map = texturesRef.current[stage - 1];
          frontMatRef.current.needsUpdate = true;
        }
      },
    });
  }, [stage]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 650;
    const height = mount.clientHeight || 410;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    // 2. Preload 4 Story Landscape Images
    const loader = new THREE.TextureLoader();
    const urls = [
      '/media_webp/01_hero_landscape/hero_singgalang_tandikat_panorama.webp',
      '/media_webp/01_hero_landscape/hero_pdikm_lanskap_hutan.webp',
      '/media_webp/01_hero_landscape/hero_gerbang_perbatasan_padang_panjang.webp',
      '/media_webp/01_hero_landscape/hero_jembatan_kembar_padang_panjang.webp',
    ];

    texturesRef.current = urls.map((url) => {
      const tex = loader.load(url);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.generateMipmaps = true;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      return tex;
    });

    // 3. Materials:
    // HANYA BAGIAN DEPAN (+Z, index 4) yang ada gambarnya.
    // Sisa 5 sisi (Right, Left, Top, Bottom, Back) abu-abu solid matte.
    const greySideMaterial = new THREE.MeshStandardMaterial({
      color: 0x222630, // Solid matte slate graphite
      roughness: 0.6,
      metalness: 0.2,
    });

    const frontMaterial = new THREE.MeshStandardMaterial({
      map: texturesRef.current[stage - 1],
      roughness: 0.22,
      metalness: 0.05,
    });
    frontMatRef.current = frontMaterial;

    // Box faces order:
    // 0: +X (Right)
    // 1: -X (Left)
    // 2: +Y (Top)
    // 3: -Y (Bottom)
    // 4: +Z (Front) -> ONLY this face has the photo!
    // 5: -Z (Back)
    const materials = [
      greySideMaterial, // Right (abu-abu)
      greySideMaterial, // Left (abu-abu)
      greySideMaterial, // Top (abu-abu)
      greySideMaterial, // Bottom (abu-abu)
      frontMaterial,    // Front (GAMBAR LANSKAP KISAH)
      greySideMaterial, // Back (abu-abu)
    ];

    // 4. BALOK GEOMETRY DENGAN TEPI TUMPUL (RoundedBoxGeometry)
    // Dimensi diperbesar: lebar 6.0, tinggi 3.75, tebal 0.55
    // Radius tumpul: 0.16 dengan 6 bevel segments
    const balokGroup = new THREE.Group();
    const balokWidth = 6.0;
    const balokHeight = 3.75;
    const balokDepth = 0.55;
    const bevelRadius = 0.16;
    const bevelSegments = 6;

    const geometry = new RoundedBoxGeometry(
      balokWidth,
      balokHeight,
      balokDepth,
      bevelSegments,
      bevelRadius
    );
    const balokMesh = new THREE.Mesh(geometry, materials);
    balokGroup.add(balokMesh);

    // Subtle soft back shadow plate behind the balok
    const backShadowGeo = new THREE.PlaneGeometry(balokWidth * 1.05, balokHeight * 1.05);
    const backShadowMat = new THREE.MeshBasicMaterial({
      color: 0xDC2626, // Crimson glow aura
      transparent: true,
      opacity: 0.14,
    });
    const backShadow = new THREE.Mesh(backShadowGeo, backShadowMat);
    backShadow.position.z = -balokDepth / 2 - 0.06;
    balokGroup.add(backShadow);

    scene.add(balokGroup);

    // 5. Lighting Setup (Accentuates the rounded beveled edges)
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 2.4);
    keyLight.position.set(5, 6, 7);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xF59E0B, 1.6); // Marawa Gold rim
    rimLight.position.set(-6, -3, 4);
    scene.add(rimLight);

    const topBevelLight = new THREE.DirectionalLight(0xffffff, 1.2); // Highlights top rounded bevel
    topBevelLight.position.set(0, 6, 3);
    scene.add(topBevelLight);

    // 6. CURSOR TRACKING (HANYA MENGIKUTI CURSOR, TIDAK BISA DI-DRAG)
    const onMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      mouseRef.current.targetX = normX;
      mouseRef.current.targetY = normY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // 7. Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(mount);

    // 8. Render Loop with Smooth Physics
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth damped lerp towards cursor target
      mouseRef.current.x = THREE.MathUtils.lerp(
        mouseRef.current.x,
        mouseRef.current.targetX,
        0.05
      );
      mouseRef.current.y = THREE.MathUtils.lerp(
        mouseRef.current.y,
        mouseRef.current.targetY,
        0.05
      );

      // Balok bergerak dan miring mengikuti arah kursor:
      // - Rotasi Y miring mengikuti kursor X + putaran spin stage
      // - Rotasi X miring mengikuti kursor Y
      balokGroup.rotation.y = spinYRef.current.val + mouseRef.current.x * 0.35;
      balokGroup.rotation.x = -mouseRef.current.y * 0.28;
      balokGroup.rotation.z = mouseRef.current.x * 0.05;

      // Balok bergeser posisi halus mengikuti kursor (parallax displacement)
      balokGroup.position.x = mouseRef.current.x * 0.35;
      balokGroup.position.y = mouseRef.current.y * 0.25 + Math.sin(elapsed * 1.4) * 0.07;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animId);
      renderer.dispose();
      geometry.dispose();
      backShadowGeo.dispose();
      backShadowMat.dispose();
      greySideMaterial.dispose();
      frontMaterial.dispose();
      texturesRef.current.forEach((t) => t.dispose());
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative select-none pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};
