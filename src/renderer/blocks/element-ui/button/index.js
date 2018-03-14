import { props, setting } from './type'
export default { props, setting }

export const VdElButton = {
  name: 'vd-el-button',
  props,
  render (h) {
    return h(
      'el-button',
      {
        props: {
          size: this.size,
          type: this.type,
          plain: this.plain,
          round: this.round,
          loading: this.loading,
          disabled: this.disabled,
          icon: this.icon,
          autofocus: this.autofocus,
          'native-type': this['native-type']
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
