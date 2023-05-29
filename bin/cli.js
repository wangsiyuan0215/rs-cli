#!/usr/bin/env node

const io = require("./helpers/io");
const run = require("./run");
const chalk = require("chalk");
const commander = require("commander");
const packageJson = require("../package.json");

const program = new commander.Command(packageJson.commandName).usage(
  "<command> [options]"
);

program
  .command("create <app-name>")
  .description("create a new project powered by @siyuan0215/rs-cli")
  .action((name, options) => {
    const usingYarn = options["withYarn"];
    const usingCache = options["cache"];
    const usingForce = options["force"];
    const usingTaobao = options["taobao"];
    const usingRegistry = options["registry"];

    if (!name) {
      io.print4error("Please specify the project name:");
      console.log(
        `  ${chalk.cyan(program.name())} ${chalk.green("<project-name>")}\n`
      );
      io.print4title("For example:");
      console.log(
        `  ${chalk.cyan(program.name())} ${chalk.green("my-react-app")}\n`
      );
      console.log(
        `  Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
      );
      process.exit(1);
    } else {
      run(name, {
        usingRegistry,
        usingYarn,
        usingCache,
        usingForce,
        usingTaobao,
      });
    }
  });

program
  .option("-F, --force", "Overwrite target directory if it exists")
  .option("-C, --cache", "using cache for dependencies", false)
  .option("-Y, --with-yarn", "installing dependencies with yarn", false)
  .option("-T, --taobao", "Use taobao registry when installing dependencies")
  .option(
    "-R, --registry <url>",
    "Use specified npm registry when installing dependencies (only for npm)"
  );

program.version(`@siyuan0215/rs-cli@${packageJson.version}`);

program
  .on("--help", () => {
    console.log();
    console.log(
      `  Run ${chalk.cyan(
        `rs-cli <command> --help`
      )} for detailed usage of given command.`
    );
    console.log(
      `  If you have any problem, do not hesitate to file an issue: ${chalk.yellow(
        "https://github.com/wangsiyuan0215/rs-cli/issues/new"
      )}\n`
    );
  })
  .addHelpText(
    "after",
    `Examples:
  $ rs-cli create my-react-app
  $ rs-cli create my-react-app-with-yarn -Y
  $ rs-cli create my-react-app-registry -R https://registry.npmmirror.com
  $ rs-cli create my-react-app-using-taobao -T
`
  );

program.parse(process.argv);
