"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export default function CursorSparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, moving: false });
  const lastMoveRef = useRef<number>(0); // fixed: initial value 0
  const animationRef = useRef<number | undefined>(undefined); // fixed: allow undefined

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        moving: true,
      };
      lastMoveRef.current = now;

      // Create 3-8 particles per move
      const count = Math.floor(Math.random() * 6) + 3;
      for (let i = 0; i < count; i++) {
        const angle = (Math.random() - 0.5) * Math.PI * 0.8;
        const speed = Math.random() * 2 + 1;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed * (Math.random() - 0.5),
          vy: Math.sin(angle) * speed * 0.5 - Math.random() * 2,
          size: Math.random() * 4 + 2,
          alpha: 0.8,
          life: 0,
          maxLife: 40 + Math.random() * 20,
        });
      }

      if (particlesRef.current.length > 300) {
        particlesRef.current = particlesRef.current.slice(-250);
      }
    };

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 12; i++) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5 - 2,
          size: Math.random() * 5 + 2,
          alpha: 0.9,
          life: 0,
          maxLife: 50 + Math.random() * 30,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.life++;
        if (p.life >= p.maxLife) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15;
        p.alpha = 1 - p.life / p.maxLife;
        const size = p.size * (1 - p.life / p.maxLife) + 0.5;

        const hue = Math.random() > 0.6 ? 340 : 360;
        ctx.globalAlpha = p.alpha * 0.7;
        ctx.fillStyle = `hsl(${hue}, 100%, 65%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();

        if (size > 2) {
          ctx.globalAlpha = p.alpha * 0.4;
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (Date.now() - lastMoveRef.current > 200) {
        mouseRef.current.moving = false;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      if (animationRef.current !== undefined) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-20"
      style={{ mixBlendMode: "screen" }}
    />
  );
}