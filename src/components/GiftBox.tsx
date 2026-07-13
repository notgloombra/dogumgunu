import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Gift } from 'lucide-react';

interface Props {
  onOpen: () => void;
}

export default function GiftBox({ onOpen }: Props) {
  const [opened, setOpened] = useState(false);
  const [lidFlying, setLidFlying] = useState(false);

  const handleClick = () => {
    if (opened) return;
    setLidFlying(true);
    setTimeout(() => {
      setOpened(true);
      onOpen();
    }, 600);
  };

  return (
    <section className="py-20 px-4 relative">
      <motion.div
        className="max-w-3xl mx-auto"
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
            <Gift size={16} style={{ color: '#ec4899' }} />
            <span className="font-body text-sm font-medium" style={{ color: '#7c3d6b' }}>Özel Bir Hediye</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-3">
            Sana Özel Bir Şey Var
          </h2>
          <p className="font-body text-lg" style={{ color: '#9d4a80' }}>
            {opened ? 'Dünyanın tüm sevgisiyle 💖' : 'Açmak için hediyeye tıkla!'}
          </p>
        </div>

        <div className="flex flex-col items-center">
          {/* Gift box */}
          <motion.div
            className="relative cursor-pointer select-none"
            whileHover={!opened ? { y: -8 } : {}}
            whileTap={!opened ? { scale: 0.95 } : {}}
            onClick={handleClick}
            animate={!opened ? {
              y: [0, -6, 0],
            } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Glow */}
            <div className="absolute inset-0 blur-2xl opacity-50 rounded-full"
              style={{ background: 'radial-gradient(circle, #f472b6, #fbbf24)' }} />

            <div className="relative">
              <GiftSVG lidFlying={lidFlying} opened={opened} />
            </div>

            {!opened && !lidFlying && (
              <motion.div
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="glass rounded-full px-4 py-1.5 font-body text-sm" style={{ color: '#be185d' }}>
                  Beni aç! 🎁
                </span>
              </motion.div>
            )}
          </motion.div>

          {/* Message after opening */}
          <AnimatePresence>
            {opened && (
              <motion.div
                initial={{ y: 40, opacity: 0, scale: 0.85 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, type: 'spring', stiffness: 100 }}
                className="mt-20 glass rounded-3xl p-10 text-center max-w-xl shadow-2xl"
                style={{ border: '1px solid rgba(244,114,182,0.4)' }}
              >
                <motion.div
                  className="text-6xl mb-6"
                  animate={{ rotate: [0, 15, -15, 10, -10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: 2 }}
                >
                  💝
                </motion.div>
                <p
                  className="font-display text-2xl md:text-3xl font-semibold leading-snug"
                  style={{ color: '#be185d', lineHeight: '1.4' }}
                >
                  "Sen, hayatın bana verdiği en büyük hediyesin."
                </p>
                <div className="w-16 h-0.5 mx-auto my-5 rounded-full"
                  style={{ background: 'linear-gradient(to right, #f472b6, #c084fc)' }} />
                <p className="font-body text-lg" style={{ color: '#9d4a80' }}>
                  Her şey için teşekkür ederim, Annem. İyi ki Doğdun! 🎂
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

function GiftSVG({ lidFlying, opened }: { lidFlying: boolean; opened: boolean }) {
  return (
    <svg width="220" height="240" viewBox="0 0 220 240">
      {/* Shadow */}
      <ellipse cx="110" cy="235" rx="70" ry="10" fill="rgba(0,0,0,0.1)" />

      {/* Box body */}
      {!opened && (
        <g>
          <rect x="25" y="110" width="170" height="120" rx="8" fill="#f9a8d4" />
          <rect x="25" y="110" width="170" height="120" rx="8" fill="none"
            stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          {/* Vertical ribbon */}
          <rect x="98" y="110" width="24" height="120" rx="4"
            fill="url(#ribbonGradV)" opacity="0.9" />
          {/* Horizontal ribbon */}
          <rect x="25" y="158" width="170" height="24" rx="4"
            fill="url(#ribbonGradH)" opacity="0.9" />
          {/* Shine */}
          <rect x="35" y="120" width="40" height="8" rx="4" fill="rgba(255,255,255,0.4)" />
        </g>
      )}

      {/* Lid */}
      <AnimatePresence>
        {!lidFlying && !opened && (
          <motion.g key="lid">
            <motion.g
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <rect x="15" y="82" width="190" height="35" rx="8" fill="#f472b6" />
              <rect x="15" y="82" width="190" height="35" rx="8" fill="none"
                stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
              <rect x="98" y="82" width="24" height="35" rx="4" fill="url(#ribbonGradV)" opacity="0.9" />
              <rect x="15" y="93" width="190" height="13" rx="4" fill="url(#ribbonGradH)" opacity="0.9" />
            </motion.g>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Flying lid */}
      <AnimatePresence>
        {lidFlying && (
          <motion.g
            initial={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
            animate={{ y: -120, x: 30, rotate: 25, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <rect x="15" y="82" width="190" height="35" rx="8" fill="#f472b6" />
            <rect x="98" y="82" width="24" height="35" rx="4" fill="url(#ribbonGradV)" opacity="0.9" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Bow */}
      {!opened && (
        <g transform="translate(110, 78)">
          {/* Left loop */}
          <ellipse cx="-25" cy="-15" rx="22" ry="14" fill="#ec4899" transform="rotate(-20 -25 -15)" />
          <ellipse cx="-22" cy="-13" rx="14" ry="8" fill="#f472b6" transform="rotate(-20 -22 -13)" />
          {/* Right loop */}
          <ellipse cx="25" cy="-15" rx="22" ry="14" fill="#ec4899" transform="rotate(20 25 -15)" />
          <ellipse cx="22" cy="-13" rx="14" ry="8" fill="#f472b6" transform="rotate(20 22 -13)" />
          {/* Center */}
          <circle cx="0" cy="-2" r="10" fill="#be185d" />
          <circle cx="0" cy="-2" r="6" fill="#ec4899" />
        </g>
      )}

      {/* Open box with hearts bursting */}
      {opened && (
        <>
          <rect x="25" y="130" width="170" height="100" rx="8" fill="#f9a8d4" />
          <rect x="25" y="130" width="170" height="100" rx="8" fill="none"
            stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
          {/* Glowing interior */}
          <rect x="35" y="138" width="150" height="84" rx="6"
            fill="url(#glowInside)" />
          {[60, 95, 130, 160].map((x, i) => (
            <motion.text
              key={i}
              x={x} y={190}
              fontSize="22"
              initial={{ y: 190, opacity: 0 }}
              animate={{ y: 140 - i * 10, opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity, repeatDelay: 2 }}
            >
              💖
            </motion.text>
          ))}
        </>
      )}

      <defs>
        <linearGradient id="ribbonGradV" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#be185d" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#be185d" />
        </linearGradient>
        <linearGradient id="ribbonGradH" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#be185d" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#be185d" />
        </linearGradient>
        <radialGradient id="glowInside" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(253,224,71,0.5)" />
          <stop offset="100%" stopColor="rgba(249,168,212,0.2)" />
        </radialGradient>
      </defs>
    </svg>
  );
}
