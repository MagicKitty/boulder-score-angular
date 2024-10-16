const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');
const plugin = require('tailwindcss/plugin');

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
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant('climbing', '.climbing &')
    })
  ],
};
