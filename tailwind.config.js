/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#142B4A',
          dark: '#0C1C32',
          light: '#1E3E6B',
        },
        secondary: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
          light: '#3B82F6',
        },
        accent: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          light: '#FEF3C7',
        },
        darkText: '#263445',
        sectionBg: '#F5F7FA',
        brand: {
          DEFAULT: '#142B4A',
          950: '#091524',
          900: '#142B4A', // Core Primary Navy Blue
          850: '#193357',
          800: '#1E3E6B',
          700: '#23497E',
          600: '#2563EB', // Secondary Blue
          500: '#3B82F6',
          400: '#60A5FA',
          300: '#93C5FD',
          200: '#BFDBFE',
          100: '#DBEAFE',
          50: '#EFF6FF',
        },
        navy: {
          950: '#091524',
          900: '#142B4A',
          850: '#193357',
          800: '#1E3E6B',
          700: '#23497E',
          600: '#2563EB',
          500: '#3B82F6',
        },
        surface: {
          50: '#FFFFFF',
          100: '#F5F7FA',
          200: '#E5E7EB',
          300: '#D1D5DB',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        script: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(5, 20, 39, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 10px 30px -5px rgba(5, 20, 39, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.03)',
        'hover': '0 20px 40px -8px rgba(5, 20, 39, 0.16), 0 8px 16px -4px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
