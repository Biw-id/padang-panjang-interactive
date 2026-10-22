import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Ensure browser does not remember previous scroll position on reload
if (typeof window !== 'undefined') {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
}

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Reset scroll to absolute top immediately on page reload/mount
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Reset to top inside Lenis engine
    lenis.scrollTo(0, { immediate: true });

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on('scroll', (e: any) => {
      ScrollTrigger.update();
      if (e.limit > 0) {
        setScrollProgress(e.scroll / e.limit);
      }
    });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Reset to top when user leaves or refreshes
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const scrollTo = (target: string | number | HTMLElement, options?: any) => {
    lenisRef.current?.scrollTo(target, options);
  };

  return { lenis: lenisRef.current, scrollTo, scrollProgress };
}
