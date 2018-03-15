import { props, setting } from './type'
export default { props, setting }

export const VdElMain = {
  name: 'vd-el-main',
  props,
  render (h) {
    return h(
      'el-main',
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
