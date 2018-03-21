const setting = Object.freeze({
  label: 'el-col',
  tag: 'VdElCol',
  originTag: 'el-col',
  category: 'layout',
  config: {
    Props: [
      {
        key: 'span',
        label: 'span',
        type: 'Number',
        inputType: 'input',
        default: 0
      },
      {
        key: 'offset',
        label: 'offset',
        type: 'Number',
        inputType: 'input',
        default: 0
      },
      {
        key: 'push',
        label: 'push',
        type: 'Number',
        inputType: 'input',
        default: 0
      },
      {
        key: 'pull',
        label: 'pull',
        type: 'Number',
        inputType: 'input',
        default: 0
      },
      {
        key: 'xs',
        label: 'xs',
        type: 'Object',
        inputType: 'input',
        default: {}
      },
      {
        key: 'sm',
        label: 'sm',
        type: 'Object',
        inputType: 'input',
        default: {}
      },
      {
        key: 'md',
        label: 'md',
        type: 'Object',
        inputType: 'input',
        default: {}
      },
      {
        key: 'lg',
        label: 'lg',
        type: 'Object',
        inputType: 'input',
        default: {}
      },
      {
        key: 'xl',
        label: 'xl',
        type: 'Object',
        inputType: 'input',
        default: {}
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
