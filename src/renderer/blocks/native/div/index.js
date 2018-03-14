import { props, setting } from './type'
export default { props, setting }

export const NtDiv = {
  name: 'nt-div',
  props,
  render (h) {
    return h(
      'div',
      {
        props: {},
        domProps: this.domProps
      },
      this.slots.map(_ => h(_.tag, {
        slot: _.slot,
        attrs: { id: _.id },
        props: _.props,
        domProps: _.domProps
      }))
    )
  }
}
