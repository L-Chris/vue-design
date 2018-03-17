const setting = Object.freeze({
  label: 'el-form',
  tag: 'VdElForm',
  originTag: 'el-form',
  category: 'form',
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
