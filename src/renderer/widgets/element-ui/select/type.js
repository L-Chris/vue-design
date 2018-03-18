const setting = Object.freeze({
  label: 'el-select',
  tag: 'VdElSelect',
  originTag: 'el-select',
  category: 'form',
  config: {
    Props: [
      {
        key: 'multiple',
        label: 'multiple',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'disabled',
        label: 'disabled',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'value-key',
        label: 'value-key',
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
        key: 'clearable',
        label: 'clearable',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'collapse-tags',
        label: 'collapse-tags',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'multiple-limit',
        label: 'multiple-limit',
        type: 'Number',
        inputType: 'input',
        default: 0
      },
      {
        key: 'name',
        label: 'name',
        type: 'String',
        inputType: 'input',
        default: ''
      },
      {
        key: 'auto-complete',
        label: 'auto-complete',
        type: 'String',
        inputType: 'select',
        default: 'off',
        data: [
          { value: 'off', label: 'off' },
          { value: 'on', label: 'on' }
        ]
      },
      {
        key: 'placeholder',
        label: 'placeholder',
        type: 'String',
        inputType: 'input',
        default: ''
      },
      {
        key: 'filterable',
        label: 'filterable',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'allow-create',
        label: 'allow-create',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'filter-method',
        label: 'filter-method',
        type: 'String',
        inputType: 'input',
        default: ''
      },
      {
        key: 'remote',
        label: 'remote',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'remote-method',
        label: 'remote-method',
        type: 'String',
        inputType: 'input',
        default: ''
      },
      {
        key: 'loading',
        label: 'loading',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'loading-text',
        label: 'loading-text',
        type: 'String',
        inputType: 'input',
        default: '加载中'
      },
      {
        key: 'no-match-text',
        label: 'no-match-text',
        type: 'String',
        inputType: 'input',
        default: '无匹配数据'
      },
      {
        key: 'no-data-text',
        label: 'no-data-text',
        type: 'String',
        inputType: 'input',
        default: '无数据'
      },
      {
        key: 'popper-class',
        label: 'popper-class',
        type: 'String',
        inputType: 'input',
        default: ''
      },
      {
        key: 'reserve-keyword',
        label: 'reserve-keyword',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'default-first-option',
        label: 'default-first-option',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'popper-append-to-body',
        label: 'popper-append-to-body',
        type: 'Boolean',
        inputType: 'switch',
        default: true
      }
    ],
    Slots: [
      { name: 'default' }
    ]
  }
})

export default setting
