#!/usr/bin/env node
const { program } = require('commander');
const chalk = require('chalk'); // 命令行美化
const inquirer = require('inquirer'); // 命令行交互
const ora = require('ora'); // 命令行loading,类似于进度条,可以设置动画,颜色等
const { exec } = require('child_process'); // 开启子进程
const helpOptions = require('./core/help-options') // 帮助和可选信息
const { createProjectAction, addComponentAction } = require('./core/actions');
const { promptTypeList } = require('./config/promptType'); // 项目模板类型
const checkDire = require('./utils/checkDire'); // 检查创建目录是否存在
const path = require('path');
const { join } = require('path');
const fs = require('fs');
// 1、配置所有option
helpOptions()

// 2、增加自定义命令，具体功能在
program.command('create <project> [...others]').description('create vue project into a folder, 例如：shu create xxxx').action(createProjectAction)

program.command('add <component> [...others]').description('add vue component into a folder,例如：shu add Button').action(addComponentAction)

program
  .command('init <projectName>')
  .alias('i')
  .description('输入项目名称，初始化项目模板')
  .action(async (projectName, cmd) => {
    await checkDire(join(process.cwd(), projectName), projectName); // 检查创建目录是否存在

    const result = await inquirer.prompt(promptTypeList);
    const { url, gitName, val } = result.type;

    console.log('请选择的模板类型信息如下：' + val);

    const spinner = ora('项目初始化拷贝获取中...');
    spinner.start(); // 开始loading
    const execPromise = (command) => {
      return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(stdout);
        });
      });
    };
    if (!url) {
      console.log(chalk.red(`${val} 该类型暂不支持...`));
      return;
    } else {
      const spin = ora(chalk.blue(`开始拉取${val}模板...`));
      spin.start(); // 开始loading
      try {
        await execPromise(`git clone ${url}`); // 克隆项目
      } catch (error) {
        console.log(chalk.red(`clone fail,拉取失败`));
        return;
      } finally {
        spin.stop(); // 结束loading
        spinner.stop(); // 结束loading
      }
    }

    try {
      await fs.promises.rename(gitName, projectName);
      console.log(chalk.green(`项目初始化成功`));
    } catch (err) {
      await execPromise(`rm -rf ${gitName}`);
      console.log(chalk.red(`项目重命名失败,${err}`));
    } finally {
      spinner.stop(); // 结束loading
    }
  });


// 2、让commander解析process.argv
program.parse(process.argv)

// 3、打印options，传入的参数
// console.log(program.opts().dest); // src/pages
