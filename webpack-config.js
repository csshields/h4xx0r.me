var vue = require('vue-loader');
var webpack = require('webpack');

module.exports = {
	entry: './frontend/js/app.js',
	output: {
		path: './dist',
		publicPath: '/dist/',
		filename: 'build.js'
	},
	module: {
		loaders: [
			{ test: /\.vue$/, loader: 'vue' },
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
		]
	},
	babel: {
		presets: ['es2015']
	}
};