/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af',
          400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c',
          800: '#9f1239', 900: '#881337',
        },
        gold: {
          100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15',
          500: '#eab308', 600: '#ca8a04', 700: '#a16207',
        },
        lavender: {
          100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc',
          500: '#a855f7', 600: '#9333ea',
        },
        blush: {
          50: '#fff5f7', 100: '#ffecf0', 200: '#ffd6e0', 300: '#ffb3c6',
          400: '#ff85a1', 500: '#ff4d79',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Lato', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'balloon-rise': 'balloonRise 8s ease-in-out forwards',
        'heart-drift': 'heartDrift 5s ease-in-out forwards',
        'sparkle': 'sparkle 1.5s ease-in-out forwards',
        'candle-flicker': 'candleFlicker 0.3s ease-in-out infinite alternate',
        'smoke-rise': 'smokeRise 2s ease-out forwards',
        'confetti-fall': 'confettiFall 3s ease-in forwards',
        'cloud-drift': 'cloudDrift 30s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'ripple': 'ripple 0.6s linear',
        'gift-open': 'giftOpen 0.6s ease-out forwards',
        'butterfly': 'butterfly 8s ease-in-out infinite',
        'firefly': 'firefly 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        balloonRise: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-150px) rotate(10deg)', opacity: '0' },
        },
        heartDrift: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-120px) scale(0.5)', opacity: '0' },
        },
        sparkle: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(1) rotate(180deg)', opacity: '1' },
          '100%': { transform: 'scale(0) rotate(360deg)', opacity: '0' },
        },
        candleFlicker: {
          '0%': { transform: 'scaleX(1) scaleY(1)', opacity: '1' },
          '100%': { transform: 'scaleX(0.8) scaleY(1.15)', opacity: '0.8' },
        },
        smokeRise: {
          '0%': { transform: 'translateY(0) scale(0.5)', opacity: '0.8' },
          '100%': { transform: 'translateY(-60px) scale(2)', opacity: '0' },
        },
        confettiFall: {
          '0%': { transform: 'translateY(-20px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
        cloudDrift: {
          '0%': { transform: 'translateX(-200px)' },
          '100%': { transform: 'translateX(110vw)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(249,168,212,0.4), 0 0 40px rgba(249,168,212,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(249,168,212,0.8), 0 0 80px rgba(249,168,212,0.4)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '60%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeUp: {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.4' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        giftOpen: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-15deg)' },
          '75%': { transform: 'rotate(15deg)' },
          '100%': { transform: 'rotate(0deg) translateY(-20px)', opacity: '0' },
        },
        butterfly: {
          '0%, 100%': { transform: 'translateX(0) translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateX(30px) translateY(-20px) rotate(5deg)' },
          '50%': { transform: 'translateX(10px) translateY(-40px) rotate(-3deg)' },
          '75%': { transform: 'translateX(-20px) translateY(-20px) rotate(5deg)' },
        },
        firefly: {
          '0%, 100%': { opacity: '0', transform: 'translateX(0) translateY(0)' },
          '20%': { opacity: '1' },
          '50%': { opacity: '0.8', transform: 'translateX(20px) translateY(-15px)' },
          '80%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
