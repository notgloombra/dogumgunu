import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const cards = [
  {
    icon: '❤️',
    title: 'Her Zaman İnandın',
    message: 'Kendime inanamadığım anlarda bile bana hep inandığın için teşekkür ederim. Güvenin bana kanat taktı.',
    gradient: 'from-rose-100 to-pink-100',
    accent: '#be185d',
    delay: 0,
  },
  {
    icon: '🌸',
    title: 'Sonsuz Nezaket',
    message: 'Nezaketin her günü aydınlatıyor. Etrafındaki herkese gösterdiğin özen, dünyanın layık olmadığı bir hediye.',
    gradient: 'from-pink-100 to-purple-100',
    accent: '#9333ea',
    delay: 0.1,
  },
  {
    icon: '💖',
    title: 'Ailenin Kalbi',
    message: 'Sen ailemizin kalbisin — hepimizi bir arada tutan sıcaklık, bizi güçlü kılan sevgi.',
    gradient: 'from-purple-100 to-lavender-100',
    accent: '#ec4899',
    delay: 0.2,
  },
  {
    icon: '🌷',
    title: 'Her Şeyi Hak Ediyorsun',
    message: 'Dünyadaki tüm mutluluğu, açan her çiçeği, gökteki her yıldızı ve daha fazlasını hak ediyorsun.',
    gradient: 'from-amber-50 to-rose-100',
    accent: '#d97706',
    delay: 0.3,
  },
  {
    icon: '✨',
    title: 'Gerçekten Harika',
    message: 'Tanıdığım en harika insansın. Zeki, güçlü, güzel — içten ve dıştan. İyi ki Doğdun!',
    gradient: 'from-pink-100 to-amber-50',
    accent: '#f472b6',
    delay: 0.4,
  },
  {
    icon: '🎀',
    title: 'Bir Annenin Sevgisi',
    message: 'Sevginin benim için ne anlam ifade ettiğini anlatmaya hiçbir sözcük yetmez. Kendin olduğun için teşekkür ederim.',
    gradient: 'from-rose-50 to-pink-100',
    accent: '#be185d',
    delay: 0.5,
  },
];

export default function MemoryCards() {
  return (
    <section className="py-20 px-4 relative">
      <motion.div
        className="max-w-6xl mx-auto"
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
            <Heart size={16} fill="#ec4899" style={{ color: '#ec4899' }} />
            <span className="font-body text-sm font-medium" style={{ color: '#7c3d6b' }}>Yürekten</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-3">
            Sevgi Sözcükleri
          </h2>
          <p className="font-body text-lg" style={{ color: '#9d4a80' }}>
            Her zaman söylemek istediğim şeyler
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: card.delay }}
              whileHover={{ y: -12, scale: 1.02 }}
              className={`bg-gradient-to-br ${card.gradient} rounded-3xl p-7 cursor-default relative overflow-hidden group`}
              style={{
                border: '1px solid rgba(255,255,255,0.7)',
                boxShadow: '0 8px 32px rgba(249,168,212,0.15)',
              }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
                }} />

              {/* Decorative circle */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20"
                style={{ background: `radial-gradient(circle, ${card.accent}, transparent)` }} />

              {/* Content */}
              <div className="relative z-10">
                <motion.div
                  className="text-4xl mb-4"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {card.icon}
                </motion.div>
                <h3 className="font-display font-semibold text-xl mb-3" style={{ color: card.accent }}>
                  {card.title}
                </h3>
                <p className="font-body text-base leading-relaxed" style={{ color: '#5a3050', lineHeight: '1.7' }}>
                  {card.message}
                </p>
              </div>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 rounded-b-3xl"
                style={{ background: `linear-gradient(to right, ${card.accent}, transparent)` }}
                initial={{ width: 0 }}
                whileInView={{ width: '60%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: card.delay + 0.4 }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
