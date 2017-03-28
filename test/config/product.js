// + -------------------------------------
// | pro.js webpack config for production
// + -------------------------------------
// | webpack 生产环境配置
// + -------------------------------------
// | author: Wangsiyuan @ 2016-09-27
// + -------------------------------------

var webpack = require("webpack"), 
    merge = require("webpack-merge"), 
    config = require("./_config"), 
    webpackConfig = require("./webpack.config"), 
    chalk = require('chalk'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"), 
    serverConfig = merge(webpackConfig, {
         output: {
            filename:       '[name].[chunkhash:8].js',
            chunkFilename:  '[name].[chunkhash:8].js'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }), 
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: "commons",
                filename: "commons.js",
                minChunks: 3,
            }),
            new webpack.ProgressPlugin((percentage, msg) => {
                const stream = process.stderr;
                if (stream.isTTY && percentage < 0.71) {
                    stream.cursorTo(0);
                    stream.write(`📦  - ${chalk.magenta(msg + '...')}`);
                    stream.clearLine(1);
                } else if (percentage === 1) {
                    console.log(chalk.green('\n\n👌  - ' + 
                        new Date().toLocaleString() + 
                        ' webpack: package!'));
                }
            })
        ]
    });

console.log(`\n🙏  - ${chalk.cyan( new Date().toLocaleString() + " webpack: packaging...")}\n`);

webpack(serverConfig, function (err, stats) {
    if (err) throw err;

    process.stdout.write('\n' + 
        stats.toString({
            colors: true,
            modules: false,
            children: true,
            chunks: false,
            chunkModules: false
        }) + 
        '\n');
})

