import { props, setting } from './type'
export default { props, setting }

export const VdElAside = {
  name: 'vd-el-aside',
  props,
  render (h) {
    return h(
      'el-aside',
      {
        props: {
          width: this.width
        }
      },
      this.slots.map(_ => h(_.tag, {
        slot: _.slot,
        attrs: { id: _.id },
        props: _.props
      }))
    )
  }
}
