const { resolve } = require('./util');
const config = {
	base: {
		documentTitle: 'AionChiu',
		entryPath: resolve('src'),
		publicPath: './',
		resolveExtensions: [
			'.ts', '.js', '.jx', '.json', '.vue', '.css', '.scss'
		]
	},
	dev: {
		port: 8000,
		outputPath: resolve('__example__'),
		ImagesOutputPath: resolve('__example__', 'images')
	},
	prod: {
		outputPath: resolve('site'),
    ImagesOutputPath: resolve('site', 'images')
	}
};

const htmlLinks = [
	{
		path: 'favicon.ico',
		attributes: {
			rel: 'icon',
			type: 'image/x-icon'
		}
	}
];
const htmlMetas = [
	{
		attributes: {
			'http-equiv': 'X-UA-Compatible',
			'content': 'IE=edge'
		}
	},
	{
		attributes: {
			charset: 'utf-8'
		}
	},
	{
		attributes: {
			name: 'viewport',
			content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
		}
	},
	{
		attributes: {
			name: 'keywords',
			content: ''
		}
	},
	{
		attributes: {
			name: 'description',
      content: 'Hi I\'m Chiu as a Frontend and User experience architect at isobar. 5 years of developer experience.Focus on user experience and interactive.'
		}
	},
	{
		attributes: {
			name: 'image',
      content: './images/og.png'
		}
	},
	{
		attributes: {
			name: 'og:title',
      content: 'AionChiu\'s site'
		}
	},
	{
		attributes: {
			name: 'og:description',
      content: 'Hi I\'m Chiu as a Frontend and User experience architect at isobar. 5 years of developer experience.Focus on user experience and interactive.'
		}
	},
	{
		attributes: {
			name: 'og:type',
			content: 'website'
		}
	},
	{
		attributes: {
			name: 'og:image',
			content: './images/og.png'
		}
	},
	{
		attributes: {
			name: 'og:image:width',
			content: '1200'
		}
	},
	{
		attributes: {
			name: 'og:image:height',
			content: '630'
		}
	},
	{
		attributes: {
			name: 'og:url',
			content: 'https://'
		}
	}
];

module.exports = { config, htmlLinks, htmlMetas };
