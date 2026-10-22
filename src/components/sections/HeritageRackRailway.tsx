import React from 'react';
import { Train, Clock, MapPin, Archive, Cog } from 'lucide-react';
import { siteContent } from '../../data/site_content';
import { RackRailwayGear3D } from '../canvas/RackRailwayGear3D';

export const HeritageRackRailway: React.FC = () => {
  const { heritageAndHistory } = siteContent;

  return (
    <section id="sejarah" className="relative z-10 py-28 px-4 sm:px-8 border-b border-white/10 bg-black/35 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        {/* Header with Integrated 3D Cogwheel Element */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-marawa-sirah/10 border border-marawa-sirah/30 text-marawa-sirah font-tech-mono text-[11px] uppercase tracking-ultra mb-4">
              <Train className="w-3.5 h-3.5" />
              <span>JALUR REL GERIGI // 1887 - 1891</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl uppercase tracking-tight text-white mb-4">
              {heritageAndHistory.sectionTitle}
            </h2>
            <p className="font-tech-mono text-xs sm:text-sm uppercase tracking-wider text-marawa-emas mb-4">
              {heritageAndHistory.sectionSubtitle}
            </p>
            <p className="font-sans text-sm sm:text-base text-kabut-300 leading-relaxed max-w-2xl">
              {heritageAndHistory.description}
            </p>
          </div>

          {/* Interactive 3D Cogwheel Model */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-3xl glass-panel border border-white/10 relative group">
            <div className="w-56 h-56 flex items-center justify-center">
              <RackRailwayGear3D className="w-full h-full" />
            </div>
            <div className="mt-2 text-center">
              <span className="font-tech-mono text-[10px] uppercase tracking-widest text-marawa-emas block">
                ✦ 3D MEKANIKAL REL GERIGI 1887 ✦
              </span>
              <span className="font-tech-mono text-[9px] uppercase tracking-wider text-kabut-500 block">
                BERPUTAR MENGIKUTI SCROLL & KURSOR
              </span>
            </div>
          </div>
        </div>

        {/* Archival Media Gallery (3-Card Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {heritageAndHistory.images.map((img, idx) => (
            <div
              key={img.src}
              className="glass-panel glass-panel-hover rounded-2xl overflow-hidden group border border-white/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                <img
                  src={`/${img.src}`}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-tech-mono uppercase tracking-wider text-kabut-200 border border-white/10">
                  ARSIP (0{idx + 1})
                </div>
              </div>
              <div className="p-5">
                <p className="font-tech-mono text-xs text-kabut-300 uppercase leading-relaxed">
                  {img.alt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Historical Timeline Milestone Cards */}
        <div>
          <div className="flex items-center gap-2 mb-8">
            <Clock className="w-4 h-4 text-marawa-emas" />
            <span className="font-tech-mono text-xs uppercase tracking-ultra text-kabut-400">
              KRONOLOGI PERJALANAN SEJARAH KOTA
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {heritageAndHistory.timeline.map((item, idx) => (
              <div
                key={item.year}
                className="glass-panel glass-panel-hover rounded-2xl p-6 relative flex flex-col justify-between border-l-2 border-l-marawa-sirah group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-editorial text-3xl font-semibold text-marawa-emas group-hover:text-white transition-colors">
                      {item.year}
                    </span>
                    <span className="font-tech-mono text-[10px] text-kabut-500">
                      STEP 0{idx + 1}
                    </span>
                  </div>
                  <h3 className="font-tech-mono text-xs uppercase font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-kabut-400 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
