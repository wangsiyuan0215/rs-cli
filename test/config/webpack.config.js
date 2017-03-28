// + -------------------------------------
// | webpack basic config
// + -------------------------------------
// | webpack 基本配置
// + -------------------------------------
// | author: Wangsiyuan @ 2016-09-27
// + -------------------------------------

;'use strict';

var path = require('path'),
    webpack = require('webpack'),
    config = require("./_config"),
    autoprefixer = require('autoprefixer'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill',
        config.app_entry
    ],
    output: {
        path:           config.public.output_path,
        // publicPath:     config.root_path,
        filename:       '[name].js',
    },
    resolve: {
        alias      : {},
        extensions : ['', '.css', '.scss', '.js', '.jsx', '.html']
    },
    module: {
        loaders: [
            {
                test : /\.(js|jsx)$/,
                loader:'react-hot!es3ify-loader!babel-loader',
                include: config.js_path
            },
            {
                test: /\.(woff|ttf|svg|eot|jpg|png|gif)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test : /\.(scss|css)$/,
                loader: ExtractTextPlugin.extract("style", "css!postcss!sass?outputStyle=expanded") ,
                exclude: '/node_modules/',
                include: config.css_path
            }
        ]
    },
    postcss: [ autoprefixer({
           browsers: ['last 2 versions']
        })
    ],
    eslint: {
        configFile: path.resolve(__dirname, '../.eslintrc')
    },
    plugins: [
        new HtmlwebpackPlugin({
            filename: "index.html",
            template: config.dev.html_path,
            inject: true
        }),
        new ExtractTextPlugin("main.[contenthash:8].css"),
        new webpack.optimize.DedupePlugin(),
        new webpack.ProvidePlugin({
            _ : config.js_path + '/utils/_.js',
        })
    ]
};
