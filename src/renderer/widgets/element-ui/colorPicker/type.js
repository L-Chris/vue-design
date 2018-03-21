const setting = Object.freeze({
  label: 'el-color-picker',
  tag: 'VdElColorPicker',
  originTag: 'el-color-picker',
  category: 'form',
  config: {
    Props: [
      {
        key: 'disabled',
        label: 'disabled',
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
        key: 'show-alpha',
        label: 'show-alpha',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'color-format',
        label: 'color-format',
        type: 'String',
        inputType: 'select',
        default: 'hex',
        data: [
          { value: 'hsl', label: 'hsl' },
          { value: 'hsv', label: 'hsv' },
          { value: 'hex', label: 'hex' },
          { value: 'rgb', label: 'rgb' }
        ]
      },
      {
        key: 'popper-class',
        label: 'popper-class',
        type: 'String',
        inputType: 'input',
        default: ''
      }
    ],
    Slots: []
  }
})

export default setting
