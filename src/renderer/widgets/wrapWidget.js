import {createProps, wrapComponent} from '@/utils/component'

export default (setting, component) => ({
  createProps: createProps(setting.config.Props),
  setting,
  component: component || wrapComponent(setting)
})
