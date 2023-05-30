/*
 * @Author: SiYuan Wang
 * @Date: 2019-11-01 14:19:54
 * @Description: run
 */

const io = require("./helpers/io");
const pre = require("./helpers/pre-run");
const download = require("./helpers/download");
const install4js = require("./helpers/install");
const handler4packageJson = require("./helpers/handler4package");

const packageJson = require("../package.json");

/**
 * 项目初始化任务运行
 * @method run
 */
function run(name, options) {
  io.printLogo();

  const {
    usingYarn = false,
    usingCache = false,
    usingForce = false,
    usingTaobao = false,
    usingRegistry = "",
  } = options;

  io.printDescription();

  pre.nodeChecker();

  if (!usingYarn) pre.npmChecker();
  else pre.yarnChecker();

  const { projectPath } = pre.targetProjectNameChecker(name, usingForce);

  // 下载相应 Git 地址的模板
  const downloadTitle = io.print4title("Start to download template...");
  download(packageJson.templateRepo["umi4"], projectPath, function (duration) {
    downloadTitle(`Download completed in ${duration}s.`, true);

    // 编辑模板的 package.json 以及相应的其他文件并回写
    handler4packageJson(projectPath, name);

    // 清除 npm cache 并开始安装
    install4js(projectPath, usingYarn, usingCache, usingRegistry, usingTaobao);

    io.print4success("[🎉] All dependencies has been installed, run `npm run start` to launch develop server.")
  });
}

module.exports = run;
