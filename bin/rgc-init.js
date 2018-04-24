#!/usr/bin/env node

var fs = require('fs'),
    path = require('path'),
    commander = require('commander'),
    childProcess = require('child_process'),
    chalk = require('chalk'),
    download = require('download-git-repo'),
    packageJson = require('../package.json');

var projectName;

var program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<project-name>')
    .usage(`${chalk.green('<project-name>')} [options]`)
    .action(name => {
        projectName = name;
    })
    .allowUnknownOption()
    .on('--help', () => {
        console.log(`    Only ${chalk.green('<project-name>')} is required.`);
        console.log();
        console.log(`    If you have any problems, do not hesitate to file an issue:`);
        console.log(`      ${chalk.cyan('https://github.com/wangsiyuan0215/react-generator-cli/issues/new')}`);
        console.log();
    })
    .parse(process.argv);

console.log(program);

if (typeof projectName === 'undefined') {
    if (program.info) {
        envinfo.print({
            packages: ['react', 'react-dom', 'react-scripts'],
            noNativeIDE: true,
            duplicates: true,
        });
        process.exit(0);
    }
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
    run(program.args[0]);
}

/**
 * 从 github 上下载相应的 repo 到 projectName
 * @method download
 * @param  {string}  repo
 * @param  {string}  target
 */
function download (repo, target) {
    console.log(chalk.yellow(`starting initialize...`));
    download(repo, target, function(err) {
        if (err) return err;
        console.log(chalk.green(`end initialize, success!`));
    });
}

function checkNpmVersion () {
    var hasMinNpm = false,
        npmVersion = null;
    try {
        npmVersion = execSync('npm --version').toString().trim();
        hasMinNpm = semver.gte(npmVersion, '3.0.0');
    } catch (err) {
      // ignore
    }
    return {
        hasMinNpm: hasMinNpm,
        npmVersion: npmVersion,
    };
}

/**
 * 项目初始化任务运行
 * @method run
 * @param  {string}  projectPath
 */
function run (projectPath) {
    var _projectPath = path.resolve(process.cwd(), projectPath);

    if (!fs.existsSync(_projectPath)) {
        fs.mkdirSync(_projectPath);
    }

    downloadFromGitHub(packageJson.templateRepo, _projectPath);
}
