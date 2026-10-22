import React from 'react';
import { ArrowUp, MapPin, Heart, Sparkles } from 'lucide-react';
import { siteContent } from '../../data/site_content';

interface FooterNextRevealProps {
  onScrollToTop: () => void;
  onPlayClick?: () => void;
}

export const FooterNextReveal: React.FC<FooterNextRevealProps> = ({ onScrollToTop, onPlayClick }) => {
  const { siteMeta } = siteContent;

  return (
    <footer className="relative z-10 pt-24 pb-16 px-4 sm:px-8 bg-black text-kabut-50 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        {/* Next Page / Return to Top Reveal Gate */}
        <div className="text-center py-16 mb-20 border-b border-white/10">
          <span className="font-tech-mono text-[10px] uppercase tracking-ultra text-kabut-500 block mb-3">
            (PENGALAMAN INTERAKTIF KELAS AWWWARDS)
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-8xl uppercase tracking-tighter text-white mb-8">
            Kembali ke Puncak Lembah
          </h2>
          <button
            onClick={() => {
              onPlayClick?.();
              onScrollToTop();
            }}
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/5 hover:bg-marawa-sirah border border-white/15 hover:border-marawa-sirah text-white font-tech-mono text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:scale-105 active:scale-95"
          >
            <span>[ KEMBALI KE PUNCAK ]</span>
            <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
          </button>
        </div>

        {/* 2-Column Grid: Map Vector and Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* SVG Map Card */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="font-tech-mono text-xs uppercase tracking-ultra text-marawa-emas">
                PETA GEOGRAFIS VEKTOR
              </span>
              <span className="font-tech-mono text-[10px] text-kabut-500">
                SUMATERA BARAT // KOTA PADANG PANJANG
              </span>
            </div>
            <div className="rounded-2xl overflow-hidden bg-white/5 p-4 flex items-center justify-center border border-white/5">
              <img
                src={`/${siteMeta.mapVector.src}`}
                alt={siteMeta.mapVector.alt}
                className="w-full max-h-72 object-contain filter drop-shadow-md"
              />
            </div>
          </div>

          {/* City Summary & Pillars */}
          <div className="space-y-6">
            <div>
              <span className="font-editorial text-3xl sm:text-4xl uppercase tracking-tight text-white block mb-2">
                Kota Padang Panjang
              </span>
              <p className="font-tech-mono text-xs uppercase tracking-wider text-marawa-emas mb-4">
                {siteMeta.tagline}
              </p>
              <p className="font-sans text-xs sm:text-sm text-kabut-300 leading-relaxed">
                {siteMeta.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div>
                <span className="font-tech-mono text-[10px] uppercase text-kabut-500 block mb-1">
                  LANDASAN ADAT
                </span>
                <span className="font-tech-mono text-xs text-white font-medium">
                  {siteMeta.culturalPhilosophy}
                </span>
              </div>
              <div>
                <span className="font-tech-mono text-[10px] uppercase text-kabut-500 block mb-1">
                  MOTTO KOTA
                </span>
                <span className="font-tech-mono text-xs text-marawa-emas font-medium">
                  "{siteMeta.officialMotto}"
                </span>
              </div>
            </div>

            <div className="pt-2">
              <span className="font-tech-mono text-[10px] uppercase text-kabut-500 block mb-1">
                LOKASI GEOGRAFIS
              </span>
              <div className="flex items-center gap-2 text-xs font-tech-mono text-kabut-300">
                <MapPin className="w-3.5 h-3.5 text-marawa-sirah shrink-0" />
                <span>27111 - 27128, Sumatera Barat, Indonesia (0°27′ S, 100°24′ E)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-tech-mono text-kabut-500 gap-4">
          <div className="flex items-center gap-1.5">
            <span>© 1956 - 2026 Pemerintah Kota Padang Panjang.</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] tracking-wider text-kabut-400">
            <span>DIRANCANG & DIKEMBANGKAN DENGAN STANDAR INTERAKSI AWWWARDS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
