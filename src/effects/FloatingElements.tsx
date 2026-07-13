import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface HeartBurst {
  id: number;
  x: number;
  y: number;
}

interface FloatingHeart {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
}

interface Butterfly {
  id: number;
  x: number;
  y: number;
  color: string;
}

interface Firefly {
  id: number;
  x: number;
  y: number;
  delay: number;
}

let elId = 0;

export default function FloatingElements() {
  const [heartBursts, setHeartBursts] = useState<HeartBurst[]>([]);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [butterflies] = useState<Butterfly[]>(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 60,
      color: ['#f472b6', '#c084fc', '#fbbf24', '#34d399', '#60a5fa', '#fb7185'][i],
    }))
  );
  const [fireflies] = useState<Firefly[]>(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: 20 + Math.random() * 70,
      delay: Math.random() * 5,
    }))
  );

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const burstId = elId++;
      const burst: HeartBurst = { id: burstId, x: e.clientX, y: e.clientY };
      setHeartBursts(prev => [...prev, burst]);
      setTimeout(() => setHeartBursts(prev => prev.filter(h => h.id !== burstId)), 1500);
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    const spawn = () => {
      const id = elId++;
      const heart: FloatingHeart = {
        id,
        x: Math.random() * 100,
        color: ['#f472b6', '#fb7185', '#f9a8d4', '#fda4af', '#c084fc'][Math.floor(Math.random() * 5)],
        size: 14 + Math.random() * 18,
        delay: 0,
      };
      setFloatingHearts(prev => [...prev.slice(-20), heart]);
      setTimeout(() => setFloatingHearts(prev => prev.filter(h => h.id !== id)), 5000);
    };
    const interval = setInterval(spawn, 1200);
    return () => clearInterval(interval);
  }, []);

  const HeartSvg = ({ color, size }: { color: string; size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
    </svg>
  );

  const ButterflyIcon = ({ color }: { color: string }) => (
    <svg width="28" height="22" viewBox="0 0 60 46">
      <ellipse cx="20" cy="20" rx="18" ry="12" fill={color} opacity="0.8" transform="rotate(-20 20 20)" />
      <ellipse cx="40" cy="20" rx="18" ry="12" fill={color} opacity="0.8" transform="rotate(20 40 20)" />
      <ellipse cx="18" cy="30" rx="12" ry="8" fill={color} opacity="0.7" transform="rotate(10 18 30)" />
      <ellipse cx="42" cy="30" rx="12" ry="8" fill={color} opacity="0.7" transform="rotate(-10 42 30)" />
      <ellipse cx="30" cy="23" rx="3" ry="12" fill="rgba(0,0,0,0.4)" />
    </svg>
  );

  return (
    <>
      {/* Fireflies */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {fireflies.map(ff => (
          <motion.div
            key={ff.id}
            className="absolute rounded-full"
            style={{ left: `${ff.x}%`, top: `${ff.y}%`, width: 6, height: 6 }}
            animate={{
              opacity: [0, 0.9, 0, 0.7, 0],
              x: [0, 25, 10, -15, 0],
              y: [0, -20, -5, -30, 0],
              scale: [0.5, 1.2, 0.7, 1, 0.5],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: ff.delay,
              ease: 'easeInOut',
            }}
          >
            <div className="w-full h-full rounded-full bg-yellow-200 shadow-[0_0_8px_3px_rgba(253,224,71,0.8)]" />
          </motion.div>
        ))}
      </div>

      {/* Floating hearts */}
      <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
        <AnimatePresence>
          {floatingHearts.map(h => (
            <motion.div
              key={h.id}
              className="absolute"
              style={{ left: `${h.x}%`, bottom: '-30px' }}
              initial={{ y: 0, opacity: 1, x: 0, scale: 1 }}
              animate={{
                y: -window.innerHeight * 0.7,
                opacity: [1, 1, 0],
                x: [0, 15, -10, 20, -5],
                scale: [1, 1.1, 0.9, 0.5],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 4.5, ease: 'easeOut', x: { duration: 4.5, times: [0, 0.25, 0.5, 0.75, 1] } }}
            >
              <HeartSvg color={h.color} size={h.size} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Click heart bursts */}
      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
        <AnimatePresence>
          {heartBursts.map(burst => (
            <div key={burst.id} className="absolute" style={{ left: burst.x, top: burst.y }}>
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const dist = 40 + Math.random() * 30;
                return (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ left: -8, top: -8 }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                    animate={{
                      x: Math.cos(angle) * dist,
                      y: Math.sin(angle) * dist,
                      scale: [0, 1.2, 0],
                      opacity: [1, 1, 0],
                    }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    <HeartSvg
                      color={['#f472b6', '#fb7185', '#c084fc', '#fbbf24'][i % 4]}
                      size={12 + Math.random() * 8}
                    />
                  </motion.div>
                );
              })}
            </div>
          ))}
        </AnimatePresence>
      </div>

      {/* Butterflies */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {butterflies.map(b => (
          <motion.div
            key={b.id}
            className="absolute"
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
            animate={{
              x: [0, 40, 20, -30, 10, 0],
              y: [0, -25, -50, -20, -40, 0],
              rotate: [0, 8, -5, 10, -3, 0],
            }}
            transition={{
              duration: 10 + b.id * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: b.id * 0.8,
            }}
          >
            <motion.div
              animate={{ scaleX: [1, -1, 1] }}
              transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ButterflyIcon color={b.color} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </>
  );
}
