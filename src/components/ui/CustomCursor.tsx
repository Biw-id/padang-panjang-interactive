import React, { useEffect, useState, useRef } from 'react';

interface CustomCursorProps {
  isHovering3D: boolean;
  isDragging3D: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ isHovering3D, isDragging3D }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'inspect' | 'drag'>('default');
  const [isVisible, setIsVisible] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (target) {
        if (target.closest('button, a, input, select, textarea, [role="button"]')) {
          setCursorType('pointer');
        } else if (target.closest('.glass-panel-hover, [data-inspect]')) {
          setCursorType('inspect');
        } else if (isHovering3D || target.closest('canvas')) {
          setCursorType('drag');
        } else {
          setCursorType('default');
        }
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth Lerp Follower Loop
    let animId: number;
    const render = () => {
      animId = requestAnimationFrame(render);
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.18;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.18;
      setPosition({ x: currentPos.current.x, y: currentPos.current.y });
    };
    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isHovering3D, isVisible]);

  if (!isVisible) return null;

  const isDragMode = isHovering3D || cursorType === 'drag';
  const isInspectMode = cursorType === 'inspect';
  const isPointerMode = cursorType === 'pointer';

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out will-change-transform"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        left: 0,
        top: 0,
      }}
    >
      {/* Central Precision Dot */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
          isDragMode
            ? 'w-2 h-2 bg-marawa-emas shadow-[0_0_12px_#F59E0B]'
            : isInspectMode
            ? 'w-2.5 h-2.5 bg-marawa-sirah shadow-[0_0_12px_#DC2626]'
            : isPointerMode
            ? 'w-3 h-3 bg-white scale-125'
            : 'w-2 h-2 bg-white'
        }`}
      />

      {/* Outer Contextual Feedback Bubble */}
      <div
        className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center font-tech-mono text-[9px] uppercase tracking-widest transition-all duration-300 border ${
          isDragMode
            ? 'w-20 h-20 bg-marawa-itam/80 border-marawa-emas text-marawa-emas backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.3)]'
            : isInspectMode
            ? 'w-16 h-16 bg-marawa-sirah/80 border-white text-white backdrop-blur-md shadow-[0_0_20px_rgba(220,38,38,0.4)]'
            : isPointerMode
            ? 'w-10 h-10 border-white/40 bg-white/5'
            : 'w-7 h-7 border-white/20'
        }`}
      >
        {isDragMode && (
          <span className="animate-pulse font-bold text-center leading-tight">
            {isDragging3D ? 'ROTATING' : 'DRAG 360°'}
          </span>
        )}
        {isInspectMode && (
          <span className="font-bold">LIHAT</span>
        )}
      </div>
    </div>
  );
};
