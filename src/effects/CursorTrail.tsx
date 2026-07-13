import { useEffect, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  color: string;
  size: number;
}

const SPARKLE_COLORS = ['#f472b6', '#fbbf24', '#c084fc', '#f9a8d4', '#fde68a', '#ddd6fe', '#ffffff'];

let trailId = 0;

export default function CursorTrail() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const points = useRef<TrailPoint[]>([]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      posRef.current = { x, y };

      if (cursorRef.current) {
        cursorRef.current.style.left = x + 'px';
        cursorRef.current.style.top = y + 'px';
      }
      if (dotRef.current) {
        dotRef.current.style.left = x + 'px';
        dotRef.current.style.top = y + 'px';
      }

      if (!containerRef.current) return;
      const color = SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
      const id = trailId++;
      const offsetX = (Math.random() - 0.5) * 20;
      const offsetY = (Math.random() - 0.5) * 20;
      const size = Math.random() * 8 + 4;

      const el = document.createElement('div');
      el.className = 'sparkle-trail';
      el.style.left = (x + offsetX) + 'px';
      el.style.top = (y + offsetY) + 'px';
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.background = color;
      el.style.boxShadow = `0 0 6px ${color}`;
      el.dataset.id = String(id);

      // Randomly use ✦ or ★ shape
      if (Math.random() > 0.5) {
        el.style.borderRadius = '50%';
      } else {
        el.style.borderRadius = '0';
        el.style.transform = 'translate(-50%, -50%) rotate(45deg)';
        el.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
      }

      containerRef.current.appendChild(el);
      setTimeout(() => {
        if (containerRef.current) {
          const found = containerRef.current.querySelector(`[data-id="${id}"]`);
          if (found) containerRef.current.removeChild(found);
        }
      }, 800);
    };

    const onLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };

    const onEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = '1';
      if (dotRef.current) dotRef.current.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={containerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998 }} />
    </>
  );
}
