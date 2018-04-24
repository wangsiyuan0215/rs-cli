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

        var packageJsonPath = path.resolve(process.cwd(), projectName, 'package.json'),
            packageObject = require(packageJsonPath),
            packageJson = modifyPackage(packageObject);
        
        fs.writeFileSync(packageJsonPath, packageJson);
        console.log(`Done...the project path is ${target}`);

        console.log(chalk.cyan(`Checking version of node and npm...`));
        checkNodeVersion(packageObject);
        var npmInfo = checkNpmVersion();
        if (npmInfo.hasMinNpm) {
            if (npmInfo.npmVersion) {
                console.log(
                    chalk.yellow(`
                        You are using npm ${npmInfo.npmVersion} so the project will be boostrapped with an old unsupported version of tools.\n
                        Please update to npm 3 or higher for a better, fully supported experience.\n
                    `)
                );
            }
        }

        console.log(chalk.cyan(`Preparing to \`${chalk.green('npm install')}\`...`));
        var command = 'npm',
            args = ['install', '--save'];
        childProcess.execSync(`cd ${target} && ${command} ${args.join(' ')}`, { stdio: 'inherit' });
    });
}

function checkNodeVersion(packageObject) {
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
    var hasMinNpm = false,
        npmVersion = null;
    try {
        npmVersion = childProcess.execSync('npm --version').toString().trim();
        console.log(`Version of npm: ${npmVersion}`);
        hasMinNpm = semver.gte(npmVersion, '3.0.0');
    } catch (err) {
      // ignore
    }
    return {
        hasMinNpm: hasMinNpm,
        npmVersion: npmVersion,
    };
}

function modifyPackage (packageObject) {
    packageObject.name = projectName;
    packageObject.version = '0.0.1';
    packageObject.author = '';
    packageObject.description = '';
    delete packageObject.jest;
    delete packageObject.keywords;

    return JSON.stringify(packageObject);
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
