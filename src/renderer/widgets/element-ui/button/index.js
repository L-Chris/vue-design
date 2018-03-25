
import {toPropsModel} from '@/utils/component'
import setting from './type'

export default {
  name: setting.originTag,
  props: toPropsModel(setting.config.Props),
  render () {
    return (
      <el-button
        size={this.size}
      >{this.text}</el-button>
    )
  }
}
