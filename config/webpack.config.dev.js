const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const base = require('./webpack.config');

const config = merge(base, {
  devServer: {
    compress: true,
    historyApiFallback: true,
    overlay: true,
    watchContentBase: true
    //https: true for https
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use:  [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              hmr: true,
              // force reload
              reloadAll: true,
            }
          },
          // работаем с @import и url()
          {
            loader: 'css-loader'
          },
          // далее, по .css файлу проходиться postcss-loader да бы, проставить все нужные полифиллы и префиксы к свойствам
          'postcss-loader',
          // в начале sass-loader переводить .scss файл в .css
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                indentedSyntax: true // optional
              },
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, '../src/assets/scss/vars.scss'),
              ],
            },
          },
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});

module.exports = config;
