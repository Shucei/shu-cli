#!/usr/bin/env node
const { program } = require('commander');
console.log('shu cli');

/**
 * process.argv.splice(2)
 * [ 'init', 'a', 'b', 'c' ]shu init a b c 拿到参数
 */
// 1、处理--version的操作
program.version(require('../package.json').version, '-v --version')
// 2、让commander解析process.argv
console.log(program.parse(process.argv));