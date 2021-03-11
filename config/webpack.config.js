const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: [
		'./src/main.js',
		'./src/assets/scss/main.scss'
	],
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: "js/[name].[hash:5].js",
	},
	optimization: {
		concatenateModules: true,
		minimizer: [new TerserJSPlugin({})],
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendor',
					test: /node_modules/,
					chunks: 'all',
					enforce: true
				},
				global: {
					name: 'global',
					test: /global/,
					chunks: 'all',
					enforce: true
				},
				pages: {
					name: 'pages',
					test: /pages/,
					chunks: 'all',
					enforce: true
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				exclude: /node_modules/,
				loader: 'vue-loader'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			moduleFilename: ({ name }) => `${name.replace('js/', 'css/')}.[contenthash].css`,
			filename: '[name].css',
			chunkFilename: 'css/chunks/[id].[contenthash].css',
		}),
		new VueLoaderPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			minify: {
				removeComments: true,
				collapseWhitespace: true
			},
			filename: './index.html',
			template: './src/template/index.template.ejs',
			meta: {
				title: 'Тестовое задание для КСК'
			}
		}),
		new UglifyJsPlugin({
			uglifyOptions: {
				ie8: false,
				ecma: 8,
				output: {
					comments: false,
					beautify: false
				}
			}
		}),
	],
	resolve: {
		extensions: [".js", ".vue", ".json"],
		alias: {
			'vue': 'vue/dist/vue.runtime.min.js',
			'vue-router': 'vue-router/dist/vue-router.min.js',
			'vuex': 'vuex/dist/vuex.min.js',
			'icons': path.resolve(__dirname, '../src/assets/icons'),
			'Root': path.resolve(__dirname, '../src'),
			'Components': path.resolve(__dirname, '../src/components'),
			'Helpers': path.resolve(__dirname, '../src/helpers'),
			'Utils': path.resolve(__dirname, '../src/utils')
		}
	}
}
