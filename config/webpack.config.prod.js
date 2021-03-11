const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserJSPlugin = require('terser-webpack-plugin');
const base = require('./webpack.config');

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
                indentedSyntax: true // optional
              },
            }
          }
        ]
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
