#!/usr/bin/env node

var fs = require('fs'),
    path = require('path'),
    program = require('commander'),
    childProcess = require('child_process'),
    chalk = require('chalk'),
    PATHS = require('./paths.js');

program.version('0.0.1')
       .option('-g <projectName>', 'generator wms for development environment')
       .parse(process.argv);

var argv = require('minimist')(process.argv.slice(2));

if("undefined" === typeof argv.g) {
    console.error(
        'You did not pass any commands, did you mean to run `react-generator init`?'
    );
    process.exit(1);
} else {
    var root = argv.g;
    if (!fs.existsSync(root)) {
        fs.mkdirSync(root);
    }

    process.chdir(root);
    var packageJson = fs.readFileSync(PATHS.PACKAGE_JSON_PATH(), 'utf8'),
        babelrc = fs.readFileSync(PATHS.BABELRC_PATH(), 'utf8'),
        eslintrc = fs.readFileSync(PATHS.ESLINTRC_PATH(), 'utf8');

    console.log(chalk.yellow("Generating rc files for babel & eslint..."));

    fs.writeFileSync(path.resolve(process.cwd(), './.babelrc'), babelrc);
    fs.writeFileSync(path.resolve(process.cwd(), './.eslintrc'), eslintrc);
    fs.writeFile(path.resolve(process.cwd(), './package.json'), packageJson, function(err) {
        if(err) {
            if(err.code === 'EACCES') {
                console.log(chalk.red('error: -13 ') +
                    " - " +
                    chalk.cyan("permission denied, please use 'sudo react-generator -g <projectName>'."));

                process.exit(1);
            }
        } else {
            console.log(chalk.green("Success for generating rc files for babel & eslint!"));

            initialConfig();
            process.chdir("../");
            initialSrc();
            process.chdir("../");
            installNpm();
        }
    });
}

/**
 * initial config folder
 */
function initialConfig () {
    var configDirName = "config";

    if (!fs.existsSync(configDirName)) {
        fs.mkdirSync(configDirName);
    }

    process.chdir(configDirName);

    var _configFiles = {
        "_config": fs.readFileSync(PATHS._CONFIG_PATH(), 'utf8'),
        "karma.config": fs.readFileSync(PATHS.KARMA_CONFIG_PATH(), 'utf8'),
        "product": fs.readFileSync(PATHS.PRODUCT_PATH(), 'utf8'),
        "server": fs.readFileSync(PATHS.SERVER_PATH(), 'utf8'),
        "webpack.config": fs.readFileSync(PATHS.WEBPACK_CONFIG_PATH(), 'utf8'),
    };

    console.log(chalk.yellow("Generating Config folder..."));

    for (var item in _configFiles) {
        if(_configFiles.hasOwnProperty(item)) {
            (function(name) {
                console.log(chalk.cyan("Generating " + name + '.js...'));
                fs.writeFileSync(path.resolve(process.cwd(), './' + name + '.js'), _configFiles[name])
            })(item);
        }
    }

    console.log(chalk.green("Success for generating Config folder!"));
}

/**
 * initial src folder
 */
function initialSrc() {

    var srcDirName = "src";
    if (!fs.existsSync(srcDirName)) {
        fs.mkdirSync(srcDirName);
    }

    process.chdir(srcDirName);

    var srcPath = PATHS.SRC_PATH(),
        files = readFiles(srcPath, '');

    console.log(chalk.yellow("Generating folder and files for src..."));

    for(var item in files) {
        if(files.hasOwnProperty(item)) {
            if(files[item].type === 'dir') {
                if (!fs.existsSync('./' + files[item].parent + "/" +
                    files[item].name)) {

                    console.log(chalk.cyan("Generating folder: src" +
                        files[item].parent + '/' +
                        files[item].name));

                    fs.mkdirSync('./' + files[item].parent + "/" +
                        files[item].name);
                }
            } else if (files[item].type === 'file') {
                (function(name) {
                    var _fileContent = fs.readFileSync(files[name].path, 'utf8');

                    console.log(chalk.cyan("Generating files: src" +
                        files[item].parent + '/' +
                        files[item].name));

                    fs.writeFileSync(path.resolve(process.cwd(), './' +
                        files[name].parent + '/' +
                        files[name].name),
                        _fileContent);

                })(item);
            }
        }
    }

    console.log(chalk.green("Success for generating src folder!"));
}

/**
 * install dependencies with npm for package.json
 */
function installNpm() {
    console.log(chalk.yellow("Installing dependencies from npm. " +
        "This might take a while..."));

    var child = childProcess.exec("npm install", function(err, stdout, stderr) {
        if (err) {
          console.log(stdout);
          console.error(stderr);
          console.error(chalk.red(' Installing dependencies failed.'));
          process.exit(1);
      } else {
          console.log(chalk.magenta(stdout));
          console.log(chalk.green("Success!"));
      }
    });
}

/**
 * read files with recursion
 * @param  {string} path
 * @param  {string} parentName
 * @return {array}
 */
function readFiles(path, parentName) {
    var files = fs.readdirSync(path),
        reg = /^[A-Za-z]*$/;

    for(var file in files) {
        if(files.hasOwnProperty(file)) {
            if(reg.test(files[file])) {
                files[file] = {type: 'dir', path: path + '/' + files[file],
                    name: files[file], parent: parentName};
                files = files.concat(readFiles(files[file].path,
                    parentName + "/" + files[file].name));
            } else {
                files[file] = {type: 'file', path: path + '/' + files[file],
                    name: files[file], parent: parentName};
            }
        }
    }

    return files;
}
