import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
}

interface Cloud {
  id: number;
  y: number;
  scale: number;
  delay: number;
  duration: number;
  opacity: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

export default function BackgroundScene() {
  const stars = useMemo<Star[]>(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
      color: ['#fde68a', '#fbbf24', '#f9a8d4', '#ddd6fe', '#ffffff'][Math.floor(Math.random() * 5)],
    })), []
  );

  const clouds = useMemo<Cloud[]>(() =>
    Array.from({ length: 4 }, (_, i) => ({
      id: i,
      y: 5 + i * 8,
      scale: 0.6 + Math.random() * 0.8,
      delay: i * 8,
      duration: 35 + Math.random() * 20,
      opacity: 0.15 + Math.random() * 0.2,
    })), []
  );

  const particles = useMemo<Particle[]>(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 20 + Math.random() * 70,
      size: Math.random() * 6 + 2,
      color: ['rgba(249,168,212,0.4)', 'rgba(253,224,71,0.3)', 'rgba(192,132,252,0.3)', 'rgba(251,191,36,0.25)'][Math.floor(Math.random() * 4)],
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 6,
    })), []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, #fff5f7 0%, #fdf2ff 25%, #fff9f0 50%, #f0f4ff 75%, #fff5f7 100%)',
        }}
      />

      {/* Subtle radial glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(244,114,182,0.4) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full opacity-25"
        style={{ background: 'radial-gradient(circle, rgba(192,132,252,0.4) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      {/* Stars */}
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            background: star.color,
            boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: star.duration, repeat: Infinity, delay: star.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* Clouds */}
      {clouds.map(cloud => (
        <motion.div
          key={cloud.id}
          className="absolute"
          style={{ top: `${cloud.y}%`, opacity: cloud.opacity }}
          initial={{ x: '-200px' }}
          animate={{ x: `calc(100vw + 200px)` }}
          transition={{ duration: cloud.duration, repeat: Infinity, delay: cloud.delay, ease: 'linear' }}
        >
          <CloudShape scale={cloud.scale} />
        </motion.div>
      ))}

      {/* Ambient particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3], scale: [1, 1.3, 1] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function CloudShape({ scale }: { scale: number }) {
  return (
    <svg
      width={200 * scale}
      height={80 * scale}
      viewBox="0 0 200 80"
    >
      <ellipse cx="100" cy="60" rx="90" ry="28" fill="white" />
      <ellipse cx="70" cy="48" rx="40" ry="32" fill="white" />
      <ellipse cx="120" cy="45" rx="44" ry="35" fill="white" />
      <ellipse cx="155" cy="55" rx="32" ry="25" fill="white" />
      <ellipse cx="45" cy="55" rx="30" ry="23" fill="white" />
    </svg>
  );
}
