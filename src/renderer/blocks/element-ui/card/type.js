import {toProps} from '@/utils'

export const setting = {
  key: 'el-card',
  name: 'el-card',
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
      ]
    },
    {
      name: 'Slot',
      children: [
        {
          name: 'default'
        },
        {
          name: 'header'
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
