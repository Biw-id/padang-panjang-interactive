import React, { useState } from 'react';
import { Compass, Sparkles, X, ChevronRight, CheckCircle2 } from 'lucide-react';
import { siteContent } from '../../data/site_content';

export const DestinationsGrid: React.FC = () => {
  const { destinations } = siteContent;
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [selectedDestination, setSelectedDestination] = useState<any | null>(null);

  const categories = ['Semua', 'Budaya & Sejarah', 'Wisata Religi', 'Cagar Budaya', 'Wisata Alam'];

  const filteredDestinations = activeCategory === 'Semua'
    ? destinations
    : destinations.filter((d) => d.category.includes(activeCategory));

  return (
    <section id="destinasi" className="relative z-10 py-28 px-4 sm:px-8 border-b border-white/5 bg-marawa-itam/95">
      <div className="max-w-7xl mx-auto">
        {/* Header and Filter HUD */}
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sejuk-600/10 border border-sejuk-600/30 text-sejuk-400 font-tech-mono text-[11px] uppercase tracking-ultra mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>DESTINASI UTAMA & LANDMARK</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl uppercase tracking-tight text-white mb-2">
              Pesona Ranah Bersejarah
            </h2>
            <p className="font-tech-mono text-xs uppercase tracking-wider text-kabut-400">
              Eksplorasi mahakarya arsitektur, cagar budaya kuno, dan keajaiban lanskap alam.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-tech-mono text-xs uppercase tracking-wider transition-all duration-300 border ${
                  activeCategory === cat
                    ? 'bg-marawa-sirah border-marawa-sirah text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                    : 'bg-white/5 border-white/10 text-kabut-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 6-Card Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest, idx) => (
            <div
              key={dest.id}
              onClick={() => setSelectedDestination(dest)}
              className="glass-panel glass-panel-hover rounded-2xl overflow-hidden group cursor-pointer flex flex-col justify-between border border-white/10"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                  <img
                    src={`/${dest.image.src}`}
                    alt={dest.image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-tech-mono uppercase tracking-wider text-marawa-emas border border-white/10">
                    {dest.category}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[9px] font-tech-mono text-white/70 bg-black/60 backdrop-blur-xs">
                    (0{idx + 1})
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-editorial text-2xl uppercase tracking-tight text-white mb-2 group-hover:text-marawa-emas transition-colors">
                    {dest.name}
                  </h3>
                  <p className="font-tech-mono text-[11px] uppercase tracking-wider text-kabut-400 mb-4 line-clamp-2">
                    {dest.tagline}
                  </p>
                  <p className="text-xs text-kabut-300 line-clamp-3 leading-relaxed mb-6 font-sans">
                    {dest.description}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {dest.highlights.slice(0, 2).map((h: string) => (
                    <span
                      key={h}
                      className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-tech-mono uppercase text-kabut-300"
                    >
                      {h}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 font-tech-mono text-xs uppercase text-marawa-sirah group-hover:translate-x-1 transition-transform">
                  <span>Detail</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Detail Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-lg"
            onClick={() => setSelectedDestination(null)}
          />

          <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl glass-panel p-6 sm:p-8 border border-white/15 text-kabut-50 shadow-2xl">
            <button
              onClick={() => setSelectedDestination(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Images row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 mt-2">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
                <img
                  src={`/${selectedDestination.image.src}`}
                  alt={selectedDestination.image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              {selectedDestination.secondaryImage && (
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
                  <img
                    src={`/${selectedDestination.secondaryImage.src}`}
                    alt={selectedDestination.secondaryImage.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <div className="inline-block px-3 py-1 rounded-full bg-marawa-sirah/20 border border-marawa-sirah/40 text-marawa-emas font-tech-mono text-[10px] uppercase tracking-widest mb-3">
              {selectedDestination.category}
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl uppercase tracking-tight text-white mb-2">
              {selectedDestination.name}
            </h2>
            <p className="font-tech-mono text-xs uppercase tracking-wider text-marawa-emas mb-4">
              {selectedDestination.tagline}
            </p>

            <p className="text-sm text-kabut-200 leading-relaxed font-sans mb-6">
              {selectedDestination.description}
            </p>

            {/* Highlights */}
            <div className="border-t border-white/10 pt-4">
              <span className="font-tech-mono text-[11px] uppercase tracking-ultra text-kabut-400 block mb-3">
                DAYA TARIK & FITUR UTAMA
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedDestination.highlights.map((h: string) => (
                  <div
                    key={h}
                    className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 text-xs font-tech-mono text-kabut-100"
                  >
                    <CheckCircle2 className="w-4 h-4 text-sejuk-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
