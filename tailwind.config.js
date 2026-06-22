export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        // Dark theme colors
        surface: '#0F172A',
        panel: '#1E293B',
        panelSoft: '#243248',
        accent: '#EC4899',
        accentSoft: '#F472B6',
        text: '#F8FAFC',
        textMuted: '#CBD5E1',
        border: '#334155',
        'dark-bg-primary': '#0F172A',
        'dark-bg-secondary': '#111827',
        'dark-card': '#1E293B',
        'dark-card-hover': '#243248',
        'dark-border': '#334155',
        'dark-text-primary': '#F8FAFC',
        'dark-text-secondary': '#CBD5E1',
        'dark-primary': '#EC4899',
        'dark-secondary': '#F472B6',
        'dark-hover': '#FB7185',
        // Light theme colors (from design spec)
        'light-bg-primary': '#FFFFFF',
        'light-bg-secondary': '#FFF7FB',
        'light-primary': '#EC4899',
        'light-secondary': '#F472B6',
        'light-text-primary': '#1F2937',
        'light-text-secondary': '#6B7280',
        'light-border': '#F3D4E4',
        'light-hover': '#FCE7F3'
      },
      boxShadow: {
        soft: '0 26px 70px rgba(0, 0, 0, 0.24)',
        card: '0 10px 30px rgba(0, 0, 0, 0.25)',
        glow: '0 0 25px rgba(236, 72, 153, 0.35)',
        'soft-light': '0 4px 20px rgba(236, 72, 153, 0.08)',
        'card-light': '0 8px 30px rgba(236, 72, 153, 0.12)'
      }
    }
  },
  plugins: []
}
