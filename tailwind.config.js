/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ceylon: {
          dark: '#051810',
          emerald: '#083321',
          forest: '#0f4d33',
          sage: '#2d6a4f',
          gold: '#e5a93c',
          amber: '#d97706',
          sand: '#fbf9f4',
          sandDark: '#f0ece1',
          terracotta: '#e05d38',
          teal: '#0d9488'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['Cinzel', 'serif']
      },
      boxShadow: {
        'glow': '0 0 25px rgba(229, 169, 60, 0.25)',
        'glow-emerald': '0 0 30px rgba(15, 77, 51, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}
