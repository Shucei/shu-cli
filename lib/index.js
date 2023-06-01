#!/usr/bin/env node
const { program } = require('commander');
const helpOptions = require('./core/help-options')
const { createProjectAction, addComponentAction } = require('./core/actions')
// 1、配置所有option
helpOptions()

// 2、增加自定义命令，具体功能在
program.command('create <project> [...others]').description('create vue project into a folder, 例如：shu create xxxx').action(createProjectAction)

program.command('add <component> [...others]').description('add vue component into a folder,例如：shu add Button').action(addComponentAction)
// 2、让commander解析process.argv
program.parse(process.argv)

// 3、打印options，传入的参数
// console.log(program.opts().dest); // src/pages