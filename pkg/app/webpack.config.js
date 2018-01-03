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
		],
	},
};
