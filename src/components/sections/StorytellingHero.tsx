import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Sparkles, Compass, Shield, Train } from 'lucide-react';
import { siteContent } from '../../data/site_content';
import { StoryCube3D } from '../canvas/StoryCube3D';

gsap.registerPlugin(ScrollTrigger);

export const StorytellingHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState<number>(1);
  const counterRef = useRef<HTMLSpanElement>(null);

  const stage1TextRef = useRef<HTMLDivElement>(null);
  const stage2TextRef = useRef<HTMLDivElement>(null);
  const stage3TextRef = useRef<HTMLDivElement>(null);
  const stage4TextRef = useRef<HTMLDivElement>(null);
  const cubeWrapperRef = useRef<HTMLDivElement>(null);

  const { hero } = siteContent;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=350%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const stage = Math.min(4, Math.floor(self.progress * 4) + 1);
            setActiveStage(stage);
            if (counterRef.current) {
              counterRef.current.innerText = `0${stage} / 04`;
            }
          },
        },
      });

      // STAGE 1 -> STAGE 2
      // Text 1 fades out, Cube glides to the Left, Text 2 fades in on the Right
      tl.to(stage1TextRef.current, { opacity: 0, x: -60, duration: 1 })
        .to(cubeWrapperRef.current, { x: '-45vw', duration: 1.2, ease: 'power2.inOut' }, '<')
        .fromTo(stage2TextRef.current, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 1 }, '<0.4');

      // STAGE 2 -> STAGE 3
      // Text 2 fades out, Cube glides back to the Right, Text 3 fades in on the Left
      tl.to(stage2TextRef.current, { opacity: 0, x: 60, duration: 1 })
        .to(cubeWrapperRef.current, { x: '0vw', duration: 1.2, ease: 'power2.inOut' }, '<')
        .fromTo(stage3TextRef.current, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 1 }, '<0.4');

      // STAGE 3 -> STAGE 4
      // Text 3 fades out, Cube glides to the Left, Text 4 fades in on the Right
      tl.to(stage3TextRef.current, { opacity: 0, x: -60, duration: 1 })
        .to(cubeWrapperRef.current, { x: '-45vw', duration: 1.2, ease: 'power2.inOut' }, '<')
        .fromTo(stage4TextRef.current, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 1 }, '<0.4');
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-marawa-itam text-white flex items-center"
    >
      {/* Background Subtle Gradient & Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-marawa-sirah/10 via-marawa-itam to-marawa-itam pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

      {/* Floating 3D Story Cube Canvas (Glides dynamically Left & Right across stages) */}
      <div
        ref={cubeWrapperRef}
        className="absolute right-4 sm:right-12 md:right-20 w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] lg:w-[480px] lg:h-[480px] z-20 will-change-transform flex items-center justify-center"
      >
        <StoryCube3D
          stage={activeStage}
          className="w-full h-full drop-shadow-[0_0_35px_rgba(245,158,11,0.25)]"
        />
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[9px] font-tech-mono uppercase tracking-widest text-marawa-emas pointer-events-none backdrop-blur-md">
          ✦ KUBUS 3D: GESER KURSOR / DRAG 360° ✦
        </div>
      </div>

      {/* Content Container (Split Grid Area) */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-12 h-full flex items-center">
        {/* STAGE 1: Opening Landscape (Left Text Column) */}
        <div
          ref={stage1TextRef}
          className="max-w-xl flex flex-col justify-center pointer-events-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-marawa-sirah/20 border border-marawa-sirah/40 text-marawa-emas font-tech-mono text-xs uppercase tracking-widest mb-6 w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KOTA DINGIN BERSEJARAH // 01</span>
          </div>
          <h1 className="font-editorial text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tighter leading-none mb-6 text-white drop-shadow-2xl">
            {hero.headline}
          </h1>
          <p className="font-tech-mono text-xs sm:text-sm uppercase tracking-wider text-kabut-300 leading-relaxed mb-8 max-w-lg">
            Terletak di lembah subur yang dipeluk erat oleh Gunung Singgalang, Marapi, dan Tandikat.
          </p>
          <div className="flex items-center gap-4 text-xs font-tech-mono text-kabut-400">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
              <Compass className="w-3.5 h-3.5 text-marawa-emas" />
              <span>SISI DEPAN: PANORAMA GUNUNG</span>
            </div>
          </div>
        </div>

        {/* STAGE 2: PDIKM & Sejarah Lembah (Right Text Column, Cube is on Left) */}
        <div
          ref={stage2TextRef}
          className="absolute right-6 sm:right-12 md:right-20 max-w-xl flex flex-col justify-center opacity-0 pointer-events-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-marawa-emas/20 border border-marawa-emas/40 text-marawa-emas font-tech-mono text-xs uppercase tracking-widest mb-6 w-fit">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FILOSOFI KOTA LEMBAH // 02</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl uppercase tracking-tight leading-tight mb-6 text-white">
            Kala Sejarah, Dinginnya Kabut, & Marwah Berpadu
          </h2>
          <p className="font-tech-mono text-xs sm:text-sm uppercase tracking-wider text-kabut-300 leading-relaxed mb-8 max-w-lg">
            {hero.description}
          </p>
          <div className="flex items-center gap-2 text-xs font-tech-mono text-sejuk-400">
            <span className="w-2 h-2 rounded-full bg-sejuk-400 animate-ping" />
            <span>SISI SAMPING: RUMAH GADANG PDIKM</span>
          </div>
        </div>

        {/* STAGE 3: Adat Basandi Syarak (Left Text Column, Cube is on Right) */}
        <div
          ref={stage3TextRef}
          className="max-w-xl flex flex-col justify-center opacity-0 pointer-events-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sejuk-600/20 border border-sejuk-600/40 text-sejuk-400 font-tech-mono text-xs uppercase tracking-widest mb-6 w-fit">
            <Shield className="w-3.5 h-3.5" />
            <span>LANDASAN MORAL MINANG // 03</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl uppercase tracking-tight leading-tight mb-6 text-white">
            Adat Basandi Syarak, Syarak Basandi Kitabullah
          </h2>
          <p className="font-tech-mono text-xs sm:text-sm uppercase tracking-wider text-kabut-300 leading-relaxed mb-6 max-w-lg">
            Motto Resmi Kota: <span className="text-marawa-emas font-bold">"Bermarwah dan Bermartabat"</span> — Menjaga marwah peradaban Islam di bumi Minangkabau.
          </p>
          <div className="flex items-center gap-2 text-xs font-tech-mono text-marawa-emas">
            <span>SISI ATAS: GERBANG PERBATASAN KOTA</span>
          </div>
        </div>

        {/* STAGE 4: Jembatan Kembar & Simpul Perlintasan (Right Text Column, Cube is on Left) */}
        <div
          ref={stage4TextRef}
          className="absolute right-6 sm:right-12 md:right-20 max-w-xl flex flex-col justify-center opacity-0 pointer-events-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-marawa-sirah/20 border border-marawa-sirah/40 text-marawa-sirah font-tech-mono text-xs uppercase tracking-widest mb-6 w-fit">
            <Train className="w-3.5 h-3.5" />
            <span>SIMPUL PERLINTASAN // 04</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl uppercase tracking-tight leading-tight mb-6 text-white">
            Pintu Gerbang Antara Darek dan Rantau
          </h2>
          <p className="font-tech-mono text-xs sm:text-sm uppercase tracking-wider text-kabut-300 leading-relaxed mb-8 max-w-lg">
            Simpul emas yang menghubungkan lembah pedalaman dan pesisir barat sejak berabad-abad lampau.
          </p>
          <div className="flex items-center gap-2 text-xs font-tech-mono text-marawa-sirah">
            <span>SISI BELAKANG: JEMBATAN KEMBAR SILAING</span>
          </div>
        </div>
      </div>

      {/* Stage Indicator HUD & Scroll Hint at Bottom */}
      <div className="absolute left-6 sm:left-12 bottom-8 z-30 flex items-center gap-4 pointer-events-none">
        <span
          ref={counterRef}
          className="font-tech-mono text-xs sm:text-sm tracking-widest text-marawa-emas bg-black/50 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md"
        >
          01 / 04
        </span>
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-tech-mono uppercase tracking-wider text-kabut-400">
          <span>GULIR UNTUK MEMUTAR KISAH 3D</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>
    </div>
  );
};
