import {createProps, wrapComponent} from '@/utils/component'
import setting from './type'

export default {
  createProps: createProps(setting.config.Props),
  setting,
  component: wrapComponent(setting)
}
