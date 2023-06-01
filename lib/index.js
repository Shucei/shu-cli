#!/usr/bin/env node
const { program } = require('commander');
const helpOptions = require('./core/help-options')
// 1、配置所有option
helpOptions()

// 2、让commander解析process.argv
program.parse(process.argv)

// 3、打印出来
console.log(program.opts().dest); // src/pages