const path = require("path");

const CONFIG = {
	entry: "./js/main.js",
	output: {
		path: path.resolve(__dirname, "public"),
		filename: "bundle.js",
		publicPath: "/public/"
	},
	module: {
		rules: [
			{
				test: /\.styl$/,
				use: [
					{
						loader: "style-loader" // creates style nodes from JS strings
					},
					{
						loader: "css-loader" // translates CSS into CommonJS
					},
					{
						loader: "stylus-loader" // compiles Stylus to CSS
					}
				]
			}
		]
	}
};

module.exports = (env, argv) => {
	if(argv.mode === 'development') {
		CONFIG.watch = true;
	}

	return CONFIG;
};
