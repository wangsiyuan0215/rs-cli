#!/usr/bin/env node

var program = require('commander');

program.version('0.0.1')
       .option('-g, --generator', 'generator wms for development environment')
       .parse(process.argv);


console.log(program.args);
