import React from 'react';
import { Utensils, Award, Flame, Coffee, Sparkles } from 'lucide-react';
import { siteContent } from '../../data/site_content';
import { CulinarySteam3D } from '../canvas/CulinarySteam3D';

export const GastronomyHaven: React.FC = () => {
  const { gastronomy } = siteContent;

  return (
    <section id="kuliner" className="relative z-10 py-28 px-4 sm:px-8 border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        {/* Header with Integrated 3D Steaming Pedestal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-marawa-sirah/10 border border-marawa-sirah/30 text-marawa-sirah font-tech-mono text-[11px] uppercase tracking-ultra mb-4">
              <Utensils className="w-3.5 h-3.5" />
              <span>KULINER LEGENDARIS RANAH MINANG</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl uppercase tracking-tight text-white mb-3">
              {gastronomy.sectionTitle}
            </h2>
            <p className="font-tech-mono text-xs sm:text-sm uppercase tracking-wider text-marawa-emas mb-4">
              {gastronomy.sectionSubtitle}
            </p>
            <p className="font-sans text-xs sm:text-sm text-kabut-300 max-w-xl leading-relaxed">
              {gastronomy.description}
            </p>
          </div>

          {/* 3D Steaming Pedestal Element */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-3xl glass-panel border border-white/10 relative">
            <div className="w-56 h-48 flex items-center justify-center">
              <CulinarySteam3D className="w-full h-full" />
            </div>
            <div className="text-center mt-2">
              <span className="font-tech-mono text-[10px] uppercase tracking-widest text-marawa-emas block">
                ✦ 3D SIMULASI UAP PANAS // 17°C ✦
              </span>
              <span className="font-tech-mono text-[9px] uppercase tracking-wider text-kabut-500 block">
                SATE MAK SYUKUR & TEH TALUA HANGAT
              </span>
            </div>
          </div>
        </div>

        {/* 4 Culinary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gastronomy.dishes.map((dish, idx) => (
            <div
              key={dish.name}
              className="glass-panel glass-panel-hover rounded-3xl overflow-hidden group border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square overflow-hidden bg-black/40">
                  <img
                    src={`/${dish.image.src}`}
                    alt={dish.image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-tech-mono uppercase tracking-wider text-marawa-emas border border-white/10">
                    {dish.established}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[9px] font-tech-mono text-white/70 bg-black/60">
                    (0{idx + 1})
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-editorial text-2xl uppercase tracking-tight text-white mb-3 group-hover:text-marawa-emas transition-colors">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-kabut-300 leading-relaxed font-sans line-clamp-4">
                    {dish.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="h-0.5 w-full bg-gradient-to-r from-marawa-sirah to-marawa-emas opacity-30 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
