/*
 * @Author: SiYuan Wang
 * @Date: 2019-10-28 09:35:59
 * @Description: io
 */

const slog = require('single-line-log').stdout;
const chalk = require('chalk');


const print4title = (str, ...arg) => console.log(chalk.white.bgBlue.bold(str), ...arg, '\n');

const print4skipped = (str, ...arg) => console.log(chalk.cyan(str), ...arg, '\n');

const print4info = (str, ...arg) => console.log(chalk.white(str), ...arg, '\n');

const print4error = (str, ...arg) => console.log(chalk.white.bgRed.bold('Error'), str, ...arg, '\n');

const print4loading = (str, max = 6) => {
    let count = 0;

    const dot = '.';
    const timer = setInterval(function () {
        let dots = '';
        if (count < max) {
            for(let i = 0 ; i <= count ; i++) dots += dot;
            count++;
        } else {
            dots = '';
            count = 0;
        }

        slog(chalk.white.bgBlue.bold(`${str}${dots}`), '\n\n');
    }, 500);

    return () => {
        slog(chalk.white.bgBlue.bold(`${str}......`), '\n\n');
        timer && clearInterval(timer);
    };
};

module.exports = {
    print4info,
    print4error,
    print4title,
    print4loading,
    print4skipped
};
