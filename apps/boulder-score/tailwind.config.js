const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const plugin = require('tailwindcss/plugin');
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@spartan-ng/ui-core/hlm-tailwind-preset')],
  darkMode: 'selector',
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      backgroundImage: {
        'van-gogh-light': "url('assets/van-gogh-light.jpg')",
        'van-gogh-dark': "url('assets/van-gogh-dark.jpg')",
        'van-gogh-climbing': "url('assets/van-gogh-climbing.jpg')",
      },
      fontFamily: {
        sans: ['"Outfit Variable"', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        display: [
          '2.25rem',
          {
            fontWeight: '400',
            lineHeight: '2.75rem',
            letterSpacing: '0px',
          },
        ],
        headline: [
          '1.75rem',
          {
            fontWeight: '600',
            lineHeight: '2.25rem',
            letterSpacing: '0px',
          },
        ],
        title: [
          '1rem',
          {
            fontWeight: '600',
            lineHeight: '1.5rem',
            letterSpacing: '0.009rem',
          },
        ],
        body: [
          '0.875rem',
          {
            fontWeight: '400',
            lineHeight: '1.25rem',
            letterSpacing: '0.016rem',
          },
        ],
        label: [
          '0.75rem',
          {
            fontWeight: '500',
            lineHeight: '1rem',
            letterSpacing: '0.031rem',
          },
        ],
      },
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('climbing', '.climbing &')
    })
  ],
};
