
import {toPropsModel, toProps} from '@/utils/component'
import setting from './type'

export default {
  name: setting.originTag,
  props: toPropsModel(setting.config.Props),
  render () {
    const props = toProps(setting.config.Props).call(this)
    return (
      <setting.originTag
        {...{props}}
      >
        {this.$slots.default}
      </setting.originTag>
    )
  }
}
