import {toProps} from '@/utils'

export const setting = {
  key: 'el-select',
  name: 'el-select',
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
          key: 'size',
          label: 'size',
          type: 'String',
          inputType: 'select',
          default: '',
          data: [
            { value: 'medium', label: 'medium' },
            { value: 'small', label: 'small' },
            { value: 'mini', label: 'mini' }
          ]
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
