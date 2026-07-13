import { useEffect, useRef } from 'react';

interface ConfettiPiece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  width: number;
  height: number;
  color: string;
  alpha: number;
  shape: 'rect' | 'circle' | 'star';
}

const COLORS = [
  '#f472b6', '#fbbf24', '#c084fc', '#34d399', '#fb7185',
  '#f9a8d4', '#fde68a', '#ddd6fe', '#6ee7b7', '#fca5a5',
  '#e879f9', '#60a5fa', '#a78bfa', '#ff6b9d', '#ffd700',
];

export default function ConfettiCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pieces = useRef<ConfettiPiece[]>([]);
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

    function spawn(count: number) {
      if (!canvas) return;
      for (let i = 0; i < count; i++) {
        pieces.current.push({
          x: Math.random() * canvas.width,
          y: -20,
          vx: (Math.random() - 0.5) * 6,
          vy: Math.random() * 4 + 2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.2,
          width: Math.random() * 12 + 5,
          height: Math.random() * 7 + 3,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: 1,
          shape: ['rect', 'circle', 'star'][Math.floor(Math.random() * 3)] as 'rect' | 'circle' | 'star',
        });
      }
    }

    function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const innerAngle = angle + (2 * Math.PI) / 10;
        if (i === 0) ctx.moveTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
        else ctx.lineTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
        ctx.lineTo(x + (r / 2) * Math.cos(innerAngle), y + (r / 2) * Math.sin(innerAngle));
      }
      ctx.closePath();
    }

    let lastSpawn = 0;

    function animate(ts: number) {
      if (!canvas) return;
      animRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (activeRef.current && ts - lastSpawn > 200) {
        spawn(20);
        lastSpawn = ts;
      }

      pieces.current = pieces.current.filter(p => p.y < canvas.height + 30 && p.alpha > 0.05);

      for (const p of pieces.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.vx *= 0.99;
        p.rotation += p.rotationSpeed;
        if (p.y > canvas.height * 0.7) p.alpha -= 0.02;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.width / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          drawStar(ctx, 0, 0, p.width / 2);
          ctx.fill();
        }
        ctx.restore();
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
      id="confetti-canvas"
    />
  );
}
