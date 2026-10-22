import { useEffect, useRef, useState, useCallback } from 'react';

export function useAudioEngine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);
  const mediaSourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  // Initialize Web Audio Context & Audio Element for saluang.mp3
  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.85;
      masterGain.connect(analyser);
      analyserRef.current = analyser;

      // Create native audio element for saluang.mp3
      const audio = new Audio('/audio/saluang.mp3');
      audio.loop = true;
      audio.crossOrigin = 'anonymous';
      audio.preload = 'auto';
      audioElementRef.current = audio;

      const source = ctx.createMediaElementSource(audio);
      source.connect(masterGain);
      mediaSourceRef.current = source;
    } catch (e) {
      console.warn('Web Audio API not supported', e);
    }
  }, [volume]);

  // Start Saluang music loop with gentle fade-in
  const startAmbient = useCallback(() => {
    initAudio();
    const ctx = audioCtxRef.current;
    const audio = audioElementRef.current;
    const master = masterGainRef.current;

    if (!ctx || !audio || !master) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Set fade-in volume
    master.gain.setValueAtTime(0.001, ctx.currentTime);
    master.gain.exponentialRampToValueAtTime(isMuted ? 0.001 : volume, ctx.currentTime + 2.5);

    audio.play().then(() => {
      setIsPlaying(true);
      setIsMuted(false);
    }).catch((err) => {
      console.warn('Autoplay prevented or audio error', err);
    });
  }, [initAudio, isMuted, volume]);

  const stopAmbient = useCallback(() => {
    const audio = audioElementRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(false);
  }, []);

  const toggleMute = useCallback(() => {
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master) return;

    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (nextMuted) {
      master.gain.setTargetAtTime(0, ctx.currentTime, 0.1);
    } else {
      master.gain.setTargetAtTime(volume, ctx.currentTime, 0.1);
    }
  }, [isMuted, volume]);

  // Crossfade volume for specific sections (e.g. softer in reading sections)
  const setSectionIntensity = useCallback((intensity: number) => {
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master || isMuted) return;

    const targetGain = Math.max(0.1, Math.min(1.0, volume * intensity));
    master.gain.setTargetAtTime(targetGain, ctx.currentTime, 0.5);
  }, [isMuted, volume]);

  // Micro-interactions SFX
  const playTick = useCallback(() => {
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master || isMuted) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(master);
    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  }, [isMuted]);

  const playClick = useCallback(() => {
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master || isMuted) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(master);
    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  }, [isMuted]);

  const playTransition = useCallback(() => {
    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ctx || !master || isMuted) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(master);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  }, [isMuted]);

  // Clean up
  useEffect(() => {
    return () => {
      stopAmbient();
      audioCtxRef.current?.close();
    };
  }, [stopAmbient]);

  return {
    isPlaying,
    isMuted,
    volume,
    setVolume,
    startAmbient,
    stopAmbient,
    toggleMute,
    setSectionIntensity,
    playTick,
    playClick,
    playTransition,
    analyserRef,
  };
}
