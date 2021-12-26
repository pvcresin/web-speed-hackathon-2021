const path = require('path');
const zlib = require('zlib');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');

const SRC_PATH = path.resolve(__dirname, './src');
const PUBLIC_PATH = path.resolve(__dirname, '../public');
const UPLOAD_PATH = path.resolve(__dirname, '../upload');
const DIST_PATH = path.resolve(__dirname, '../dist');

const isDev = process.env.NODE_ENV === 'development';
const useSpdy = false;

/** @type {import('webpack').Configuration} */
const config = {
  mode: process.env.NODE_ENV,
  devServer: {
    historyApiFallback: true,
    https: useSpdy,
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': {
        target: useSpdy ? 'https://localhost:3000' : 'http://localhost:3000',
        secure: false,
      },
    },
    static: [PUBLIC_PATH, UPLOAD_PATH],
    http2: useSpdy,
    compress: true,
  },
  devtool: isDev ? 'inline-source-map' : false,
  entry: {
    main: [
      path.resolve(SRC_PATH, './index.css'),
      path.resolve(SRC_PATH, './buildinfo.js'),
      path.resolve(SRC_PATH, './index.tsx'),
    ],
    webfont: path.resolve(SRC_PATH, './styles/webfont.css'),
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js|jsx|ts|tsx)$/,
        use: [{ loader: 'esbuild-loader', options: { loader: 'tsx', target: 'es2020' } }],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { url: false } },
          { loader: 'postcss-loader' },
        ],
      },
    ],
  },
  output: {
    publicPath: '/',
    filename: 'scripts/[name].[contenthash].js',
    path: DIST_PATH,
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.EnvironmentPlugin({
      BUILD_DATE: new Date().toISOString(),
      // Heroku では SOURCE_VERSION 環境変数から commit hash を参照できます
      COMMIT_HASH: process.env.SOURCE_VERSION || '',
      NODE_ENV: process.env.NODE_ENV || 'production',
    }),
    new CompressionPlugin({
      test: /\.(js|css)$/,
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        },
      },
      threshold: 10240,
      minRatio: 0.8,
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      // hash: true,
      scriptLoading: 'defer',
      template: path.resolve(SRC_PATH, './index.html'),
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      // only preload initial chunks
      include: 'initial',
      as: (entry) => {
        if (/\.css$/.test(entry)) return 'style';
        if (/\.woff2$/.test(entry)) return 'font';
        if (/\.png$/.test(entry)) return 'image';
        return 'script';
      },
    }),
    ...(isDev ? [new ForkTsCheckerWebpackPlugin()] : []),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    fallback: {
      fs: false,
      path: false,
    },
    alias: isDev
      ? undefined
      : {
          react: 'preact/compat',
          'react-dom': 'preact/compat',
          'react/jsx-runtime': 'preact/jsx-runtime',
        },
  },
};

module.exports = config;
