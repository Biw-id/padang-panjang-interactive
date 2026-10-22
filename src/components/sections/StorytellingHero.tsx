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

    // Desktop travel distance (lg: >= 1024px)
    // On mobile (< 1024px): returns 0 (balok stays permanently centered at bottom)
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
      // On desktop: Kisah 1 & 3: Balok di KANAN (x: 0); Kisah 2 & 4: Balok di KIRI (x: deltaX)
      // On mobile: deltaX is 0, balok stays centered at bottom
      const targetX = newStage === 2 || newStage === 4 ? deltaX : 0;

      // 1. Smooth glide transition of the 3D Balok
      gsap.to(cubeWrapper, {
        x: targetX,
        duration: 0.85,
        ease: 'power2.inOut',
        overwrite: 'auto',
      });

      // 2. Crossfade text panels
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
              y: newStage > prevStage ? 18 : -18,
              pointerEvents: 'none',
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              delay: 0.12,
              ease: 'power2.out',
              pointerEvents: 'auto',
              overwrite: 'auto',
            }
          );
        } else if (panelStage === prevStage) {
          gsap.to(panel, {
            opacity: 0,
            y: newStage > prevStage ? -18 : 18,
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

    // Handle responsive window resize
    const handleResize = () => {
      const deltaX = getDeltaX();
      const current = currentStageRef.current;
      const targetX = current === 2 || current === 4 ? deltaX : 0;
      gsap.set(cubeWrapper, { x: targetX });
    };
    window.addEventListener('resize', handleResize);

    const ctx = gsap.context(() => {
      // PINNED SCROLL WITH DISCRETE SNAP THRESHOLDS (NO SCRUB)
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=320%',
        pin: true,
        anticipatePin: 1,
        snap: {
          snapTo: [0, 0.333, 0.666, 1.0],
          duration: { min: 0.35, max: 0.65 },
          delay: 0.05,
          ease: 'power2.inOut',
        },
        onUpdate: (self) => {
          const p = self.progress;
          let target = 1;

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

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-transparent text-white flex items-center justify-center select-none"
    >
      {/* Background Subtle Translucent Gradient & Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-marawa-sirah/10 via-transparent to-black/20 pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-12 h-full flex items-center justify-center">
        <div ref={trackRef} className="relative w-full h-[600px] lg:h-[640px] flex items-center justify-center">
          
          {/* ========================================================= */}
          {/* STAGE 1 TEXT */}
          {/* Mobile: Top, Centered */}
          {/* Desktop: Left Column (lg:left-0, lg:text-left) */}
          {/* ========================================================= */}
          <div
            ref={stage1TextRef}
            className="absolute top-14 sm:top-18 lg:top-0 lg:bottom-0 lg:my-auto left-0 right-0 lg:right-auto mx-auto lg:mx-0 w-full max-w-md lg:max-w-none lg:w-[46%] h-fit flex flex-col items-center lg:items-start text-center lg:text-left z-10 pointer-events-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-marawa-sirah/20 border border-marawa-sirah/40 text-marawa-emas font-tech-mono text-[10px] sm:text-xs uppercase tracking-widest mb-3 sm:mb-5 w-fit mx-auto lg:mx-0">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>KOTA DINGIN BERSEJARAH // 01</span>
            </div>
            <h1 className="font-editorial text-2xl sm:text-3xl lg:text-5xl xl:text-6xl uppercase tracking-tighter leading-tight sm:leading-none mb-3 sm:mb-5 text-white drop-shadow-2xl">
              {hero.headline}
            </h1>
            <p className="font-tech-mono text-[11px] sm:text-sm uppercase tracking-wider text-kabut-300 leading-relaxed mb-4 sm:mb-6 max-w-sm lg:max-w-lg line-clamp-3 sm:line-clamp-none">
              Terletak di lembah subur nan sejuk pada ketinggian 650–850 mdpl, dipeluk erat oleh Gunung Singgalang, Marapi, dan Tandikat.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-[10px] sm:text-xs font-tech-mono text-kabut-400">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5">
                <Compass className="w-3 h-3 text-marawa-emas" />
                <span>SUHU 17°C–24°C</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-marawa-emas/10 border border-marawa-emas/20 text-marawa-emas">
                <span>PANORAMA TIGA GUNUNG</span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* STAGE 2 TEXT */}
          {/* Mobile: Top, Centered */}
          {/* Desktop: Right Column (lg:right-0, lg:text-left) */}
          {/* ========================================================= */}
          <div
            ref={stage2TextRef}
            className="absolute top-14 sm:top-18 lg:top-0 lg:bottom-0 lg:my-auto left-0 right-0 lg:left-auto mx-auto lg:mx-0 w-full max-w-md lg:max-w-none lg:w-[46%] h-fit flex flex-col items-center lg:items-start text-center lg:text-left z-10 opacity-0 pointer-events-none"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-marawa-emas/20 border border-marawa-emas/40 text-marawa-emas font-tech-mono text-[10px] sm:text-xs uppercase tracking-widest mb-3 sm:mb-5 w-fit mx-auto lg:mx-0">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>FILOSOFI & BUDAYA // 02</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-5xl xl:text-6xl uppercase tracking-tight leading-tight mb-3 sm:mb-5 text-white">
              Kala Sejarah, Dinginnya Kabut, & Marwah Berpadu
            </h2>
            <p className="font-tech-mono text-[11px] sm:text-sm uppercase tracking-wider text-kabut-300 leading-relaxed mb-4 sm:mb-6 max-w-sm lg:max-w-lg line-clamp-3 sm:line-clamp-none">
              {hero.description}
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-[10px] sm:text-xs font-tech-mono">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-kabut-400">
                <span className="w-2 h-2 rounded-full bg-marawa-emas animate-ping" />
                <span>ARSIP PERADABAN MINANG</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-marawa-emas/10 border border-marawa-emas/20 text-marawa-emas">
                <span>RUMAH GADANG PDIKM</span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* STAGE 3 TEXT */}
          {/* Mobile: Top, Centered */}
          {/* Desktop: Left Column (lg:left-0, lg:text-left) */}
          {/* ========================================================= */}
          <div
            ref={stage3TextRef}
            className="absolute top-14 sm:top-18 lg:top-0 lg:bottom-0 lg:my-auto left-0 right-0 lg:right-auto mx-auto lg:mx-0 w-full max-w-md lg:max-w-none lg:w-[46%] h-fit flex flex-col items-center lg:items-start text-center lg:text-left z-10 opacity-0 pointer-events-none"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sejuk-600/20 border border-sejuk-600/40 text-sejuk-400 font-tech-mono text-[10px] sm:text-xs uppercase tracking-widest mb-3 sm:mb-5 w-fit mx-auto lg:mx-0">
              <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>LANDASAN MORAL // 03</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-5xl xl:text-6xl uppercase tracking-tight leading-tight mb-3 sm:mb-5 text-white">
              Adat Basandi Syarak, Syarak Basandi Kitabullah
            </h2>
            <p className="font-tech-mono text-[11px] sm:text-sm uppercase tracking-wider text-kabut-300 leading-relaxed mb-4 sm:mb-6 max-w-sm lg:max-w-lg line-clamp-3 sm:line-clamp-none">
              Motto Resmi Kota: <span className="text-marawa-emas font-bold">"Bermarwah dan Bermartabat"</span> — Menjaga marwah peradaban Islam di bumi Minangkabau.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-[10px] sm:text-xs font-tech-mono">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-kabut-400">
                <BookOpen className="w-3 h-3 text-sejuk-400" />
                <span>SERAMBI MEKAH</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sejuk-400/10 border border-sejuk-400/20 text-sejuk-400">
                <span>GERBANG KOTA BERMARWAH</span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* STAGE 4 TEXT */}
          {/* Mobile: Top, Centered */}
          {/* Desktop: Right Column (lg:right-0, lg:text-left) */}
          {/* ========================================================= */}
          <div
            ref={stage4TextRef}
            className="absolute top-14 sm:top-18 lg:top-0 lg:bottom-0 lg:my-auto left-0 right-0 lg:left-auto mx-auto lg:mx-0 w-full max-w-md lg:max-w-none lg:w-[46%] h-fit flex flex-col items-center lg:items-start text-center lg:text-left z-10 opacity-0 pointer-events-none"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-marawa-sirah/20 border border-marawa-sirah/40 text-marawa-sirah font-tech-mono text-[10px] sm:text-xs uppercase tracking-widest mb-3 sm:mb-5 w-fit mx-auto lg:mx-0">
              <Train className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>SIMPUL PERLINTASAN // 04</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-5xl xl:text-6xl uppercase tracking-tight leading-tight mb-3 sm:mb-5 text-white">
              Pintu Gerbang Antara Darek dan Rantau
            </h2>
            <p className="font-tech-mono text-[11px] sm:text-sm uppercase tracking-wider text-kabut-300 leading-relaxed mb-4 sm:mb-6 max-w-sm lg:max-w-lg line-clamp-3 sm:line-clamp-none">
              Simpul vital penghubung pedalaman dan pesisir sejak berabad lampau, diapit jalur rel kereta api bergigi warisan dunia UNESCO.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-[10px] sm:text-xs font-tech-mono">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-kabut-400">
                <span className="w-2 h-2 rounded-full bg-marawa-sirah animate-pulse" />
                <span>JALUR REL BERGIGI UNESCO</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-marawa-sirah/10 border border-marawa-sirah/20 text-marawa-sirah">
                <span>JEMBATAN KEMBAR SILAING</span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 3D BALOK CONTAINER */}
          {/* Mobile: ALWAYS at BOTTOM (bottom-16 sm:bottom-20), centered (left-0 right-0 mx-auto) */}
          {/* Desktop: Vertically centered (lg:top-0 lg:bottom-0 lg:my-auto), starts at RIGHT (lg:right-0 lg:left-auto lg:mx-0) */}
          {/* ========================================================= */}
          <div
            ref={cubeWrapperRef}
            className="absolute bottom-16 sm:bottom-20 lg:bottom-0 lg:top-0 lg:my-auto left-0 right-0 lg:left-auto lg:right-0 mx-auto lg:mx-0 w-[300px] h-[190px] sm:w-[420px] sm:h-[265px] lg:w-[620px] lg:h-[390px] xl:w-[680px] xl:h-[425px] z-20 will-change-transform flex items-center justify-center pointer-events-none"
          >
            <StoryCube3D
              stage={activeStage}
              className="w-full h-full drop-shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
            />
          </div>

        </div>
      </div>

      {/* Stage Indicator HUD & Scroll Hint at Bottom */}
      <div className="absolute left-4 sm:left-12 bottom-4 sm:bottom-8 z-30 flex items-center gap-3 sm:gap-4 pointer-events-none">
        <span
          ref={counterRef}
          className="font-tech-mono text-[11px] sm:text-sm tracking-widest text-marawa-emas bg-black/70 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/10 backdrop-blur-md"
        >
          01 / 04
        </span>
        <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-tech-mono uppercase tracking-wider text-kabut-400">
          <span>GULIR SAMPAI MENTOK UNTUK SNAP</span>
          <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-bounce" />
        </div>
      </div>
    </div>
  );
};
