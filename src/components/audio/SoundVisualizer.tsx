import React, { useEffect, useRef } from 'react';

interface SoundVisualizerProps {
  analyserRef: React.RefObject<AnalyserNode | null>;
  isPlaying: boolean;
  isMuted: boolean;
  barColor?: string;
}

export const SoundVisualizer: React.FC<SoundVisualizerProps> = ({
  analyserRef,
  isPlaying,
  isMuted,
  barColor = '#DC2626',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const barCount = 4;
    const barWidth = 3;
    const barGap = 2;

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const analyser = analyserRef.current;
      let values = [0.2, 0.4, 0.3, 0.5];

      if (analyser && isPlaying && !isMuted) {
        const buffer = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(buffer);
        // sample 4 points
        values = [
          (buffer[2] || 0) / 255,
          (buffer[6] || 0) / 255,
          (buffer[10] || 0) / 255,
          (buffer[14] || 0) / 255,
        ];
      } else if (!isPlaying || isMuted) {
        // Flatline / muted state
        values = [0.08, 0.08, 0.08, 0.08];
      }

      ctx.fillStyle = barColor;

      values.forEach((val, i) => {
        const barHeight = Math.max(2, val * (canvas.height - 2));
        const x = i * (barWidth + barGap);
        const y = canvas.height - barHeight;

        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(x, y, barWidth, barHeight, 1) : ctx.rect(x, y, barWidth, barHeight);
        ctx.fill();
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [analyserRef, isPlaying, isMuted, barColor]);

  return (
    <canvas
      ref={canvasRef}
      width={22}
      height={14}
      className="inline-block align-middle opacity-90 transition-opacity hover:opacity-100"
      title={isMuted ? 'Audio dinonaktifkan' : 'Audio aktif'}
    />
  );
};
