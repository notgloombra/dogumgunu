import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';

const photos = [
  {
    id: 1028741,
    alt: 'Birthday celebration with flowers',
    caption: 'Beautiful moments like these are what life is made of',
  },
  {
    id: 931177,
    alt: 'Pink flowers in bloom',
    caption: 'As beautiful as the flowers you tend with love',
  },
  {
    id: 1741205,
    alt: 'Celebration and joy',
    caption: 'Every day with you is a celebration',
  },
  {
    id: 796603,
    alt: 'Delicate pink blooms',
    caption: 'Your kindness blooms like the finest flowers',
  },
  {
    id: 1183434,
    alt: 'Magical sparkles',
    caption: 'You bring magic into every room you enter',
  },
  {
    id: 1729808,
    alt: 'Colorful balloons',
    caption: 'Life is brighter with you in it',
  },
];

function getPhotoUrl(id: number, size = 600) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${size}`;
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () => setLightbox(i => i !== null ? (i - 1 + photos.length) % photos.length : null);
  const next = () => setLightbox(i => i !== null ? (i + 1) % photos.length : null);

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
            <ImageIcon size={16} style={{ color: '#ec4899' }} />
            <span className="font-body text-sm font-medium" style={{ color: '#7c3d6b' }}>Moments to Remember</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-3">
            Our Gallery
          </h2>
          <p className="font-body text-lg" style={{ color: '#9d4a80' }}>
            Replace these with your own precious memories
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ scale: 1.04, zIndex: 10 }}
              className="relative overflow-hidden rounded-2xl cursor-pointer group shadow-lg"
              style={{ aspectRatio: i === 0 || i === 5 ? '4/5' : '1/1' }}
              onClick={() => setLightbox(i)}
            >
              <img
                src={getPhotoUrl(photo.id)}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, rgba(190,24,93,0.7) 0%, transparent 60%)' }}>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-body text-white text-sm leading-snug">{photo.caption}</p>
                </div>
              </div>
              {/* Pink border glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: 'inset 0 0 0 2px rgba(244,114,182,0.6)' }} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full mx-4"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={getPhotoUrl(photos[lightbox].id, 1200)}
                alt={photos[lightbox].alt}
                className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-center rounded-b-2xl"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }}>
                <p className="font-body text-white text-base">{photos[lightbox].caption}</p>
                <p className="font-body text-white/60 text-xs mt-1">{lightbox + 1} / {photos.length}</p>
              </div>

              {/* Controls */}
              <button onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                <X size={18} />
              </button>
              <button onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                <ChevronLeft size={22} />
              </button>
              <button onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                <ChevronRight size={22} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
