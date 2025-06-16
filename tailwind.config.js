/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
    extend: {
      colors: {
        primary: '#FF9933',      // Saffron - representing knowledge and sacrifice
        secondary: '#138808',    // Indian green - representing life and happiness  
        accent: '#000080',       // Navy blue - representing truth and infinity
        surface: {
          50: '#FFFEF7',         // Cream white
          100: '#FDF4E3',        // Light cream
          200: '#F9E5B8',        // Pale gold
          300: '#F5D68D',        // Light gold
          400: '#F1C762',        // Medium gold
          500: '#EDB837',        // Rich gold
          600: '#D4A017',        // Deep gold
          700: '#B8860B',        // Dark gold
          800: '#996F00',        // Bronze
          900: '#7A5800'         // Dark bronze
        },
        semantic: {
          success: '#00A86B',     // Indian jade green
          warning: '#FFA500',     // Saffron orange
          error: '#DC143C',       // Indian red
          info: '#4169E1'         // Royal blue
        }
      },
      fontFamily: { 
        display: ['Georgia', 'Times New Roman', 'serif'],
        body: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Georgia', 'Times New Roman', 'serif']
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