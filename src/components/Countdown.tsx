import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Calendar, Clock, Gift } from 'lucide-react';

const BIRTHDAY = new Date(1985, 6, 14); // July 14, 1985

function getAge(): number {
  const now = new Date();
  let age = now.getFullYear() - BIRTHDAY.getFullYear();
  const m = now.getMonth() - BIRTHDAY.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < BIRTHDAY.getDate())) age--;
  return age;
}

function getNextBirthday(): Date {
  const now = new Date();
  const next = new Date(now.getFullYear(), 6, 14); // July 14
  if (now > next) next.setFullYear(now.getFullYear() + 1);
  return next;
}

function getTimeLeft() {
  const now = new Date();
  const target = getNextBirthday();
  const diff = Math.max(0, target.getTime() - now.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

interface CounterProps {
  value: number;
  label: string;
  delay?: number;
  accent?: string;
}

function Counter({ value, label, delay = 0, accent = '#ec4899' }: CounterProps) {
  const [displayed, setDisplayed] = useState(0);
  const prevRef = useRef(0);

  useEffect(() => {
    if (value === prevRef.current) return;
    prevRef.current = value;
    let start = displayed;
    const end = value;
    const duration = 600;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(start + (end - start) * ease));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const digits = String(displayed).padStart(2, '0').split('');

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="glass rounded-2xl p-5 flex flex-col items-center card-hover min-w-[100px]"
    >
      <div className="flex gap-1 mb-2">
        {digits.map((d, i) => (
          <motion.span
            key={i}
            className="font-display font-bold text-4xl md:text-5xl"
            style={{ color: accent, textShadow: `0 0 20px ${accent}60` }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            {d}
          </motion.span>
        ))}
      </div>
      <span className="font-body text-sm font-medium uppercase tracking-widest" style={{ color: '#9d4a80' }}>
        {label}
      </span>
    </motion.div>
  );
}

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft);
  const isBirthday = time.days === 0 && time.hours === 0 && time.minutes === 0;
  const isToday = (() => {
    const now = new Date();
    return now.getMonth() === 6 && now.getDate() === 14;
  })();

  useEffect(() => {
    const tick = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(tick);
  }, []);

  return (
    <section className="py-20 px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        {/* Section heading */}
        <div className="text-center mb-14">
          <motion.div
            className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-5"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <Calendar size={16} style={{ color: '#ec4899' }} />
            <span className="font-body text-sm font-medium" style={{ color: '#7c3d6b' }}>Önemli Tarihler</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-bold gradient-text mb-3">
            {isToday ? 'Bugün Onun Günü! 🎂' : 'O Güne Geri Sayım'}
          </h2>
          <p className="font-body text-lg" style={{ color: '#9d4a80' }}>
            14 Temmuz 1985 — Kutluyoruz{' '}
            <span className="font-bold gradient-text-gold">{getAge()} güzel yılı</span>
          </p>
        </div>

        {/* Birthday card */}
        <motion.div
          className="glass rounded-3xl p-8 mb-10 text-center shadow-xl"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #f472b6, #c084fc)' }}>
                <Gift size={22} color="white" />
              </div>
              <div className="text-left">
                <p className="font-body text-xs uppercase tracking-wider" style={{ color: '#9d4a80' }}>Doğum Günü</p>
                <p className="font-display font-semibold text-xl" style={{ color: '#be185d' }}>14 Temmuz 1985</p>
              </div>
            </div>
            <div className="w-px h-12 bg-pink-200 hidden md:block" />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #fbbf24, #f472b6)' }}>
                <span className="text-xl font-bold text-white">{getAge()}</span>
              </div>
              <div className="text-left">
                <p className="font-body text-xs uppercase tracking-wider" style={{ color: '#9d4a80' }}>Yaşında</p>
                <p className="font-display font-semibold text-xl gradient-text-gold">Hep Genç</p>
              </div>
            </div>
          </div>

          {/* Countdown */}
          {!isToday && (
            <>
              <div className="flex items-center justify-center gap-2 mb-6">
                <Clock size={16} style={{ color: '#ec4899' }} />
                <span className="font-body text-sm uppercase tracking-wider" style={{ color: '#9d4a80' }}>
                  {isBirthday ? 'Bugün doğum günü! 🎉' : 'O büyük güne kalan süre'}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Counter value={time.days} label="Gün" delay={0} accent="#ec4899" />
                <span className="font-display text-3xl font-bold" style={{ color: '#f9a8d4', marginTop: '-20px' }}>:</span>
                <Counter value={time.hours} label="Saat" delay={0.1} accent="#c084fc" />
                <span className="font-display text-3xl font-bold" style={{ color: '#f9a8d4', marginTop: '-20px' }}>:</span>
                <Counter value={time.minutes} label="Dakika" delay={0.2} accent="#f472b6" />
                <span className="font-display text-3xl font-bold" style={{ color: '#f9a8d4', marginTop: '-20px' }}>:</span>
                <Counter value={time.seconds} label="Saniye" delay={0.3} accent="#fbbf24" />
              </div>
            </>
          )}

          {isToday && (
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="font-display text-3xl md:text-4xl font-bold gradient-text"
            >
              İyi ki Doğdun Annem! 🎉🎂🎊
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
