'use strict'

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: {
    gp: './source/bootstrap.jsx'
  },
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.jsx?$/,
      use: {
        loader: 'babel-loader',
        options: {
          plugins: ['emotion', 'react-hot-loader/babel'],
          presets: [['env', {
            targets: {
              chrome: 54,
              firefox: 50,
              safari: 10
            }
          }], 'react']
        }
      }
    }]
  },
  output: {
    path: path.resolve(__dirname, '../release')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './source/index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  }
}
