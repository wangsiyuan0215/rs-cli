#!/usr/bin/env node

const io = require('./helpers/io');
const run = require('./run');
const chalk = require('chalk');
const commander = require('commander');
const packageJson = require('../package.json');

const program =  new commander.Command(packageJson.commandName)
    .version(`@capgemini/rs-cli ${packageJson.version}`)
    .usage('<command> [options]')

program
    .command('create <app-name>')
    .description('create a new project powered by @capgemini/rs-cli')
    .option('-c, --cache', 'using cache for dependencies', false)
    .option('-f, --force', 'Overwrite target directory if it exists')
    .option('-r, --registry <url>', 'Use specified npm registry when installing dependencies (only for npm)')
    .option('-t, --taobao', 'Use taobao registry when installing dependencies')
    .option('-y, --with-yarn', 'installing dependencies with yarn', false)
    .action((name, options) => {
        const usingYarn = options['withYarn'];
        const usingCache = options['cache'];
        const usingForce = options['force']
        const usingTaobao = options['taobao'];
        const usingRegistry = options['registry'];

        if (!name) {
            io.print4error('Please specify the project name:');
            console.log(`  ${chalk.cyan(program.name())} ${chalk.green('<project-name>')}\n`);
            io.print4title('For example:');
            console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-react-app')}\n`);
            console.log(`  Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`);
            process.exit(1);
        } else {
            run(name, { usingRegistry, usingYarn, usingCache, usingForce, usingTaobao });
        }
    });

program
    .on('--help', () => {
        console.log();
        console.log(`  Run ${chalk.cyan(`rs-cli <command> --help`)} for detailed usage of given command.`);
        console.log(`  If you have any problems, do not hesitate to file an issue:`);
        console.log(`  ${chalk.cyan('https://github.com/wangsiyuan0215/react-generator-cli/issues/new')}`);
    })

program.parse(process.argv)

