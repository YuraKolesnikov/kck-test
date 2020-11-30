const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// config parts
const Workbox = require('./workbox.js');

module.exports = {
	entry: [
		'./src/main.js',
		'./src/assets/scss/main.scss'
	],
	output: {
		path: path.resolve(__dirname, './dist'),
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
			children: false,
			// template info
			manifest: './dist/pwa/manifest.json',
			icon: {
				shortcut: './dist/site-icon/app-logo.png',
				apple: {
					'57x57': './dist/site-icon/app-logo.png',
					'60x60': './dist/site-icon/app-logo.png',
					'72x72': './dist/site-icon/app-logo.png',
					'76x76': './dist/site-icon/app-logo.png',
					'114x114': './dist/site-icon/app-logo.png',
					'120x120': './dist/site-icon/app-logo.png',
					'144x144': './dist/site-icon/app-logo.png',
					'152x152': './dist/site-icon/app-logo.png',
					'180x180': './dist/site-icon/app-logo.png',
				}
			},
			meta: {
				description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur at blanditiis consectetur cupiditate dignissimos esse, fugiat illum laudantium nihil, nisi numquam obcaecati officiis optio placeat, quas quasi sequi soluta voluptatibus?',
				title: 'Vue & PWA app',
				url: '//your-site-link.com'
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
			'images': path.resolve(__dirname, '../src/assets/img'),
			'icons': path.resolve(__dirname, '../src/assets/icons'),
			'Root': path.resolve(__dirname, '../src'),
			'Pages': path.resolve(__dirname, '../src/pages'),
			'Models': path.resolve(__dirname, '../src/models'),
			'Components': path.resolve(__dirname, '../src/components'),
		}
	},
	node: {
		module: 'empty',
		fsevents: 'empty',
		net: 'empty',
		tls: 'empty'
	}
}
