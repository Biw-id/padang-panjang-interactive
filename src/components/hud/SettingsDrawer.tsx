import React from 'react';
import { X, Volume2, VolumeX, Moon, Sun, Monitor, Cpu } from 'lucide-react';
import { GraphicQuality, Theme } from '../../hooks/useTheme';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  graphicQuality: GraphicQuality;
  onChangeQuality: (q: GraphicQuality) => void;
  onPlayClick?: () => void;
}

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  isMuted,
  onToggleMute,
  graphicQuality,
  onChangeQuality,
  onPlayClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={() => {
          onPlayClick?.();
          onClose();
        }}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-sm rounded-2xl glass-panel p-6 shadow-2xl border border-white/10 text-kabut-50">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-marawa-sirah animate-ping" />
            <span className="font-tech-mono text-xs uppercase tracking-widest text-marawa-emas">
              PENGATURAN PENGALAMAN
            </span>
          </div>
          <button
            onClick={() => {
              onPlayClick?.();
              onClose();
            }}
            className="p-1 rounded-full text-kabut-500 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-5">
          {/* Audio Option */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                {isMuted ? <VolumeX className="w-4 h-4 text-kabut-500" /> : <Volume2 className="w-4 h-4 text-marawa-sirah" />}
              </div>
              <div>
                <div className="font-tech-mono text-xs uppercase tracking-wide">Audio & Suara</div>
                <div className="text-[10px] text-kabut-500 font-tech-mono">Desau angin & micro-SFX</div>
              </div>
            </div>
            <button
              onClick={() => {
                onPlayClick?.();
                onToggleMute();
              }}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                !isMuted ? 'bg-marawa-sirah justify-end' : 'bg-white/20 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
            </button>
          </div>

          {/* Theme Option */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                {theme === 'dark' ? <Moon className="w-4 h-4 text-marawa-emas" /> : <Sun className="w-4 h-4 text-amber-500" />}
              </div>
              <div>
                <div className="font-tech-mono text-xs uppercase tracking-wide">Tema Tampilan</div>
                <div className="text-[10px] text-kabut-500 font-tech-mono">
                  {theme === 'dark' ? 'Marawa Hitam (Malam)' : 'Kabut Slate (Siang)'}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                onPlayClick?.();
                onToggleTheme();
              }}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                theme === 'dark' ? 'bg-marawa-emas justify-end' : 'bg-white/20 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
            </button>
          </div>

          {/* Graphic Quality */}
          <div className="pt-2 border-t border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-3.5 h-3.5 text-kabut-500" />
              <span className="font-tech-mono text-[11px] uppercase tracking-wider text-kabut-400">
                Kualitas Grafis 3D
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onPlayClick?.();
                  onChangeQuality('high');
                }}
                className={`px-3 py-2 rounded-xl font-tech-mono text-xs uppercase tracking-wider border transition-all ${
                  graphicQuality === 'high'
                    ? 'border-marawa-sirah bg-marawa-sirah/20 text-white'
                    : 'border-white/10 bg-white/5 text-kabut-500 hover:text-white'
                }`}
              >
                Tinggi (2x Retina)
              </button>
              <button
                onClick={() => {
                  onPlayClick?.();
                  onChangeQuality('low');
                }}
                className={`px-3 py-2 rounded-xl font-tech-mono text-xs uppercase tracking-wider border transition-all ${
                  graphicQuality === 'low'
                    ? 'border-sejuk-600 bg-sejuk-600/20 text-white'
                    : 'border-white/10 bg-white/5 text-kabut-500 hover:text-white'
                }`}
              >
                Hemat (60 FPS)
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <span className="font-tech-mono text-[9px] uppercase tracking-widest text-kabut-500">
            PADANG PANJANG // SYSTEM 1.0
          </span>
        </div>
      </div>
    </div>
  );
};
