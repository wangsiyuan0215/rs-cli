/*
 * @Author: SiYuan Wang
 * @Date: 2019-10-28 10:19:20
 * @Description: checkVersions
 */

const io = require('./io');
const semver = require('semver');
const childProcess = require('child_process');

const checker = (command, args = ['--version'], name, version, url) => {
    try {
        const currentVersion = childProcess.execSync(`${command} ${args.join(' ')}`).toString().trim();
        const finalVersion = currentVersion.match(/\d+(\.\d+){0,2}/)[0];

        io.print4skipped(`  Version of ${name}: ${finalVersion}`);

        if (version) {
            const isRanged = semver.satisfies(finalVersion, version);

            if (!isRanged) {
                io.print4error(`
                \n  You are using ${name}@${finalVersion} so the project will be boostrapped with an old unsupported version of tools.
                \n  Please update to ${version} for a better, fully supported experience.`);
                process.exit(0);
            }
        }
    } catch(error) {
        io.print4error(`
        \n  The \`${command}\` command is not found.
        \n  It may not be installed the \`${name}\` environment. It is recommended to install it first according to the official website tutorial.
        \n  For more information, please see ${url}`
        );
        process.exit(0);
    }
};

module.exports = {
    checker
};
