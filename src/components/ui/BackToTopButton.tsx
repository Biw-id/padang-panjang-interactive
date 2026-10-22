import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface BackToTopButtonProps {
  onScrollToTop: () => void;
  scrollProgress: number;
}

export const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  onScrollToTop,
  scrollProgress,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button when scrolled down slightly (progress > 3% or scrollY > 200px)
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollY > 250 || scrollProgress > 0.03);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollProgress]);

  return (
    <button
      onClick={onScrollToTop}
      aria-label="Kembali ke paling atas"
      title="Kembali ke Paling Atas"
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-marawa-sirah hover:bg-marawa-sirah/90 text-white shadow-[0_4px_25px_rgba(220,38,38,0.5)] border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 group ${
        isVisible
          ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 scale-75 translate-y-6 pointer-events-none'
      }`}
    >
      {/* Subtle Marawa Gold hover aura ring */}
      <span className="absolute inset-0 rounded-full border border-marawa-emas/40 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 pointer-events-none" />

      {/* Up Arrow Icon */}
      <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:-translate-y-1 transition-transform duration-200" />
    </button>
  );
};
