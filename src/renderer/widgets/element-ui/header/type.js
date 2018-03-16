const setting = Object.freeze({
  label: 'el-header',
  tag: 'VdElHeader',
  originTag: 'el-header',
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
