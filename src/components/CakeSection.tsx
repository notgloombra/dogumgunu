import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Props {
  onCakeClick: () => void;
  candlesBlown: boolean;
}

const CANDLE_COLORS = ['#f472b6', '#fbbf24', '#c084fc', '#34d399', '#60a5fa', '#fb7185', '#a78bfa'];

export default function CakeSection({ onCakeClick, candlesBlown }: Props) {
  const [clicked, setClicked] = useState(false);
  const [smokes, setSmokes] = useState<number[]>([]);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    setSmokes([0, 1, 2, 3, 4, 5, 6]);
    setTimeout(() => setSmokes([]), 2500);
    onCakeClick();
  };

  return (
    <section className="py-20 px-4 relative">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {/* Heading */}
        <div className="text-center mb-14">
          <motion.div
            className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-5"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-sm">🎂</span>
            <span className="font-body text-sm font-medium" style={{ color: '#7c3d6b' }}>Dilek Dile</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-3">
            Doğum Günü Pastası
          </h2>
          <p className="font-body text-lg" style={{ color: '#9d4a80' }}>
            {clicked ? 'Dilekler evrene gönderildi! ✨' : 'Mumları üflemek için pastaya tıkla!'}
          </p>
        </div>

        {/* Cake container */}
        <div className="flex justify-center">
          <motion.div
            className="relative cursor-pointer select-none"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleClick}
            animate={clicked ? { rotate: [0, -3, 3, -2, 2, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl blur-3xl opacity-40"
              style={{ background: 'radial-gradient(circle, #f472b6, #fbbf24, #c084fc)' }} />

            <div className="relative">
              <CakeSVG candlesBlown={candlesBlown || clicked} smokes={smokes} />
            </div>

            {/* Click hint */}
            {!clicked && (
              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="glass rounded-full px-4 py-1.5 font-body text-sm" style={{ color: '#be185d' }}>
                  Dilek dilemek için dokun! 🌟
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Wish message */}
        <AnimatePresence>
          {clicked && (
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-20 glass rounded-3xl p-8 text-center shadow-xl"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl mb-4"
              >
                🌟
              </motion.div>
              <p className="font-display text-2xl md:text-3xl font-semibold" style={{ color: '#be185d' }}>
                Tüm dileklerin gerçek olsun, Annem!
              </p>
              <p className="font-body text-lg mt-3" style={{ color: '#9d4a80' }}>
                Mutluluğun her şey demek. 💖
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function CakeSVG({ candlesBlown, smokes }: { candlesBlown: boolean; smokes: number[] }) {
  const CANDLE_COLORS = ['#f472b6', '#fbbf24', '#c084fc', '#34d399', '#60a5fa', '#fb7185', '#a78bfa'];
  return (
    <svg width="320" height="320" viewBox="0 0 320 320" className="drop-shadow-2xl">
      {/* Plate */}
      <ellipse cx="160" cy="285" rx="130" ry="20" fill="rgba(249,168,212,0.3)" />
      <ellipse cx="160" cy="282" rx="125" ry="16" fill="rgba(249,168,212,0.2)" />

      {/* Bottom tier */}
      <rect x="55" y="200" width="210" height="80" rx="12" fill="#fda4af" />
      <rect x="55" y="200" width="210" height="12" rx="6" fill="#fecdd3" />
      <rect x="55" y="268" width="210" height="12" rx="6" fill="#fecdd3" />

      {/* Frosting drips on bottom tier */}
      {[80, 110, 140, 170, 200, 230].map((x, i) => (
        <path key={i} d={`M${x} 200 Q${x + 5} 215 ${x} 225 Q${x - 5} 235 ${x} 248`}
          stroke="white" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.7" />
      ))}

      {/* Dots decoration bottom tier */}
      {[90, 120, 150, 180, 210, 240].map((x, i) => (
        <circle key={i} cx={x} cy={235} r="5" fill={CANDLE_COLORS[i % CANDLE_COLORS.length]} opacity="0.8" />
      ))}

      {/* Middle tier */}
      <rect x="85" y="130" width="150" height="75" rx="10" fill="#f9a8d4" />
      <rect x="85" y="130" width="150" height="10" rx="5" fill="#fecdd3" />
      <rect x="85" y="195" width="150" height="10" rx="5" fill="#fecdd3" />

      {/* Frosting drips middle tier */}
      {[105, 130, 155, 180, 205].map((x, i) => (
        <path key={i} d={`M${x} 130 Q${x + 4} 142 ${x} 152 Q${x - 4} 162 ${x} 172`}
          stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.7" />
      ))}

      {/* Hearts on middle tier */}
      {[120, 160, 200].map((x, i) => (
        <text key={i} x={x - 8} y={170} fontSize="16" opacity="0.7">❤️</text>
      ))}

      {/* Top tier */}
      <rect x="105" y="75" width="110" height="60" rx="10" fill="#f472b6" />
      <rect x="105" y="75" width="110" height="10" rx="5" fill="#fecdd3" />
      <rect x="105" y="125" width="110" height="10" rx="5" fill="#fecdd3" />

      {/* Frosting drips top tier */}
      {[120, 145, 170, 195].map((x, i) => (
        <path key={i} d={`M${x} 75 Q${x + 4} 85 ${x} 95 Q${x - 4} 102 ${x} 110`}
          stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.8" />
      ))}

      {/* Stars on top tier */}
      {[130, 155, 180].map((x, i) => (
        <text key={i} x={x - 7} y={115} fontSize="13" opacity="0.8">⭐</text>
      ))}

      {/* Candles */}
      {CANDLE_COLORS.map((color, i) => {
        const cx = 80 + i * 27;
        return (
          <g key={i}>
            {/* Candle body */}
            <rect x={cx - 5} y={45} width="10" height="32" rx="3" fill={color} opacity="0.9" />
            {/* Wick */}
            <line x1={cx} y1={45} x2={cx} y2={39} stroke="#444" strokeWidth="1.5" />
            {/* Flame */}
            {!candlesBlown && (
              <motion.g
                animate={{ scaleX: [1, 0.7, 1.1, 0.8, 1], scaleY: [1, 1.2, 0.9, 1.1, 1] }}
                transition={{ duration: 0.3 + i * 0.05, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: `${cx}px 39px` }}
              >
                {/* Outer flame */}
                <ellipse cx={cx} cy={32} rx="6" ry="9" fill="#fbbf24" opacity="0.95" />
                {/* Inner flame */}
                <ellipse cx={cx} cy={33} rx="3.5" ry="6" fill="#fff7ed" opacity="0.9" />
                {/* Glow */}
                <ellipse cx={cx} cy={32} rx="9" ry="12" fill="#fbbf24" opacity="0.25" />
              </motion.g>
            )}
          </g>
        );
      })}

      {/* Smoke wisps */}
      {smokes.map(i => (
        <motion.g key={i}>
          {[0, 1, 2].map(j => (
            <motion.path
              key={j}
              d={`M${80 + i * 27} 32 Q${80 + i * 27 + (j - 1) * 6} ${10 + j * 8} ${80 + i * 27 + (j - 1) * 8} -10`}
              stroke="rgba(150,150,150,0.6)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.6, 0], y: [-5, -20] }}
              transition={{ duration: 1.5, delay: j * 0.15 + i * 0.05, ease: 'easeOut' }}
            />
          ))}
        </motion.g>
      ))}
    </svg>
  );
}
