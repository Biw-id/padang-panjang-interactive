import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CulinarySteam3DProps {
  className?: string;
}

export const CulinarySteam3D: React.FC<CulinarySteam3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 320;
    const height = mount.clientHeight || 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 7.5);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    // 1. Revolving Culinary Pedestal Plate
    const pedestalGroup = new THREE.Group();

    // Plate disc
    const plateGeo = new THREE.CylinderGeometry(2.2, 1.8, 0.25, 48);
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x18191E,
      metalness: 0.8,
      roughness: 0.2,
    });
    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    pedestalGroup.add(plateMesh);

    // Glowing Marawa Gold Rim
    const rimGeo = new THREE.TorusGeometry(2.2, 0.06, 16, 48);
    const rimMat = new THREE.MeshBasicMaterial({
      color: 0xF59E0B, // Gold rim
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 0.12;
    pedestalGroup.add(rimMesh);

    // Center warm glow embers
    const emberGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.05, 32);
    const emberMat = new THREE.MeshBasicMaterial({
      color: 0xDC2626, // Crimson glow
      transparent: true,
      opacity: 0.4,
    });
    const emberMesh = new THREE.Mesh(emberGeo, emberMat);
    emberMesh.position.y = 0.14;
    pedestalGroup.add(emberMesh);

    scene.add(pedestalGroup);

    // 2. Rising Hot Steam Particle Simulation
    const particleCount = 180;
    const steamGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const lifetimes = new Float32Array(particleCount);

    const resetParticle = (i: number) => {
      const radius = Math.random() * 1.1;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = 0.2 + Math.random() * 0.2;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = 0.015 + Math.random() * 0.02; // Upward drift
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
      lifetimes[i] = Math.random();
    };

    for (let i = 0; i < particleCount; i++) {
      resetParticle(i);
      positions[i * 3 + 1] = Math.random() * 3.5; // Distribute vertically initially
    }

    steamGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const steamMat = new THREE.PointsMaterial({
      size: 0.28,
      color: 0xF8FAFC,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const steamParticles = new THREE.Points(steamGeo, steamMat);
    scene.add(steamParticles);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xF59E0B, 3, 10);
    goldLight.position.set(0, 1.5, 0);
    scene.add(goldLight);

    // 4. Render Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Rotate pedestal slowly
      pedestalGroup.rotation.y += 0.008;

      // Animate rising steam particles
      const posArray = steamGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += velocities[i * 3] + Math.sin(Date.now() * 0.002 + i) * 0.003;
        posArray[i * 3 + 1] += velocities[i * 3 + 1];
        posArray[i * 3 + 2] += velocities[i * 3 + 2];

        lifetimes[i] += 0.008;
        if (posArray[i * 3 + 1] > 3.8 || lifetimes[i] > 1.0) {
          resetParticle(i);
        }
      }
      steamGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      plateGeo.dispose();
      plateMat.dispose();
      rimGeo.dispose();
      rimMat.dispose();
      emberGeo.dispose();
      emberMat.dispose();
      steamGeo.dispose();
      steamMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative select-none pointer-events-none ${className}`}
      title="Simulasi 3D uap panas hidangan khas Padang Panjang"
    />
  );
};
