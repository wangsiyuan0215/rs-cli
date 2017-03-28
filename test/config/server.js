// + -------------------------------------
// | server.js webpack config for server
// + -------------------------------------
// | webpack 开发环境服务器配置
// + -------------------------------------
// | author: Wangsiyuan @ 2016-09-27
// + -------------------------------------

;'use strict';

var webpack = require("webpack"), 
    merge = require("webpack-merge"), 
    config = require("./_config"), 
    webpackConfig = require("./webpack.config"), 
    chalk = require('chalk'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"), 
    webpackDevServer = require('webpack-dev-server'),
    serverConfig = merge(webpackConfig, {
        entry: [
            'webpack-dev-server/client?' + (config.dev.host + ":" + config.dev.port),
            'webpack/hot/dev-server'
        ], 
        devtool: 'cheap-module-eval-source-map', 
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development')
            }), 
            new webpack.HotModuleReplacementPlugin(), 
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.ProgressPlugin((percentage, msg) => {
                const stream = process.stderr;
                if (stream.isTTY && percentage < 0.71) {
                    stream.cursorTo(0);
                    stream.write(`📦  - ${chalk.magenta(msg)}`);
                    stream.clearLine(1);
                } else if (percentage === 1) {
                    console.log(chalk.green('\n👌  - '+ 
                        new Date().toLocaleString() + 
                        'webpack: bundle build is now finished.'));
                }
            })
        ],
        devServer: { inline: true, hot: true}
    })

function _server(config) {
    return new webpackDevServer(webpack(config), {
        hot: true, 
        stats: { colors: true }, 
        historyApiFallback: true, 
        inline: true,
        noInfo: true
    })
}

console.log(`\n🙀  - ${chalk.cyan('Listening at '+config.dev.host+':'+config.dev.port)}\n`);

_server(serverConfig).listen(config.dev.port, function (err) {
    if (err) console.log(err);
});