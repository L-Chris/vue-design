const setting = Object.freeze({
  label: 'el-select',
  tag: 'VdElSelect',
  originTag: 'el-select',
  category: 'form',
  config: {
    Props: [
      {
        key: 'size',
        label: 'size',
        type: 'String',
        inputType: 'select',
        default: '',
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
