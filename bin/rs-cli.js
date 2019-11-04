#!/usr/bin/env node

const io = require('./helpers/io');
const run = require('./run');
const chalk = require('chalk');
const commander = require('commander');
const packageJson = require('../package.json');

let usingRN = false;
let usingYarn = false;
let usingCache = false;
let projectName = '';

const program = new commander.Command(packageJson.commandName)
    .version(packageJson.version)
    .arguments('<project-name>')
    .allowUnknownOption()
    .usage('<project-name> [options]')
    .option('-c, --cache', 'using cache for dependencies', false)
    .option('-y, --with-yarn', 'installing dependencies with yarn', false)
    .option('-r, --react-native', 'generating react-native project', false)
    .action((name, cmd) => {
        usingRN = cmd['reactNative'];
        usingYarn = cmd['withYarn'];
        usingCache = cmd['cache'];
        projectName = name;
    })
    .on('--help', () => {
        console.log(`\n    Only ${chalk.green('<project-name>')} is required.`);
        console.log();
        console.log(`    If you have any problems, do not hesitate to file an issue:`);
        console.log(`      ${chalk.cyan('https://github.com/wangsiyuan0215/react-generator-cli/issues/new')}`);
        console.log();
    })
    .parse(process.argv);

if (projectName === '') {
    io.print4error('Please specify the project name:');
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green('<project-name>')}\n`
    );
    io.print4title('For example:');
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-react-app')}\n`);
    console.log(
        `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
    );
    process.exit(1);
} else {
    run(projectName, usingRN, usingYarn, usingCache);
}


