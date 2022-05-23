const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const pkg = require('./package.json');

const buildManifest = (buffer) => {
  var manifest = JSON.parse(buffer.toString());

  manifest.version = pkg.version;

  return JSON.stringify(manifest, null, 2);
};

const { WEBPACK_ENV } = process.env;

const MODE = WEBPACK_ENV || 'none';
const DEVTOOL = WEBPACK_ENV === 'production' ? 'source-map' : 'inline-cheap-source-map';

module.exports = {
  mode: MODE,
  devtool: DEVTOOL,
  target: 'web',
  entry: {
    interface: './src/interface',
    content: './src/content',
  },
  output: {
    path: path.resolve(__dirname, 'build/chrome'),
    filename: '[name].js'
  },
  resolveLoader: {
    modules: [
      path.resolve(__dirname),
      'node_modules'
    ]
  },
  resolve: {
    fallback: { 
      stream: require.resolve('stream-browserify')
    },
    alias: {
      process: 'process/browser',
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          WEBPACK_ENV === 'development' && {
            loader: 'babel-loader',
            options: {
              plugins: [
                require.resolve('react-refresh/babel')
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: { transpileOnly: true },
          },
        ].filter(Boolean),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                WEBPACK_ENV === 'development' && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        memoryLimit: 4096,
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(WEBPACK_ENV),
    }),
    new HtmlPlugin({
      template: './src/interface.html',
      filename: 'interface.html',
      chunks: ['interface'],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './src/manifest.json',
          to: 'manifest.json',
          transform: buildManifest,
        },
        {
          from: './INSTALL.md',
          to: '../INSTALL.md',
        },
        {
          from: './src/icons',
          to: './icons',
        }
      ]
    })
  ]
};
