const postcssImport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');
const tailwindcss = require('tailwindcss');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    postcssImport(),
    tailwindcss({
      purge: ['./src/**/*.jsx'],
    }),
    postcssPresetEnv({
      stage: 3,
    }),
    cssnano({
      preset: 'default',
    }),
  ],
};
