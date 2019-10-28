#!/usr/bin/env node

const fs = require('fs');
const io = require('./helpers/io');
const path = require('path');
const chalk = require('chalk');
const install = require('./helpers/install');
const download = require('./helpers/download');
const commander = require('commander');
const invariant = require('./helpers/invariant');
const packageJson = require('../package.json');
const handler4version = require('./helpers/version');
const handler4packageJson = require('./helpers/handler4package');

let projectName = null;

const program = new commander.Command(packageJson.commandName)
    .version(packageJson.version)
    .arguments('<project-name>')
    .usage(`${chalk.green('<project-name>')} [options]`)
    .action(name => {
        projectName = name;
    })
    .allowUnknownOption()
    .option('--verison', packageJson.version)
    .on('--help', () => {
        console.log(`    Only ${chalk.green('<project-name>')} is required.`);
        console.log();
        console.log(`    If you have any problems, do not hesitate to file an issue:`);
        console.log(`      ${chalk.cyan('https://github.com/wangsiyuan0215/react-generator-cli/issues/new')}`);
        console.log();
    })
    .parse(process.argv);

if (typeof projectName === 'undefined') {
    console.error('Please specify the project name:');
    console.log(
        `  ${chalk.cyan(program.name())} ${chalk.green('<project-name>')}`
    );
    console.log();
    console.log('For example:');
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-react-app')}`);
    console.log();
    console.log(
        `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
    );
    process.exit(1);
} else {
    run(projectName);
}

/**
 * 项目初始化任务运行
 * @method run
 */
function run (name) {
    console.log(`
    *************************************************************************
    *             _____    _____          _____  _       _____              * 
    *            |  __ \\  / ____|        / ____|| |     |_   _|             *
    *            | |__) || (___  ______ | |     | |       | |               *
    *            |  _  /  \\___ \\|______|| |     | |       | |               *
    *            | | \\ \\  ____) |       | |____ | |____  _| |_              *
    *            |_|  \\_\\|_____/         \\_____||______||_____|             *
    *                                                                       *
    *************************************************************************             
    `);

    // 判断 projectName 是否合法
    invariant(/^[a-zA-Z0-9\-_]*$/.test(name), 'your projectName %s is illegal, please typing correct projectName with number and words...', name);

    // 获取目标目录
    const projectPath = path.resolve(process.cwd(), name);

    // 验证是否存在目录
    io.print4title(`Checking ${name} folder...`);

    const isExisted = fs.existsSync(projectPath);

    if (isExisted) {
        // 验证目标目录是否为空
        const files = fs.readdirSync(projectPath);
        invariant(!files.length, 'target folder %s is not empty, please make sure that your project folder is empty.', name);

        io.print4skipped(`${name} folder has been existed, but it's empty, will override...`);

    } else {
        io.print4skipped('No such project or folder, skipped...');
    }

    io.print4title('Checking...Done!');

    // 清除已经存在的空文件夹 or 创建目标文件夹
    io.print4title(`${isExisted ? 'Overriding' : 'Creating' } ${name} folder...`);

    isExisted && fs.rmdirSync(projectPath);
    fs.mkdirSync(projectPath);

    io.print4title(`${isExisted ? 'Overriding' : 'Creating' }...Done!`, 'path:', projectPath);

    // 检查当前 node 运行环境
    io.print4title(`Checking current version of node...`);

    handler4version.node(packageJson);

    io.print4title('Checking...Done!');

    // 检查当前 NPM 的版本
    io.print4title(`Checking current version of npm...`);

    handler4version.npm(packageJson);

    io.print4title('Checking...Done!');

    // 下载相应 Git 地址的模板
    const loading = io.print4loading('Downloading');

    download(packageJson.templateRepo, projectPath, function () {

        clearInterval(loading);

        io.print4title('Downloading...Done!');

        // 编辑模板的 package.json 以及相应的其他文件并回写
        handler4packageJson(projectPath, name);

        // 清除 npm cache 并开始安装
        io.print4title('Preparing to install all dependencies...');

        install(projectPath);

        io.print4title('\nAll dependencies has been installed, Please Enjoy it!');
    });

    // process.exit(0);
}
