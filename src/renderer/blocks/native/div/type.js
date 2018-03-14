import {toProps} from '@/utils'

export const setting = {
  key: 'div',
  name: 'div',
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
      children: []
    },
    {
      name: 'Slot',
      children: [
        {
          name: 'default'
        }
      ]
    },
    {
      name: 'DomProps',
      children: [
        {
          key: 'width',
          label: 'width',
          type: 'String',
          inputType: 'input',
          default: 'auto'
        },
        {
          key: 'height',
          label: 'height',
          type: 'String',
          inputType: 'input',
          default: 'auto'
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
