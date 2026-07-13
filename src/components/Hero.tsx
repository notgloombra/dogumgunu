import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Sparkles } from 'lucide-react';

interface Props {
  onCelebrate: () => void;
  isCelebrating: boolean;
}

export default function Hero({ onCelebrate, isCelebrating }: Props) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);
  let rippleId = 0;

  const handleCelebrate = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = btnRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = rippleId++;
      setRipples(prev => [...prev, { id, x, y }]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700);
    }
    onCelebrate();
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center overflow-hidden">
      {/* Decorative circles */}
      <motion.div
        className="absolute top-20 left-10 w-24 h-24 rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, #f472b6, #c084fc)' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-16 h-16 rounded-full opacity-25"
        style={{ background: 'radial-gradient(circle, #fbbf24, #f472b6)' }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      {/* Crown decoration */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, type: 'spring' }}
        className="mb-6"
      >
        <svg width="80" height="60" viewBox="0 0 80 60">
          <polygon
            points="10,50 10,20 25,35 40,5 55,35 70,20 70,50"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <polygon
            points="10,50 10,20 25,35 40,5 55,35 70,20 70,50"
            fill="rgba(251,191,36,0.2)"
          />
          {[10, 25, 40, 55, 70].map((x, i) => (
            <circle key={i} cx={x} cy={i === 2 ? 5 : i % 2 === 0 ? 50 : 35} r="4"
              fill="#fbbf24" className="animate-twinkle" />
          ))}
        </svg>
      </motion.div>

      {/* Main title */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4, type: 'spring', stiffness: 100 }}
      >
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-3">
          <span className="gradient-text">İyi ki Doğdun</span>
        </h1>
        <div className="flex items-center justify-center gap-4 mb-4">
          <motion.span
            className="text-4xl"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
          >
            🎉
          </motion.span>
          <h2
            className="font-display text-6xl md:text-8xl lg:text-9xl font-bold"
            style={{
              background: 'linear-gradient(135deg, #be185d, #f472b6, #fbbf24, #f472b6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 20px rgba(244,114,182,0.4))',
            }}
          >
            Annem!
          </h2>
          <motion.span
            className="text-4xl"
            animate={{ rotate: [0, -15, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 1.5 }}
          >
            🎂
          </motion.span>
        </div>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="glass rounded-3xl px-8 py-6 max-w-2xl mb-10 shadow-xl"
      >
        <p
          className="font-body text-lg md:text-xl leading-relaxed"
          style={{ color: '#7c3d6b', lineHeight: '1.8' }}
        >
          Dünyanın en güzel annesine.
          <br />
          Sonsuz sevgin, ilgin, nezaketin ve benim için yaptığın her şey için teşekkür ederim.
          <br />
          <br />
          Bugün senin özel günün; umarım sana, hayatıma getirdiğin mutluluğun aynısını yaşatır.
          <br />
          <span
            className="font-display font-semibold text-2xl mt-2 block"
            style={{ color: '#be185d' }}
          >
            Seni çok seviyorum. ❤️
          </span>
        </p>
      </motion.div>

      {/* Celebrate button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mb-8"
      >
        <button
          ref={btnRef}
          onClick={handleCelebrate}
          className="btn-primary relative overflow-hidden text-white font-body font-bold text-xl md:text-2xl px-12 py-5 rounded-full shadow-2xl animate-pulse-glow"
          style={{
            background: 'linear-gradient(135deg, #ec4899, #f472b6, #c084fc, #ec4899)',
            backgroundSize: '300% 300%',
            animation: 'shimmer 3s linear infinite, pulseGlow 2s ease-in-out infinite',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          <AnimatePresence>
            {ripples.map(r => (
              <motion.span
                key={r.id}
                className="absolute rounded-full bg-white"
                style={{ left: r.x - 10, top: r.y - 10, width: 20, height: 20 }}
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 8, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            ))}
          </AnimatePresence>
          <span className="relative z-10 flex items-center gap-3">
            <Sparkles size={22} />
            {isCelebrating ? 'Kutlanıyor! 🎊' : 'Kutla!'}
            <Sparkles size={22} />
          </span>
        </button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
          style={{ color: '#be185d' }}
        >
          <p className="font-body text-sm opacity-60">Aşağı kaydır</p>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" opacity={0.5}>
            <path d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6z" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
