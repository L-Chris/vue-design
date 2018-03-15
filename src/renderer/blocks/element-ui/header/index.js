import { props, setting } from './type'
export default { props, setting }

export const VdElHeader = {
  name: 'vd-el-header',
  props,
  render (h) {
    return h(
      'el-header',
      {
        props: {
          height: this.height
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
