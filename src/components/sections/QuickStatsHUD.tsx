import React from 'react';
import { Mountain, Thermometer, MapPin, Building2, CloudRain } from 'lucide-react';
import { siteContent } from '../../data/site_content';

export const QuickStatsHUD: React.FC = () => {
  const { quickStats } = siteContent;

  const icons = [
    <Mountain className="w-5 h-5 text-marawa-emas" />,
    <Thermometer className="w-5 h-5 text-sejuk-400" />,
    <MapPin className="w-5 h-5 text-marawa-sirah" />,
    <Building2 className="w-5 h-5 text-kabut-200" />,
    <CloudRain className="w-5 h-5 text-cyan-400" />,
  ];

  return (
    <section className="relative z-10 py-20 px-4 sm:px-8 border-y border-white/10 bg-black/35 backdrop-blur-md">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 gap-4">
          <div>
            <span className="font-tech-mono text-[11px] uppercase tracking-ultra text-marawa-emas block mb-2">
              [ STATISTIK GEOGRAFIS KOTA ]
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl uppercase tracking-tight text-white">
              Data Geospasial & Iklim
            </h2>
          </div>
          <p className="font-tech-mono text-xs text-kabut-400 max-w-sm uppercase">
            Parameter resmi elevasi, suhu rata-rata, dan bentang alam Kota Padang Panjang di Sumatera Barat.
          </p>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {quickStats.map((stat, index) => (
            <div
              key={stat.label}
              className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform">
                  {icons[index % icons.length]}
                </div>
                <span className="font-tech-mono text-[10px] text-kabut-500">
                  (0{index + 1})
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="font-editorial text-3xl sm:text-4xl text-white font-medium group-hover:text-marawa-emas transition-colors">
                    {stat.value}
                  </span>
                  <span className="font-tech-mono text-xs text-kabut-400 uppercase">
                    {stat.unit}
                  </span>
                </div>
                <div className="font-tech-mono text-xs uppercase text-kabut-200 font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="font-tech-mono text-[11px] text-kabut-500 leading-relaxed">
                  {stat.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
