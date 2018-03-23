import {createProps, toPropsModel, toProps} from '@/utils/component'
import setting from './type'

let {tag, originTag, config: { Props }} = setting

export default {
  createProps: createProps(Props),
  setting,
  component: {
    name: tag,
    props: toPropsModel(Props),
    render (h) {
      return h(
        originTag,
        {
          props: toProps(Props).call(this)
        },
        this.slots.map(_ => h(_.setting.tag, {
          slot: _.slot,
          attrs: { id: _.id },
          props: _.props,
          domProps: _.props.domProps,
          class: _.props.class && _.props.class.split(' '),
          style: _.props.style
        }))
      )
    }
  }
}
