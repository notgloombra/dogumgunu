import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';

const HAPPY_BIRTHDAY_NOTES = [
  // "Happy Birthday to You" melody
  { freq: 392, dur: 0.35 }, { freq: 392, dur: 0.15 }, { freq: 440, dur: 0.5 },
  { freq: 392, dur: 0.5 }, { freq: 523, dur: 0.5 }, { freq: 494, dur: 1.0 },
  { freq: 392, dur: 0.35 }, { freq: 392, dur: 0.15 }, { freq: 440, dur: 0.5 },
  { freq: 392, dur: 0.5 }, { freq: 587, dur: 0.5 }, { freq: 523, dur: 1.0 },
  { freq: 392, dur: 0.35 }, { freq: 392, dur: 0.15 }, { freq: 784, dur: 0.5 },
  { freq: 659, dur: 0.5 }, { freq: 523, dur: 0.5 }, { freq: 494, dur: 0.5 }, { freq: 440, dur: 0.9 },
  { freq: 698, dur: 0.35 }, { freq: 698, dur: 0.15 }, { freq: 659, dur: 0.5 },
  { freq: 523, dur: 0.5 }, { freq: 587, dur: 0.5 }, { freq: 523, dur: 1.2 },
  { freq: 0, dur: 0.5 }, // pause before loop
];

interface Props {
  visible: boolean;
}

export default function MusicPlayer({ visible }: Props) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [muted, setMuted] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const schedulerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playingRef = useRef(false);
  const noteIndexRef = useRef(0);
  const startTimeRef = useRef(0);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext();
      gainRef.current = ctxRef.current.createGain();
      gainRef.current.gain.value = volume;
      gainRef.current.connect(ctxRef.current.destination);
    }
    return { ctx: ctxRef.current, gain: gainRef.current! };
  }, [volume]);

  const scheduleNote = useCallback((freq: number, start: number, dur: number) => {
    const { ctx, gain } = getCtx();
    if (freq === 0) return;

    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = freq;
    osc.connect(noteGain);
    noteGain.connect(gain);

    noteGain.gain.setValueAtTime(0, start);
    noteGain.gain.linearRampToValueAtTime(0.6, start + 0.02);
    noteGain.gain.setValueAtTime(0.6, start + dur * 0.7);
    noteGain.gain.linearRampToValueAtTime(0, start + dur);

    osc.start(start);
    osc.stop(start + dur + 0.01);
  }, [getCtx]);

  const scheduleChunk = useCallback(() => {
    if (!playingRef.current) return;
    const { ctx } = getCtx();
    const now = ctx.currentTime;

    let time = Math.max(now + 0.05, startTimeRef.current);
    const lookahead = 1.5;

    while (time < now + lookahead) {
      const note = HAPPY_BIRTHDAY_NOTES[noteIndexRef.current % HAPPY_BIRTHDAY_NOTES.length];
      scheduleNote(note.freq, time, note.dur);
      time += note.dur;
      noteIndexRef.current++;
    }

    startTimeRef.current = time;
    schedulerRef.current = setTimeout(scheduleChunk, 800);
  }, [getCtx, scheduleNote]);

  const startMusic = useCallback(() => {
    const { ctx } = getCtx();
    if (ctx.state === 'suspended') ctx.resume();
    playingRef.current = true;
    noteIndexRef.current = 0;
    startTimeRef.current = ctx.currentTime;
    scheduleChunk();
    setPlaying(true);
  }, [getCtx, scheduleChunk]);

  const stopMusic = useCallback(() => {
    playingRef.current = false;
    if (schedulerRef.current) clearTimeout(schedulerRef.current);
    if (gainRef.current && ctxRef.current) {
      gainRef.current.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 0.5);
      setTimeout(() => {
        if (gainRef.current && ctxRef.current) {
          gainRef.current.gain.value = volume;
        }
      }, 600);
    }
    setPlaying(false);
  }, [volume]);

  // Auto-start when visible
  useEffect(() => {
    if (visible && !playing) {
      const timer = setTimeout(startMusic, 800);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.value = muted ? 0 : volume;
    }
  }, [volume, muted]);

  const toggle = () => {
    if (playing) stopMusic();
    else startMusic();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="fixed bottom-6 right-6 z-[500] music-player rounded-2xl px-5 py-4 shadow-2xl"
          style={{ border: '1px solid rgba(255,255,255,0.5)' }}
        >
          <div className="flex items-center gap-3">
            {/* Music icon with pulse */}
            <div className="relative">
              <motion.div
                animate={playing ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #ec4899, #c084fc)' }}
              >
                <Music size={16} color="white" />
              </motion.div>
              {playing && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
              )}
            </div>

            <div className="flex flex-col">
              <span className="font-body text-xs font-semibold" style={{ color: '#be185d' }}>
                İyi ki Doğdun
              </span>
              <span className="font-body text-xs opacity-60" style={{ color: '#7c3d6b' }}>
                {playing ? 'Çalıyor...' : 'Duraklandı'}
              </span>
            </div>

            {/* Play/Pause */}
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #f472b6, #c084fc)' }}
            >
              {playing ? <Pause size={14} color="white" /> : <Play size={14} color="white" />}
            </button>

            {/* Mute */}
            <button
              onClick={() => setMuted(m => !m)}
              className="w-7 h-7 rounded-full flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
            >
              {muted ? <VolumeX size={14} style={{ color: '#be185d' }} /> : <Volume2 size={14} style={{ color: '#be185d' }} />}
            </button>

            {/* Volume */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={muted ? 0 : volume}
              onChange={e => { setMuted(false); setVolume(Number(e.target.value)); }}
              className="w-20"
              style={{ accentColor: '#ec4899' }}
            />
          </div>

          {/* Equalizer bars */}
          {playing && (
            <div className="flex items-end gap-0.5 mt-2 justify-center h-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 rounded-sm"
                  style={{ background: `hsl(${320 + i * 5}, 80%, 65%)` }}
                  animate={{ height: [4, 12 + Math.random() * 8, 4] }}
                  transition={{
                    duration: 0.3 + Math.random() * 0.2,
                    repeat: Infinity,
                    delay: i * 0.06,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
