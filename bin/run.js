/*
 * @Author: SiYuan Wang
 * @Date: 2019-11-01 14:19:54
 * @Description: run
 */

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const io = require("./helpers/io");
const version = require("./helpers/version");
const pre = require("./helpers/pre-run");
const download = require("./helpers/download");
const invariant = require("./helpers/invariant");
const rename4rn = require("./helpers/rn/rename");
const install4js = require("./helpers/install");
const install4pod = require("./helpers/rn/install");
const handler4packageJson = require("./helpers/handler4package");

const packageJson = require("../package.json");

/**
 * 项目初始化任务运行
 * @method run
 */
function run(name, options) {
  io.printLogo();

  const {
    usingRN = false,
    usingRegistry = "",
    usingYarn = false,
    usingCache = false,
    usingForce = false,
    usingTaobao = false,
  } = options;

  io.printDescription();

  pre.nodeChecker();

  // 检查当前 NPM / YARN 的版本
  if (!usingYarn) {
    pre.npmChecker();
  } else {
    pre.yarnChecker();
  }

  // if react-native cli does not exist,
  // notify user that they should install react-native cli and environment
  if (usingRN) {
    io.print4title(`Checking react-native-cli environment and version`);
    version.checker(
      "react-native",
      undefined,
      "react-native-cli",
      false,
      "https://reactnative.cn/docs/getting-started.html"
    );

    io.print4title(`Checking watchman environment and version...`);
    version.checker(
      "watchman",
      undefined,
      "watchman",
      false,
      "https://facebook.github.io/watchman/docs/install.html"
    );

    // TODO... java version checking
    // io.print4title(`Checking Java Development Kit version...`);
    // version.checker('javac', ['-version'], 'Java Development Kit', '>=1.8 || < 1.9', 'https://guides.cocoapods.org/using/getting-started.html#installation');

    io.print4title(`Checking CocoaPods environment and version`);
    version.checker(
      "pod",
      undefined,
      "CocoaPods",
      false,
      "https://guides.cocoapods.org/using/getting-started.html#installation"
    );
  }

  // 判断 projectName 是否合法
  // invariant(/^[a-zA-Z0-9]*$/.test(name), `your projectName %s is illegal, please typing correct <app-name> with number and words.`, name);

  // 获取目标目录
  const projectPath = path.resolve(process.cwd(), name);

  // 验证是否存在目录
  io.print4title(`Checking ${name} folder`);

  const isExisted = fs.existsSync(projectPath);

  if (isExisted) {
    // 验证目标目录是否为空
    const files = fs.readdirSync(projectPath);
    if (files.length) {
      if (usingForce)
        io.print4skipped(
          `<${name}> folder is existed, and it's not empty, it will be overrided by forced...`
        );
      else
        invariant(
          false,
          "folder %s is not empty, please make sure your project folder is empty.",
          name
        );
    }
  } else {
    io.print4skipped(`No such <${name}> folder, continue...`);
  }

  // 清除已经存在的空文件夹 or 创建目标文件夹
  io.print4title(`${isExisted ? "Overriding" : "Creating"} ${name} folder`);
  isExisted && fs.rmSync(projectPath, { recursive: true, force: true });
  fs.mkdirSync(projectPath);
  io.print4skipped(`${name} path:`, projectPath);

  // 下载相应 Git 地址的模板
  const loading = io.print4loading("Downloading");
  download(packageJson.templateRepo[usingRN], projectPath, function (duration) {
    loading();
    io.print4skipped(
      `🎉  Successfully created project ${chalk.yellow(name)} in ${duration}s.`
    );

    // 编辑模板的 package.json 以及相应的其他文件并回写
    handler4packageJson(projectPath, name);

    // 清除 npm cache 并开始安装
    io.print4title(
      `Preparing to install dependencies by ${usingYarn ? "Yarn" : "Npm"}`
    );
    install4js(projectPath, usingYarn, usingCache, usingRegistry, usingTaobao);

    // if (usingRN) {
    //     // rename rn project
    //     io.print4title(`Renaming current project to ${name}`);
    //     rename4rn(projectPath, name, usingYarn);

    //     // 安装 iOS 的依赖
    //     io.print4title('\nPreparing to install dependencies by CocoaPods.');
    //     install4pod(projectPath);
    // }

    io.print4title("\nAll dependencies has been installed, Please Enjoy it!\n");
  });

  // process.exit(0);
}

module.exports = run;
