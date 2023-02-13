/*
 * @Author: SiYuan Wang
 * @Date: 2019-10-28 14:16:23
 * @Description: js dependencies install
 */

const io = require('./io');
const registries = require('./registries')
const childProcess = require('child_process');

const commands = {
    npm: {
        cache: `npm cache clean --force`,
        install: `npm install --legacy-peer-deps`
    },
    yarn: {
        cache: `yarn cache clean`,
        install: `yarn install`
    }
};

module.exports = function _npm (targetPath, withYarn, withCache, usingRegistry = '', usingTaobao = false) {
    const commander = commands[withYarn ? 'yarn' : 'npm'];

    process.env.npm_config_registry = registries.npm
    process.env.YARN_NPM_REGISTRY_SERVER = registries.yarn

    if (usingRegistry) {
        process.env.npm_config_registry = usingRegistry
        process.env.YARN_NPM_REGISTRY_SERVER = usingRegistry
    }

    if(usingTaobao) {
        process.env.npm_config_registry = registries.taobao
        process.env.YARN_NPM_REGISTRY_SERVER = registries.taobao
    }

    io.print4skipped(`Using registry: ${withYarn ? process.env.YARN_NPM_REGISTRY_SERVER : process.env.npm_config_registry}`)

    return childProcess.execSync(
        `cd ${targetPath} ${!withCache && `&& ${commander.cache}` || ''} && ${commander.install}`,
        { stdio: 'inherit' });
};
