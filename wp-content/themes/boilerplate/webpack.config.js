const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var path = require('path');

const localDomain = 'http://qualquer-teste.local';

const config = {
	// entry points
	entry: {
		main: './src/js/main.js',
	},
	output: {
		path: path.resolve(__dirname, 'assets'),
		filename: './js/[name].js',
		clean: true,
	},
	devtool: 'source-map',
	plugins: [
		new MiniCssExtractPlugin({
			filename: './css/[name].css',
		}),

		new BrowserSyncPlugin(
			{
				proxy: localDomain,
				files: ['assets/css/*.css', 'assets/js/*.js', '*.php'],
				injectCss: true,
			},
			{ reload: false }
		),
	],
	resolve: {
		alias: {
			'popper.js': path.resolve(__dirname, 'node_modules/popper.js/dist/umd/popper.js'),
			jquery: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.js'),
		},
	},
	// One rule for each different kind of file
	module: {
		rules: [
			{
				test: /\.s?[c]ss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /bootstrap\.js$/,
				use: 'imports-loader?jQuery=jquery,$=jquery,this=>window',
			},
			{
				test: /\.sass$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sassOptions: { indentedSyntax: true },
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]',
				},
			},
			{
				test: /\.(jpg|jpeg|png|gif|svg|ico )$/,
				type: 'asset/resource',
				generator: {
					filename: './img/[name][ext]',
				},
			},
		],
	},
};
module.exports = config;
