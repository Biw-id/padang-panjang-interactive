import React from 'react';
import { Settings, CloudFog, ArrowUpRight } from 'lucide-react';
import { SoundVisualizer } from '../audio/SoundVisualizer';

interface HeaderHUDProps {
  analyserRef: React.RefObject<AnalyserNode | null>;
  isPlaying: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenSettings: () => void;
  onScrollTo: (selector: string) => void;
  onPlayClick?: () => void;
  onPlayTick?: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  analyserRef,
  isPlaying,
  isMuted,
  onToggleMute,
  onOpenSettings,
  onScrollTo,
  onPlayClick,
  onPlayTick,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 flex items-center justify-between pointer-events-none transition-all duration-300">
      {/* Brand Monogram Left */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <button
          onClick={() => {
            onPlayClick?.();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 group text-left"
        >
          <img
            src="/media_webp/08_branding_identitas/lambang_resmi_kota_padang_panjang.webp"
            alt="Lambang Kota Padang Panjang"
            className="w-8 h-9 object-contain drop-shadow-[0_0_12px_rgba(245,158,11,0.4)] transition-transform group-hover:scale-105"
          />
          <div className="hidden sm:block">
            <span className="font-editorial text-lg tracking-tight uppercase block leading-none text-white">
              Padang Panjang
            </span>
            <span className="font-tech-mono text-[9px] uppercase tracking-widest text-marawa-emas">
              SERAMBI MEKKAH
            </span>
          </div>
        </button>
      </div>

      {/* Navigation Links Center (Desktop) */}
      <nav className="hidden lg:flex items-center gap-6 px-5 py-2 rounded-full glass-panel pointer-events-auto shadow-lg border border-white/10">
        {[
          { label: 'Sejarah', id: '#sejarah' },
          { label: 'Destinasi', id: '#destinasi' },
          { label: 'Budaya', id: '#budaya' },
          { label: 'Kuliner', id: '#kuliner' },
          { label: 'Tokoh', id: '#tokoh' },
        ].map((item, idx) => (
          <button
            key={item.id}
            onClick={() => {
              onPlayTick?.();
              onScrollTo(item.id);
            }}
            className="font-tech-mono text-[11px] uppercase tracking-wider text-kabut-300 hover:text-white transition-colors flex items-center gap-1 group"
          >
            <span className="text-[9px] text-marawa-sirah group-hover:text-marawa-emas transition-colors">
              [0{idx + 1}]
            </span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Right Controls HUD */}
      <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
        {/* Weather Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-kabut-200 font-tech-mono text-[10px] uppercase tracking-wider">
          <CloudFog className="w-3.5 h-3.5 text-sejuk-400 animate-pulse" />
          <span>17°C // 650-850 MDPL</span>
        </div>

        {/* Audio Visualizer Button */}
        <button
          onClick={() => {
            onPlayClick?.();
            onToggleMute();
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel hover:bg-white/10 border border-white/10 text-white font-tech-mono text-[10px] uppercase tracking-wider transition-all"
          title={isMuted ? 'Aktifkan Suara' : 'Senyapkan Suara'}
        >
          <SoundVisualizer
            analyserRef={analyserRef}
            isPlaying={isPlaying}
            isMuted={isMuted}
            barColor="#DC2626"
          />
          <span className="hidden sm:inline text-kabut-400">
            {isMuted ? 'MUTE' : 'AUDIO'}
          </span>
        </button>

        {/* Settings Button */}
        <button
          onClick={() => {
            onPlayClick?.();
            onOpenSettings();
          }}
          className="p-2 rounded-full glass-panel hover:bg-white/10 border border-white/10 text-kabut-300 hover:text-white transition-all"
          title="Pengaturan Tampilan & Suara"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Primary CTA Button */}
        <button
          onClick={() => {
            onPlayClick?.();
            onScrollTo('#destinasi');
          }}
          className="group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-marawa-sirah hover:bg-marawa-sirah-bright text-white font-tech-mono text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(220,38,38,0.6)]"
        >
          <span>Jelajahi</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </header>
  );
};
