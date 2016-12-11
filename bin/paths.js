var path = require('path'),
	template = "../lib/templates",
	configPath = "../lib/templates/config";

// package.json
var PACKAGE_JSON_PATH = function() {
    return path.resolve(
        __dirname,
		template,
        'package.json'
    );
};

// .babelrc
var BABELRC_PATH = function() {
    return path.resolve(
        __dirname,
		template,
        '.babelrc'
    );
};

// .eslintrc
var ESLINTRC_PATH = function() {
    return path.resolve(
        __dirname,
		template,
        '.eslintrc'
    );
};

// _config.js
var _CONFIG_PATH = function() {
    return path.resolve(
        __dirname,
		configPath,
		'_config.js'
    );
};

// karma.conf.js
var KARMA_CONFIG_PATH = function() {
    return path.resolve(
        __dirname,
		configPath,
        'karma.conf.js'
    );
};

// product.js
var PRODUCT_PATH = function() {
    return path.resolve(
        __dirname,
		configPath,
        'product.js'
    );
};

// server.js
var SERVER_PATH = function() {
    return path.resolve(
        __dirname,
		configPath,
        'server.js'
    );
};

// webpack.config.js
var WEBPACK_CONFIG_PATH = function() {
    return path.resolve(
        __dirname,
		configPath,
        'webpack.config.js'
    );
};

var SRC_PATH = function() {
	return path.resolve(
		__dirname,
		'../lib/templates/src'
	);
};


module.exports = {
	PACKAGE_JSON_PATH,
	BABELRC_PATH,
	ESLINTRC_PATH,
	_CONFIG_PATH,
	KARMA_CONFIG_PATH,
	PRODUCT_PATH,
	SERVER_PATH,
	WEBPACK_CONFIG_PATH,
	SRC_PATH
};
