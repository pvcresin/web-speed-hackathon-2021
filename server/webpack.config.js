const path = require('path');

const SRC_PATH = path.resolve(__dirname, './src');
const DIST_PATH = path.resolve(__dirname, './dist');

const isDev = process.env.NODE_ENV === 'development';

/** @type {import('webpack').Configuration} */
const config = {
  mode: process.env.NODE_ENV,
  target: 'node16',
  devtool: isDev ? 'inline-source-map' : false,
  entry: {
    index: path.resolve(SRC_PATH, './index.js'),
  },
  module: {
    rules: [
      // {
      //   exclude: /node_modules/,
      //   test: /\.(js|jsx|ts|tsx)$/,
      //   use: [{ loader: 'esbuild-loader', options: { loader: 'tsx', target: 'es2020' } }],
      // },
      {
        exclude: /node_modules/,
        test: /\.(js|jsx|ts|tsx)$/,
        use: [{ loader: 'babel-loader' }],
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: DIST_PATH,
  },
  plugins: [],
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
  },
  externals: {
    sequelize: "require('sequelize')",
    bcrypt: "require('bcrypt')",
    'audio-decode': "require('audio-decode')",
    '@ffmpeg/ffmpeg': "require('@ffmpeg/ffmpeg')",
    '@squoosh/lib': "require('@squoosh/lib')",
  },
};

module.exports = config;
