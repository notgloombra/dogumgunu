import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Balloon {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
}

const BALLOON_COLORS = [
  '#f472b6', '#fb7185', '#c084fc', '#fbbf24', '#34d399',
  '#60a5fa', '#f9a8d4', '#fde68a', '#a78bfa', '#ff6b9d',
];

let balloonId = 0;

export default function Balloons({ active }: { active: boolean }) {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    if (!active) return;

    const spawn = () => {
      const count = 5 + Math.floor(Math.random() * 4);
      const newBalloons: Balloon[] = [];
      for (let i = 0; i < count; i++) {
        newBalloons.push({
          id: balloonId++,
          x: 5 + Math.random() * 90,
          color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
          delay: Math.random() * 1.5,
          duration: 6 + Math.random() * 4,
          size: 40 + Math.random() * 30,
        });
      }
      setBalloons(prev => [...prev, ...newBalloons]);
      setTimeout(() => {
        setBalloons(prev => prev.filter(b => !newBalloons.find(nb => nb.id === b.id)));
      }, 12000);
    };

    spawn();
    const interval = setInterval(spawn, 3000);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {balloons.map(balloon => (
          <motion.div
            key={balloon.id}
            className="absolute bottom-0"
            style={{ left: `${balloon.x}%` }}
            initial={{ y: '100vh', opacity: 0, rotate: 0 }}
            animate={{
              y: '-110vh',
              opacity: [0, 1, 1, 1, 0],
              rotate: [0, -8, 8, -5, 5, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: balloon.duration,
              delay: balloon.delay,
              ease: 'easeOut',
              rotate: { repeat: Infinity, duration: 2 },
            }}
          >
            <div className="flex flex-col items-center">
              <svg width={balloon.size} height={balloon.size * 1.2} viewBox="0 0 60 72">
                <ellipse cx="30" cy="28" rx="24" ry="27"
                  fill={balloon.color}
                  stroke="rgba(0,0,0,0.1)"
                  strokeWidth="1"
                />
                <ellipse cx="21" cy="18" rx="7" ry="5"
                  fill="rgba(255,255,255,0.4)"
                  transform="rotate(-30 21 18)"
                />
                <path d="M30 55 Q28 58 30 62 Q32 66 30 70"
                  stroke="rgba(0,0,0,0.25)"
                  strokeWidth="1.5"
                  fill="none"
                />
                <polygon points="26,54 34,54 30,58" fill={balloon.color} />
              </svg>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
