const setting = Object.freeze({
  label: 'el-card',
  tag: 'VdElCard',
  originTag: 'el-card',
  category: 'layout',
  config: {
    Props: [
      {
        key: 'header',
        label: 'header',
        type: 'String',
        inputType: 'input',
        default: ''
      },
      {
        key: 'body-style',
        label: 'body-style',
        type: 'String',
        inputType: 'input',
        default: '{ "padding": "20px" }'
      }
    ],
    Slots: [
      { name: 'default' },
      { name: 'header' }
    ]
  }
})

export default setting
