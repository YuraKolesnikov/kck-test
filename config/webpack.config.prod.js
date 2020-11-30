const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserJSPlugin = require('terser-webpack-plugin');
// config parts
const Workbox = require('./workbox.js');
const base = require('./webpack.config');

const PUBLIC_PATH = 'URL';

const config = merge(base, {
  mode: 'production',
  optimization: {
    minimizer: [new TerserJSPlugin({
      exclude: /node_modules/,
      cache: true,
      parallel: true,
      sourceMap: true,
    })]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use:  [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            }
          },
          // работаем с @import и url()
          {
            loader: 'css-loader',
            options: {
              modules: 'global'
            }
          },
          // далее, по .css файлу проходиться postcss-loader да бы, проставить все нужные полифиллы и префиксы к свойствам
          'postcss-loader',
          // в начале sass-loader переводить .scss файл в .css
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
                indentedSyntax: true // optional
              },
            }
          }
        ]
      },
      // fonts
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          publicPath: 'fonts',
          outputPath: 'fonts',
          name: '[name].[sha1:hash:base64:5].[ext]'
        },
      },
      {
        test: /\.(svg)$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          publicPath: 'dist/icons',
          outputPath: 'icons',
          name: '[name].[sha1:hash:base64:5].[ext]'
        },
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          publicPath: 'dist/img',
          outputPath: 'img',
          name: '[name].[sha1:hash:base64:5].[ext]'
        },
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin()
  ],
  node: {
    setImmediate: false,
    process: false
  }
});

module.exports = config;
