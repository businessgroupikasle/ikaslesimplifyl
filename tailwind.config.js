const themeBlue = {
  50: '#F4F8FB',
  100: '#E3EFF8',
  200: '#C1DEF0',
  300: '#92C6E7',
  400: '#4FA2D8',
  500: '#2686C5',
  600: '#1C6FA5', // Theme colour
  700: '#175B87',
  800: '#13496C',
  900: '#113A55',
  950: '#0C2332',
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['selector', '[data-theme="dark"]', '.dark'],
  theme: {
    extend: {
      colors: {
        // Theme scale built around #1C6FA5 (600). Overriding blue/sky/indigo keeps
        // every `text-blue-*`, `bg-sky-*`, `to-indigo-*` utility on-theme.
        blue: themeBlue,
        sky: themeBlue,
        indigo: themeBlue,
        primary: {
          DEFAULT: '#10364E',
          dark: '#0C2332',
          light: '#174E72',
        },
        secondary: {
          DEFAULT: '#1C6FA5',
          dark: '#175B87',
          light: '#2686C5',
        },
        accent: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          light: '#FEF3C7',
        },
        darkText: '#263445',
        sectionBg: '#F5F7FA',
        brand: {
          DEFAULT: '#10364E',
          950: '#091924',
          900: '#10364E', // Core Primary Navy Blue
          850: '#13405D',
          800: '#174E72',
          700: '#1B5C86',
          600: '#1C6FA5', // Secondary Blue
          500: '#2686C5',
          400: '#4FA2D8',
          300: '#92C6E7',
          200: '#C1DEF0',
          100: '#E3EFF8',
          50: '#F4F8FB',
        },
        navy: {
          950: '#091924',
          900: '#10364E',
          850: '#13405D',
          800: '#174E72',
          700: '#1B5C86',
          600: '#1C6FA5',
          500: '#2686C5',
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
        'soft': '0 4px 20px -2px rgba(9, 25, 35, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 10px 30px -5px rgba(9, 25, 35, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.03)',
        'hover': '0 20px 40px -8px rgba(9, 25, 35, 0.16), 0 8px 16px -4px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
