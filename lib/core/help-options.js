const { program } = require('commander');
function helpOptions () {
  /**
   * process.argv.splice(2)
   * [ 'init', 'a', 'b', 'c' ]shu init a b c 拿到参数
   */
  // 1、处理--version的操作
  program.version(require('../../package.json').version, '-v --version')

  // 2、增加option的操作(<dest>传入的参数)
  program.option('-d --dest <dest>', 'a destination folder 例如：-d src/pages, 会在src/pages下创建文件夹')
  program.option('-w --watch', 'watch file change')

  // 3、增加自定义help选项
  program.on('--help', () => {
    console.log('')
    console.log('Other:')
    console.log('  other options~')
  }
  )
}

module.exports = helpOptions