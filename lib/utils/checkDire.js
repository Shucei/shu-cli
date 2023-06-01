const fs = require('fs');
const chalk = require('chalk');
const path = require('path');
const ora = require('ora');

// 检查创建目录是否存在
module.exports = function checkDire (projectPath, projectName) {
  return new Promise((resolve, reject) => {
    let isExists = fs.existsSync(projectPath)
    if (isExists) {
      console.log(chalk.red(`项目${projectName}已经存在`));
      reject()
    }
    resolve()
  })
}

