import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Sparkles } from 'lucide-react';
import { siteContent } from '../../data/site_content';

gsap.registerPlugin(ScrollTrigger);

export const StorytellingHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stage1Ref = useRef<HTMLDivElement>(null);
  const stage2Ref = useRef<HTMLDivElement>(null);
  const stage3Ref = useRef<HTMLDivElement>(null);
  const stage4Ref = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const { hero } = siteContent;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (counterRef.current) {
              const currentStage = Math.min(4, Math.floor(self.progress * 4) + 1);
              counterRef.current.innerText = `0${currentStage} / 04`;
            }
          },
        },
      });

      // Stage 1 is initial
      // Transition 1 -> 2
      tl.to(stage1Ref.current, { opacity: 0, scale: 0.95, duration: 1 })
        .fromTo(stage2Ref.current, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1 }, '<0.4');

      // Transition 2 -> 3
      tl.to(stage2Ref.current, { opacity: 0, scale: 0.95, duration: 1 })
        .fromTo(stage3Ref.current, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1 }, '<0.4');

      // Transition 3 -> 4
      tl.to(stage3Ref.current, { opacity: 0, scale: 0.95, duration: 1 })
        .fromTo(stage4Ref.current, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 1 }, '<0.4');
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-marawa-itam">
      {/* Stage Indicator HUD */}
      <div className="absolute left-6 sm:left-12 bottom-10 z-30 flex items-center gap-4 pointer-events-none">
        <span
          ref={counterRef}
          className="font-tech-mono text-xs sm:text-sm tracking-widest text-marawa-emas bg-black/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md"
        >
          01 / 04
        </span>
        <div className="hidden sm:flex items-center gap-2 text-[10px] font-tech-mono uppercase tracking-wider text-kabut-400">
          <span>GULIR UNTUK MENELUSURI KISAH</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>

      {/* Stage 1: Opening Landscape Panorama */}
      <div
        ref={stage1Ref}
        className="absolute inset-0 flex items-center justify-center p-6 text-center z-20 pointer-events-none"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={`/${hero.panoramaImage.src}`}
            alt={hero.panoramaImage.alt}
            className="w-full h-full object-cover opacity-35 brightness-90 filter"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-marawa-itam via-transparent to-marawa-itam/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-marawa-sirah/20 border border-marawa-sirah/40 text-marawa-emas font-tech-mono text-xs uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KOTA DINGIN BERSEJARAH // 3D INTERACTIVE</span>
          </div>
          <h1 className="font-editorial text-5xl sm:text-7xl md:text-9xl uppercase tracking-tighter leading-none mb-4 text-white drop-shadow-2xl">
            {hero.headline}
          </h1>
          <p className="font-tech-mono text-xs sm:text-base uppercase tracking-wider text-kabut-200 max-w-2xl leading-relaxed mb-6">
            Terletak di lembah subur yang dipeluk erat oleh Gunung Singgalang, Marapi, dan Tandikat.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-marawa-emas/40 text-[10px] font-tech-mono uppercase tracking-widest text-marawa-emas backdrop-blur-md animate-pulse">
            <span>✦ KLIK & GESER UNTUK MEMUTAR 3D GONJONG 360° ✦</span>
          </div>
        </div>
      </div>

      {/* Stage 2: Sejuk Lembah & PDIKM */}
      <div
        ref={stage2Ref}
        className="absolute inset-0 flex items-center justify-center p-6 text-center z-10 opacity-0 pointer-events-none"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={`/${hero.backgroundImage.src}`}
            alt={hero.backgroundImage.alt}
            className="w-full h-full object-cover opacity-35 brightness-90 filter"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-marawa-itam via-marawa-itam/30 to-marawa-itam/70" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <span className="font-tech-mono text-xs uppercase tracking-ultra text-marawa-emas mb-4">
            [ FILOSOFI KOTA // 02 ]
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-8xl uppercase tracking-tight leading-tight mb-6 text-white">
            Kala Sejarah, Dinginnya Kabut, & Marwah Berpadu
          </h2>
          <p className="font-tech-mono text-xs sm:text-sm uppercase tracking-wider text-kabut-300 max-w-xl">
            {hero.description}
          </p>
        </div>
      </div>

      {/* Stage 3: Gerbang & Falsafah ABS-SBK */}
      <div
        ref={stage3Ref}
        className="absolute inset-0 flex items-center justify-center p-6 text-center z-10 opacity-0 pointer-events-none"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={`/${hero.gateImage.src}`}
            alt={hero.gateImage.alt}
            className="w-full h-full object-cover opacity-35 brightness-90 filter"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-marawa-itam via-marawa-itam/40 to-marawa-itam/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <span className="font-tech-mono text-xs uppercase tracking-ultra text-sejuk-400 mb-4">
            [ LANDASAN MORAL // 03 ]
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-8xl uppercase tracking-tight leading-tight mb-6 text-white">
            Adat Basandi Syarak, Syarak Basandi Kitabullah
          </h2>
          <p className="font-tech-mono text-xs sm:text-sm uppercase tracking-wider text-kabut-300 max-w-lg">
            Motto Resmi Kota: <span className="text-marawa-emas font-semibold">"Bermarwah dan Bermartabat"</span> — Menjaga marwah peradaban Islam di bumi Minangkabau.
          </p>
        </div>
      </div>

      {/* Stage 4: Jembatan Kembar & Simpul Perlintasan */}
      <div
        ref={stage4Ref}
        className="absolute inset-0 flex items-center justify-center p-6 text-center z-10 opacity-0 pointer-events-none"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={`/${hero.bridgeImage.src}`}
            alt={hero.bridgeImage.alt}
            className="w-full h-full object-cover opacity-35 brightness-90 filter"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-marawa-itam via-marawa-itam/40 to-marawa-itam/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <span className="font-tech-mono text-xs uppercase tracking-ultra text-marawa-sirah mb-4">
            [ SIMPUL PERLINTASAN // 04 ]
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-8xl uppercase tracking-tight leading-tight mb-6 text-white">
            Pintu Gerbang Antara Darek dan Rantau
          </h2>
          <p className="font-tech-mono text-xs sm:text-sm uppercase tracking-wider text-kabut-300 max-w-xl">
            Simpul emas yang menghubungkan lembah pedalaman dan pesisir barat sejak berabad-abad lampau.
          </p>
        </div>
      </div>
    </div>
  );
};
