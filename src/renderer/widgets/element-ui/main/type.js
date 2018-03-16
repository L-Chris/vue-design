const setting = Object.freeze({
  label: 'el-main',
  tag: 'VdElMain',
  originTag: 'el-main',
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
