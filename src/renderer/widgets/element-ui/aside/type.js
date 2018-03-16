const setting = Object.freeze({
  label: 'el-aside',
  tag: 'VdElAside',
  originTag: 'el-aside',
  category: 'layout',
  config: {
    Props: [
      {
        key: 'width',
        label: 'width',
        type: 'String',
        inputType: 'input',
        default: ''
      }
    ],
    Slots: [
      {
        name: 'default'
      }
    ]
  }
})

export default setting
