/*
 * @Author: SiYuan Wang
 * @Date: 2019-10-29 16:11:05
 * @Description: rn install
 */
const path = require('path');
const childProcess = require('child_process');

module.exports = function _install4pod (targetPath) {
    return childProcess.execSync(
        `cd ${targetPath}${path.sep}ios && pod install`,
        { stdio: 'inherit' });
};
