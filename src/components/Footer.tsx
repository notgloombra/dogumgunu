import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-16 px-4 relative overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(244,114,182,0.4), transparent)' }} />

      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Stars */}
        <div className="flex justify-center gap-2 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.span
              key={i}
              className="text-xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
            >
              ⭐
            </motion.span>
          ))}
        </div>

        {/* Main footer text */}
        <motion.div
          className="glass rounded-3xl px-8 py-8 shadow-xl inline-block"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-body text-lg md:text-xl mb-2" style={{ color: '#7c3d6b' }}>
            Sevgiyle
          </p>
          <div className="flex items-center justify-center gap-3 mb-3">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              <Heart size={28} fill="#ec4899" style={{ color: '#ec4899' }} />
            </motion.div>
            <p className="font-display text-2xl md:text-3xl font-bold gradient-text">
              muhteşem annem için yapıldı
            </p>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
            >
              <Heart size={28} fill="#ec4899" style={{ color: '#ec4899' }} />
            </motion.div>
          </div>
          <p className="font-body" style={{ color: '#9d4a80' }}>
            İyi ki Doğdun 41. Yaşında, Annem! 14 Temmuz 2026 🎂
          </p>
        </motion.div>

        {/* Decorative flowers */}
        <div className="flex justify-center gap-6 mt-8 text-2xl opacity-60">
          {['🌸', '🌷', '🌺', '🌻', '🌹', '🌸'].map((flower, i) => (
            <motion.span
              key={i}
              animate={{ rotate: [0, 15, -15, 0], y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
            >
              {flower}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </footer>
  );
}
