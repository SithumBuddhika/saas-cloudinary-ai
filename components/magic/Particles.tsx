"use client";

import React, { useEffect, useMemo, useRef } from "react";

type Props = {
  className?: string;
  quantity?: number;
  speed?: number;
  ease?: number;
  size?: number;
  color?: string;
};

export default function Particles({
  className,
  quantity = 70,
  speed = 0.6,
  ease = 40,
  size = 2,
  color = "255,255,255",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const particles = useMemo(
    () =>
      Array.from({ length: quantity }).map(() => ({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: Math.random() * size + 0.6,
        o: Math.random() * 0.8 + 0.2,
      })),
    [quantity, size, speed]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w;
      canvas.height = h;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    let raf = 0;

    const step = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx / 100;
        p.y += p.vy / 100;

        // wrap
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;
        if (p.y < -0.05) p.y = 1.05;
        if (p.y > 1.05) p.y = -0.05;

        const px = p.x * w;
        const py = p.y * h;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${color},${p.o})`;
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // light linking
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = (a.x - b.x) * w;
          const dy = (a.y - b.y) * h;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < ease) {
            ctx.strokeStyle = `rgba(${color},${(1 - d / ease) * 0.12})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [particles, ease, color]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "absolute inset-0 h-full w-full"}
    />
  );
}
