const { config: { base, dev, prod }, htmlLinks, htmlMetas } = require('./config');
const { resolve } = require('./util');
const { join } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const globImporter = require('node-sass-glob-importer');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = mode => ({
	cache: false,
	target: 'web',
	stats: {
		all: false,
		colors: true,
		modules: false,
		entrypoints: false,
		nestedModulesSpace: 15,
		assets: true,
		errors: true,
		performance: true
		// preset: 'verbose'
	},
	mode,
	context: resolve('src'),
	devtool: mode === 'production' ? false : 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								[
									'@babel/preset-env', {
										useBuiltIns: 'usage',
										corejs: 3,
									}
								],
								['@babel/preset-typescript', { allExtensions: true }]
							],
							plugins: [
								[
									'@babel/plugin-transform-runtime',
									{
										corejs: 3,
									}
								]
							]
						}
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				]
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: mode === 'production'
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								config: resolve('bin', 'postcss.config.js')
							}
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								importer: globImporter()
							},
							additionalData: `
									@use 'sass:math';
                  @import "@/assets/sass/utilities/index.scss";
                `
						}
					}
				]
			},
			{
				test: /\.css$/i,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								config: resolve('bin', 'postcss.config.js')
							}
						}
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024,
							name: '[name].[ext]',
							outputPath: 'images'
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: base.resolveExtensions,
		alias: {
			'@': resolve('src')
		}
	},
	plugins: [
		new VueLoaderPlugin(),
		new CopyWebpackPlugin({
			patterns: [
        { from: resolve('public', 'api'), to: join(mode === 'production' ? prod.outputPath : dev.outputPath, 'api') },
        { from: resolve('public', 'images'), to: join(mode === 'production' ? prod.outputPath : dev.outputPath, 'images') }
      ]
		}),
		new ImageMinimizerPlugin({
			minimizerOptions: {
				plugins: [
					['gifsicle', { interlaced: true, optimizationLevel: 3 }],
					['jpegtran', { progressive: true }],
					['pngquant', { quality: [0.7, 0.95] }],
					[
						'svgo',
						{
							plugins: [
								{
									name: 'preset-default',
									params: {
										overrides: {
											removeViewBox: {
												active: false,
											},
											addAttributesToSVGElement: {
												attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }]
											}
										},
									},
								}
							]
						}
					]
				]
			}
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: resolve('public', 'index.html'),
			templateParameters: {
				documentTitle: base.documentTitle
			},
			inject: false,
			minify: mode === 'production'
		}),
		new MiniCssExtractPlugin({
			filename: `css/style${mode === 'production' ? '' : '.[contenthash]'}.css`
		}),
		new HtmlWebpackTagsPlugin({
			links: htmlLinks,
			metas: htmlMetas
		}),
		new CleanWebpackPlugin({
			verbose: true,
			cleanOnceBeforeBuildPatterns: [mode === 'production' ? `${join(prod.outputPath)}/**` : `${join(dev.outputPath)}/**`]
		})
	]
});
