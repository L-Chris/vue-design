import {toProps} from '@/utils'

let config = {
  key: 'el-button',
  name: 'el-button',
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
          key: 'label',
          label: 'label',
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
        },
        {
          key: 'border',
          label: 'border',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'size',
          label: 'size',
          type: 'String',
          inputType: 'select',
          default: 'medium',
          data: [
            { value: 'medium', label: 'medium' },
            { value: 'small', label: 'small' },
            { value: 'mini', label: 'mini' }
          ]
        },
        {
          key: 'name',
          label: 'name',
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

export let props = toProps(config)
export const setting = Object.freeze(config)
