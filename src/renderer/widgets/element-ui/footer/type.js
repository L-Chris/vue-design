const setting = Object.freeze({
  label: 'el-footer',
  tag: 'VdElFooter',
  originTag: 'el-footer',
  category: 'layout',
  config: {
    Props: [
      {
        key: 'height',
        label: 'height',
        type: 'String',
        inputType: 'input',
        default: ''
      }
    ],
    Slots: [
      { name: 'default' }
    ]
  }
})

export default setting
