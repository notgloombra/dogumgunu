import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

import BackgroundScene from './effects/BackgroundScene';
import CursorTrail from './effects/CursorTrail';
import FloatingElements from './effects/FloatingElements';
import Balloons from './effects/Balloons';
import Fireworks from './effects/Fireworks';
import Confetti from './effects/Confetti';

import Hero from './components/Hero';
import Countdown from './components/Countdown';
import MemoryCards from './components/MemoryCards';
import CakeSection from './components/CakeSection';
import GiftBox from './components/GiftBox';
import MusicPlayer from './components/MusicPlayer';
import Footer from './components/Footer';

export default function App() {
  const [celebrating, setCelebrating] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [fireworksActive, setFireworksActive] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [balloonsActive, setBalloonsActive] = useState(false);
  const [musicVisible, setMusicVisible] = useState(false);
  const [pageScale, setPageScale] = useState(1);

  const triggerCelebration = useCallback(() => {
    setCelebrating(true);
    setFireworksActive(true);
    setConfettiActive(true);
    setBalloonsActive(true);
    setMusicVisible(true);

    // Magical zoom
    setPageScale(1.015);
    setTimeout(() => setPageScale(1), 600);

    // Stop fireworks after 8s, confetti after 6s, balloons keep going
    setTimeout(() => setFireworksActive(false), 8000);
    setTimeout(() => setConfettiActive(false), 7000);
  }, []);

  const handleCakeClick = useCallback(() => {
    setCandlesBlown(true);
    setFireworksActive(true);
    setConfettiActive(true);
    setBalloonsActive(true);
    setTimeout(() => setFireworksActive(false), 6000);
    setTimeout(() => setConfettiActive(false), 5000);
  }, []);

  const handleGiftOpen = useCallback(() => {
    setBalloonsActive(true);
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 4000);
  }, []);

  return (
    <motion.div
      animate={{ scale: pageScale }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative min-h-screen"
    >
      {/* Fixed background and effects */}
      <BackgroundScene />
      <CursorTrail />
      <FloatingElements />
      <Balloons active={balloonsActive} />
      <Fireworks active={fireworksActive} />
      <Confetti active={confettiActive} />
      <MusicPlayer visible={musicVisible} />

      {/* Page content */}
      <div className="relative z-10">
        <Hero onCelebrate={triggerCelebration} isCelebrating={celebrating} />

        <SectionDivider />
        <Countdown />

        <SectionDivider />
        <MemoryCards />

        <SectionDivider />
        <CakeSection onCakeClick={handleCakeClick} candlesBlown={candlesBlown} />

        <SectionDivider />
        <GiftBox onOpen={handleGiftOpen} />

        <SectionDivider />
        <Footer />
      </div>
    </motion.div>
  );
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-2 px-8">
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(244,114,182,0.25), transparent)' }} />
      <motion.div
        className="mx-4 text-xl"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        ✨
      </motion.div>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(244,114,182,0.25), transparent)' }} />
    </div>
  );
}
