const { spawn } = require('child_process');
function execCommand (...args) {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args); // 开启子进程
    childProcess.stdout.pipe(process.stdout); // 子进程的输出流，导入到主进程的输出流
    childProcess.stderr.pipe(process.stderr); // 子进程的错误流，导入到主进程的错误流

    // 监听子进程的关闭事件
    childProcess.on('close', () => {
      resolve();
    }
    );
  })
}

module.exports = execCommand;