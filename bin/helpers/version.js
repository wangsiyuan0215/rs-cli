/*
 * @Author: SiYuan Wang
 * @Date: 2019-10-28 10:19:20
 * @Description: checkVersions
 */

const io = require('./io');
const semver = require('semver');
const childProcess = require('child_process');

/**
 * 检查 node 版本
 * @param packageObject {{ engines: object }}
 */
function node(packageObject) {
    const nodeVersion = childProcess.execSync('node --version').toString().trim();

    io.print4info(`  Version of node: ${nodeVersion}`);

    if (!packageObject.engines || !packageObject.engines.node) {
        return;
    }

    if (!semver.satisfies(process.version, packageObject.engines.node)) {
        io.print4error(
            `You are running Node ${process.version}. Create React App requires Node ${packageObject.engines.node} or higher. Please update your version of Node.`
        );
        process.exit(0);
    }
}

/**
 * 检查 npm/yarn 版本
 */
const dependenciesManagerTypes = {
    NPM: 'npm',
    YARN: 'yarn'
};
function dependenciesManager (name = dependenciesManagerTypes.NPM) {
    const version = childProcess.execSync(`${name} --version`).toString().trim();

    io.print4info(`  Version of ${name}: ${version}`);

    const hasMinVersion = semver.gte(version, name === dependenciesManagerTypes.NPM ? '3.0.0' : '1.13.0');

    if (!hasMinVersion && version) {
        io.print4error(
            `You are using ${name} ${version} so the project will be boostrapped with an old unsupported version of tools. Please update to npm 3.0.0 or yarn 1.13.0 or higher for a better, fully supported experience.`
        );
        process.exit(0);
    }
}

module.exports = {
    dependenciesManager,
    dependenciesManagerTypes,
    node
};
