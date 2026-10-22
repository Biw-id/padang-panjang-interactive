import React from 'react';
import { Flame, Sparkles } from 'lucide-react';
import { siteContent } from '../../data/site_content';

export const CultureShowcase: React.FC = () => {
  const { cultureAndTradition } = siteContent;

  return (
    <section id="budaya" className="relative z-10 py-28 px-4 sm:px-8 border-b border-white/5 bg-marawa-itam">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-marawa-emas/10 border border-marawa-emas/30 text-marawa-emas font-tech-mono text-[11px] uppercase tracking-ultra mb-4">
            <Flame className="w-3.5 h-3.5" />
            <span>SENI BUDAYA & KREASI DINAMIS</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl uppercase tracking-tight text-white mb-4">
            {cultureAndTradition.sectionTitle}
          </h2>
          <p className="font-sans text-sm sm:text-base text-kabut-300 leading-relaxed">
            {cultureAndTradition.description}
          </p>
        </div>

        {/* 4 Cultural Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cultureAndTradition.traditions.map((trad, idx) => (
            <div
              key={trad.name}
              className="glass-panel glass-panel-hover rounded-3xl overflow-hidden group border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-black/40">
                  <img
                    src={`/${trad.image.src}`}
                    alt={trad.image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-tech-mono uppercase tracking-wider text-marawa-emas border border-white/10">
                    WARISAN BUDAYA (0{idx + 1})
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="font-editorial text-3xl uppercase tracking-tight text-white mb-2 group-hover:text-marawa-emas transition-colors">
                    {trad.name}
                  </h3>
                  <p className="font-tech-mono text-xs uppercase tracking-wider text-marawa-sirah mb-4">
                    {trad.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-kabut-300 leading-relaxed font-sans">
                    {trad.description}
                  </p>
                </div>
              </div>

              {/* Secondary thumbnail preview if available */}
              {'secondaryImage' in trad && (
                <div className="px-6 sm:px-8 pb-6 flex items-center gap-3">
                  <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-white/10">
                    <img
                      src={`/${(trad as any).secondaryImage.src}`}
                      alt={(trad as any).secondaryImage.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-tech-mono text-[10px] text-kabut-400 uppercase tracking-wider">
                    Foto aksi atraksi silat lumpur Kubu Gadang
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
