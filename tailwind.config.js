/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
      colors: {
        // Acento principal del portfolio (cyan/sky)
        brand: {
          DEFAULT: '#38bdf8',
          dark: '#0ea5e9',
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        blink: 'blink 1.1s step-end infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 9s linear infinite',
        'scroll-dot': 'scrollDot 2s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px #0ea5e9, 0 0 10px #0ea5e9' },
          '50%': { boxShadow: '0 0 15px #0ea5e9, 0 0 25px #0ea5e9' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scrollDot: {
          '0%': { opacity: '0', transform: 'translateY(0)' },
          '30%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(14px)' },
        },
      },
    },
  },
  plugins: [],
};
