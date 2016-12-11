// Karma configuration
// Generated on Thu Dec 08 2016 10:36:33 GMT+0800 (CST)

var webpackConfig = require('./webpack.config');
webpackConfig.devtool = 'inline-source-map';

module.exports = function(config) {

    config.set({

        basePath: '../',

        browsers: ['PhantomJS'],

        frameworks: [ 'mocha', 'chai' ],

        files: [
            './node_modules/babel-polyfill/dist/polyfill.js',
            './src/components/**/test/*\.test\.js',
            './src/reducers/test/*\.test\.js'
        ],

        webpack: webpackConfig,

        webpackServer: {
          noInfo: true
        },

        preprocessors: {
            './src/components/**/test/*\.test\.js': [ 'webpack' ],
            './src/reducers/test/*\.test\.js': [ 'webpack' ]
        },

        plugins: [
          'karma-chrome-launcher',
          'karma-webpack',
          'karma-phantomjs-launcher',
          'karma-chai',
          'karma-mocha',
          'karma-mocha-reporter',
          // 'karma-coverage',
        ],

        reporters: ['mocha'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        singleRun: false,

        concurrency: Infinity
    })

}
