import {toProps} from '@/utils'

export const setting = {
  key: 'el-container',
  name: 'el-container',
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
