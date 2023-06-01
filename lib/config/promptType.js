module.exports = {
  promptTypeList: {
    type: 'list',
    name: 'type',
    message: '请选择拉取的模板类型：',
    choices: [
      {
        name: 'vue',
        value: {
          url: 'https://github.com/coderwhy/vue3_template.git',
          gitName: 'vue3_template',
          val: 'vue'
        }
      },
      {
        name: 'react',
        value: {
          url: '',
          gitName: 'react_template',
          val: 'react'
        }
      }
    ]
  },
  // promptProjectName: {
  //   type: 'input',
  //   name: 'projectName',
  //   message: '请输入项目名称',
  //   validate (val) {
  //     if (val === '') {
  //       return '项目名称不能为空'
  //     }
  //     return true
  //   }
  // },
  // promptComponentName: {
  //   type: 'input',
  //   name: 'componentName',
  //   message: '请输入组件名称',
  //   validate (val) {
  //     if (val === '') {
  //       return '组件名称不能为空'
  //     }
  //     return true
  //   }
  // }

}