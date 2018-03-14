import { props, setting } from './type'
export default { props, setting }

export const VdVButton = {
  name: 'vd-v-button',
  props,
  render (h) {
    return h(
      'v-button',
      {
        props: {
          abosolute: this.abosolute,
          'active-class': this['active-class'],
          append: this.append,
          block: this.block,
          color: this.color,
          dark: this.dark,
          depressed: this.depressed,
          exact: this.exact,
          'exact-active-class': this['exact-active-class'],
          fab: this.fab,
          fixed: this.fixed,
          flat: this.flat,
          href: this.href,
          icon: this.icon,
          'input-value': this['input-value'],
          large: this.large,
          left: this.left,
          light: this.light,
          loading: this.loading,
          outline: this.outline,
          replace: this.replace,
          right: this.right,
          ripple: this.ripple,
          round: this.round,
          small: this.small,
          tag: this.tag,
          target: this.target,
          to: this.to,
          top: this.top,
          type: this.type,
          value: this.value
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
