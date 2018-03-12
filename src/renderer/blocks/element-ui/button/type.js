import {toProps} from '@/utils'

export const setting = {
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
          key: 'text',
          label: 'text',
          type: 'String',
          inputType: 'input',
          default: 'button'
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
          key: 'type',
          label: 'type',
          type: 'String',
          inputType: 'select',
          default: '',
          data: [
            { value: 'primary', label: 'primary' },
            { value: 'success', label: 'success' },
            { value: 'warning', label: 'warning' },
            { value: 'danger', label: 'danger' },
            { value: 'info', label: 'info' },
            { value: 'text', label: 'text' }
          ]
        },
        {
          key: 'plain',
          label: 'plain',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'round',
          label: 'round',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'loading',
          label: 'loading',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'disabled',
          label: 'disabled',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'icon',
          label: 'icon',
          type: 'String',
          inputType: 'input',
          default: ''
        },
        {
          key: 'autofocus',
          label: 'autofocus',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'native-type',
          label: 'native-type',
          type: 'String',
          inputType: 'select',
          default: 'button',
          data: [
            { value: 'button', label: 'button' },
            { value: 'submit', label: 'submit' },
            { value: 'reset', label: 'reset' }
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
