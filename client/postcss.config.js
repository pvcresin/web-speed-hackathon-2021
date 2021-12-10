const postcssImport = require('postcss-import');
const tailwindcss = require('tailwindcss');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    postcssImport(),
    tailwindcss({
      purge: ['./src/**/*.jsx'],
    }),
    cssnano({
      preset: 'default',
    }),
  ],
};
