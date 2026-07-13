import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  gravity: number;
  trail: { x: number; y: number }[];
  exploded: boolean;
  sparks: Spark[];
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  size: number;
}

const COLORS = [
  '#ff6b9d', '#ff8fab', '#ffd6e7', '#ffb347', '#ffd700',
  '#ff4d79', '#c084fc', '#e879f9', '#f472b6', '#fb7185',
  '#a78bfa', '#60a5fa', '#34d399', '#fbbf24', '#f87171',
];

export default function FireworksCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const activeRef = useRef(active);

  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    function launchRocket() {
      if (!canvas) return;
      const x = Math.random() * canvas.width;
      const targetY = Math.random() * canvas.height * 0.45 + 50;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      particles.current.push({
        x,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 2,
        vy: -(canvas.height - targetY) / 40,
        size: 4,
        color,
        alpha: 1,
        decay: 0.99,
        gravity: 0.05,
        trail: [],
        exploded: false,
        sparks: [],
      });
    }

    function explode(p: Particle) {
      const count = 80 + Math.floor(Math.random() * 40);
      const sparks: Spark[] = [];
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const speed = (Math.random() * 5 + 2);
        sparks.push({
          x: p.x, y: p.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: 1,
          size: Math.random() * 3 + 1,
        });
      }
      return sparks;
    }

    let lastLaunch = 0;

    function animate(ts: number) {
      if (!canvas) return;
      animRef.current = requestAnimationFrame(animate);

      ctx.fillStyle = 'rgba(0,0,0,0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (activeRef.current && ts - lastLaunch > 400) {
        const count = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < count; i++) launchRocket();
        lastLaunch = ts;
      }

      particles.current = particles.current.filter(p => p.alpha > 0.01);

      for (const p of particles.current) {
        if (!p.exploded) {
          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > 10) p.trail.shift();
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.alpha *= p.decay;

          // Draw trail
          for (let i = 0; i < p.trail.length - 1; i++) {
            const alpha = (i / p.trail.length) * p.alpha * 0.6;
            ctx.beginPath();
            ctx.strokeStyle = p.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba').replace('#', '');
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 2;
            ctx.moveTo(p.trail[i].x, p.trail[i].y);
            ctx.lineTo(p.trail[i + 1].x, p.trail[i + 1].y);
            ctx.stroke();
          }
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
          ctx.globalAlpha = 1;

          if (p.vy >= 0 && !p.exploded) {
            p.exploded = true;
            p.sparks = explode(p);
            p.alpha = 0;
          }
        } else {
          p.sparks = p.sparks.filter(s => s.alpha > 0.01);
          for (const s of p.sparks) {
            s.x += s.vx;
            s.y += s.vy;
            s.vy += 0.12;
            s.vx *= 0.98;
            s.alpha -= 0.018;
            ctx.globalAlpha = s.alpha;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.fill();
          }
          ctx.globalAlpha = 1;
          if (p.sparks.length === 0) p.alpha = 0;
        }
      }
    }

    animRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="fireworks-canvas"
      style={{ display: active ? 'block' : 'none' }}
    />
  );
}
