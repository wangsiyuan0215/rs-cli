#!/usr/bin/env node

var fs = require('fs'),
    path = require('path'),
    program = require('commander'),
    childProcess = require('child_process'),
    chalk = require('chalk'),
    download = require('download-git-repo'),
    packageJson = require('../package.json'),
    reactTemplateRepo = 'wangsiyuan0215/react-template';

program
    .version(packageJson.version)
    .usage('<projectName>')
    .parse(process.argv);

var _path = program.args[0];

if("undefined" === typeof _path) {

    console.error('You did not pass any arguments, did you mean to run `rgc-init <projectName>`?');
    process.exit(1);

} else if (_path) {
    runInit(_path);
}

/**
 * 从 github 上下载相应的 repo 到 projectName
 * @method downloadFromGitHub
 * @param  {string}  repo
 * @param  {string}  target
 */
function downloadFromGitHub (repo, target) {
    console.log(chalk.yellow(`starting initialize...`));
    download(repo, target, function(err) {
        if (err) return err;
        console.log(chalk.green(`end initialize, success!`));
    });
}

/**
 * 项目初始化任务运行
 * @method downloadFromGitHub
 * @param  {string}  projectPath
 */
function runInit (projectPath) {
    var _projectPath = path.resolve(process.cwd(), projectPath);

    // 判断文件是否存在
    if (!fs.existsSync(_projectPath)) {
        // 不存在则创建
        fs.mkdirSync(_projectPath);
    }

    downloadFromGitHub(reactTemplateRepo, _projectPath);
}
