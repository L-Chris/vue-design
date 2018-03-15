import { props, setting } from './type'
export default { props, setting }

export const VdElRadio = {
  name: 'vd-el-radio',
  props,
  render (h) {
    return h(
      'el-radio',
      {
        props: {
          label: this.label,
          disabled: this.disabled,
          border: this.border,
          size: this.size,
          name: this.name
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
