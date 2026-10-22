import React from 'react';

interface CustomScrollbarProps {
  scrollProgress: number; // 0 to 1
  onScrollToRatio?: (ratio: number) => void;
}

export const CustomScrollbar: React.FC<CustomScrollbarProps> = ({ scrollProgress, onScrollToRatio }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onScrollToRatio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const ratio = Math.max(0, Math.min(1, clickY / rect.height));
    onScrollToRatio(ratio);
  };

  const thumbHeight = 36; // px
  const percent = Math.min(100, Math.max(0, scrollProgress * 100));

  return (
    <div
      onClick={handleClick}
      className="fixed right-2 top-24 bottom-24 w-1.5 z-40 hidden sm:flex flex-col items-center cursor-pointer group"
      title="Gulir Halaman"
    >
      {/* Scroll Track */}
      <div className="w-0.5 h-full bg-white/10 group-hover:bg-white/20 transition-colors rounded-full relative">
        {/* Scroll Thumb */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-1.5 bg-gradient-to-b from-marawa-sirah to-marawa-emas rounded-full shadow-[0_0_8px_rgba(220,38,38,0.8)] transition-all duration-75"
          style={{
            height: `${thumbHeight}px`,
            top: `calc(${percent}% - ${percent * (thumbHeight / 100)}px)`,
          }}
        />
      </div>
    </div>
  );
};
