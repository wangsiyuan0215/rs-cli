#!/usr/bin/env node

var fs = require('fs'),
    path = require('path'),
    commander = require('commander'),
    spawn = require('cross-spawn'),
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
    run(program.args[0]);
}

/**
 * 从 github 上下载相应的 repo 到 projectName
 * @method downloadFromGithub
 * @param  {string}  repo
 * @param  {string}  target
 */
function downloadFromGithub (repo, target) {
    console.log(chalk.cyan(`Initializing the project <${projectName}>...`));
    download(repo, target, function(err) {
        if (err) return err;

        var packageObject = getTargetPackage(projectName),
            packageJsonPath = path.resolve(target, 'package.json');
        
        editPackage(target, packageObject);
        
        checkNodeVersion(packageObject);

        checkNpmVersion();

        installByNpm(target);
    });
}

function installByNpm (targetPath) {
    console.log(chalk.cyan(`Preparing to \`${chalk.green('npm install')}\`...`));
    var command = 'npm',
        args = ['install', '--save'];
    childProcess.execSync(`cd ${targetPath} && ${command} ${args.join(' ')}`, { stdio: 'inherit' });
}

function getTargetPackage (target) {
    var packageJsonPath = path.resolve(target, 'package.json');
    return require(packageJsonPath);
}

function checkNodeVersion(packageObject) {
    console.log(chalk.cyan(`Checking version of node...`));

    var nodeVersion = childProcess.execSync('node --version').toString().trim();
    console.log(`Version of node: ${nodeVersion}`);

    if (!packageObject.engines || !packageObject.engines.node) {
        return;
    }
  
    if (!semver.satisfies(process.version, packageObject.engines.node)) {
        console.error(
            chalk.red(
            'You are running Node %s.\n' +
                'Create React App requires Node %s or higher. \n' +
                'Please update your version of Node.'
            ),
            process.version,
            packageObject.engines.node
        );
        process.exit(0);
    }
}

function checkNpmVersion () {
    console.log(chalk.cyan(`Checking version of npm...`));

    var hasMinNpm = false,
        npmVersion = null;
    try {
        npmVersion = childProcess.execSync('npm --version').toString().trim();
        console.log(`Version of npm: ${npmVersion}`);
        hasMinNpm = semver.gte(npmVersion, '3.0.0');

        if (!hasMinNpm && npmVersion) {
            throw new Error({ hasMinNpm: hasMinNpm, npmVersion: npmVersion });
        }
    } catch (err) {
        console.log(
            chalk.yellow(`
                You are using npm ${err.npmVersion} so the project will be boostrapped with an old unsupported version of tools.\n
                Please update to npm 3 or higher for a better, fully supported experience.\n
            `)
        );
    }
}

function writeToPackageJson (targetPath, packageJson) {
    var packageJsonPath = path.resolve(targetPath, 'package.json');
    fs.writeFileSync(packageJsonPath, packageJson);
    console.log(`Done...the project path is ${targetPath}`);
}

function editPackage (targetPath, packageObject) {
    packageObject.name = projectName;
    packageObject.version = '0.0.1';
    packageObject.author = '';
    packageObject.description = '';
    delete packageObject.keywords;
    writeToPackageJson(targetPath, JSON.stringify(packageObject));
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

    downloadFromGithub(packageJson.templateRepo, _projectPath);
}
