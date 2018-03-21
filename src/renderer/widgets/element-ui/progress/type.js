const setting = Object.freeze({
  label: 'el-progress',
  tag: 'VdElProgress',
  originTag: 'el-progress',
  category: 'data',
  config: {
    Props: [
      {
        key: 'percentage',
        label: 'percentage',
        type: 'Number',
        inputType: 'input',
        default: 0
      },
      {
        key: 'type',
        label: 'type',
        type: 'String',
        inputType: 'select',
        default: 'line',
        data: [
          { value: 'line', label: 'line' },
          { value: 'circle', label: 'circle' }
        ]
      },
      {
        key: 'stroke-width',
        label: 'stroke-width',
        type: 'Number',
        inputType: 'input',
        default: 1
      },
      {
        key: 'text-inside',
        label: 'text-inside',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'status',
        label: 'status',
        type: 'String',
        inputType: 'select',
        default: '',
        data: [
          { value: 'success', label: 'success' },
          { value: 'exception', label: 'exception' }
        ]
      },
      {
        key: 'width',
        label: 'width',
        type: 'Number',
        inputType: 'input',
        default: 126
      },
      {
        key: 'show-text',
        label: 'show-text',
        type: 'Boolean',
        inputType: 'switch',
        default: true
      }
    ],
    Slots: []
  }
})

export default setting
