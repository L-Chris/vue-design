const setting = Object.freeze({
  label: 'el-rate',
  tag: 'VdElRate',
  originTag: 'el-rate',
  category: 'form',
  config: {
    Props: [
      {
        key: 'max',
        label: 'max',
        type: 'Number',
        inputType: 'input',
        default: 5
      },
      {
        key: 'disabled',
        label: 'disabled',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'allow-half',
        label: 'allow-half',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'low-threshold',
        label: 'low-threshold',
        type: 'Number',
        inputType: 'input',
        default: 2
      },
      {
        key: 'high-threshold',
        label: 'high-threshold',
        type: 'Number',
        inputType: 'input',
        default: 4
      },
      {
        key: 'void-color',
        label: 'void-color',
        type: 'String',
        inputType: 'input',
        default: '#C6D1DE'
      },
      {
        key: 'disabled-void-color',
        label: 'disabled-void-color',
        type: 'String',
        inputType: 'input',
        default: '#EFF2F7'
      },
      {
        key: 'void-icon-class',
        label: 'void-icon-class',
        type: 'String',
        inputType: 'input',
        default: 'el-icon-star-off'
      },
      {
        key: 'disabled-void-icon-class',
        label: 'disabled-void-icon-class',
        type: 'String',
        inputType: 'input',
        default: 'el-icon-star-on'
      },
      {
        key: 'show-text',
        label: 'show-text',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'show-score',
        label: 'show-score',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'text-color',
        label: 'text-color',
        type: 'String',
        inputType: 'input',
        default: '#1F2D3D'
      },
      {
        key: 'score-template',
        label: 'score-template',
        type: 'String',
        inputType: 'input',
        default: '{value}'
      }
    ],
    Slots: [
      { name: 'default' }
    ]
  }
})

export default setting
