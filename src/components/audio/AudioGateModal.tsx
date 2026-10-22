import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface AudioGateModalProps {
  onEnter: (withAudio: boolean) => void;
}

export const AudioGateModal: React.FC<AudioGateModalProps> = ({ onEnter }) => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsReady(true);
          return 100;
        }
        const step = Math.floor(Math.random() * 18) + 8;
        return Math.min(100, prev + step);
      });
    }, 70);

    return () => clearInterval(timer);
  }, []);

  const handleSelect = (withAudio: boolean) => {
    setIsFadingOut(true);
    setTimeout(() => {
      onEnter(withAudio);
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-marawa-itam text-kabut-50 transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Subtle Gradient & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-marawa-sirah/15 via-marawa-itam to-marawa-itam pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative z-10 max-w-xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Monogram Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-tech-mono uppercase tracking-widest text-marawa-emas mb-8">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Eksplorasi Interaktif Ranah Minang</span>
        </div>

        {/* Headline */}
        <h1 className="font-editorial text-4xl sm:text-6xl uppercase tracking-tighter leading-tight mb-4">
          PADANG PANJANG
        </h1>
        <p className="font-tech-mono text-xs sm:text-sm uppercase tracking-wider text-kabut-500 max-w-md mb-10">
          Kala Sejarah, Dinginnya Kabut Pegunungan, dan Marwah Minang Berpadu Indah
        </p>

        {/* Loading Progress Bar */}
        <div className="w-full max-w-xs mb-8">
          <div className="flex justify-between items-center text-[10px] font-tech-mono text-kabut-500 mb-2 uppercase">
            <span>MEMUAT ASET RETINA</span>
            <span>{progress}%</span>
          </div>
          <div className="h-0.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-marawa-sirah via-marawa-emas to-sejuk-400 transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Action Buttons Gate */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-3 transition-all duration-500 ${
            isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <button
            onClick={() => handleSelect(true)}
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-marawa-sirah hover:bg-marawa-sirah-bright text-white font-tech-mono text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(220,38,38,0.4)] hover:shadow-[0_0_35px_rgba(220,38,38,0.7)] hover:scale-105 active:scale-95"
          >
            <Volume2 className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Masuk dengan Audio ♫</span>
          </button>

          <button
            onClick={() => handleSelect(false)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-kabut-200 font-tech-mono text-xs uppercase tracking-wider border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <VolumeX className="w-4 h-4 text-kabut-500" />
            <span>Tanpa Audio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
