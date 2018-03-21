const setting = Object.freeze({
  label: 'el-pagination',
  tag: 'VdElPagination',
  originTag: 'el-pagination',
  category: 'data',
  config: {
    Props: [
      {
        key: 'small',
        label: 'small',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'background',
        label: 'background',
        type: 'Boolean',
        inputType: 'switch',
        default: false
      },
      {
        key: 'page-size',
        label: 'page-size',
        type: 'Number',
        inputType: 'input',
        default: 10
      },
      {
        key: 'total',
        label: 'total',
        type: 'Number',
        inputType: 'input',
        default: 0
      },
      {
        key: 'page-count',
        label: 'page-count',
        type: 'Number',
        inputType: 'input',
        default: 0
      },
      {
        key: 'current-page',
        label: 'current-page',
        type: 'Number',
        inputType: 'input',
        default: 1
      },
      {
        key: 'layout',
        label: 'layout',
        type: 'String',
        inputType: 'input',
        default: 'prev, pager, next, jumper, ->, total'
      },
      {
        key: 'page-sizes',
        label: 'page-sizes',
        type: 'Number',
        inputType: 'select',
        default: 0,
        data: [
          { value: 10, label: 10 },
          { value: 20, label: 20 },
          { value: 30, label: 30 },
          { value: 40, label: 40 },
          { value: 50, label: 50 },
          { value: 100, label: 100 }
        ]
      },
      {
        key: 'popper-class',
        label: 'popper-class',
        type: 'String',
        inputType: 'input',
        default: ''
      },
      {
        key: 'prev-text',
        label: 'prev-text',
        type: 'String',
        inputType: 'input',
        default: ''
      },
      {
        key: 'next-text',
        label: 'next-text',
        type: 'String',
        inputType: 'input',
        default: ''
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
