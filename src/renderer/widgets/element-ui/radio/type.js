const setting = Object.freeze({
  label: 'el-radio',
  tag: 'VdElRadio',
  originTag: 'el-radio',
  category: 'form',
  config: {
    Props: [
      {
        key: 'label',
        label: 'label',
        type: 'String',
        inputType: 'input',
        default: ''
      },
      {
        key: 'disabled',
        label: 'disabled',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'border',
        label: 'border',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'size',
        label: 'size',
        type: 'String',
        inputType: 'select',
        default: 'medium',
        data: [
          { value: 'medium', label: 'medium' },
          { value: 'small', label: 'small' },
          { value: 'mini', label: 'mini' }
        ]
      },
      {
        key: 'name',
        label: 'name',
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
