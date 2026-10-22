import React from 'react';
import { BookOpen, GraduationCap, Award, Landmark } from 'lucide-react';
import { siteContent } from '../../data/site_content';

export const IntellectualsHall: React.FC = () => {
  const { educationAndFigures } = siteContent;

  return (
    <section id="tokoh" className="relative z-10 py-28 px-4 sm:px-8 border-b border-white/5 bg-marawa-itam">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sejuk-600/10 border border-sejuk-600/30 text-sejuk-400 font-tech-mono text-[11px] uppercase tracking-ultra mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>KOTA PENDIDIKAN // EGYPT VAN ANDALAS</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl uppercase tracking-tight text-white mb-4">
            {educationAndFigures.sectionTitle}
          </h2>
          <p className="font-sans text-sm sm:text-base text-kabut-300 leading-relaxed">
            {educationAndFigures.description}
          </p>
        </div>

        {/* Figures Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {educationAndFigures.figures.map((fig, idx) => (
            <div
              key={fig.name}
              className="glass-panel glass-panel-hover rounded-3xl overflow-hidden group border border-white/10 flex flex-col justify-between"
            >
              <div>
                {/* Portrait or Institution image if available */}
                <div className="relative aspect-[3/4] overflow-hidden bg-black/40">
                  {'portrait' in fig && fig.portrait ? (
                    <img
                      src={`/${fig.portrait.src}`}
                      alt={fig.portrait.alt}
                      className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                    />
                  ) : 'institutionImage' in fig && fig.institutionImage ? (
                    <img
                      src={`/${fig.institutionImage.src}`}
                      alt={fig.institutionImage.alt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-marawa-sirah/20 to-marawa-emas/10">
                      <BookOpen className="w-16 h-16 text-white/20" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-tech-mono uppercase tracking-wider text-marawa-emas border border-white/10">
                    TOKOH (0{idx + 1})
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-editorial text-2xl uppercase tracking-tight text-white mb-1 group-hover:text-marawa-emas transition-colors">
                    {fig.name}
                  </h3>
                  <p className="font-tech-mono text-[10px] uppercase tracking-wider text-marawa-sirah mb-3">
                    {fig.role}
                  </p>
                  <p className="text-xs text-kabut-300 leading-relaxed font-sans">
                    {fig.description}
                  </p>
                </div>
              </div>

              {/* Museum or Campus Thumbnail if present */}
              {'museumImage' in fig && fig.museumImage && (
                <div className="p-6 pt-0 flex items-center gap-2.5">
                  <div className="w-12 h-10 rounded-md overflow-hidden shrink-0 border border-white/10">
                    <img
                      src={`/${fig.museumImage.src}`}
                      alt={fig.museumImage.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-tech-mono text-[9px] uppercase tracking-wider text-kabut-400">
                    Museum Kediaman Rahmah El Yunusiyyah
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
