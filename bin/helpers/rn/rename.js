/*
 * @Author: SiYuan Wang
 * @Date: 2019-10-29 16:00:35
 * @Description: rename
 */

const childProcess = require('child_process');

module.exports = function _rename4rn (targetPath, name, usingYarn = false) {
    try {
        return childProcess.execSync(
            !usingYarn
                ? `cd ${targetPath} && npm run rename -- ${name}`
                : `cd ${targetPath} && yarn run rename ${name}`,
            { stdio: 'inherit' });
    } catch (error) {
        process.exit(0);
    }
};
