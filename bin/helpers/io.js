/*
 * @Author: SiYuan Wang
 * @Date: 2019-10-28 09:35:59
 * @Description: io
 */

const slog = require('single-line-log').stdout;
const chalk = require('chalk');

const printLogo = () =>
  console.log(`
*************************************************************************
*             _____    _____            _____  _       _____            * 
*            |  __ \\  / ____|          / ____|| |     |_   _|           *
*            | |__) || (___   ______  | |     | |       | |             *
*            |  _  /  \\___ \\ |______| | |     | |       | |             *
*            | | \\ \\  ____) |         | |____ | |____  _| |_            *
*            |_|  \\_\\|_____/           \\_____||______||_____|           *
*                                                                       *
*************************************************************************`);

const printDescription = () =>
  print4info(`
Thanks for using @siyuan0215/rs-cli!

Designed to simplify the build-up and release process deployment of the development environment.
If you have any questions, please issue: https://github.com/wangsiyuan0215/rs-cli/issues\n`);

const print4title = (title) => {
  const loading = print4loading(title, 6);

  return (result) => {
    loading();
    slog("[💯]", chalk.green.bold(title), result);
    console.log();
  };
};

const print4skipped = (str, ...arg) => console.log(chalk.cyan(str), ...arg);

const print4info = (str, ...arg) => console.log(str, ...arg);

const print4error = (str, ...arg) => {
  console.log();
  console.log(chalk.bgRed.bold("Error"), chalk.red(str), ...arg);
};

const print4loading = (str, max = 6) => {
  let count = 0;

  const dot = ".";
  const timer = setInterval(function () {
    let dots = "";
    if (count < max) {
      for (let i = 0; i <= count; i++) dots += dot;
      count++;
    } else {
      dots = "";
      count = 0;
    }

    slog(chalk.yellow.bold(`${str}${dots}`));
  }, 500);

  return () => {
    slog(chalk.green.bold(str));
    timer && clearInterval(timer);
  };
};

module.exports = {
  printLogo,
  print4info,
  print4error,
  print4title,
  print4loading,
  print4skipped,
  printDescription,
};
