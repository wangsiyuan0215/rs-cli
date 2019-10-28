/*
 * @Author: SiYuan Wang
 * @Date: 2019-10-28 14:16:23
 * @Description: npm install
 */

const childProcess = require('child_process');

const commands = {
    npm: {
        cache: `npm cache clean --force`,
        install: `npm install`
    },
    yarn: {}
};

module.exports = function _npm (targetPath) {
    return childProcess.execSync(
        `cd ${targetPath} && ${commands.npm.cache} && ${commands.npm.install}`,
        { stdio: 'inherit' });
};
