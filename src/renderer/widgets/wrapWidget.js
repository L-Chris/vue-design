import {createProps, wrapComponent} from '@/utils/component'

export default setting => ({
  createProps: createProps(setting.config.Props),
  setting,
  component: wrapComponent(setting)
})
