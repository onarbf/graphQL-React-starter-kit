
const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.resolve(__dirname, 'dev');
const BUILD_DIR = path.resolve(__dirname, 'dist/public/js');

const config = {
  entry:  ['babel-polyfill',APP_DIR + '/index.jsx'],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: [
          {loader: "style-loader"}, // creates style nodes from JS strings
          {loader: "css-loader"},   // translates CSS into CommonJS
          {loader: "sass-loader"}   // compiles Sass to CSS
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  mode: 'development'
};

module.exports = config;
