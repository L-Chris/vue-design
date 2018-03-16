
const setting = Object.freeze({
  label: 'el-container',
  tag: 'VdElContainer',
  originTag: 'el-container',
  category: 'layout',
  config: {
    Props: [
      {
        key: 'direction',
        label: 'direction',
        type: 'String',
        inputType: 'select',
        default: 'vertical',
        data: [
          { value: 'horizontal ', label: 'horizontal ' },
          { value: 'vertical', label: 'vertical' }
        ]
      }
    ],
    Slots: [
      { name: 'default' }
    ]
  }
})

export default setting
