import { props, setting } from './type'
export default { props, setting }

export const VdElFooter = {
  name: 'vd-el-footer',
  props,
  render (h) {
    return h(
      'el-footer',
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
