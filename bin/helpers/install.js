/*
 * @Author: SiYuan Wang
 * @Date: 2019-10-28 14:16:23
 * @Description: js dependencies install
 */

const childProcess = require('child_process');

const commands = {
    npm: {
        cache: `npm cache clean --force`,
        install: `npm install`
    },
    yarn: {
        cache: `yarn cache clean`,
        install: `yarn install`
    }
};

module.exports = function _npm (targetPath, withYarn, withCache) {
    const commander = commands[withYarn ? 'yarn' : 'npm'];
    return childProcess.execSync(
        `cd ${targetPath} ${!withCache && `&& ${commander.cache}` || ''} && ${commander.install}`,
        { stdio: 'inherit' });
};
