/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B4513',
        secondary: '#D4A574', 
        accent: '#CD853F',
        surface: {
          50: '#FFF8DC',
          100: '#F5E6D3',
          200: '#E8D0B8',
          300: '#DBC19F',
          400: '#CEB285',
          500: '#C1A36C',
          600: '#B49453',
          700: '#A7853A',
          800: '#9A7621',
          900: '#8D6708'
        },
        semantic: {
          success: '#556B2F',
          warning: '#DAA520',
          error: '#B22222',
          info: '#4682B4'
        }
      },
      fontFamily: { 
        display: ['Playfair Display', 'serif'],
        body: ['Crimson Pro', 'serif'],
        sans: ['Crimson Pro', 'serif']
      },
      backgroundImage: {
        'parchment': "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"%3E%3Cdefs%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence baseFrequency=\"0.9\" numOctaves=\"4\" /%3E%3CfeColorMatrix values=\"0.2 0.2 0.2 0 0 0.1 0.1 0.1 0 0 0.05 0.05 0.05 0 0 0 0 0 0.3 0\" /%3E%3C/filter%3E%3C/defs%3E%3Crect width=\"100\" height=\"100\" filter=\"url(%23noise)\" opacity=\"0.4\" /%3E%3C/svg%3E')"
      },
      boxShadow: {
        'brass': '0 2px 8px rgba(139, 69, 19, 0.3), inset 0 1px 0 rgba(212, 165, 116, 0.5)',
        'parchment': '0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
      }
    },
  },
  plugins: [],
}