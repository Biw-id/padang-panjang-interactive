import React, { useState } from 'react';
import { useLenis } from './hooks/useLenis';
import { useAudioEngine } from './hooks/useAudioEngine';
import { useTheme } from './hooks/useTheme';

import { MountainMistScene } from './components/canvas/MountainMistScene';
import { AudioGateModal } from './components/audio/AudioGateModal';
import { HeaderHUD } from './components/hud/HeaderHUD';
import { SettingsDrawer } from './components/hud/SettingsDrawer';
import { CustomScrollbar } from './components/hud/CustomScrollbar';
import { CustomCursor } from './components/ui/CustomCursor';

import { StorytellingHero } from './components/sections/StorytellingHero';
import { QuickStatsHUD } from './components/sections/QuickStatsHUD';
import { HeritageRackRailway } from './components/sections/HeritageRackRailway';
import { DestinationsGrid } from './components/sections/DestinationsGrid';
import { CultureShowcase } from './components/sections/CultureShowcase';
import { GastronomyHaven } from './components/sections/GastronomyHaven';
import { IntellectualsHall } from './components/sections/IntellectualsHall';
import { FooterNextReveal } from './components/sections/FooterNextReveal';

export const App: React.FC = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHovering3D, setIsHovering3D] = useState(false);
  const [isDragging3D, setIsDragging3D] = useState(false);

  const { theme, toggleTheme, graphicQuality, setGraphicQuality } = useTheme();
  const {
    isPlaying,
    isMuted,
    startAmbient,
    toggleMute,
    playClick,
    playTick,
    playTransition,
    analyserRef,
  } = useAudioEngine();

  const { scrollTo, scrollProgress } = useLenis();

  const handleEnterExperience = (withAudio: boolean) => {
    setHasEntered(true);
    if (withAudio) {
      startAmbient();
    }
  };

  const handleScrollToSection = (selector: string) => {
    scrollTo(selector, { offset: -60, duration: 1.5 });
  };

  const handleScrollToRatio = (ratio: number) => {
    const targetY = ratio * (document.documentElement.scrollHeight - window.innerHeight);
    scrollTo(targetY, { duration: 1.2 });
  };

  const handleScrollToTop = () => {
    scrollTo(0, { duration: 2.0 });
  };

  return (
    <div className="relative min-h-screen bg-marawa-itam text-kabut-50 selection:bg-marawa-sirah selection:text-white">
      {/* Custom Adaptive Magnetic Cursor */}
      <CustomCursor
        isHovering3D={isHovering3D}
        isDragging3D={isDragging3D}
      />

      {/* Onboarding Audio & Preloader Gate */}
      {!hasEntered && <AudioGateModal onEnter={handleEnterExperience} />}

      {/* 3D WebGL Background Canvas (Interactive 360° Gonjong Centerpiece + Mist) */}
      <MountainMistScene
        theme={theme}
        graphicQuality={graphicQuality}
        onHover3DChange={setIsHovering3D}
        onDragStateChange={setIsDragging3D}
      />

      {/* Fixed Header HUD Navigation & Controls */}
      <HeaderHUD
        analyserRef={analyserRef}
        isPlaying={isPlaying}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onScrollTo={handleScrollToSection}
        onPlayClick={playClick}
        onPlayTick={playTick}
      />

      {/* Right Custom Interactive Scrollbar */}
      <CustomScrollbar
        scrollProgress={scrollProgress}
        onScrollToRatio={handleScrollToRatio}
      />

      {/* Settings Modal Drawer */}
      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        theme={theme}
        onToggleTheme={toggleTheme}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        graphicQuality={graphicQuality}
        onChangeQuality={setGraphicQuality}
        onPlayClick={playClick}
      />

      {/* Main Content Flow */}
      <main className="relative z-10 w-full">
        {/* Section 01: 4-Stage Pinned Scrollytelling Hero */}
        <StorytellingHero />

        {/* Section 02: Quick Stats Geospasial & Iklim */}
        <QuickStatsHUD />

        {/* Section 03: Heritage Rack Railway (Rel Gerigi 1887) */}
        <HeritageRackRailway />

        {/* Section 04: Destinations Showcase & Lightbox */}
        <DestinationsGrid />

        {/* Section 05: Culture & Traditions Dynamic Showcase */}
        <CultureShowcase />

        {/* Section 06: Gastronomy Haven (Surga Kuliner Dingin) */}
        <GastronomyHaven />

        {/* Section 07: Intellectuals Hall of Fame (Tokoh & Pendidikan) */}
        <IntellectualsHall />

        {/* Section 08: SVG Map Vector & Footer Next Reveal */}
        <FooterNextReveal
          onScrollToTop={handleScrollToTop}
          onPlayClick={playTransition}
        />
      </main>
    </div>
  );
};

export default App;
