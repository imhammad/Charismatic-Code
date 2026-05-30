"use client";

import { useEffect, useRef, useCallback } from "react";

interface CardData {
  id: number;
  emoji: string;
  title: string;
  description: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  isDragging: boolean;
  dragOffsetX: number;
  dragOffsetY: number;
  element: HTMLDivElement | null;
}

const cardsData = [
  { emoji: "⚡", title: "Daily 5‑min Prompt", description: "One small action to deepen a relationship today." },
  { emoji: "🛠️", title: "Random CS Tool", description: "A no‑fluff tool to reclaim focus and do better work." },
  { emoji: "🤝", title: "Connection Challenge", description: "Reach out to one person – we’ll give you the exact words." },
];

const random = (min: number, max: number) => min + Math.random() * (max - min);

export default function FloatingCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<CardData[]>([]);
  const animRef = useRef<number | undefined>(undefined);
  const containerRectRef = useRef({ width: 0, height: 0 });

  // Initialize cards (only once)
  const initCards = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    containerRectRef.current = { width: rect.width, height: rect.height };
    const cardWidth = 260;
    const cardHeight = 280;
    return cardsData.map((card, idx) => ({
      id: idx,
      ...card,
      x: random(20, rect.width - cardWidth - 20),
      y: random(20, rect.height - cardHeight - 20),
      vx: random(-1.2, 1.2),
      vy: random(-1.2, 1.2),
      width: cardWidth,
      height: cardHeight,
      isDragging: false,
      dragOffsetX: 0,
      dragOffsetY: 0,
      element: null,
    }));
  }, []);

  // Update positions and apply transform (no React re-render)
  const updatePositions = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    containerRectRef.current = { width: rect.width, height: rect.height };
    cardsRef.current.forEach(card => {
      if (card.isDragging || !card.element) return;
      let newX = card.x + card.vx;
      let newY = card.y + card.vy;

      // Wrap-around
      if (newX + card.width < 0) newX = rect.width;
      if (newX > rect.width) newX = -card.width;
      if (newY + card.height < 0) newY = rect.height;
      if (newY > rect.height) newY = -card.height;

      card.x = newX;
      card.y = newY;
      // Direct DOM manipulation
      card.element.style.transform = `translate(${card.x}px, ${card.y}px)`;
    });
  }, []);

  // Animation loop
  useEffect(() => {
    if (!containerRef.current) return;
    cardsRef.current = initCards();

    // Mount DOM elements and store refs
    cardsRef.current.forEach(card => {
      const el = document.getElementById(`float-card-${card.id}`);
      if (el) {
        card.element = el;
        el.style.transform = `translate(${card.x}px, ${card.y}px)`;
      }
    });

    const step = () => {
      updatePositions();
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [initCards, updatePositions]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      cardsRef.current.forEach(card => {
        if (!card.isDragging && card.element) {
          // clamp positions to new bounds
          card.x = Math.min(Math.max(card.x, 0), rect.width - card.width);
          card.y = Math.min(Math.max(card.y, 0), rect.height - card.height);
          card.element.style.transform = `translate(${card.x}px, ${card.y}px)`;
        }
      });
      containerRectRef.current = { width: rect.width, height: rect.height };
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Drag handlers ---
  const handlePointerDown = (e: React.PointerEvent, id: number) => {
    const card = cardsRef.current.find(c => c.id === id);
    if (!card || !card.element || !containerRef.current) return;
    e.preventDefault();
    card.isDragging = true;
    const rect = card.element.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    card.dragOffsetX = e.clientX - rect.left;
    card.dragOffsetY = e.clientY - rect.top;

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (!card.isDragging) return;
      let newX = moveEvent.clientX - containerRect.left - card.dragOffsetX;
      let newY = moveEvent.clientY - containerRect.top - card.dragOffsetY;
      newX = Math.max(0, Math.min(newX, containerRect.width - card.width));
      newY = Math.max(0, Math.min(newY, containerRect.height - card.height));
      card.x = newX;
      card.y = newY;
      if (card.element) {
        card.element.style.transform = `translate(${card.x}px, ${card.y}px)`;
      }
    };

    const onPointerUp = (upEvent: PointerEvent) => {
      const deltaX = upEvent.clientX - (e.clientX);
      const deltaY = upEvent.clientY - (e.clientY);
      card.vx = deltaX * 0.2;
      card.vy = deltaY * 0.2;
      const maxSpeed = 6;
      card.vx = Math.min(maxSpeed, Math.max(-maxSpeed, card.vx));
      card.vy = Math.min(maxSpeed, Math.max(-maxSpeed, card.vy));
      card.isDragging = false;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  return (
    <section className="px-6 py-20 max-w-4xl mx-auto">
      <h2 className="font-display text-2xl text-stone-300 mb-8 text-center">
        ✨ Floating Sparks Universe ✨
      </h2>
      <div
        ref={containerRef}
        className="relative w-[80%] mx-auto min-h-[500px] rounded-2xl border border-amber-500/30 bg-black/40 backdrop-blur-sm overflow-hidden shadow-2xl"
        style={{
          background: "radial-gradient(circle at 20% 30%, rgba(255,215,0,0.08) 1px, transparent 1px), radial-gradient(circle at 70% 80%, rgba(255,100,150,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px, 60px 60px",
        }}
      >
        {/* Static stars – no random on server */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-full h-full" style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "30px 30px", opacity: 0.3 }} />
        </div>

        {cardsData.map((card, idx) => (
          <div
            key={idx}
            id={`float-card-${idx}`}
            onPointerDown={(e) => handlePointerDown(e, idx)}
            className="absolute rounded-xl border border-amber-400/40 bg-stone-900/80 p-4 backdrop-blur-sm cursor-grab active:cursor-grabbing transition-all duration-150 hover:scale-105 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/30 will-change-transform"
            style={{ width: 260, height: 280, touchAction: "none" }}
          >
            <div className="text-4xl mb-2">{card.emoji}</div>
            <h3 className="font-display text-lg font-bold text-stone-100 mb-1">
              {card.title}
            </h3>
            <p className="font-body text-stone-400 text-xs leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
      <p className="text-center text-stone-500 text-xs mt-4">
        ✨ Drag & throw the cards – they wrap around the universe ✨
      </p>
    </section>
  );
}