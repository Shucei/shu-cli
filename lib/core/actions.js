const { promisify } = require('util')
const download = promisify(require('download-git-repo'))
const { vueRepo } = require('../config/repo')
const { commandSpawn } = require('../utils/exec-command')
const compileEjs = require('../utils/complle-ejs')
const writeFile = require('../utils/write-file')
const path = require('path')
const { program } = require('commander');
async function createProjectAction (project) {
  // 将模板下载到当前目录下的project文件夹中
  try {
    await download(vueRepo, project, { clone: true })

    // 3、执行npm install
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
    await commandSpawn(command, ['install'], { cwd: `./${project}` })

    // 4、执行npm run serve
    await commandSpawn(command, ['run', 'dev'], { cwd: `./${project}` })

  } catch (e) {
    console.log('github连接失败，请检查网络是否正常')
  }
}

async function addComponentAction (component) {
  const result = await compileEjs('component.vue.ejs', { name: component, lowerName: component.toLowerCase() })
  const targetPath = program.opts().dest || 'src/components'

  await writeFile(`${targetPath}/${component}.vue`, result)
  console.log('创建成功');
}


module.exports = {
  createProjectAction,
  addComponentAction
}
