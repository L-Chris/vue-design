const setting = Object.freeze({
  label: 'el-input',
  tag: 'VdElInput',
  originTag: 'el-input',
  category: 'form',
  config: {
    Props: [
      {
        key: 'type',
        label: 'type',
        type: 'String',
        inputType: 'select',
        default: 'text',
        data: [
          { value: 'text', label: 'text' },
          { value: 'textarea', label: 'textarea' }
        ]
      },
      {
        key: 'value',
        label: 'value',
        type: 'String',
        inputType: 'input',
        default: ''
      },
      {
        key: 'maxLength',
        label: 'maxLength',
        type: 'Number',
        inputType: 'input',
        default: 0
      },
      {
        key: 'minLength',
        label: 'minLength',
        type: 'Number',
        inputType: 'input',
        default: 0
      },
      {
        key: 'placeholder',
        label: 'placeholder',
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
      },
      {
        key: 'prefix-icon',
        label: 'prefix-icon',
        type: 'String',
        inputType: 'input',
        default: ''
      },
      {
        key: 'suffix-icon',
        label: 'suffix-icon',
        type: 'String',
        inputType: 'input',
        default: ''
      },
      {
        key: 'rows',
        label: 'rows',
        type: 'Number',
        inputType: 'input',
        default: 0
      },
      {
        key: 'autosize',
        label: 'autosize',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'auto-complete',
        label: 'auto-complete',
        type: 'String',
        inputType: 'select',
        default: 'on',
        data: [
          { value: 'on', label: 'on' },
          { value: 'off', label: 'off' }
        ]
      },
      {
        key: 'name',
        label: 'name',
        type: 'String',
        inputType: 'input',
        default: ''
      },
      {
        key: 'readonly',
        label: 'readonly',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'max',
        label: 'max',
        type: 'String',
        inputType: 'input',
        default: ''
      },
      {
        key: 'min',
        label: 'min',
        type: 'String',
        inputType: 'input',
        default: ''
      },
      {
        key: 'step',
        label: 'step',
        type: 'String',
        inputType: 'input',
        default: ''
      },
      {
        key: 'resize',
        label: 'resize',
        type: 'String',
        inputType: 'select',
        default: 'none',
        data: [
          { value: 'none', label: 'none' },
          { value: 'both', label: 'both' },
          { value: 'horizontal', label: 'horizontal' },
          { value: 'vertical', label: 'vertical' }
        ]
      },
      {
        key: 'autofocus',
        label: 'autofocus',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'form',
        label: 'form',
        type: 'String',
        inputType: 'input',
        default: ''
      },
      {
        key: 'label',
        label: 'label',
        type: 'String',
        inputType: 'input',
        default: ''
      },
      {
        key: 'tabindex',
        label: 'tabindex',
        type: 'String',
        inputType: 'input',
        default: ''
      }
    ],
    Slots: [
      { name: 'prefix' },
      { name: 'suffix' },
      { name: 'prepend' },
      { name: 'append' }
    ]
  }
})

export default setting
