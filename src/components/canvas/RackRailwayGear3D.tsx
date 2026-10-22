import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface RackRailwayGear3DProps {
  className?: string;
}

export const RackRailwayGear3D: React.FC<RackRailwayGear3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const scrollSpeedRef = useRef(0.01);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 300;
    const height = mount.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    // 1. Mechanical Cogwheel Group
    const gearGroup = new THREE.Group();

    // Central Hub
    const hubGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.5, 32);
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x94A3B8, // Steel / Bronze
      metalness: 0.85,
      roughness: 0.25,
      wireframe: false,
    });
    const hubMesh = new THREE.Mesh(hubGeo, metalMat);
    hubMesh.rotation.x = Math.PI / 2;
    gearGroup.add(hubMesh);

    // Outer Rim
    const rimGeo = new THREE.TorusGeometry(2.0, 0.25, 16, 48);
    const rimMesh = new THREE.Mesh(rimGeo, metalMat);
    gearGroup.add(rimMesh);

    // 18 Gear Teeth (Roda Gigi Rel Gerigi 1887)
    const toothCount = 18;
    const toothGeo = new THREE.BoxGeometry(0.35, 0.5, 0.4);
    for (let i = 0; i < toothCount; i++) {
      const angle = (i / toothCount) * Math.PI * 2;
      const tooth = new THREE.Mesh(toothGeo, metalMat);
      tooth.position.set(Math.cos(angle) * 2.2, Math.sin(angle) * 2.2, 0);
      tooth.rotation.z = angle + Math.PI / 2;
      gearGroup.add(tooth);
    }

    // 6 Spokes
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const spokeGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.8, 12);
      const spoke = new THREE.Mesh(spokeGeo, metalMat);
      spoke.position.set(Math.cos(angle) * 1.0, Math.sin(angle) * 1.0, 0);
      spoke.rotation.z = angle + Math.PI / 2;
      gearGroup.add(spoke);
    }

    // Glowing Inner Ring (Marawa Gold accent)
    const glowRingGeo = new THREE.RingGeometry(1.4, 1.48, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xF59E0B,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const glowRing = new THREE.Mesh(glowRingGeo, glowMat);
    gearGroup.add(glowRing);

    scene.add(gearGroup);

    // 2. Dramatic Industrial Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xF59E0B, 2.0); // Warm gold rim light
    dirLight1.position.set(4, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38BDF8, 1.5); // Cool steel fill
    dirLight2.position.set(-4, -3, 3);
    scene.add(dirLight2);

    // 3. Scroll & Hover Listeners
    let lastScrollY = window.scrollY;
    const onScroll = () => {
      const delta = window.scrollY - lastScrollY;
      scrollSpeedRef.current = delta * 0.0025;
      lastScrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const dom = renderer.domElement;
    const onMouseEnter = () => { isHoveredRef.current = true; };
    const onMouseLeave = () => { isHoveredRef.current = false; };
    dom.addEventListener('mouseenter', onMouseEnter);
    dom.addEventListener('mouseleave', onMouseLeave);

    // 4. Resize
    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // 5. Render Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Rotate based on scroll delta + base rotation + hover boost
      const baseRotation = isHoveredRef.current ? 0.04 : 0.006;
      gearGroup.rotation.z += baseRotation + scrollSpeedRef.current;

      // Damp scroll speed decay
      scrollSpeedRef.current = THREE.MathUtils.lerp(scrollSpeedRef.current, 0, 0.08);

      // Subtle tilt towards camera
      gearGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.15;
      gearGroup.rotation.y = Math.cos(Date.now() * 0.001) * 0.2;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('scroll', onScroll);
      dom.removeEventListener('mouseenter', onMouseEnter);
      dom.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      hubGeo.dispose();
      metalMat.dispose();
      rimGeo.dispose();
      toothGeo.dispose();
      glowRingGeo.dispose();
      glowMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative cursor-pointer transition-transform hover:scale-105 ${className}`}
      title="Roda gigi baja rel bergerigi Lembah Anai 1887 (3D interaktif)"
    />
  );
};
