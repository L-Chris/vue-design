const setting = Object.freeze({
  label: 'el-tag',
  tag: 'VdElTag',
  originTag: 'el-tag',
  category: 'data',
  config: {
    Props: [
      {
        key: 'type',
        label: 'type',
        type: 'String',
        inputType: 'select',
        default: '',
        data: [
          { value: 'success', label: 'success' },
          { value: 'info', label: 'info' },
          { value: 'warning', label: 'warning' },
          { value: 'danger', label: 'danger' }
        ]
      },
      {
        key: 'closable',
        label: 'closable',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'disable-transitions',
        label: 'disable-transitions',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'hit',
        label: 'hit',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'color',
        label: 'color',
        type: 'String',
        inputType: 'input',
        default: ''
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
      }
    ],
    Slots: [
      { name: 'default' }
    ]
  }
})

export default setting
