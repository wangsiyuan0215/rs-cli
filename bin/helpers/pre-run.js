const fs = require("fs");
const io = require("./io");
const path = require("path");
const chalk = require('chalk')
const version = require("./version");
const packageJson = require("../../package.json");

// 检查当前 node 运行环境
module.exports.nodeChecker = () => {
  const title = io.print4title("Checking node environment and version");
  const nodeVersion = version.checker(
    "node",
    undefined,
    "Node",
    packageJson.engines.node,
    "https://nodejs.org/en/"
  );
  title(`Checked node environment and version ${nodeVersion}`, true);
};

// 检查当前 npm 版本
module.exports.npmChecker = () => {
  const title = io.print4title(`Checking npm environment and version`);
  const npmVersion = version.checker(
    "npm",
    undefined,
    "Npm",
    packageJson.engines.npm,
    "https://docs.npmjs.com/downloading-and-installing-node-js-and-npm"
  );
  title(`Checked npm environment and version ${npmVersion}`, true);
};

// 检查当前 npm 版本
module.exports.yarnChecker = () => {
  const title = io.print4title(`Checking yarn environment and version`);
  const yarnVersion = version.checker(
    "yarn",
    undefined,
    "Yarn",
    packageJson.engines.yarn,
    "https://yarnpkg.com/lang/en/docs/install/#mac-stable"
  );
  title(`Checked yarn environment and version ${yarnVersion}`, true);
};

module.exports.targetProjectNameChecker = (name, usingForce) => {
  const title = io.print4title(`Checking if ${name} folder existed`);
  const projectPath = path.resolve(process.cwd(), name);
  const isExisted = fs.existsSync(projectPath);

  if (isExisted) {
    // 验证目标目录是否为空
    const files = fs.readdirSync(projectPath);
    if (!usingForce && files.length) {
      io.print4error(
        `\n\n  Folder <${name}> is not empty, please make sure it empty or use \`-F/--force\` to overrided by forced.\n`
      );
      process.exit(-1);
    }

    title(
      `Folder <${name}> has been created, path: ${chalk.magenta(projectPath)}.`,
      true
    );
    fs.rmSync(projectPath, { recursive: true, force: true });
  } else {
    title(
      `Folder <${name}> has been created, path: ${chalk.magenta(projectPath)}.`,
      true
    );
  }
  fs.mkdirSync(projectPath);

  return {
    isExisted,
    projectPath,
  };
};
