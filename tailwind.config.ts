import {Config} from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';


const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '425px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        sleep: {
          awake: '#ffec70',
          light: '#85fbff',
          deep: '#5d93ef',
          dark: {
            awake: '#a4951e',
            light: '#218c8c',
            deep: '#1b4586',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      dropShadow: {
        'thick': '0 0 0.4rem var(--tw-shadow-color)',
      },
      textShadow: {
        none: 'none',
        sm: '0 0 0.4rem var(--tw-shadow-color), '.repeat(2).slice(0, -2),
        DEFAULT: '0 0 0.4rem var(--tw-shadow-color), '.repeat(4).slice(0, -2),
        lg: '0 0 0.4rem var(--tw-shadow-color), '.repeat(7).slice(0, -2),
      },
      scale: {
        120: '1.2',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      animation: {
        'enter': 'fadeIn 300ms ease-out',
        'leave': 'fadeOut 300ms ease-in forwards',
        'marquee-x': 'marqueeX 8000ms linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        fadeOut: {
          '0%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
          },
        },
        marqueeX: {
          '0%': {
            transform: 'translate(100%)',
          },
          '30%': {
            transform: 'translate(0%)',
          },
          '70%': {
            transform: 'translate(0%)',
          },
          '100%': {
            transform: 'translate(-100%)',
          },
        },
      },
    },
  },
  plugins: [
    plugin(({addUtilities, matchUtilities, theme}) => {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        {values: theme('textShadow')},
      );
      addUtilities(
        // https://codepen.io/sosuke/pen/Pjoqqp
        // https://tailwind-color-filter-generator.vercel.app/
        {
          '.filter-subskill-slate-500': {
            filter: 'brightness(0) saturate(100%) invert(47%) sepia(12%) ' +
              'saturate(782%) hue-rotate(176deg) brightness(92%) contrast(88%)',
          },
          '.filter-subskill-sky-500': {
            filter: 'brightness(0) saturate(100%) invert(50%) sepia(86%) ' +
              'saturate(1306%) hue-rotate(166deg) brightness(93%) contrast(95%)',
          },
          '.filter-subskill-yellow-500': {
            filter: 'brightness(0) saturate(100%) invert(68%) sepia(72%)' +
              ' saturate(3539%) hue-rotate(9deg) brightness(89%) contrast(97%)',
          },
        },
      );
    }),
  ],
};

export default config;
