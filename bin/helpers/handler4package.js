/*
 * @Author: SiYuan Wang
 * @Date: 2019-10-25 16:25:09
 * @Description: getTargetPackage
 */

const fs = require('fs');
const path = require('path');

/**
 * 获取目标 package.json
 * @param target
 * @returns {Object}
 */
function getTargetPackage (target) {
    const packageJsonPath = path.resolve(target, 'package.json');
    return {
        path: packageJsonPath,
        content: require(packageJsonPath)
    };
}

function writeBackToTargetPackage (targetPath, packageObject) {
    fs.writeFileSync(targetPath, JSON.stringify(packageObject));
}

module.exports = function handler4packageJson (targetPath, projectName) {

    const { path: targetPackagePath, content: targetPackage } = getTargetPackage(targetPath);

    const finalTargetPackage = {
        ...targetPackage,
        name: projectName,
        author: '',
        version: '0.0.1',
        description: ''
    };

    writeBackToTargetPackage(targetPackagePath, finalTargetPackage);
};
