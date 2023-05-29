const io = require("./io");
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
  title(nodeVersion);
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
  title(npmVersion);
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
  title(yarnVersion);
};
