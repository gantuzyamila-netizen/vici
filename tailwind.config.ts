import type { Config } from 'tailwindcss'

// Tokens extraídos de Figma (Coderhouse case of study · 04 · Home)
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          violet: { 50: '#f4f0ff', 200: '#cabff5', 600: '#6e4bdc' },
          orange: { 50: '#fff3ee', 100: '#fde4df', 500: '#f26839', 700: '#da4a19' },
        },
        state: { success: '#1fa971' },
        neutral: {
          0: '#ffffff',
          50: '#f8f7fc',
          100: '#f1eff7',
          200: '#e4e1ee',
          500: '#6f6b80',
          900: '#1d1a2b',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['30px', { lineHeight: '36px', letterSpacing: '-0.45px', fontWeight: '800' }],
        'title-l': ['24px', { lineHeight: '30px', letterSpacing: '-0.24px', fontWeight: '700' }],
        'title-m': ['18px', { lineHeight: '24px', letterSpacing: '-0.09px', fontWeight: '700' }],
        'title-s': ['16px', { lineHeight: '22px', fontWeight: '600' }],
        'label-l': ['15px', { lineHeight: '20px', fontWeight: '600' }],
        'label-m': ['13px', { lineHeight: '18px', fontWeight: '600' }],
        'label-s': ['11px', { lineHeight: '14px', letterSpacing: '0.022px', fontWeight: '600' }],
        'body-m': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'body-s': ['12px', { lineHeight: '16px', fontWeight: '400' }],
      },
      backgroundImage: {
        splash: 'linear-gradient(to bottom, #5034a6 0%, #6e4bdc 60%, #9f7eff 100%)',
      },
      boxShadow: {
        card: '0 4px 20px rgba(80, 52, 166, 0.08)',
        button: '0 8px 20px rgba(110, 75, 220, 0.35)',
        orange: '0 8px 20px rgba(242, 104, 57, 0.4)',
        float: '0 12px 32px rgba(80, 52, 166, 0.2)',
      },
    },
  },
  plugins: [],
} satisfies Config
