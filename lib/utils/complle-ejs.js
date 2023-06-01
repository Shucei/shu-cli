const path = require('path')
const ejs = require('ejs')


function compileEjs (temName, data) {
  const template = `../template/${temName}`
  const templatePath = path.resolve(__dirname, template)
  // console.log(ejs);
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, data, (err, str) => {
      if (err) {
        console.log('模板渲染失败');
        reject(err)
        return
      }
      console.log('模板渲染成功');
      resolve(str)
    })
  })
}


module.exports = compileEjs