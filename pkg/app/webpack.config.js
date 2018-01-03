/* eslint-disable global-require */
const CSSPlugin = require('modular-css-webpack/plugin');

module.exports = {
	entry: './src/client/index.js',
	output: {
		filename: './dist/public/assets/app.js',
	},

	devtool: 'eval-source-map',

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: 'modular-css-webpack/loader',
			},
		],
	},

	plugins: [
		new CSSPlugin({
			css: './dist/public/assets/app.css',
			json: './dist/styles.json',
			after: [
				require('postcss-import')(),
				require('postcss-nested'),
				require('postcss-color-function'),
				require('postcss-inline-svg')(),
			],
		}),
	],
};
