import {toProps} from '@/utils'

export const setting = {
  key: 'el-footer',
  name: 'el-footer',
  config: [
    {
      name: 'Layout',
      children: [
        {
          type: 'box-editor'
        }
      ]
    },
    {
      name: 'Style',
      children: [
        {
          key: 'height',
          label: 'height',
          type: 'String',
          inputType: 'input',
          default: ''
        }
      ]
    },
    {
      name: 'Slot',
      children: [
        {
          name: 'default'
        }
      ]
    }
  ],
  events: [
    {
      type: 'click',
      key: 'click'
    }
  ]
}

export let props = toProps(setting)
