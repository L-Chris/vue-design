const setting = Object.freeze({
  label: 'el-form',
  tag: 'VdElForm',
  originTag: 'el-form',
  category: 'form',
  config: {
    Props: [
      {
        key: 'model',
        label: 'model',
        type: 'Object',
        inputType: 'input',
        default: {}
      },
      {
        key: 'rules',
        label: 'rules',
        type: 'Object',
        inputType: 'input',
        default: {}
      },
      {
        key: 'inline',
        label: 'inline',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'label-position',
        label: 'label-position',
        type: 'String',
        inputType: 'select',
        default: 'right',
        data: [
          { value: 'right', label: 'right' },
          { value: 'left', label: 'left' },
          { value: 'top', label: 'top' }
        ]
      },
      {
        key: 'label-width',
        label: 'label-width',
        type: 'String',
        inputType: 'input',
        default: ''
      },
      {
        key: 'label-suffix',
        label: 'label-suffix',
        type: 'String',
        inputType: 'input',
        default: ''
      },
      {
        key: 'show-message',
        label: 'show-message',
        type: 'Boolean',
        inputType: 'switch',
        default: true
      },
      {
        key: 'inline-message',
        label: 'inline-message',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'status-icon',
        label: 'status-icon',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'validate-on-rule-change',
        label: 'validate-on-rule-change',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
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
      },
      {
        key: 'disabled',
        label: 'disabled',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      }
    ],
    Slots: [
      { name: 'default' }
    ]
  }
})

export default setting
