/** @type {import('tailwindcss').Config} */

// All colours resolve to CSS variables defined in src/index.css so that the
// light and dark themes share one set of semantic class names.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        canvas: token('canvas'),
        surface: token('surface'),
        sunken: token('sunken'),
        line: {
          DEFAULT: token('line'),
          strong: token('line-strong'),
        },
        fg: {
          DEFAULT: token('fg'),
          muted: token('fg-muted'),
          subtle: token('fg-subtle'),
        },
        brand: {
          DEFAULT: token('brand'),
          hover: token('brand-hover'),
          solid: token('brand-solid'),
          'solid-hover': token('brand-solid-hover'),
          soft: token('brand-soft'),
          ink: token('brand-ink'),
          line: token('brand-line'),
        },
        inverse: {
          DEFAULT: token('inverse'),
          fg: token('inverse-fg'),
          muted: token('inverse-muted'),
        },
        warn: {
          DEFAULT: token('warn'),
          soft: token('warn-soft'),
          line: token('warn-line'),
          ink: token('warn-ink'),
        },
        success: {
          DEFAULT: token('success'),
          soft: token('success-soft'),
        },
        danger: {
          DEFAULT: token('danger'),
          soft: token('danger-soft'),
        },
        navy: '#142B4A',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
        display: ['clamp(2.25rem, 1.6rem + 2.6vw, 3.75rem)', { lineHeight: '1.06', letterSpacing: '-0.035em' }],
        h1: ['clamp(2rem, 1.55rem + 1.8vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        h2: ['clamp(1.625rem, 1.35rem + 1.1vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.025em' }],
        h3: ['1.125rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '8px',
        md: '10px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '28px',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        focus: '0 0 0 3px rgb(var(--brand) / 0.28)',
      },
      maxWidth: {
        page: '76rem',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
