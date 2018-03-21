const setting = Object.freeze({
  label: 'el-row',
  tag: 'VdElRow',
  originTag: 'el-row',
  category: 'layout',
  config: {
    Props: [
      {
        key: 'gutter',
        label: 'gutter',
        type: 'Number',
        inputType: 'input',
        default: 0
      },
      {
        key: 'type',
        label: 'type',
        type: 'String',
        inputType: 'select',
        default: '',
        data: [
          { value: 'flex', label: 'flex' }
        ]
      },
      {
        key: 'justify',
        label: 'justify',
        type: 'String',
        inputType: 'select',
        default: '',
        data: [
          { value: 'start', label: 'start' },
          { value: 'end', label: 'end' },
          { value: 'center', label: 'center' },
          { value: 'space-around', label: 'space-around' },
          { value: 'space-between', label: 'space-between' }
        ]
      },
      {
        key: 'align',
        label: 'align',
        type: 'String',
        inputType: 'select',
        default: '',
        data: [
          { value: 'top', label: 'top' },
          { value: 'middle', label: 'middle' },
          { value: 'bottom', label: 'bottom' }
        ]
      },
      {
        key: 'tag',
        label: 'tag',
        type: 'String',
        inputType: 'input',
        default: 'div'
      }
    ],
    Slots: [
      { name: 'default' }
    ]
  }
})

export default setting
