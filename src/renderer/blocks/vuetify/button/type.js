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
          key: 'abosolute',
          label: 'abosolute',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'active-class',
          label: 'active-class',
          type: 'String',
          inputType: 'input',
          default: ''
        },
        {
          key: 'append',
          label: 'append',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'block',
          label: 'block',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'color',
          label: 'color',
          type: 'String',
          inputType: 'input',
          default: undefined
        },
        {
          key: 'dark',
          label: 'dark',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'depressed',
          label: 'depressed',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'disable',
          label: 'disable',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'exact',
          label: 'exact',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'exact-active-class',
          label: 'exact-active-class',
          type: 'String',
          inputType: 'input',
          default: undefined
        },
        {
          key: 'fab',
          label: 'fab',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'fixed',
          label: 'fixed',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'flat',
          label: 'flat',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'href',
          label: 'href',
          type: 'String',
          inputType: 'input',
          default: undefined
        },
        {
          key: 'icon',
          label: 'icon',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'input-value',
          label: 'input-value',
          type: 'String',
          inputType: 'input',
          default: undefined
        },
        {
          key: 'large',
          label: 'large',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'left',
          label: 'left',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'light',
          label: 'light',
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
          key: 'nuxt',
          label: 'nuxt',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'outline',
          label: 'outline',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'replace',
          label: 'replace',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'right',
          label: 'right',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'ripple',
          label: 'ripple',
          type: 'Boolean',
          inputType: 'switch',
          default: true
        },
        {
          key: 'round',
          label: 'round',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'small',
          label: 'small',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'tag',
          label: 'tag',
          type: 'String',
          inputType: 'input',
          default: 'button'
        },
        {
          key: 'target',
          label: 'target',
          type: 'String',
          inputType: 'input',
          default: undefined
        },
        {
          key: 'to',
          label: 'to',
          type: 'String',
          inputType: 'input',
          default: undefined
        },
        {
          key: 'top',
          label: 'top',
          type: 'Boolean',
          inputType: 'switch',
          default: false
        },
        {
          key: 'type',
          label: 'type',
          type: 'String',
          inputType: 'input',
          default: 'button'
        },
        {
          key: 'value',
          label: 'value',
          type: 'String',
          inputType: 'input',
          default: undefined
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
