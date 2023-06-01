const { promisify } = require('util')
const download = promisify(require('download-git-repo'))
const { vueRepo } = require('../config/repo')
const execCommand = require('../utils/exec-command')
const compileEjs = require('../utils/complle-ejs')

const { program } = require('commander');
const fs = require('fs');
async function createProjectAction (project) {
  // 将模板下载到当前目录下的project文件夹中
  try {
    await download(vueRepo, project, { clone: true })

    // 3、执行npm install
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
    await execCommand(command, ['install'], { cwd: `./${project}` })

    // 4、执行npm run dev
    await execCommand(command, ['run', 'dev'], { cwd: `./${project}` })

  } catch (e) {
    console.log('github连接失败，请检查网络是否正常')
  }
}

async function addComponentAction (component) {
  const result = await compileEjs('component.vue.ejs', { name: component, lowerName: component.toLowerCase() }) // 模板渲染
  const targetPath = program.opts().dest || 'src/components' // 获取目标路径 
  fs.writeFileSync(`${targetPath}/${component}.vue`, result); // 写入文件
  console.log('创建成功');
}


module.exports = {
  createProjectAction,
  addComponentAction
}
