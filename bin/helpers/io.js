/*
 * @Author: SiYuan Wang
 * @Date: 2019-10-28 09:35:59
 * @Description: io
 */

const slog = require("single-line-log").stdout;
const chalk = require("chalk");

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
  const loading = print4loading(title);

  return (result, isOnlyUsingResult = false) => {
    loading();
    slog(
      "[💯]",
      ...(!isOnlyUsingResult
        ? [title, result]
        : [chalk.green.bold(result)])
    );
    console.log();
  };
};

const print4skipped = (str, ...arg) => console.log(chalk.cyan(str), ...arg);

const print4info = (str, ...arg) => console.log(str, ...arg);

const print4success = (str, ...arg) => console.log(chalk.green.bold(str), ...arg);

const print4error = (str, ...arg) => {
  console.log();
  console.log(chalk.red.bold("💥 Error:"), chalk.red(str), ...arg);
};

const print4loading = (str, max = 10) => {
  let count = 0;

  const clocks = ["🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚"];
  const timer = setInterval(function () {
    let c = "";
    if (count < max) {
      count++;
      c = clocks[count];
    } else {
      count = 0;
      c = clocks[count];
    }

    slog(chalk.yellow.bold(`[${c}] ${str}`));
  }, 66);

  return () => {
    timer && clearInterval(timer);
    slog(chalk.green.bold(str));
  };
};

module.exports = {
  printLogo,
  print4info,
  print4error,
  print4title,
  print4success,
  print4loading,
  print4skipped,
  printDescription,
};
