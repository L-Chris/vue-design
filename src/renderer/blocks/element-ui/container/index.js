import { props, setting } from './type'
export default { props, setting }

export const VdElContainer = {
  name: 'vd-el-container',
  props,
  render (h) {
    return h(
      'el-container',
      {
        props: {
          direction: this.direction
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
