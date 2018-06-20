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
      test: /\.c(pp)?$/,
      use: {
        loader: 'cpp-wasm-loader',
        options: {
          emccFlags: [
            '--bind',
            '-O3'
          ]
        }
      }
    }, {
      test: /^worker\.js$/,
      use: {
        loader: 'worker-loader'
      }
    }, {
      exclude: /node_modules/,
      test: /\.jsx?$/,
      use: {
        loader: 'babel-loader',
        options: {
          plugins: ['emotion', 'react-hot-loader/babel', 'transform-object-rest-spread'],
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
  node: {
    fs: 'empty'
  },
  output: {
    globalObject: 'self',
    path: path.resolve(__dirname, '../release')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './source/index.html'
    })
  ],
  resolve: {
    alias: {
      engines: path.resolve(__dirname, '../../engines')
    },
    extensions: ['.js', '.json', '.jsx']
  }
}
