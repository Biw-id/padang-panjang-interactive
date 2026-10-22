import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Sparkles, Compass, Shield, Train, BookOpen } from 'lucide-react';
import { siteContent } from '../../data/site_content';
import { StoryCube3D } from '../canvas/StoryCube3D';

gsap.registerPlugin(ScrollTrigger);

export const StorytellingHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cubeWrapperRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const stage1TextRef = useRef<HTMLDivElement>(null);
  const stage2TextRef = useRef<HTMLDivElement>(null);
  const stage3TextRef = useRef<HTMLDivElement>(null);
  const stage4TextRef = useRef<HTMLDivElement>(null);

  const [activeStage, setActiveStage] = useState<number>(1);
  const currentStageRef = useRef<number>(1);
  const { hero } = siteContent;

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const cubeWrapper = cubeWrapperRef.current;
    if (!container || !track || !cubeWrapper) return;

    // Responsive horizontal travel distance between Right and Left slots
    const getDeltaX = () => {
      if (window.innerWidth < 1024) return 0;
      return -(track.clientWidth - cubeWrapper.clientWidth);
    };

    // Discrete transition function (animates independently of scroll ticks)
    const goToStage = (newStage: number) => {
      if (newStage === currentStageRef.current) return;
      const prevStage = currentStageRef.current;
      currentStageRef.current = newStage;
      setActiveStage(newStage);

      if (counterRef.current) {
        counterRef.current.innerText = `0${newStage} / 04`;
      }

      const deltaX = getDeltaX();
      // Kisah 1 & 3: Balok di KANAN (x: 0)
      // Kisah 2 & 4: Balok di KIRI (x: deltaX)
      const targetX = newStage === 2 || newStage === 4 ? deltaX : 0;

      // 1. Smooth glide transition of the 3D Balok (fixed duration, NOT dragged by scroll)
      gsap.to(cubeWrapper, {
        x: targetX,
        duration: 0.85,
        ease: 'power2.inOut',
        overwrite: 'auto',
      });

      // 2. Crossfade & slide text panels
      const textPanels = [
        stage1TextRef.current,
        stage2TextRef.current,
        stage3TextRef.current,
        stage4TextRef.current,
      ];

      textPanels.forEach((panel, idx) => {
        if (!panel) return;
        const panelStage = idx + 1;
        if (panelStage === newStage) {
          gsap.fromTo(
            panel,
            {
              opacity: 0,
              y: newStage > prevStage ? 28 : -28,
              pointerEvents: 'none',
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              delay: 0.15,
              ease: 'power2.out',
              pointerEvents: 'auto',
              overwrite: 'auto',
            }
          );
        } else if (panelStage === prevStage) {
          gsap.to(panel, {
            opacity: 0,
            y: newStage > prevStage ? -24 : 24,
            duration: 0.45,
            ease: 'power2.in',
            pointerEvents: 'none',
            overwrite: 'auto',
          });
        } else {
          gsap.set(panel, { opacity: 0, pointerEvents: 'none' });
        }
      });
    };

    const ctx = gsap.context(() => {
      // PINNED SCROLL WITH DISCRETE SNAP THRESHOLDS (NO SCRUB)
      // Transisi antar stage tidak mengikuti gerakan scroll, melainkan snap pas udah mentok threshold
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=320%',
        pin: true,
        anticipatePin: 1,
        // Snap directly to the 4 discrete stage plateaus
        snap: {
          snapTo: [0, 0.333, 0.666, 1.0],
          duration: { min: 0.35, max: 0.65 },
          delay: 0.05,
          ease: 'power2.inOut',
        },
        onUpdate: (self) => {
          const p = self.progress;
          let target = 1;

          // Thresholds: Only switch stage once user scrolls past the threshold ('mentok')
          if (p < 0.18) {
            target = 1;
          } else if (p < 0.50) {
            target = 2;
          } else if (p < 0.82) {
            target = 3;
          } else {
            target = 4;
          }

          if (target !== currentStageRef.current) {
            goToStage(target);
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-marawa-itam text-white flex items-center justify-center select-none"
    >
      {/* Background Subtle Gradient & Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-marawa-sirah/10 via-marawa-itam to-marawa-itam pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-12 h-full flex items-center">
        <div ref={trackRef} className="relative w-full h-[580px] lg:h-[640px] flex items-center">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN TEXT SLOT (Stage 1 & Stage 3) */}
          {/* ========================================================= */}
          <div className="absolute left-0 inset-y-0 w-full lg:w-[46%] flex items-center">
            {/* STAGE 1: Opening Landscape (Left Text Column) */}
            <div
              ref={stage1TextRef}
              className="absolute inset-x-0 flex flex-col justify-center pointer-events-auto"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-marawa-sirah/20 border border-marawa-sirah/40 text-marawa-emas font-tech-mono text-xs uppercase tracking-widest mb-6 w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                <span>KOTA DINGIN BERSEJARAH // 01</span>
              </div>
              <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tighter leading-none mb-6 text-white drop-shadow-2xl">
                {hero.headline}
              </h1>
              <p className="font-tech-mono text-xs sm:text-sm uppercase tracking-wider text-kabut-300 leading-relaxed mb-6 max-w-lg">
                Terletak di lembah subur nan sejuk pada ketinggian 650–850 mdpl, dipeluk erat oleh Gunung Singgalang, Marapi, dan Tandikat.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs font-tech-mono text-kabut-400">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
                  <Compass className="w-3.5 h-3.5 text-marawa-emas" />
                  <span>SUHU 17°C–24°C • TIGA GUNUNG</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-marawa-emas/10 border border-marawa-emas/20 text-marawa-emas">
                  <span>BALOK 3D TEPI TUMPUL: PANORAMA GUNUNG</span>
                </div>
              </div>
            </div>

            {/* STAGE 3: Adat Basandi Syarak (Left Text Column, Cube is on Right) */}
            <div
              ref={stage3TextRef}
              className="absolute inset-x-0 flex flex-col justify-center opacity-0 pointer-events-none"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sejuk-600/20 border border-sejuk-600/40 text-sejuk-400 font-tech-mono text-xs uppercase tracking-widest mb-6 w-fit">
                <Shield className="w-3.5 h-3.5" />
                <span>LANDASAN MORAL & SERAMBI MEKAH // 03</span>
              </div>
              <h2 className="font-editorial text-4xl sm:text-6xl uppercase tracking-tight leading-tight mb-6 text-white">
                Adat Basandi Syarak, Syarak Basandi Kitabullah
              </h2>
              <p className="font-tech-mono text-xs sm:text-sm uppercase tracking-wider text-kabut-300 leading-relaxed mb-6 max-w-lg">
                Motto Resmi Kota: <span className="text-marawa-emas font-bold">"Bermarwah dan Bermartabat"</span> — Menjadi pusat pendidikan Islam tertua dengan lahirnya perguruan Sumatera Thawalib dan Diniyyah Puteri.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs font-tech-mono">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-kabut-400">
                  <BookOpen className="w-3.5 h-3.5 text-sejuk-400" />
                  <span>SERAMBI MEKAH MINANGKABAU</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sejuk-400/10 border border-sejuk-400/20 text-sejuk-400">
                  <span>BALOK 3D TEPI TUMPUL: GERBANG KOTA</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN TEXT SLOT (Stage 2 & Stage 4) */}
          {/* ========================================================= */}
          <div className="absolute right-0 inset-y-0 w-full lg:w-[46%] flex items-center">
            {/* STAGE 2: PDIKM & Sejarah Lembah (Right Text Column, Cube is on Left) */}
            <div
              ref={stage2TextRef}
              className="absolute inset-x-0 flex flex-col justify-center opacity-0 pointer-events-none"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-marawa-emas/20 border border-marawa-emas/40 text-marawa-emas font-tech-mono text-xs uppercase tracking-widest mb-6 w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                <span>FILOSOFI & DOKUMENTASI BUDAYA // 02</span>
              </div>
              <h2 className="font-editorial text-4xl sm:text-6xl uppercase tracking-tight leading-tight mb-6 text-white">
                Kala Sejarah, Dinginnya Kabut, & Marwah Berpadu
              </h2>
              <p className="font-tech-mono text-xs sm:text-sm uppercase tracking-wider text-kabut-300 leading-relaxed mb-6 max-w-lg">
                {hero.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs font-tech-mono">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-kabut-400">
                  <span className="w-2 h-2 rounded-full bg-marawa-emas animate-ping" />
                  <span>ARSIP PERADABAN MINANG</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-marawa-emas/10 border border-marawa-emas/20 text-marawa-emas">
                  <span>BALOK 3D TEPI TUMPUL: RUMAH GADANG PDIKM</span>
                </div>
              </div>
            </div>

            {/* STAGE 4: Jembatan Kembar & Simpul Perlintasan (Right Text Column, Cube is on Left) */}
            <div
              ref={stage4TextRef}
              className="absolute inset-x-0 flex flex-col justify-center opacity-0 pointer-events-none"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-marawa-sirah/20 border border-marawa-sirah/40 text-marawa-sirah font-tech-mono text-xs uppercase tracking-widest mb-6 w-fit">
                <Train className="w-3.5 h-3.5" />
                <span>SIMPUL PERLINTASAN & WARISAN DUNIA // 04</span>
              </div>
              <h2 className="font-editorial text-4xl sm:text-6xl uppercase tracking-tight leading-tight mb-6 text-white">
                Pintu Gerbang Antara Darek dan Rantau
              </h2>
              <p className="font-tech-mono text-xs sm:text-sm uppercase tracking-wider text-kabut-300 leading-relaxed mb-6 max-w-lg">
                Simpul vital yang menghubungkan pedalaman dan pesisir sejak berabad lampau, diapit jalur rel kereta api bergigi legendaris warisan dunia UNESCO.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs font-tech-mono">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-kabut-400">
                  <span className="w-2 h-2 rounded-full bg-marawa-sirah animate-pulse" />
                  <span>JALUR REL BERGIGI UNESCO</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-marawa-sirah/10 border border-marawa-sirah/20 text-marawa-sirah">
                  <span>BALOK 3D TEPI TUMPUL: JEMBATAN KEMBAR SILAING</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 3D BALOK CONTAINER (UKURAN DIPERBESAR & TEPI TUMPUL) */}
          {/* Alternates strictly: Stage 1 Right -> Stage 2 Left -> Stage 3 Right -> Stage 4 Left */}
          {/* ========================================================= */}
          <div
            ref={cubeWrapperRef}
            className="absolute top-1/2 -translate-y-1/2 right-0 w-[350px] h-[225px] sm:w-[500px] sm:h-[315px] lg:w-[640px] lg:h-[400px] xl:w-[700px] xl:h-[440px] z-20 will-change-transform flex items-center justify-center pointer-events-none"
          >
            <StoryCube3D
              stage={activeStage}
              className="w-full h-full drop-shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
            />
          </div>

        </div>
      </div>

      {/* Stage Indicator HUD & Scroll Hint at Bottom */}
      <div className="absolute left-6 sm:left-12 bottom-8 z-30 flex items-center gap-4 pointer-events-none">
        <span
          ref={counterRef}
          className="font-tech-mono text-xs sm:text-sm tracking-widest text-marawa-emas bg-black/60 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md"
        >
          01 / 04
        </span>
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-tech-mono uppercase tracking-wider text-kabut-400">
          <span>SCROLL SAMPAI MENTOK UNTUK SNAP KISAH BERIKUTNYA</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>
    </div>
  );
};
